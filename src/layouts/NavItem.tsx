import { Box, Typography } from "@mui/material";
import { ChartPieIcon, UserIcon, UsersIcon, InvoiceIcon, type Icon } from "@phosphor-icons/react";
import { NavLink, type Location } from "react-router-dom";

const navIcons = {
    'chart-pie': ChartPieIcon,
    user: UserIcon,
    users: UsersIcon,
    'invoice': InvoiceIcon
} as Record<string, Icon>;

interface NavItemProps {
    disabled?: boolean;
    icon?: string;
    location: Location;
    title?: string;
    path: string;
}

export function NavItem({ disabled, icon, location, title, path }: NavItemProps): React.JSX.Element {
    const Icon = icon ? navIcons[icon] : null;
    const active = location.pathname?.includes(path) ?? false;

    return (
        <li>
            <Box
                {...(path
                    ? {
                        component: NavLink,
                        path,
                        to: path
                    }
                    : { role: 'button' })}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    color: 'var(--NavItem-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    flex: '0 0 auto',
                    gap: 1,
                    p: '6px 16px',
                    position: 'relative',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    ...(disabled && {
                        bgcolor: 'var(--NavItem-disabled-background)',
                        color: 'var(--NavItem-disabled-color)',
                        cursor: 'not-allowed',
                    }),
                    ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
                }}
            >
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
                    {Icon ? (
                        <Icon
                            fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
                            fontSize="var(--icon-fontSize-md)"
                            weight={active ? 'fill' : undefined}
                        />
                    ) : null}
                </Box>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography
                        component="span"
                        sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </li>
    );
}
