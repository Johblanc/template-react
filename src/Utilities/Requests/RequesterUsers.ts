import { TResponse } from "../../Types/Response.type";
import { TUser } from "../../Types/User.type";
import { RequestMethods } from "./RequestMethods.enum";
import { RequesterBase } from "./RequesterBase";

export class RequesterUser extends RequesterBase {
  route: string;
  constructor() {
    super();
    this.route = "users";
  }

  async register(body: {
    pseudo: string;
    password: string;
  }): Promise<TResponse<TUser>> {
    const response = await RequesterUser.base<TUser>(
      `${this.route}/register`,
      RequestMethods.POST,
      [],
      body
    );
    return response;
  }

  async logIn(body: {
    pseudo: string;
    password: string;
  }): Promise<TResponse<TUser>> {
    const response = await RequesterUser.base<TUser>(
      `${this.route}/login`,
      RequestMethods.POST,
      [],
      body
    );
    return response;
  }

  async update(
    token : string,
    body: {
      pseudo?: string;
      password?: string;
      first_name?: string;
      last_name?: string;
      mail?: string;
    },
    files? : FileList,
  ): Promise<TResponse<TUser>> {
    const response = await RequesterUser.base<TUser>(
      `${this.route}`,
      RequestMethods.PATCH,
      [],
      body,
      token,
      files ? { key: "image" , value : files } : undefined
    );
    return response;
  }
}
