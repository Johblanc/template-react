import { TPages } from "./Pages.type";

export type TResponse<Data = any, Message = string | string[]> = {
  statusCode: number;
  message: Message;
  data: Data;
  token: string;
  pages: TPages;
};
