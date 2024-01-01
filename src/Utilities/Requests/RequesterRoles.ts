import { TResponse } from "../../Types/Response.type";
import { TUser } from "../../Types/User.type";
import { RequestMethods } from "./RequestMethods.enum";
import { RequesterBase } from "./RequesterBase";

export class RequesterRoles extends RequesterBase {
  route: string;
  constructor() {
    super();
    this.route = "roles";
  }

  async autoPromote(body : {promote_word : string}, token : string): Promise<TResponse<TUser>> {
    const response = await RequesterRoles.base<TUser>(
      `${this.route}/promote-to-admin`,
      RequestMethods.PATCH,
      [],
      body,
      token
    );
    return response;
  }
}
