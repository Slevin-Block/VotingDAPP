import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/theme/styles.css'
import { RecoilRoot } from 'recoil';
import EthProvider from './contexts/EthContext/EthProvider';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <EthProvider>
                <App />
            </EthProvider>
        </RecoilRoot>
    </React.StrictMode>,
)
