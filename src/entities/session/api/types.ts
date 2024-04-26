import { Person } from "../../person/model";

export type SessionResponse = Person & {
    csrft: string;
};