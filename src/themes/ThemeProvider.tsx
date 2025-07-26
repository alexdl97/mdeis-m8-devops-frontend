
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { createTheme } from "./createTheme";

export interface ThemeProviderProps {
    children: React.ReactNode;
}

function CustomThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
    const theme = createTheme();

    return (
        <ThemeProvider disableTransitionOnChange theme={theme} defaultMode="light">
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export { CustomThemeProvider as ThemeProvider }