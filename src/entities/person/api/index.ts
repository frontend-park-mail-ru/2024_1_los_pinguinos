import { sendRequest } from "../../../shared/api";
import { PersonDTO } from "./types";
import { Person } from "../model";
import { normalizePerson } from "../lib/normalizePerson";
import { API_URL } from "../../../shared/config";

export const getCards = async (): Promise<Person[]> => {
    const cards = await sendRequest<PersonDTO[]>(API_URL, '/cards', 'GET');
    return cards.map(normalizePerson);
};

export const getMatches = async (): Promise<Person[]> => {
    const matches = await sendRequest<PersonDTO[]>(API_URL, `/matches`, 'GET');
    return matches.map(normalizePerson);
}

export const getProfile = async (): Promise<Person> => {
    const profile = await sendRequest<PersonDTO>(API_URL, `/profile`, 'GET');
    return normalizePerson(profile);
}