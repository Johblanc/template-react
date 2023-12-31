import { useContext } from "react";
import { Disconnect } from "./Connection/Disconnect";
import { UserContext } from "../Context/UserContext";
import { ContactCard } from "./Contacts/ContactCard";
import { Link } from "react-router-dom";
import { ProfilIcon } from "./Contacts/Profil.icon";

export function ProfilePage() {
  const { user } = useContext(UserContext);
  return (
    <section className="section-profil">
      <h2>Votre Profil</h2>
      <div className="profil-informations sub-section">
        <h3>Vos Informations</h3>
        <span>
          {user.image ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/${user.image.path}`}
              alt={user.image.alt}
              className="avatar-large"
            />
          ) : (
            <ProfilIcon className="avatar-large" pathClassName="f-5" />
          )}
          <div>
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
            <Link className="button" to={"/users/update"}>
              Modification Profile
            </Link>
          </div>
        </span>
      </div>
      {user.contacts !== undefined && user.contacts.friends.length > 0 && (
        <div className="contacts-list sub-section">
          <h3>Vos Contacts</h3>
          <div>
            {user.contacts.friends.map((item, i) => (
              <ContactCard key={i} user={item} />
            ))}
          </div>
        </div>
      )}

      <div className="sub-section">
        <h3>Quitter</h3>
        <div>
          <Disconnect />
        </div>
      </div>
    </section>
  );
}
