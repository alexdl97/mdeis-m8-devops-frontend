import { Button, DialogActions, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { type InvoiceFormData, invoiceSchema } from "../lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Client } from "./ClientTable";
import { fetchClients, fetchPaymentConditions, type PaymentCondition } from "../lib/api";

export function InvoiceForm(props: any): React.JSX.Element {
    const { onClose } = props;

    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);
    const [products, setProducts] = useState([]);
    const [paymentConditions, setPaymentConditions] = useState<PaymentCondition[]>([]);

    useEffect(() => {
        fetchClients()
            .then(setClients)
            .catch(() => setClients([]))
            .finally(() => setLoading(false))

        fetchPaymentConditions()
            .then(setPaymentConditions)
            .catch(() => setPaymentConditions([]))
            .finally(() => setLoading(false))

    }, []);

    const { register, handleSubmit, control, formState: { errors } } = useForm<InvoiceFormData>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            total: 0
        },
    })

    const handleClose = () => {
        onClose();
    }

    const onSubmit = (data: InvoiceFormData) => {
        console.log("Submitted", data);
        onClose();
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={1}>
                <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth required margin="dense" size="small"
                        error={!!errors.client} >
                        <InputLabel id="clientLabel">Client</InputLabel>
                        <Controller
                            control={control}
                            name="client"
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    labelId="clientLabel"
                                    label="Client"
                                    {...field}
                                    disabled={loading}
                                >
                                    <MenuItem value=""><em>Select...</em></MenuItem>
                                    {clients?.map(dt => (
                                        <MenuItem value={dt.id}>{dt.name}</MenuItem>
                                    ))}

                                </Select>
                            )}
                        />
                        <FormHelperText> {errors.client?.message} </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth required margin="dense" size="small"
                        error={!!errors.paymentCondition} >
                        <InputLabel id="paymentConditionLabel">Payment Condition</InputLabel>
                        <Controller
                            control={control}
                            name="paymentCondition"
                            defaultValue=""
                            render={({ field }) => (
                                <Select
                                    labelId="paymentConditionLabel"
                                    label="Payment Condition"
                                    {...field}
                                    disabled={loading}
                                >
                                    <MenuItem value=""><em>Select...</em></MenuItem>
                                    {paymentConditions?.map(dt => (
                                        <MenuItem value={dt.code}>{dt.name}</MenuItem>
                                    ))}

                                </Select>
                            )}
                        />
                        <FormHelperText> {errors.paymentCondition?.message} </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Total (Bs.)"
                        margin="dense"
                        size="small"
                        {...register("total")}
                        error={!!errors.total}
                        helperText={errors.total?.message}
                        disabled
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Divider sx={{ marginBottom: 1 }} />

                    <Typography variant="h6" >
                        Producto
                    </Typography>


                    <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

                    <Typography variant="h6" >
                        Detalle de factura
                    </Typography>

                </Grid>
            </Grid>
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" onClick={handleClose}> Close </Button>
                <Button variant="contained" type="submit">Save invoice</Button>
            </DialogActions>
        </Box>
    )
}