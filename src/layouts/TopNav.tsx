import { Box, Stack, IconButton, Tooltip, Badge, Avatar } from "@mui/material";
import { ListIcon, MagnifyingGlassIcon, UsersIcon, BellIcon } from "@phosphor-icons/react";
import React from "react";
import { Fragment } from "react/jsx-runtime";

export function TopNav(): React.JSX.Element {
    const [openNav, setOpenNav] = React.useState<boolean>(false);

    return (
        <Fragment>
            <Box
                component="header"
                sx={{
                    borderBottom: '1px solid var(--mui-palette-divider)',
                    backgroundColor: 'var(--mui-palette-background-paper)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 'var(--mui-zIndex-appBa r)',
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
                >
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        <IconButton
                            onClick={(): void => {
                                setOpenNav(true);
                            }}
                            sx={{ display: { lg: 'none' } }}
                        >
                            <ListIcon />
                        </IconButton>
                        <Tooltip title="Search">
                            <IconButton>
                                <MagnifyingGlassIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                        {/* <Tooltip title="Contacts">
                            <IconButton>
                                <UsersIcon />
                            </IconButton>
                        </Tooltip> */}
                        {/* <Tooltip title="Notifications">
                            <Badge badgeContent={4} color="success" variant="dot">
                                <IconButton>
                                    <BellIcon />
                                </IconButton>
                            </Badge>
                        </Tooltip> */}
                        <Avatar
                            //   onClick={userPopover.handleOpen}
                            //   ref={userPopover.anchorRef}
                            src="/assets/avatar.png"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Stack>
                </Stack>
            </Box>
            {/* <MobileNav
                onClose={() => {
                    setOpenNav(false);
                }}
                open={openNav}
            /> */}
        </Fragment>
    );
}