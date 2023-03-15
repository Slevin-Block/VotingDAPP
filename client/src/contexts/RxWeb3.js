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
        temporary.blockNumber = abi.at(-1)?.blockNumber
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
            if(data.contract === null || data.account === null ) data.isReady = false
            else data.isReady = true
            setData({ ...data })
        })
    }, [])

    // RESEARCH EVENT
    function  researchEvent (nameEvent, cb, blockNumber = 0) {
        deploymentObject.contract.getPastEvents(nameEvent, { fromBlock: blockNumber, toBlock: 'latest' })
            .then(cb)
    }

    // WATCHING EVENT
    function watchingEvents(eventName, setData, cb=(value)=>value) {
        const eventObj = {}
        console.log("Debug : ", eventName)
        
        eventObj[eventName] = new Observable(observer => {
                deploymentObject.contract.events[eventName]({fromBlock:"earliest"})
                .on('data', data => observer.next(data.returnValues))     
                .on('changed', changed => console.log(eventName + ' changed', changed))
                .on('error', err => console.log(eventName + ' err', err))
                .on('connected', str => console.log(eventName + ' successful', str))
            })

        
        const data$ = eventObj[eventName].pipe(
            map(log => Object.fromEntries(Object.entries(log).filter(([key, value]) => isNaN(key))))
        );

        
        const subscription = data$.subscribe((value) => setData(cb(value)));

        setEvents({...events, ...eventObj})
        return subscription
    }

    return { ...data, action: data?.contract?.methods, researchEvent, watchingEvents }
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
