
import { Button, DialogActions, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { type InvoiceFormData, invoiceSchema } from "../lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchClients, fetchPaymentConditions, saveInvoice } from "../lib/api";
import type { Client } from "../types/Client";
import type { PaymentCondition } from "../types/PaymentCondition";
import { InvoiceLineForm } from "./InvoiceLineForm";
import type { InvoiceDetail } from "../types/InvoiceDetail";
import { TrashIcon } from "@phosphor-icons/react";

export function InvoiceForm(props: any): React.JSX.Element {
    const { onClose } = props;

    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);
    const [paymentConditions, setPaymentConditions] = useState<PaymentCondition[]>([]);
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);

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

    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm<InvoiceFormData>({
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
        const body = {
            ...data,
            invoiceDetails: invoiceDetails.map(id => ({ ...id, productId: id.product.id }))
        };
        console.log(body);

        saveInvoice(body)
            .then(onClose)
    }

    const handleProductAdd = (data: InvoiceDetail) => {
        const lines = [...invoiceDetails, data];
        setInvoiceDetails(lines)
        updateTotal(lines)
    }

    const handleProductDelete = (index: number) => {
        const lines = [...invoiceDetails]
        lines.splice(index, 1);
        setInvoiceDetails(lines)
        updateTotal(lines)
    }

    const updateTotal = (lines: InvoiceDetail[]) => {
        const total = lines.reduce((ac, a) => a.subtotal + ac, 0);
        setValue("total", total);
    }

    return (
        <Box >
            <Grid component="form" onSubmit={handleSubmit(onSubmit)} noValidate id="invoiceForm" container spacing={1}>
                <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth required margin="dense" size="small"
                        error={!!errors.clientId} >
                        <InputLabel id="clientLabel">Client</InputLabel>
                        <Controller
                            control={control}
                            name="clientId"
                            defaultValue={0}
                            render={({ field }) => (
                                <Select
                                    labelId="clientLabel"
                                    label="Client"
                                    {...field}
                                    disabled={loading}
                                >
                                    <MenuItem value={0}><em>Select...</em></MenuItem>
                                    {clients?.map(dt => (
                                        <MenuItem value={dt.id}>{dt.name}</MenuItem>
                                    ))}

                                </Select>
                            )}
                        />
                        <FormHelperText> {errors.clientId?.message} </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth required margin="dense" size="small"
                        error={!!errors.paymentConditionId} >
                        <InputLabel id="paymentConditionLabel">Payment condition</InputLabel>
                        <Controller
                            control={control}
                            name="paymentConditionId"
                            defaultValue={0}
                            render={({ field }) => (
                                <Select
                                    labelId="paymentConditionLabel"
                                    label="Payment condition"
                                    {...field}
                                    disabled={loading}
                                >
                                    <MenuItem value={0}><em>Select...</em></MenuItem>
                                    {paymentConditions?.map(dt => (
                                        <MenuItem value={dt.id}>{dt.name}</MenuItem>
                                    ))}

                                </Select>
                            )}
                        />
                        <FormHelperText> {errors.paymentConditionId?.message} </FormHelperText>
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
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <InvoiceLineForm onProductAdd={handleProductAdd} />
            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" marginBottom={2}>
                Invoice lines
            </Typography>
            {invoiceDetails.length === 0 ? <Box>Invoice details is empty</Box> : null}
            {invoiceDetails.map((line, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={`${line.product.code} - ${line.product.name}`}
                        secondary={`${line.quantity.toFixed(2)} × Bs. ${line.price.toFixed(2)} = Bs. ${line.subtotal.toFixed(2)}`}
                    />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleProductDelete(index)} >
                        <TrashIcon />
                    </IconButton>
                </ListItem>
            ))}

            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" onClick={handleClose}> Close </Button>
                <Button variant="contained" type="submit" form="invoiceForm">Save invoice</Button>
            </DialogActions>
        </Box >
    )
}