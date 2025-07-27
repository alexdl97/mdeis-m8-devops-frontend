import { Controller, useForm } from "react-hook-form";
import { clientSchema, type ClientFormData } from "../lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, DialogActions, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchDocumentTypes } from "../lib/api";
import type { DocumentType } from "../types/DocumentType";

interface ClientForm {
    onClose: () => void
}


// TODO: Add Props class    
export function ClientForm(props: ClientForm) {
    const { onClose } = props;
    
    const { register, handleSubmit, control, formState: { errors } } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema)
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>();

    useEffect(() => {
        fetchDocumentTypes()
            .then(setDocumentTypes)
            .catch(() => setDocumentTypes([]))
            .finally(() => setLoading(false));
    }, []);

    const onDocumentTypeChange = (event: SelectChangeEvent) => {
        // setDocumentTypes(event.target.value);
    }

    const handleClose = () => {
        onClose();
    }

    const onSubmit = (data: ClientFormData) => {
        console.log("Submitted", data);
        onClose();
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={1}>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Code"
                        margin="dense"
                        size="small"
                        {...register("code")}
                        error={!!errors.code}
                        helperText={errors.code?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="dense"
                        size="small"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Document number"
                        margin="dense"
                        size="small"
                        {...register("documentNumber")}
                        error={!!errors.documentNumber}
                        helperText={errors.documentNumber?.message}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required margin="dense" size="small"
                        error={!!errors.documentType}>
                        <InputLabel id="documentTypeLabel">Document type</InputLabel>
                        <Controller
                            control={control}
                            name="documentType"
                            defaultValue={0}
                            render={({ field }) => (
                                <Select
                                    labelId="documentTypeLabel"
                                    label="Document type"
                                    {...field}
                                    disabled={loading}
                                >
                                    <MenuItem value={0}><em>Select...</em></MenuItem>
                                    {documentTypes?.map(dt => (
                                        <MenuItem value={dt.id}>{dt.name}</MenuItem>
                                    ))}

                                </Select>
                            )}
                        />
                        <FormHelperText> {errors.documentType?.message} </FormHelperText>
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
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
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="text" onClick={handleClose}> Close </Button>
                <Button variant="contained" type="submit">Save client</Button>
            </DialogActions>
        </Box>
    );
}