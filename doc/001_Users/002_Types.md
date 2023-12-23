# Typage

## TImage

new ```src\Types\Image.type.ts```

```ts
export type TImage = {
  file: string;
  dir: string;
  alt: string;
  path: string;
};
```

## TRole

new ```src\Types\Role.type.ts```

```ts
export type TRole = {
  acces_level: number;
};
```

## TContacts

new ```src\Types\Contacts.type.ts```

```ts
import { TUser } from "./User.type";

export type TContacts = {
  wait_for: TUser[];
  wait_you: TUser[];
  friends: TUser[];
  banned: TUser[];
  banned_you: TUser[];
};
```
## TUser

new ```src\Types\User.type.ts```

```ts
import { TContacts } from "./Contacts.type";
import { TImage } from "./Image.type";
import { TRole } from "./Role.type";

export type TUser = {
  id: string;
  pseudo: string;
  image: TImage;
  actif_at?: string;
  role?: TRole;
  first_name?: string | null;
  last_name?: string | null;
  mail?: string | null;
  contacts?: TContacts;
};
```

## TPage

new ```src\Types\Page.type.ts```

```ts
export type TPage = {
  page: number;
  query: string;
};
```

## TPages

new ```src\Types\Pages.type.ts```

```ts
import { TPage } from "./Page.type";

export type TPages = {
  pagesCount: number;
  itemsCount: number;
  first: TPage;
  current: TPage;
  last: TPage;
  prev?: TPage;
  next?: TPage;
};
```

## TResponse

new ```src\Types\Response.type.ts```

```ts
import { TPages } from "./Pages.type";

export type TResponse<Data = any, Message = string | string[]> = {
  statusCode: number;
  message: Message;
  data?: Data;
  token?: string;
  pages?: TPages;
};
```
