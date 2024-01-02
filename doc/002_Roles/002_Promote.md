# Promote User

## scss section-promote

new ```src/Style/F_Customs/Section.Promote.scss``` 

```scss
.section-promote {
  @include get-flex("","","col");

  .search-bar {
    @include get-flex("xsbt","","","wrap");
    >* {
      @include get-padding("xl");
      >div {
        @include get-flex();
        label {
          @include get-margin("md","r");
        }
      }
    }
  }

  .items {
    @include get-padding("md", "x");
    @include get-flex-grow(1);
    table {
      @include get-text-align("c");
      @include get-width("100");
      thead{
        tr {
          >*{
            @include get-padding("sm","x")
          }
          >*:not(:first-child){
            min-width: 10px;
            max-width: 100px;
            width: 100px;
            overflow: hidden;
          }
        }
      }
      tbody {
        tr {
          &:hover {
            @include get-background(2);
          }
          button {
            @include get-padding("no");
            height: 1.6em;
            width: 1.6em;
            transition: all 0.5s;
            padding: 0.05em;
            svg {
              height: 1.4em;
              width: 1.4em;
            }
          }

          svg {
            height: 1.5em;
            width: 1.5em;
          }
        }
      }
    }
  }

  .pages {
    @include get-flex("xsev");
    @include get-padding("md","y");
    button {
      @include get-padding("xl","x");
      @include get-radius("xl");
    }
  }
}
```

## scss import 

update ```src/Style/F_Customs/Import.scss``` 

```scss
/* ... */
@import './Section.Promote.scss';
```

## TSubRole

new ```src/Types/SubRole.type.ts``` 

```ts
export type TSubRole = {
  name : "admin";
  acces_level: 2;
} | {
  name : "user";
  acces_level: 1;
} | {
  name : "visitor";
  acces_level: 0;
};
```

## TUser

update ```src/Types/User.type.ts``` 

```ts
/* ... */
import { TSubRole } from "./SubRole.type";

export type TUser = {
  /* ... */
  sub_roles? : TSubRole[]
};
```

## RequesterRoles

update ```src/Utilities/Requests/RequesterRoles.ts``` 

```ts
/* ... */
export class RequesterRoles extends RequesterBase {
  /* ... */
  async promote(body : {user_id : string, sub_roles : string[]}, token : string): Promise<TResponse<TUser>> {
    const response = await RequesterRoles.base<TUser>(
      `${this.route}`,
      RequestMethods.PATCH,
      [],
      body,
      token
    );
    return response;
  }
}
```

## EPath

update ```src/Icons/Paths.enum.ts``` 

```ts
export enum EPath {
  /* ... */
  SAVE = "m100 100 0-100-100 0 0 95 6 5 16 0 0-33 56 0 0 33 22 0zm-89-92-8 0 0-5 8 0 0 5zm86 0-8 0 0-5 8 0 0 5zm-22 92 0-30-50 0 0 30 50 0zm-28-3-19 0 0-25 19 0 0 25z",
}
```

## RoleRow

new ```src/Admin/Roles/RoleRow.tsx``` 

```ts
import { useContext, useEffect, useState } from "react";
import { CheckableIcon } from "../../Forms/Checkable/CheckableIcon";
import { TUser } from "../../Types/User.type";
import { IconMonoPath } from "../../Icons/IconMonoPath";
import { EPath } from "../../Icons/Paths.enum";
import { Requester } from "../../Utilities/Requests/Requester";
import { TokenContext } from "../../Context/TokenContext";
import { UserContext } from "../../Context/UserContext";

interface IRoleRowProps {
  userItem: TUser;
}
export function RoleRow({ userItem }: IRoleRowProps) {
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);

  const [srcRoles, setSrcRoles] = useState({
    isVisitor:
      userItem.sub_roles?.filter((userItem) => userItem.name === "visitor")
        .length === 1,
    isUser:
      userItem.sub_roles?.filter((userItem) => userItem.name === "user")
        .length === 1,
    isAdmin:
      userItem.sub_roles?.filter((userItem) => userItem.name === "admin")
        .length === 1,
  });
  const [roles, setRoles] = useState({
    isVisitor: srcRoles.isVisitor,
    isUser: srcRoles.isUser,
    isAdmin: srcRoles.isAdmin,
  });

  useEffect(() => {
    const newRoles = {
      isVisitor:
        userItem.sub_roles?.filter((userItem) => userItem.name === "visitor")
          .length === 1,
      isUser:
        userItem.sub_roles?.filter((userItem) => userItem.name === "user")
          .length === 1,
      isAdmin:
        userItem.sub_roles?.filter((userItem) => userItem.name === "admin")
          .length === 1,
    };
    setSrcRoles(newRoles);
    setRoles(newRoles);
  }, [userItem]);

  const handleChange = (
    key: "isVisitor" | "isUser" | "isAdmin",
    val: boolean
  ) => {
    const newRoles = { ...roles };
    newRoles[key] = val;
    setRoles(newRoles);
  };

  const handleSave = async () => {
    const sub_roles = [];
    if (roles.isVisitor) sub_roles.push("visitor");
    if (roles.isUser) sub_roles.push("user");
    if (roles.isAdmin) sub_roles.push("admin");

    const response = await Requester.roles.promote(
      { user_id: userItem.id, sub_roles },
      token
    );

    if (response.token) setToken(response.token);
    if (response.data){
      if(response.data.id === user.id) {
        setUser(response.data);
      }
      setSrcRoles({...roles})
    }
  };

  return (
    <tr>
      <th>{userItem.pseudo}</th>
      <td>
        <CheckableIcon
          value={roles.isVisitor}
          setValue={(val) => handleChange("isVisitor", val)}
          className={
            roles.isVisitor === srcRoles.isVisitor
              ? roles.isVisitor
                ? "theme-good"
                : "theme-bad"
              : "theme-care"
          }
          info={`${roles.isVisitor ? "Supprimer" : "Ajouter"} le role Visiteur`}
        />
      </td>
      <td>
        <CheckableIcon
          value={roles.isUser}
          setValue={(val) => handleChange("isUser", val)}
          className={
            roles.isUser === srcRoles.isUser
              ? roles.isUser
                ? "theme-good"
                : "theme-bad"
              : "theme-care"
          }
          info={`${roles.isUser ? "Supprimer" : "Ajouter"} le role Utilisateur`}
        />
      </td>
      <td>
        <CheckableIcon
          value={roles.isAdmin}
          setValue={(val) => handleChange("isAdmin", val)}
          className={
            roles.isAdmin === srcRoles.isAdmin
              ? roles.isAdmin
                ? "theme-good"
                : "theme-bad"
              : "theme-care"
          }
          info={`${
            roles.isAdmin ? "Supprimer" : "Ajouter"
          } le role Administrateur`}
        />
      </td>
      <td>
        <button
          onClick={handleSave}
          className={
            srcRoles.isVisitor === roles.isVisitor &&
            srcRoles.isUser === roles.isUser &&
            srcRoles.isAdmin === roles.isAdmin
              ? ""
              : "theme-care"
          }
          disabled={
            srcRoles.isVisitor === roles.isVisitor &&
            srcRoles.isUser === roles.isUser &&
            srcRoles.isAdmin === roles.isAdmin
          }
        >
          <IconMonoPath path={EPath.SAVE} pathClassName="f-2" />
        </button>
      </td>
    </tr>
  );
}
```

## Promote

new ```src/Admin/Promote.tsx``` 

```ts
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { StringEntry } from "../Forms/String/StringEntry";
import { TPages } from "../Types/Pages.type";
import { TUser } from "../Types/User.type";
import { Requester } from "../Utilities/Requests/Requester";
import { RoleRow } from "./Roles/RoleRow";

type TRequestQuery = {
  itemsByPage?: number | undefined;
  page?: number | undefined;
  pseudo?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  actif_from?: number | undefined;
  sort_keys?: string | undefined;
  sort_orders?: string | undefined;
};

export function Promote() {
  const { token, setToken } = useContext(TokenContext);
  const [users, setUsers] = useState<TUser[]>([]);
  const [pages, setPages] = useState<TPages>();
  const [query, setQuery] = useState<TRequestQuery>({
    itemsByPage: 5,
    page: 1,
    sort_keys: "pseudo",
    pseudo: "",
  });

  useEffect(() => {
    const handleSearch = async () => {
      const response = await Requester.users.getAll(token, query);
      if (response.statusCode === 200) {
        if (response.token) {
          setToken(response.token);
        }
        if (response.data) {
          setUsers(response.data);
        }
        setPages(response.pages);
      }
    };
    handleSearch();
  }, [query]);

  const handlePage = (val: number) => {
    const newQuery: TRequestQuery = { ...query };
    newQuery.page = val;
    setQuery(newQuery);
  };

  const handleItemByPage = (val: number) => {
    const newQuery: TRequestQuery = { ...query };
    newQuery.page = 1;
    newQuery.itemsByPage = val;
    setQuery(newQuery);
  };

  const handlePseudo = (val: string | undefined) => {
    const newQuery: TRequestQuery = { ...query };
    newQuery.pseudo = val;
    setQuery(newQuery);
  };

  return (
    <section className="section-promote">
      <h2>Promotion</h2>
      <div className="search-bar">
        <StringEntry
          idName={"search-pseudo"}
          value={query.pseudo}
          setValue={handlePseudo}
          labelContent="Pseudo "
        />
        <div>
          <label htmlFor="users-item-by-page">Utilisateurs par page </label>
          <select
            id="users-item-by-page"
            defaultValue={5}
            onChange={(e) => handleItemByPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="items">
        <table>
          <thead>
            <tr>
              <th>Pseudo</th>
              <th>Visiteur</th>
              <th>Utilisateur</th>
              <th>Admin</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <RoleRow key={i} userItem={item} />
            ))}
          </tbody>
        </table>
      </div>
      {pages && (
        <div className="pages">
          {pages.current.page === 1}
          <button
            disabled={pages.current.page === 1}
            onClick={() => handlePage(pages.first.page)}
          >
            {" "}
            {"<<"}{" "}
          </button>
          <button
            disabled={pages.current.page === 1}
            onClick={() => handlePage(pages.prev!.page)}
          >
            {" "}
            {"<"}{" "}
          </button>
          <p>{pages.current.page}</p>
          <button
            disabled={pages.current.page === pages.last.page}
            onClick={() => handlePage(pages.next!.page)}
          >
            {" "}
            {">"}{" "}
          </button>
          <button
            disabled={pages.current.page === pages.last.page}
            onClick={() => handlePage(pages.last.page)}
          >
            {" "}
            {">>"}{" "}
          </button>
        </div>
      )}
    </section>
  );
}
```

## ROUTER

update ```src``` 

```ts
/* ... */
import { Promote } from "../Admin/Promote";

export const ROUTER = createBrowserRouter([
  {
    /* ... */
    children: [
      /* ... */
      {
        path: "admin",
        element : <AutoPromote/>,
        children: [
          {
            path: "",
            element: <div></div>,
          },
          {
            path: "promote",
            element: <Promote />,
          },
        ],
      },
    ],
  },
]);
```
