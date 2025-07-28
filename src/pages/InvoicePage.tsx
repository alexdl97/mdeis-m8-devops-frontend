import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { InvoiceTable } from "../components/InvoiceTable";
import { InvoiceForm } from "../components/InvoiceForm";
import type { Invoice } from "../types/Invoice";
import { fetchInvoices } from "../lib/api";

export function InvoicePage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = () => {
    fetchInvoices()
      .then(setInvoices)
      .catch(() => setInvoices([]))
      .finally(() => setLoading(false));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getInvoices();
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Facturas</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleClickOpen}
            id="invoiceFormButton"
          >
            Registrar factura de venta
          </Button>
        </div>
      </Stack>
      <InvoiceTable rowsPerPage={5} rows={invoices} />
      <Dialog open={open}>
        <DialogTitle>Registrar factura de venta</DialogTitle>
        <DialogContent>
          <InvoiceForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
