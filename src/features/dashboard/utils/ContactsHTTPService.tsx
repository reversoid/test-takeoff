import axios from "axios";
import { IContact, IContactDTO } from "./types";

export class ContactsService {
  public getContacts() {
    return axios.get<IContact[]>("http://localhost:4444/api/contacts", {headers: {token: localStorage.getItem('token') ?? ''}});
  }

  public updateContact(data: { id: number; newData: IContactDTO }) {
    return axios.put<IContact>(`http://localhost:4444/api/contacts/${data.id}`, data.newData);
  }

  public removeContact(id: number) {
    return axios.delete(`http://localhost:4444/api/contacts/${id}`);
  }

  public addContact(data: IContactDTO) {
    return axios.post(`http://localhost:4444/api/contacts/`, data);
  }
}
