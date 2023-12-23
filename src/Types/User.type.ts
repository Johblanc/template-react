import { TContacts } from "./Contacts.type";
import { TImage } from "./Image.type";
import { TRole } from "./Role.type";

export type TUser = {
  id: string;
  pseudo: string;
  image: TImage | null;
  actif_at?: string;
  role?: TRole;
  first_name?: string | null;
  last_name?: string | null;
  mail?: string | null;
  contacts?: TContacts;
};
