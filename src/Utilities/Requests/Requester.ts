import { RequesterContacts } from "./RequesterContact";
import { RequesterUser } from "./RequesterUsers";

export class Requester {
  static users = new RequesterUser() ;
  static contacts = new RequesterContacts() ;
  
}