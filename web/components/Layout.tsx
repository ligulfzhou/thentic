import { useRouter } from "next/router";
import { default as HTMLHead } from "next/head";
import ConnectButton from "./ConnectButton";
import {FC, ReactNode} from "react";


interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children})=> {
    return (
        <div className="">
            <Head />
            <Header />
            <div className="">{children}</div>
        </div>
    );
}

function Head() {
    return (
        <HTMLHead>
            <title>Pay to View</title>
            <meta name="title" content="Pay to View" />
            <meta
                name="description"
                content="Pay to View with thentic API."
            />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://thentic.ligulfzhou.com/" />
            <meta property="twitter:title" content="Pay to View" />
            <meta
                property="twitter:description"
                content="Pay to View with thentic API.."
            />
        </HTMLHead>
    );
}

function Header() {

    return (
        <header className="text-black body-font border-b border-slate-50/[0.1]" id="home">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Pay to View</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-blue-600" href="/add">Add Pay2View</a>
                    <a className="mr-5 hover:text-blue-600" href="/invoices">Your Invoices</a>
                </nav>
                 <ConnectButton />
            </div>
        </header>
    );
}

export default Layout