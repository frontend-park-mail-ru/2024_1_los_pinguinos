import { Interest, Photo } from '../model';

export type PersonDTO = {
    id: string;
    name: string;
    birthday: string;
    email: string;
    description: string;
    photos: Photo[];
    interests: Interest[];
    premium: boolean;
    premiumExpires: number;
};
