import { Card, Box, Table, TableHead, TableRow, TableCell, TableBody, Divider, TablePagination } from "@mui/material";
import { useState } from "react";

function noop(): void {
    // do nothing
}

interface Invoice {

}

interface InvoiceTableProps {
    count?: number;
    page?: number;
    rows?: Invoice[],
    rowsPerPage?: number;
}

export function InvoiceTable(
    { count = 0, rows = [], page = 0 }: InvoiceTableProps
): React.JSX.Element {
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
                            <TableCell> Total (Bs.) </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell> 1 </TableCell>
                            <TableCell> Genaro Alvarez </TableCell>
                            <TableCell> Cash on delivery </TableCell>
                            <TableCell sx={{ textAlign: "end" }}> 1500.00 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 2 </TableCell>
                            <TableCell> Pedro Gutierrez </TableCell>
                            <TableCell> Cash on delivery </TableCell>
                            <TableCell sx={{ textAlign: "end" }}> 1500.00 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> 3 </TableCell>
                            <TableCell> Genaro Alvarez </TableCell>
                            <TableCell> Cash on delivery </TableCell>
                            <TableCell sx={{ textAlign: "end" }}> 1500.00 </TableCell>
                        </TableRow>
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