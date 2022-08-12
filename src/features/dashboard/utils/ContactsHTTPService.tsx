import axios from "axios";
import { IContact, IContactDTO } from "./types";

export class ContactsService {
  public getContacts(token: string) {
    return axios.get<IContact[]>("http://localhost:4444/api/contacts", {
      headers: { token },
    });
  }

  public updateContact(
    data: { id: number; newData: IContactDTO },
    token: string
  ) {
    return axios.put<IContact>(
      `http://localhost:4444/api/contacts/${data.id}`,
      data.newData,
      { headers: { token } }
    );
  }

  public removeContact(id: number, token: string) {
    return axios.delete(`http://localhost:4444/api/contacts/${id}`, {
      headers: { token },
    });
  }

  public addContact(data: IContactDTO, token: string) {
    return axios.post(`http://localhost:4444/api/contacts/`, data, {
      headers: { token },
    });
  }
}
