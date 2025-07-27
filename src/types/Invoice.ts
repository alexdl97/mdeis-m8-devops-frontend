import type { Client } from "./Client";
import type { InvoiceDetail } from "./InvoiceDetail";


export type Invoice = {
    id: number;
    client: Client;
    total: number;
    invoiceDetail: InvoiceDetail[];
};
