import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import { ClientForm } from "../components/ClientForm"
import { useEffect, useState } from "react"
import { PlusIcon } from "@phosphor-icons/react"
import { ClientTable } from "../components/ClientTable"
import type { Client } from "../types/Client"
import { fetchClients } from "../lib/api"

export function ClientPage() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    getClients()
  }, [])

  const getClients = () => {
    fetchClients()
      .then(setClients)
      .catch(() => setClients([]))
      .finally(() => setLoading(false))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    getClients()
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Clientes</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={handleClickOpen} id="clientFormButton">
            Registrar cliente
          </Button>
        </div>
      </Stack>
      <ClientTable rowsPerPage={5} rows={clients} />
      <Dialog open={open}>
        <DialogTitle>Registrar cliente</DialogTitle>
        <DialogContent>
          <ClientForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Stack>
  )
}