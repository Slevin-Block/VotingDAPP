import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import './assets/theme/styles.css'
import { RecoilRoot } from 'recoil';
import { theme } from './assets/theme/theme'
import { EthProvider } from "./contexts/EthContext/EthProvider";



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RecoilRoot>
                <EthProvider>
                    <App />
                </EthProvider>
            </RecoilRoot>
        </ChakraProvider>
    </React.StrictMode>,
)
