import axios from "axios";
import { IContact } from "./types";

export class HttpService {
    public getContacts() {
        return axios.get<IContact[]>('http://localhost:4444/api/contacts');
    }
}