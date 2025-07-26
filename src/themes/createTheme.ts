import type { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import { components } from "./components/components";
import { colorSchemes } from "./colorSchemes";
import { typography } from "./typography";
import { shadows } from "./shadows";

function createCustomTheme(): Theme {
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1440
            }
        },
        typography: typography,
        components: components,
        shape: { borderRadius: 8 },
        colorSchemes: colorSchemes,
        direction: 'ltr',
        shadows: shadows,
        cssVariables: {
            colorSchemeSelector: "class",
        },
    })

    return theme;
}

export { createCustomTheme as createTheme }