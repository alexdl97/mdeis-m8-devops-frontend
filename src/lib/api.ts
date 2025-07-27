// import type { Client } from "../components/ClientTable"
import type { Client } from "../types/Client"
import type { PaymentCondition } from "../types/PaymentCondition"
import type { DocumentType } from "../types/DocumentType"
import type { Product } from "../types/Product"
import axios from './axiosInstance'
import type { Invoice } from "../types/Invoice"

export async function fetchDocumentTypes(): Promise<DocumentType[]> {
    const response = await axios.get<DocumentType[]>("/document-types")
    return response.data
}

export async function saveClient(body: any): Promise<any> {
    const response = await axios.post("/clients", body)
    return response.data
}

export async function fetchClients(): Promise<Client[]> {
    const response = await axios.get<Client[]>("/clients")
    return response.data
}

export async function fetchProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>("/products")
    return response.data
}

export async function fetchPaymentConditions(): Promise<PaymentCondition[]> {
    const response = await axios.get<PaymentCondition[]>("/payment-conditions")
    return response.data
}

export async function saveInvoice(body: any): Promise<any> {
    const response = await axios.post("/invoice", body)
    return response.data
}

export async function fetchInvoices(): Promise<Invoice[]> {
    const response = await axios.get<Invoice[]>("/invoice")
    return response.data
}