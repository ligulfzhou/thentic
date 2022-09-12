import useSWR from 'swr'
import {fetcher} from "../utils/utils";
import {host} from "../utils/const";
import {DocumentResponse, DocumentsResponse, DocumentType} from '../types'

export default function useDocuments() {

    function fetchDocument(doc_id: number | string) {
        const {data, error} = useSWR<DocumentResponse>(`${host}/api/nft/detail&id=${doc_id}`, fetcher)

        let document = undefined
        if (data !== undefined && data.document !== undefined) {
            document = data.document
        }

        return {
            document: document,
            isDocumentLoading: !error && !data,
            isDocumentError: error
        }
    }

    function fetchDocuments(page: number, pageSize: number) {
        const {data, error} = useSWR<DocumentsResponse>(`${host}/api/documents?page=${page}&page_size=${pageSize}`, fetcher)

        let documents: DocumentType[] = []
        let count: number = 0
        if (data !== undefined && data.documents !== undefined) {
            documents = data.documents
            count = data.count
        }

        return {
            count,
            documents,
            isDocumentsLoading: !error && !data,
            isDocumentsError: error
        }
    }

    return {
        fetchDocument,
        fetchDocuments,
    }
}
