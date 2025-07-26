import type { Client } from "../components/ClientTable"

export type DocumentTypeOption = {
    code: string,
    name: string
}

export async function fetchDocumentTypes(): Promise<DocumentTypeOption[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { code: "CI", name: "Carnet de identidad" },
        { code: "NIT", name: "Número de identificación tributaria" },
        { code: "CEX", name: "Carnet extranjero" },
        { code: "PAS", name: "Pasaporte" },
    ]), 3000))
}

export async function fetchClients(): Promise<Client[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: "Genaro Alvarez", email: '', documentNumber: 2, documentType: 'CI' },
        { id: 2, name: "Pedro Gutierrez", email: '', documentNumber: 2, documentType: 'CI' },
    ]), 3000))
}

export async function fetchProducts(): Promise<Client[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: "Genaro Alvarez", email: '', documentNumber: 2, documentType: 'CI' },
        { id: 2, name: "Pedro Gutierrez", email: '', documentNumber: 2, documentType: 'CI' },
    ]), 3000))
}

export type PaymentCondition = {
    code: string;
    name: string;
}

export async function fetchPaymentConditions(): Promise<PaymentCondition[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { code: "1", name: "Cash on Delivery (CID)" },
        { code: "2", name: "Cash on Advanced" },
        { code: "3", name: "End of month" },
    ]), 3000))
}