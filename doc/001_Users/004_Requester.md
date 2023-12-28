# Requester

Pour toutes les demande à l'API

## Environnement 

Ajout ```.env``` dans ```.gitignore```

new ```.env```

```ts
REACT_APP_API_URL = 'http://XXX.XXX.X.XX:8000/api'
```



## RequestMethods

new ```src/Utilities/Requests/RequestMethods.enum.ts```

```ts
export enum RequestMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

```

## RequesterBase

new ```src/Utilities/Requests/RequesterBase.ts```

```ts
import { TResponse } from "../../Types/Response.type";
import { RequestMethods } from "./RequestMethods.enum";

export class RequesterBase {
  static async base<
    TData = any,
    TMessage = string | string[],
    TQuerry extends Object = Object
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
    querry: TQuerry | undefined = undefined
  ): Promise<TResponse<TData, TMessage>> {
    let querryStr = "";
    if (querry !== undefined) {
      querryStr = `?${Object.keys(querry)
        .map((key) => `${key}=${querry[key as keyof typeof querry]}`)
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
        )}${querryStr}`,
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
        )}${querryStr}`,
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
```

## RequesterUser

new ```src/Utilities/Requests/RequesterUsers.ts```

```ts
import { RequesterBase } from "./RequesterBase";

export class RequesterUser extends RequesterBase {
  route: string;
  constructor() {
    super();
    this.route = "users";
  }
}
```

## Requester

new ```src/Utilities/Requests/Requester.ts```

```ts
import { RequesterUser } from "./RequesterUsers";

export class Requester {
  static users = new RequesterUser() ;
  
}
```