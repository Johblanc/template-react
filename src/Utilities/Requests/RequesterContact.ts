import { TResponse } from "../../Types/Response.type";
import { TUser } from "../../Types/User.type";
import { RequestMethods } from "./RequestMethods.enum";
import { RequesterBase } from "./RequesterBase";

export class RequesterContacts extends RequesterBase {
  route: string;
  constructor() {
    super();
    this.route = "contacts";
  }

  async asking(id : string, token : string): Promise<TResponse<TUser>> {
    const response = await RequesterContacts.base<TUser>(
      `${this.route}/asking`,
      RequestMethods.PATCH,
      [id],
      undefined,
      token
    );
    return response;
  }
  async refuse(id : string, token : string): Promise<TResponse<TUser>> {
    const response = await RequesterContacts.base<TUser>(
      `${this.route}/refuse`,
      RequestMethods.PATCH,
      [id],
      undefined,
      token
    );
    return response;
  }
  async ban(id : string, token : string): Promise<TResponse<TUser>> {
    const response = await RequesterContacts.base<TUser>(
      `${this.route}/ban`,
      RequestMethods.PATCH,
      [id],
      undefined,
      token
    );
    return response;
  }
}
