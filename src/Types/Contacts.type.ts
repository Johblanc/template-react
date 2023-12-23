import { TUser } from "./User.type";

export type TContacts = {
  wait_for: TUser[];
  wait_you: TUser[];
  friends: TUser[];
  banned: TUser[];
  banned_you: TUser[];
};
