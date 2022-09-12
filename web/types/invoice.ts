
export interface InvoiceType {
    id: number
    document_id: number
    request_id: string
    submitter: string
}

export interface InvoicesResponse {
    invoices: InvoiceType[]
}