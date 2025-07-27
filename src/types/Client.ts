import type { DocumentType } from "./DocumentType"

export type Client = {
    id: number
    code: string
    name: string
    email: string
    documentNumber: number
    documentType: DocumentType
}

