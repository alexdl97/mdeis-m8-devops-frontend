import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, DialogActions, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { invoiceLineSchema, type InvoiceLineFormData } from "../lib/formSchema";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { fetchProducts } from "../lib/api";
import type { InvoiceDetail } from "../types/InvoiceDetail";

export function InvoiceLineForm(props: any): React.JSX.Element {
    const { onProductAdd } = props;

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(() => setProducts([]))
            .finally(() => setLoading(false))
    }, [])

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<InvoiceLineFormData>({
        resolver: zodResolver(invoiceLineSchema),
    })

    const onSubmit = (data: InvoiceLineFormData) => {
        console.log("Submitted", data);
        // onClose();
        const product = products.find(p => p.id === data.product)!;
        const invoiceDetail: InvoiceDetail = {
            price: product.price,
            quantity: data.quantity,
            subtotal: product.price * data.quantity,
            product: product
        }

        console.log(invoiceDetail);
        onProductAdd(invoiceDetail);
        reset();
        // reset({ product: 0, quantity: undefined }, { keepDefaultValues: true });
    }

    return (
        <Box marginY={2} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" marginBottom={2}>
                Product
            </Typography>
            <Grid container spacing={1}>

                <Grid size={{ xs: 12, sm: 9 }}>
                    <FormControl fullWidth required margin="dense" size="small"
                        error={!!errors.product} >
                        <InputLabel id="productLabel">Product</InputLabel>
                        <Controller
                            control={control}
                            name="product"
                            defaultValue={0}
                            render={({ field }) => (
                                <Select
                                    labelId="productLabel"
                                    label="product"
                                    {...field}
                                    disabled={loading}
                                >
                                    <MenuItem value={0}><em>Select...</em></MenuItem>
                                    {products?.map(dt => (
                                        <MenuItem value={dt.id}>{dt.code} - {dt.name} (Bs. {dt.price.toFixed(2)}) </MenuItem>
                                    ))}

                                </Select>
                            )}
                        />
                        <FormHelperText> {errors.product?.message} </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                        fullWidth
                        label="Quantity"
                        margin="dense"
                        size="small"
                        {...register("quantity")}
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                    />
                </Grid>

                <Grid component="div" size={{ xs: 12 }}>
                    <DialogActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="outlined" type="submit">Add product</Button>
                    </DialogActions>
                </Grid>

            </Grid>
        </Box>
    )
}