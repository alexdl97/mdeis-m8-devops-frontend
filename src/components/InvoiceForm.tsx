import {
  Button,
  DialogActions,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
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
import { useSnackbar } from "notistack";

export function InvoiceForm(props: any): React.JSX.Element {
  const { onClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [paymentConditions, setPaymentConditions] = useState<
    PaymentCondition[]
  >([]);
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetail[]>([]);

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .catch(() => setClients([]))
      .finally(() => setLoading(false));

    fetchPaymentConditions()
      .then(setPaymentConditions)
      .catch(() => setPaymentConditions([]))
      .finally(() => setLoading(false));
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      total: 0,
    },
  });

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: InvoiceFormData) => {
    const body = {
      ...data,
      invoiceDetails: invoiceDetails.map((id) => ({
        ...id,
        productId: id.product.id,
      })),
    };

    saveInvoice(body)
      .then(() => {
        enqueueSnackbar("Factura de venta ha sido registrado exitosamente", {
          variant: "success",
        });
        onClose();
      })
      .catch(() =>
        enqueueSnackbar("Hubo un error al registrar la factura", {
          variant: "error",
        })
      );
  };

  const handleProductAdd = (data: InvoiceDetail) => {
    const lines = [...invoiceDetails, data];
    setInvoiceDetails(lines);
    updateTotal(lines);
  };

  const handleProductDelete = (index: number) => {
    const lines = [...invoiceDetails];
    lines.splice(index, 1);
    setInvoiceDetails(lines);
    updateTotal(lines);
  };

  const updateTotal = (lines: InvoiceDetail[]) => {
    const total = lines.reduce((ac, a) => a.subtotal + ac, 0);
    setValue("total", total);
  };

  return (
    <Box>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        id="invoiceForm"
        container
        spacing={1}
      >
        <Grid size={{ xs: 12 }}>
          <FormControl
            fullWidth
            required
            margin="dense"
            size="small"
            error={!!errors.clientId}
          >
            <InputLabel id="clientLabel">Cliente</InputLabel>
            <Controller
              control={control}
              name="clientId"
              defaultValue={0}
              render={({ field }) => (
                <Select
                  id="selectClient"
                  labelId="clientLabel"
                  label="Cliente"
                  {...field}
                  disabled={loading}
                >
                  <MenuItem value={0}>
                    <em>Seleccionar...</em>
                  </MenuItem>
                  {clients?.map((dt) => (
                    <MenuItem id={`clientItem-${dt.id}`} value={dt.id}>
                      {dt.code} - {dt.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText> {errors.clientId?.message} </FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControl
            fullWidth
            required
            margin="dense"
            size="small"
            error={!!errors.paymentConditionId}
          >
            <InputLabel id="paymentConditionLabel">
              Condición de pago
            </InputLabel>
            <Controller
              control={control}
              name="paymentConditionId"
              defaultValue={0}
              render={({ field }) => (
                <Select
                  id="selectPaymentCondition"
                  labelId="paymentConditionLabel"
                  label="Condición de pago"
                  {...field}
                  disabled={loading}
                >
                  <MenuItem value={0}>
                    <em>Seleccionar...</em>
                  </MenuItem>
                  {paymentConditions?.map((dt) => (
                    <MenuItem
                      id={`paymentConditionItem-${dt.id}`}
                      value={dt.id}
                    >
                      {dt.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>
              {" "}
              {errors.paymentConditionId?.message}{" "}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            id="totalInput"
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
        Detalle de factura
      </Typography>
      {invoiceDetails.length === 0 ? <Box>Detalle de factura vacío</Box> : null}
      {invoiceDetails.map((line, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`${line.product.code} - ${line.product.name}`}
            secondary={`${line.quantity.toFixed(2)} × Bs. ${line.price.toFixed(
              2
            )} = Bs. ${line.subtotal.toFixed(2)}`}
          />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleProductDelete(index)}
          >
            <TrashIcon />
          </IconButton>
        </ListItem>
      ))}

      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="text" onClick={handleClose}>
          {" "}
          Cerrar{" "}
        </Button>
        <Button
          id="saveInvoiceButton"
          variant="contained"
          type="submit"
          form="invoiceForm"
        >
          Guardar
        </Button>
      </DialogActions>
    </Box>
  );
}
