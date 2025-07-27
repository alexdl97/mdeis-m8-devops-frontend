import type { Product } from "./Product";

export type InvoiceDetail = {
    id?: number;
    product: Product;
    price: number;
    quantity: number;
    subtotal: number;
};
