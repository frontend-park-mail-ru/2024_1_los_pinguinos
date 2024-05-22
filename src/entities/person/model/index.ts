export type Person = {
    id: string;
    name: string;
    email: string;
    birthday: string;
    description: string;
    photos: Photo[];
    interests: Interest[];
};

export type Interest = {
    id: string;
    name: string;
};

export type Photo = {
    cell: string;
    url: string | null | unknown;
};
