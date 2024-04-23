import { sendRequest } from "../../../shared/api";
import { PersonDTO } from "./types";
import { Person } from "../model";
import { normalizePerson } from "../lib/normalizePerson";

export const getCards = async (): Promise<Person[]> => {
    const cards = await sendRequest<PersonDTO[]>("GET", "/cards");
    return cards.map(normalizePerson);
};