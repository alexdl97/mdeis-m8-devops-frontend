import { Controller, useForm } from "react-hook-form";
import { clientSchema, type ClientFormData } from "../lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchDocumentTypes, saveClient } from "../lib/api";
import type { DocumentType } from "../types/DocumentType";
import { useSnackbar } from "notistack";

interface ClientForm {
  onClose: () => void;
}

// TODO: Add Props class
export function ClientForm(props: ClientForm) {
  const { onClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>();

  useEffect(() => {
    fetchDocumentTypes()
      .then(setDocumentTypes)
      .catch(() => setDocumentTypes([]))
      .finally(() => setLoading(false));
  }, []);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: ClientFormData) => {
    saveClient(data)
      .then(() => {
        onClose();
        enqueueSnackbar("Cliente ha sido registrado exitosamente", {
          variant: "success",
        });
      })
      .catch(() =>
        enqueueSnackbar("Hubo un error al registrar el cliente", {
          variant: "error",
        })
      );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <TextField
            id="code"
            fullWidth
            label="Código"
            margin="dense"
            size="small"
            {...register("code")}
            error={!!errors.code}
            helperText={errors.code?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            id="name"
            fullWidth
            label="Nombre"
            margin="dense"
            size="small"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            id="documentNumber"
            fullWidth
            label="Nro. CI/NIT"
            margin="dense"
            size="small"
            {...register("documentNumber")}
            error={!!errors.documentNumber}
            helperText={errors.documentNumber?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl
            fullWidth
            required
            margin="dense"
            size="small"
            error={!!errors.documentTypeId}
          >
            <InputLabel id="documentTypeLabel">Tipo documento</InputLabel>
            <Controller
              control={control}
              name="documentTypeId"
              defaultValue={0}
              render={({ field }) => (
                <Select
                  id="documentType"
                  labelId="documentTypeLabel"
                  label="Tipo documento"
                  {...field}
                  disabled={loading}
                >
                  <MenuItem value={0}>
                    <em>Seleccionar...</em>
                  </MenuItem>
                  {documentTypes?.map((dt) => (
                    <MenuItem value={dt.id}>{dt.name}</MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText> {errors.documentTypeId?.message} </FormHelperText>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            id="email"
            fullWidth
            label="Email"
            margin="dense"
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button variant="text" onClick={handleClose}>
          {" "}
          Cerrar{" "}
        </Button>
        <Button variant="contained" type="submit" id="saveButton">
          Guardar
        </Button>
      </DialogActions>
    </Box>
  );
}
