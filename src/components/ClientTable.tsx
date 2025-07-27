import { Box, Card, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useState } from "react"
import type { Client } from "../types/Client"

function noop(): void {
    // do nothing
}
interface ClientTableProps {
    count?: number
    page?: number
    rows?: Client[],
    rowsPerPage?: number
}

export function ClientTable(props: ClientTableProps): React.JSX.Element {
    const { count = 0, rows = [], page = 0 } = props
    const [rowsPerPage, setRowsPerPage] = useState(5)

    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell> Código </TableCell>
                            <TableCell> Nombre </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell> Tipo documento </TableCell>
                            <TableCell> Número de documento </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0
                            ? (<TableRow sx={{ textAlign: "center" }}>
                                <TableCell colSpan={5} align="center">
                                    Lista de cliente está vacía
                                </TableCell>
                            </TableRow>)
                            : null}
                        {rows.map(client => (
                            <TableRow key={client.id}>
                                <TableCell> {client.code} </TableCell>
                                <TableCell> {client.name} </TableCell>
                                <TableCell> {client.email} </TableCell>
                                <TableCell> {client.documentType.name} </TableCell>
                                <TableCell> {client.documentNumber} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    )
}