import { Controller, useForm } from "react-hook-form";
import { clientSchema, type ClientFormData } from "../lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchDocumentTypes, type DocumentTypeOption } from "../lib/api";


export function ClientForm() {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema)
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [documentTypes, setDocumentTypes] = useState<DocumentTypeOption[]>();

    useEffect(() => {
        fetchDocumentTypes()
            .then(setDocumentTypes)
            .catch(() => setDocumentTypes([]))
            .finally(() => setLoading(false));
    }, []);

    const onDocumentTypeChange = (event: SelectChangeEvent) => {
        // setDocumentTypes(event.target.value);
    }

    const onSubmit = (data: ClientFormData) => {
        console.log("Submitted", data);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Card variant="outlined">
                <CardHeader
                    title="Create client"
                    subheader="Enter the client data"
                    sx={{
                        textAlign: "start"
                    }}
                />
                <Divider />
                <CardContent>
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
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            labelId="documentTypeLabel"
                                            label="Document type"
                                            {...field}
                                            disabled={loading}
                                            endAdornment={loading 
                                                ? <CircularProgress />
                                                : null
                                            }
                                        >
                                            <MenuItem value=""><em>Select...</em></MenuItem>
                                            {documentTypes?.map(dt => (
                                                <MenuItem value={dt.code}>{dt.name}</MenuItem>
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
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="text" > Close </Button>
                    <Button variant="contained" type="submit">Save client</Button>
                </CardActions>
            </Card>
        </Box>
    );
}