# AutoPromote to Admin

## RequesterRoles

new ```src\Utilities\Requests\RequesterRoles.ts``` :

```ts
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
```

## Requester

update ```src\Utilities\Requests\Requester.ts``` :

```ts
/* ... */
import { RequesterRoles } from "./RequesterRoles";

export class Requester {
  /* ... */
  static roles = new RequesterRoles() ;
}
```

## scss section-auto-promote

new ```src\Style\F_Customs\Section.AutoPromote.scss``` :

```scss
.section-auto-promote {
  >div {
    @include get-padding("xl");

    &.auto-promote-entry {
      input {
        @include get-margin("md", "t");
        @include get-width("100");
      }
    }

    &.auto-promote-actions {
      @include get-flex("xsev");

      >* {
        @include get-padding("xl","x");
      }
    }
  }
}
```

## scss import

update ```src\Style\F_Customs\Import.scss``` :

```scss
/* ... */
@import './Section.AutoPromote.scss';
```

## AutoPromote

new ```src\Admin\AutoPromote.tsx``` :

```ts
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { Outlet } from "react-router-dom";
import { StringEntry } from "../Forms/String/StringEntry";
import { Link } from "react-router-dom";
import { Requester } from "../Utilities/Requests/Requester";
import { TokenContext } from "../Context/TokenContext";

export function AutoPromote() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const [body, setBody] = useState({ promote_word: "" });

  if (user.role?.acces_level === 2) {
    return <Outlet />;
  }

  const handlePromote = async () => {
    const response = await Requester.roles.autoPromote(body, token);
    if (response.data) {
      setUser(response.data);
    }
    if (response.token) {
      setToken(response.token);
    }
  };

  return (
    <section className="section-auto-promote">
      <h3>Vous n'êtes pas administrateur du site</h3>

      <StringEntry
        idName={"admin-password"}
        className="auto-promote-entry"
        labelContent={"Mot de passe administrateur"}
        value={body.promote_word}
        setValue={(val) => setBody({ promote_word: val || "" })}
        isPass
      />
      <div className="auto-promote-actions">
        <Link className={"button"} to={"/"}>
          {"Retour"}
        </Link>
        <button onClick={handlePromote}>{"Valider"}</button>
      </div>
    </section>
  );
}
```

## ROUTER

update ```src\App\Router.tsx``` :

```ts
/* ... */
import { AutoPromote } from "../Admin/AutoPromote";

export const ROUTER = createBrowserRouter([
  {
    /* ... */
    children: [
      /* ... */
      {
        path: "admin",
        element : <AutoPromote/>,
        children: [/* ... */],
      },
    ],
  },
]);
```


