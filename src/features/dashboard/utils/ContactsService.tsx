import axios from "axios";
import { IContact } from "./types";

export class ContactsService {
    public getContacts() {
        return axios.get<IContact[]>('http://localhost:4444/api/contacts');
    }

    public updateContact(data: {id: number, newData: IContact}) {
        return axios.put<IContact[]>('http://localhost:4444/api/contacts', data);
    }

    public removeContact(id: number) {
        return axios.delete(`http://localhost:4444/api/contacts/${id}`);
    }
}