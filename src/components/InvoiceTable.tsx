import { Card, Box, Table, TableHead, TableRow, TableCell, TableBody, Divider, TablePagination } from "@mui/material";
import { useState } from "react";
import type { Invoice } from "../types/Invoice";

function noop(): void {
    // do nothing
}

interface InvoiceTableProps {
    count?: number;
    page?: number;
    rows?: Invoice[],
    rowsPerPage?: number;
}

export function InvoiceTable(props: InvoiceTableProps): React.JSX.Element {
    const { count = 0, rows = [], page = 0 } = props;

    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell> ID </TableCell>
                            <TableCell> Client </TableCell>
                            <TableCell> Payment condition </TableCell>
                            <TableCell align="right"> Total (Bs.) </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0
                            ? (<TableRow sx={{ textAlign: "center" }}>
                                <TableCell colSpan={5} align="center">
                                    Invoice list is empty
                                </TableCell>
                            </TableRow>)
                            : null}
                        {rows.map(invoice => (
                            <TableRow key={invoice.id}>
                                <TableCell> {invoice.client.id} </TableCell>
                                <TableCell> {invoice.client.name} </TableCell>
                                <TableCell> {invoice.paymentCondition.name} </TableCell>
                                <TableCell align="right"> {invoice.total.toFixed(2)} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    )
}