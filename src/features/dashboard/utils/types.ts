export interface IContact {
  id: number;
  name: string;
  email: string;
  phone: string;
}
export interface IContactDTO {
  name: string;
  email: string;
  phone: string;
}
export const enum DialogTypes {
  ADD_USER,
  EDIT_USER,
}
