import { Route, Routes } from "react-router-dom";
import { ClientPage } from "../pages/ClientPage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ClientPage />} />
        </Routes>
    )
}