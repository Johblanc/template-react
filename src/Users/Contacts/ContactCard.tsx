import { TUser } from "../../Types/User.type";
import { ProfilIcon } from "./Profil.icon";

interface IContactCardProps {
  user: TUser;
}
export function ContactCard({ user }: IContactCardProps) {
  return (
    <div className="contact-card">
      {user.image ? (
        <img
          src={`${process.env.REACT_APP_API_URL}/${user.image.path}`}
          alt={user.image.alt}
          className="avatar-small"
        />
      ) : (
        <ProfilIcon className="avatar-small" pathClassName="f-5" />
      )}
      <div>
        <p>
          <strong>{user.pseudo}</strong>
        </p>
        {user.actif_at && (
          <p>
            {Math.floor(
              (new Date().valueOf() - new Date(user.actif_at).valueOf()) /
                (1000 * 60 * 60)
            ) === 0
              ? "Il y a moins d'1 h"
              : Math.floor(
                  (new Date().valueOf() - new Date(user.actif_at).valueOf()) /
                    (1000 * 60 * 60)
                ) < 24
              ? `Il y a ${Math.floor(
                  (new Date().valueOf() - new Date(user.actif_at).valueOf()) /
                    (1000 * 60 * 60)
                )} h`
              : `Il y a ${Math.floor(
                  (new Date().valueOf() - new Date(user.actif_at).valueOf()) /
                    (1000 * 60 * 60 * 24)
                )} j`}
          </p>
        )}
      </div>
    </div>
  );
}
