import { useRecoilValue } from 'recoil';
import { User, UserStatus } from './provider/User';
import { Workflow, WORKFLOWSTATUS } from './provider/Workflow ';
import Invalid from "./components/Pages/Invalid/Invalid";
import ControlPanel from './components/Organisms/ControlPanel/ControlPanel';

function App() {

    const userType = useRecoilValue(User)
    const workFlowStatus = useRecoilValue(Workflow)
    let component: JSX.Element;
    if (userType === "invalid") {
        component = <Invalid />
    }


    return (
        <main>
            <ControlPanel/>
            {component}
        </main>
    )
}

export default App
