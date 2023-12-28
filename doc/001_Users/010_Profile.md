# Profile

## Icone par défaut

new ```public/images/profil.svg```

```svg
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg 
  width="100mm"
  height="100mm"
  viewBox="0 0 100 100"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"
>
  <path 
    style="fill:#000000"
    d="M 50 5 A 20 20 0 0 0 30 25 A 20 20 0 0 0 50 45 A 20 20 0 0 0 70 25 A 20 20 0 0 0 50 5 z M 50 50 A 45 47.5 0 0 0 9 78 A 50 50 0 0 0 50 100 A 50 50 0 0 0 91 78 A 45 47.5 0 0 0 50 50 z " 
  />
</svg>
```

## ContactCard

new ```src/Users/Contacts/ContactCard.tsx```

```ts
import { TUser } from "../../Types/User.type";

interface IContactCardProps {
  user: TUser;
}
export function ContactCard({ user }: IContactCardProps) {
  return (
    <div>
      {user.image ? (
        <img
          src={`${process.env.REACT_APP_API_URL}/${user.image.path}`}
          alt={user.image.alt}
          style={{ width: "3em" }}
        />
      ) : (
        <img
          src={`/images/profil.svg`}
          alt={"Avatar par défaut"}
          style={{ width: "3em" }}
        />
      )}
      <p>
        <strong>{user.pseudo}</strong>
      </p>
      {user.actif_at && (
        <p>
          <strong>Dernière Connection : </strong>
          { new Date(user.actif_at).toLocaleString()}
        </p>
      )}
    </div>
  );
}
```

## ProfilePage

new ```src/Users/Profile.tsx```

```ts
import { useContext } from "react";
import { Disconnect } from "./Disconnect";
import { UserContext } from "../../Context/UserContext";
import { ContactCard } from "../Contacts/ContactCard";

export function ProfilePage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h2>Votre Profil</h2>
      <h3>Vos Informations</h3>
      {user.image ? (
        <img
          src={`${process.env.REACT_APP_API_URL}/${user.image.path}`}
          alt={user.image.alt}
          style={{ width: "10em" }}
        />
      ) : (
        <img
          src={`/images/profil.svg`}
          alt={"Avatar par défaut"}
          style={{ width: "10em" }}
        />
      )}
      <p>
        <strong>Pseudo : </strong>
        {user.pseudo}
      </p>
      <p>
        <strong>Prenom : </strong>
        {user.first_name !== undefined && user.first_name !== null
          ? user.first_name
          : "Indisponnible"}
      </p>
      <p>
        <strong>Nom : </strong>
        {user.last_name !== undefined && user.last_name !== null
          ? user.last_name
          : "Indisponnible"}
      </p>
      <p>
        <strong>Mail : </strong>
        {user.mail !== undefined && user.mail !== null
          ? user.mail
          : "Indisponnible"}
      </p>
      {user.contacts !== undefined && user.contacts.friends.length > 0 && (
        <>
          <h3>Vos Contacts</h3>
          {user.contacts.friends.map((item, i) => (
            <ContactCard key={i} user={item} />
          ))}
        </>
      )}

      <Disconnect />
    </div>
  );
}
```