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
