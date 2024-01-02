import { RequesterApp } from "./RequesterApp";
import { RequesterContacts } from "./RequesterContact";
import { RequesterRoles } from "./RequesterRoles";
import { RequesterUser } from "./RequesterUsers";

export class Requester {
  static app = new RequesterApp() ;
  static users = new RequesterUser() ;
  static contacts = new RequesterContacts() ;
  static roles = new RequesterRoles() ;
  
}