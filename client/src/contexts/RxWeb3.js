import { useEffect, useState } from 'react';
import { Observable, BehaviorSubject, map } from 'rxjs'
import Web3 from 'web3';

const JSON_File = "Voting.json"
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
const schemaReq = { account: null, networkID: null, artifact: null, contractAddress: null, contract: null, blockNumber: null }


//---------------------------------------------------------------------------
// INFORMATION OBJECT
//-------------------------------------------
let deploymentObject = { ...schemaReq }
export const deploymentObject$ = new BehaviorSubject(deploymentObject)


//---------------------------------------------------------------------------
// ARTIFACT
//-------------------------------------------
try {
    deploymentObject.artifact = require(`../contracts/${JSON_File}`);
} catch (err) {
    console.error(JSON_File + " unfound !")
    console.log(err)
    deploymentObject.artifact = null
}


//---------------------------------------------------------------------------
// ACCOUNT
//-------------------------------------------
//                                                   <==== in case of load
const account$ = new Observable(observer => {
    web3.eth.requestAccounts()
        .then(accounts => observer.next(accounts))
})

account$.subscribe(accounts => {
    deploymentObject.account = accounts.at(0)
    deploymentObject$.next(deploymentObject)
})

//                                                   <==== in case of change
const accountChange$ = new Observable(observer => {
    window.ethereum.on("accountsChanged", () => {
        web3.eth.requestAccounts()
            .then(accounts => observer.next(accounts))
    })
})

accountChange$.subscribe(accounts => {
    deploymentObject.account = accounts.at(0)
    deploymentObject$.next(deploymentObject)
})


//---------------------------------------------------------------------------
// NETWORK
//------------------------------------------
//                                                   <==== in case of load
const networkID$ = new Observable(observer => {
    web3.eth.net.getId()
        .then(networkID => observer.next(networkID))
})

networkID$.subscribe(networkID => {
    deploymentObject = loadInformations(networkID, deploymentObject)
    deploymentObject$.next(deploymentObject)
})

//                                                   <==== in case of change
const chainChange$ = new Observable(observer => {
    window.ethereum.on("chainChanged", () => {
        web3.eth.net.getId()
            .then(networkID => observer.next(networkID))
    })
})

chainChange$.subscribe(networkID => {
    deploymentObject = loadInformations(networkID, deploymentObject)
    deploymentObject$.next(deploymentObject)
})

// Generic refactoring function
function loadInformations(networkID, obj) {
    const temporary = { ...obj }
    temporary.networkID = networkID
    try {
        const address = temporary.artifact.networks[networkID].address;
        const abi = temporary.artifact.abi
        temporary.contractAddress = address
        temporary.contract = new web3.eth.Contract(abi, address);
    } catch (err) {
        console.log("Any contract deploy on this Network, change it !")
        temporary.contractAddress = null
        temporary.contract = null
    }
    return temporary
}


//---------------------------------------------------------------------------
// HOOK
//------------------------------------------

export const useRxWeb3 = () => {
    const [data, setData] = useState({isReady : false,  ...schemaReq })
    const [events, setEvents] = useState({})
    useEffect(() => {
        deploymentObject$.subscribe(data => {
            (async() => {
                if(data.contract === null || data.account === null ) data.isReady = false
                else {
                    const txhash = data.artifact.networks[data.networkID].transactionHash;
                    const res = await web3.eth.getTransaction(txhash)
                    data.blockNumber = res.blockNumber
                    data.isReady = true
                }
                setData({ ...data })
            })()
        })
    }, [])
    // RESEARCH EVENT
    function  researchEvent (nameEvent, cb = (value) => value, blockNumber = data.blockNumber) {
        deploymentObject.contract.getPastEvents(nameEvent, { fromBlock: blockNumber, toBlock: 'latest' })
            .then(data => data.map(d => d.returnValues))
            .then(data => data.map(d => Object.fromEntries(Object.entries(d).filter(([key, value]) => isNaN(key)))))
            .then(cb)
    }

    // WATCHING EVENT
    function watchingEvent(eventName, setData, cb=(value)=>value) {
        const eventObj = {}
        
        eventObj[eventName] = new Observable(observer => {
                deploymentObject.contract.events[eventName]({fromBlock:"earliest"})
                .on('data', data => observer.next(data.returnValues))     
                .on('error', err => console.log(eventName + ' err', err))
            })

        
        const data$ = eventObj[eventName].pipe(
            map(log => Object.fromEntries(Object.entries(log).filter(([key, value]) => isNaN(key))))
        );

        
        const subscription = data$.subscribe((value) => setData(cb(value)));

        setEvents({...events, ...eventObj})
        return subscription
    }

    // EXPERIMENTAL,  would make it possible to do without WATCHING EVENT process (function + useState + useEffect)
    /* function actionAndUpdate(method, param, event, setter, cb, account = account){
        const tx = data.contract.methods[method].bind(this, ...param)({from :account})
        let res = tx.events[event].returnValues
        setter(cd ? cb(res) : res)
    } */

    return { ...data, action: data?.contract?.methods, researchEvent, watchingEvent }
}








//---------------------------------------------------------------------------
// EXEMPLES OF ACTIONS :
//------------------------------------------

// CALL FUNCTION - To obtain data
/* const balanceOf = async (action, account) => {
     return await action.balanceOf(account).call({ from: account });
 };
 */
// SEND FUNCTION - To send data
/* const transfert = async (action, from, to, value) => {
    await action.transfer(to, value).send({ from });
} */
