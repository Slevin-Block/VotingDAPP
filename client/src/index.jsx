import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/theme/styles.css'
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './assets/theme/theme';
/* import App2 from './App2'; */


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RecoilRoot>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </RecoilRoot>
)
