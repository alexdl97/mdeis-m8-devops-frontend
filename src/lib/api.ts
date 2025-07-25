export type DocumentTypeOption = {
    code: string,
    name: string
}

export async function fetchDocumentTypes(): Promise<DocumentTypeOption[]> {
    return new Promise(resolve => setTimeout(() => resolve([
        { code: "CI", name: "Carnet de identidad" },
        { code: "NIT", name: "Número de identificación tributaria" },
        { code: "CEX", name: "Carnet extranjero" },
        { code: "PAS", name: "Pasaporte" },
    ]), 5000))
}