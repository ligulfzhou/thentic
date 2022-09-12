import useSWR from 'swr'
import {fetcher} from "../utils/utils";
import {host} from "../utils/const";
import {InvoicesResponse, InvoiceType} from '../types'

export default function useInvoices () {

    function createInvoice(submitter: string, documentId: number) {

    }

    function fetchInvoices() {
        const { data, error } = useSWR<InvoicesResponse>(`${host}/api/invoices`, fetcher)

        let invoices: InvoiceType[] = []
        if (data !== undefined && data.invoices !== undefined) {
            invoices = data.invoices
        }

        return {
            invoices: invoices,
            isInvoicesLoading: !error && !data,
            isInvoicesError: error
        }
    }

    return {
        createInvoice,
        fetchInvoices
    }
}
