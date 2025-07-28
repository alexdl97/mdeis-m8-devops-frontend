import { Box, Container, GlobalStyles } from "@mui/material"
import { TopNav } from "./TopNav"
import { SideNav } from "./SideNav"
import { SnackbarProvider } from "notistack"

const drawerWidth = 240

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {

    return (
        <Box>
            <SnackbarProvider maxSnack={3} autoHideDuration={10000} key={"snackbar"}>
                <GlobalStyles
                    styles={{
                        body: {
                            '--MainNav-height': '56px',
                            '--MainNav-zIndex': 1000,
                            '--SideNav-width': '280px',
                            '--SideNav-zIndex': 1100,
                            '--MobileNav-width': '320px',
                            '--MobileNav-zIndex': 1100,
                        },
                    }}
                />
                <Box sx={{
                    bgcolor: 'var(--mui-palette-background-default)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '100%',
                }}>
                    <SideNav />
                    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
                        <TopNav />
                        <main>
                            <Container maxWidth="xl" sx={{ py: '64px' }}>
                                {children}
                            </Container>
                        </main>
                    </Box>
                </Box>
            </SnackbarProvider>
        </Box>)
}