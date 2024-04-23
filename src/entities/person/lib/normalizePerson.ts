import { PersonDTO } from "../api/types";
import { Person } from "../model";

export const normalizePerson = (person: PersonDTO): Person => ({
    id: person.id,
    email: person.email,
    name: person.name,
    birthday: person.birthday,
    description: person.description,
    interests: person.interests,
    photos: person.photos.map(photo => ({
        ceil: photo.ceil,
        url: photo.url,
    })),
})