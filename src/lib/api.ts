// import type { Client } from "../components/ClientTable"
import type { Client } from "../types/Client"
import type { PaymentCondition } from "../types/PaymentCondition"
import type { DocumentType } from "../types/DocumentType"
import type { Product } from "../types/Product"

export async function fetchDocumentTypes(): Promise<DocumentType[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, code: "CI", name: "Carnet de identidad" },
        { id: 2, code: "NIT", name: "Número de identificación tributaria" },
        { id: 3, code: "CEX", name: "Carnet extranjero" },
        { id: 4, code: "PAS", name: "Pasaporte" },
    ]), 3000))
}

export async function fetchClients(): Promise<Client[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, code: "CL00001", name: "Genaro Alvarez", email: 'genaruto@gmail.com', documentNumber: 5485874, documentType: { id: 1, code: 'CI', name: "Carnet de identidad" } },
        { id: 2, code: "CL00001", name: "Pedro Gutierrez", email: 'p.gutierrez@gmail.com', documentNumber: 34873474, documentType: { id: 1, code: 'CI', name: "Carnet de identidad" } },
    ]), 3000))
}

export async function fetchProducts(): Promise<Product[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { id: 1, code: "PR0001", name: "Producto A", price: 100. },
        { id: 2, code: "PR0002", name: "Producto B", price: 100. },
    ]), 3000))
}

export async function fetchPaymentConditions(): Promise<PaymentCondition[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { code: "1", name: "Cash on Delivery (CID)" },
        { code: "2", name: "Cash on Advanced" },
        { code: "3", name: "End of month" },
    ]), 3000))
}