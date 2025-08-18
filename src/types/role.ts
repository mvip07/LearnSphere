export interface Permission {
    id: string;
    name: string;
    path: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePermission {
    name: string;
    path: string;
}

export interface Role {
    id: string;
    name: string;
    permissions: Permission[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateRole {
    name: string;
    permissions: string[];
}

export interface EditPermission {
    id: string;
    permissions: string[];
}