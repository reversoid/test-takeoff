import axios from "axios";
import { IContact, IContactDTO } from "./types";

export class ContactsService {
  private authHeaders =  {
    token: localStorage.getItem('token') ?? '',
  }

  public getContacts() {
    return axios.get<IContact[]>("http://localhost:4444/api/contacts", {headers: this.authHeaders});
  }

  public updateContact(data: { id: number; newData: IContactDTO }) {
    return axios.put<IContact>(`http://localhost:4444/api/contacts/${data.id}`, data.newData, {headers: this.authHeaders});
  }

  public removeContact(id: number) {
    return axios.delete(`http://localhost:4444/api/contacts/${id}`, {headers: this.authHeaders});
  }

  public addContact(data: IContactDTO) {
    return axios.post(`http://localhost:4444/api/contacts/`, data, {headers: this.authHeaders});
  }
}
