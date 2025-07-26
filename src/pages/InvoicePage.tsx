import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { InvoiceTable } from "../components/InvoiceTable";
import { InvoiceForm } from "../components/InvoiceForm";

export function InvoicePage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Invoices</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleClickOpen}>
            Add invoice
          </Button>
        </div>
      </Stack>
      <InvoiceTable rowsPerPage={5} />
      <Dialog open={open}>
        <DialogTitle>Create invoice</DialogTitle>
        <DialogContent>
          <InvoiceForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}