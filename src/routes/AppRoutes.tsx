import { Navigate, Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/ClientPage";
import { Layout } from "../layouts/Layout";
import { InvoicePage } from "../pages/InvoicePage";

export function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/clients" element={<ClientPage />} />
                <Route path="/invoices" element={<InvoicePage />} />
                <Route path="*" element={<Navigate to="/clients" replace />} />
            </Routes>
        </Layout>
    )
}