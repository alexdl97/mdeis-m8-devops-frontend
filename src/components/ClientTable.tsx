import { Box, Card, Divider, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";

function noop(): void {
    // do nothing
}

export interface Client {
    id: number,
    name: string,
    documentNumber: number,
    documentType: string,
    email: string,
}

interface ClientTableProps {
    count?: number;
    page?: number;
    rows?: Client[],
    rowsPerPage?: number;
}

export function ClientTable(
    { count = 0, rows = [], page = 0 }: ClientTableProps
): React.JSX.Element {


    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell> Code </TableCell>
                            <TableCell> Name </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell> Document type </TableCell>
                            <TableCell> Document number </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell> CL0001 </TableCell>
                            <TableCell> Genaro Alvarez </TableCell>
                            <TableCell> genaruto@gmail.com </TableCell>
                            <TableCell> CI </TableCell>
                            <TableCell> 10001010 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> CL0001 </TableCell>
                            <TableCell> Genaro Alvarez </TableCell>
                            <TableCell> genaruto@gmail.com </TableCell>
                            <TableCell> CI </TableCell>
                            <TableCell> 10001010 </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> CL0001 </TableCell>
                            <TableCell> Genaro Alvarez </TableCell>
                            <TableCell> genaruto@gmail.com </TableCell>
                            <TableCell> CI </TableCell>
                            <TableCell> 10001010 </TableCell>
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
    );
}