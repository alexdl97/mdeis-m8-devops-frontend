import React from "react"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { NavItem } from "./NavItem"

export function SideNav(): React.JSX.Element {
    const location = useLocation()

    return (
        <Box
            sx={{
                '--SideNav-background': 'var(--mui-palette-neutral-950)',
                '--SideNav-color': 'var(--mui-palette-common-white)',
                '--NavItem-color': 'var(--mui-palette-neutral-300)',
                '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
                '--NavItem-active-background': 'var(--mui-palette-primary-main)',
                '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
                '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
                '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
                '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
                '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
                bgcolor: 'var(--SideNav-background)',
                color: 'var(--SideNav-color)',
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column',
                height: '100%',
                left: 0,
                maxWidth: '100%',
                position: 'fixed',
                scrollbarWidth: 'none',
                top: 0,
                width: 'var(--SideNav-width)',
                zIndex: 'var(--SideNav-zIndex)',
                '&::-webkit-scrollbar': { display: 'none' },
            }}
        >
            <Stack spacing={2} sx={{ p: 3 }}>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: 'var(--mui-palette-neutral-950)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                    }}
                >
                    <Box sx={{ flex: '1 1 auto' }}>
                        <Typography color="var(--mui-palette-neutral-400)" variant="body2">
                            BDD
                        </Typography>
                        <Typography color="inherit" variant="subtitle1">
                            Point of sale
                        </Typography>
                    </Box>
                </Box>
            </Stack>
            <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
            <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
                <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                    <NavItem title="Clientes" path="clients" key="clients" icon="users" location={location} />
                    <NavItem title="Factura de ventas" path="invoices" key="invoices" icon="invoice" location={location} />
                </Stack>
            </Box>
        </Box>
    )
}
