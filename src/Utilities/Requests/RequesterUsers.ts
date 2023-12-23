import { RequesterBase } from "./RequesterBase";

export class RequesterUser extends RequesterBase {
  route: string;
  constructor() {
    super();
    this.route = "users";
  }
}
