export interface Category {
    id: string;
    image: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    editImage?: File | string;
}

export interface CreateCategory {
    title: string;
    image: File | string;
}