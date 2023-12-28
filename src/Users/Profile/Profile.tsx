import { useContext } from "react";
import { Disconnect } from "./Disconnect";
import { UserContext } from "../../Context/UserContext";
import { ContactCard } from "../Contacts/ContactCard";
import { Link } from "react-router-dom";

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
      <Link to={"/users/update"}> Modification Profile</Link>

      <Disconnect />
    </div>
  );
}
