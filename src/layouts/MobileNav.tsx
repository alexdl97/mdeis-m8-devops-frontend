import type React from "react"
import { Box, Divider, Drawer, Stack, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { NavItem } from "./NavItem"

export interface MobileNavProps {
    onClose?: () => void
    open?: boolean
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
    const location = useLocation()

    return (
        <Drawer
            PaperProps={{
                sx: {
                    '--MobileNav-background': 'var(--mui-palette-neutral-950)',
                    '--MobileNav-color': 'var(--mui-palette-common-white)',
                    '--NavItem-color': 'var(--mui-palette-neutral-300)',
                    '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
                    '--NavItem-active-background': 'var(--mui-palette-primary-main)',
                    '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
                    '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
                    '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
                    '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
                    '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
                    bgcolor: 'var(--MobileNav-background)',
                    color: 'var(--MobileNav-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    scrollbarWidth: 'none',
                    width: 'var(--MobileNav-width)',
                    zIndex: 'var(--MobileNav-zIndex)',
                    '&::-webkit-scrollbar': { display: 'none' },
                }
            }}
            onClose={onClose}
            open={open}
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
        </Drawer>
    )
}