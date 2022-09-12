
export interface DocumentType {
    id: number
    description: string
    document: string | null
    to: string
    amount: number
}


export interface DocumentResponse {
    document: DocumentType
}


export interface DocumentsResponse {
    documents: DocumentType[]
    count: number
}

