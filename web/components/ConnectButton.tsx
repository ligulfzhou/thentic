import { shorter } from "../utils/utils";
import {useEffect, useState, Fragment, FC} from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connector";
import { Dialog, Transition } from '@headlessui/react'
import {useRouter} from "next/router";


const ConnectButton: FC = ()=> {

    const router = useRouter()
    const { active, account, activate, chainId } = useWeb3React();
    const [failed, setFailed] = useState(false);

    const [isErrorOpen, setIsErrorOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        eagerConnect()
    }, [active, chainId])

    const changeNetwork = async ()=> {
        if (!window.ethereum) throw new Error("No crypto wallet found")
        console.log(window.ethereum)
        await window.ethereum.request({
            'method': 'wallet_addEthereumChain',
            params: [{
                chainId: "0x61",
                rpcUrls: ["https://bsctestapi.terminet.io/rpc"],
                chainName: "Binance Smart Chain Testnet",
                nativeCurrency: {
                    name: "tBNB",
                    symbol: "tBNB",
                    decimals: 18
                },
                blockExplorerUrls: ["https://testnet.bscscan.com/"]
            }]
        })

        router.reload()
    }

    const connect = () => {
        activate(injected, undefined, true).catch((error) => {
            if (error.name.includes('UnsupportedChainIdError') || error.message.includes('Unsupported')) {
                setFailed(true)
            }
            console.log('activate...onCatch')
            console.log(error)
            console.log('activate...onCatch')
        })
    }

    const eagerConnect = () => {
        console.log("connect...")

        setFailed(false)

        injected.isAuthorized().then(isAuthorized => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch((error) => {
                    if (error.name.includes('UnsupportedChainIdError') || error.message.includes('Unsupported')) {
                        setFailed(true)
                    }
                    console.log(error)
                    console.log('activate...onCatch')
                })
            } else {
                console.log('not authorized....')
            }
        });
    }

    const closeErrorModal = () => {
        setIsErrorOpen(false)
    }
    const openErrorModal = () => {
        setIsErrorOpen(true)
    }

    return (
        <div>
            {active && (chainId === 97) && (
                <button onClick={connect} className="px-2 py-1 rounded-md bg-red-500 text-gray-900">
                    Connected {shorter(account)}
                </button>
            )}
            {!active && !failed && (
                <button onClick={connect} className="px-2 py-1 rounded-md bg-purple-400 text-gray-900">
                    <div>Connect Wallet</div>
                </button>
            )}
            {(failed || (active && chainId !== 97)) && (
                <div data-tip="Please switch to Mainnet" className="tooltip tooltip-open tooltip-bottom">
                    <button onClick={changeNetwork} className="px-2 py-1 rounded-md bg-red-500 text-gray-900">
                        <div>Wrong Network</div>
                    </button>
                </div>
            )}

            <Transition appear show={isErrorOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeErrorModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Failure occur.
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {errorMsg}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeErrorModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ConnectButton