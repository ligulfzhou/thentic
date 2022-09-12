import Layout from '../components/Layout'
import {useWeb3React} from "@web3-react/core"
import {FC} from 'react'
import useDocuments from "../hooks/useDocuments";
import DocumentsTable from "../components/DocumentsTable";

const Add: FC = () => {
    const {active, account, activate, chainId, library} = useWeb3React()
    const {fetchDocuments} = useDocuments()

    return (
        <Layout>
            <div className='mt-16 m-auto text-center'>Pay to View Items</div>
            <div className='m-10 m-auto'>
                <DocumentsTable />
            </div>
        </Layout>
    )
}

export default Add
