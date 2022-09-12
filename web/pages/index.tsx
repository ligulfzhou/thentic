import {ethers} from "ethers";
import Layout from '../components/Layout'
import {useWeb3React} from "@web3-react/core"
import {FC} from 'react'
import useDocuments from "../hooks/useDocuments";
import DocumentsTable from "../components/DocumentsTable";

const Home: FC = () => {
    const {active, account, activate, chainId, library, connector} = useWeb3React()
    const {fetchDocuments} = useDocuments()

    const sign = async () => {
        if (!window.ethereum) throw new Error("No crypto wallet found")
        console.log(window.ethereum)
        const raw_message = `prove you are ${account}`
        console.log(raw_message)
        const sign = await window.ethereum.request({
            method: 'personal_sign',
            params: [raw_message, account, 'Random text'],
        });

        console.log(sign)
    }

    return (
        <Layout>
            <div onClick={sign}
                 className='mt-16 m-auto text-center'>Pay to View Items
            </div>
            <div className='m-10 m-auto'>
                <DocumentsTable/>
            </div>
        </Layout>
    )
}

export default Home
