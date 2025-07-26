import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { ClientForm } from "../components/ClientForm";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { ClientTable } from "../components/ClientTable";

export function ClientPage() {

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
          <Typography variant="h4">Clients</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleClickOpen}>
            Add client
          </Button>
        </div>
      </Stack>
      <ClientTable rowsPerPage={5} />
      <Dialog open={open}>
        <DialogTitle>Create client</DialogTitle>
        <DialogContent>
          <ClientForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}