import { Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/ClientPage";
import { Layout } from "../layouts/Layout";

export function AppRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/clients" element={<ClientPage />} />
            </Routes>
        </Layout>
    )
}