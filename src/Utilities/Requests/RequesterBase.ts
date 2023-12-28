import { TResponse } from "../../Types/Response.type";
import { RequestMethods } from "./RequestMethods.enum";

export class RequesterBase {
  /**
   * Une Requête générique
   *
   * @type `TData`   Le Type de donnée de la réponse
   *
   * @param url         Le complément d'url
   * @param method  ?   La methode html
   * @param params  ?   Les paramètres
   * @param body    ?   Le corps de la Requête
   * @param token   ?   Le token
   * @param files   ?   Les fichiers
   * @param query  ?   La query
   *
   * @returns La réponse à la requête
   */
  static async base<
    TData = any,
    TMessage = string | string[],
    TQuery extends Object = Object
  >(
    url: string,
    method: RequestMethods = RequestMethods.GET,
    params: (string | number)[] = [],
    body: any = undefined,
    token: string | undefined = undefined,
    files:  {
      key :string;
      value : FileList;
    }  | undefined = undefined,
    query: TQuery | undefined = undefined
  ): Promise<TResponse<TData, TMessage>> {
    let queryStr = "";
    if (query !== undefined) {
      queryStr = `?${Object.keys(query)
        .map((key) => `${key}=${query[key as keyof typeof query]}`)
        .join("&")}`;
    }

    if (files) {
      const filesBody = new FormData();
      if (body) {
        for (const [ikey, ivalue] of Object.entries(body)) {
          if (ivalue instanceof Array) {
            ivalue.forEach((item, i) => {
              for (const [jkey, jvalue] of Object.entries(item)) {
                filesBody.append(`${ikey}[${i}][${jkey}]`, String(jvalue));
              }
            });
          } else if (ivalue instanceof Date) {
            filesBody.append(ikey, ivalue.toISOString());
          } else {
            filesBody.append(ikey, String(ivalue));
          }
        }
      }
      for (let i = 0; i < files.value.length; i += 1) {
        const item = files.value.item(i);
        if (item !== null) {
          filesBody.append(files.key, item, item.name);
        }
      }

      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/${url}${params.map(
          (item) => "/" + String(item)
        )}${queryStr}`,
        {
          method: method,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: method !== "GET" ? filesBody : undefined,
        }
      );
      const result: TResponse<TData, TMessage> = await data.json();
      console.log(result.message);

      return result;
    } else {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/${url}${params.map(
          (item) => "/" + String(item)
        )}${queryStr}`,
        {
          method: method,
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json'
          },
          body:
            method !== "GET" || body !== undefined
              ? JSON.stringify(body)
              : undefined,
        }
      );
      const result: TResponse<TData, TMessage> = await data.json();
      console.log(result.message);
      
      return result;
    }
  }
}
