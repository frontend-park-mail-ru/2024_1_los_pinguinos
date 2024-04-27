import { sendRequest } from "../../../shared/api";
import { PersonDTO } from "./types";
import { Person } from "../model";
import { normalizePerson } from "../lib/normalizePerson";

export const getCards = async (): Promise<Person[]> => {
    const cards = await sendRequest<PersonDTO[]>('/cards', 'GET');
    return cards.map(normalizePerson);
};

export const getMatches = async (): Promise<Person[]> => {
    const matches = await sendRequest<PersonDTO[]>(`/matches`, 'GET');
    return matches.map(normalizePerson);
}

export const getProfile = async (): Promise<Person> => {
    const profile = await sendRequest<PersonDTO>(`/profile`, 'GET');
    return normalizePerson(profile);
}