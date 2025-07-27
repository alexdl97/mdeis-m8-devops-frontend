import type { Client } from "./Client";
import type { InvoiceDetail } from "./InvoiceDetail";
import type { PaymentCondition } from "./PaymentCondition";


export type Invoice = {
    id: number;
    client: Client;
    total: number;
    paymentCondition: PaymentCondition,
    invoiceDetail: InvoiceDetail[];
};
