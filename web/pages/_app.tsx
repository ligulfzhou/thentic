import 'tailwindcss/tailwind.css'
import {Web3ReactProvider} from '@web3-react/core'
import {Web3Provider} from '@ethersproject/providers'
import type {AppProps} from "next/app";


function MyApp({ Component, pageProps }: AppProps): JSX.Element{
    function getLibrary(provider: any): Web3Provider {
        const library = new Web3Provider(provider)
        library.pollingInterval = 12000
        return library
    }

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
        </Web3ReactProvider>
    )
}

export default MyApp

// import 'tailwindcss/tailwind.css';
// import type { AppProps } from "next/app";

// import { Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from '@ethersproject/providers'

// function getLibrary(provider: any): Web3Provider {
//   const library = new Web3Provider(provider)
//   library.pollingInterval = 12000
//   return library
// }

// // Export application
// export default function LootRNG({ Component, pageProps }: AppProps) {
//   return (
//     <Web3ReactProvider getLibrary={getLibrary}>
//       <Component {...pageProps} />
//     </Web3ReactProvider>
//   )
// }
