import { z } from "zod";

export const clientSchema = z.object({
    code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    documentNumber: z.coerce.number<number>().min(1, "Document number is required"),
    documentType: z.number().min(1, "Document type is required"),
    email: z.email().min(1, "Email is required")
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const invoiceSchema = z.object({
    client: z.string().min(1, 'Client is required'),
    code: z.string().min(1, "Client code is required"),
    total: z.number().min(1, 'There are no products selected'),
    paymentCondition: z.string().min(1, 'Payment condition is required')
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

export const invoiceLineSchema = z.object({
    product: z.int().min(1, 'Product is required'),
    quantity: z.coerce.number<number>().min(1, "Quantity is required").gte(1, "Quantity must be >= 1")
});

export type InvoiceLineFormData = z.infer<typeof invoiceLineSchema>;