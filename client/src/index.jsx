import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/theme/styles.css'
import { RecoilRoot } from 'recoil';
import EthProvider from './contexts/EthContext/EthProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './assets/theme/theme';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RecoilRoot>
        <EthProvider>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </EthProvider>
    </RecoilRoot>
)
