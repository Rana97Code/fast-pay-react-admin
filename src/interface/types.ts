export type SubNavItem = {
    name: string;
    path?: string;
    pro?: boolean;
    new?: boolean;
    subItems?: SubNavItem[];
};

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: SubNavItem[];
};