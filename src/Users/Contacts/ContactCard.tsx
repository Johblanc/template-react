import { useContext } from "react";
import { TUser } from "../../Types/User.type";
import { ProfilIcon } from "./Profil.icon";
import { UserContext } from "../../Context/UserContext";
import { IconMonoPath } from "../../Icons/IconMonoPath";
import { EPath } from "../../Icons/Paths.enum";
import { TokenContext } from "../../Context/TokenContext";
import { Requester } from "../../Utilities/Requests/Requester";

interface IContactCardProps {
  userItem: TUser;
}
export function ContactCard({ userItem }: IContactCardProps) {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const relation =
    user.contacts &&
    (user.id === userItem.id
      ? { text: "Vous", className: "theme-good" }
      : user.contacts.friends.map((item) => item.id).includes(userItem.id)
      ? { text: "Amis", className: "theme-good" }
      : user.contacts?.wait_you.map((item) => item.id).includes(userItem.id)
      ? { text: "En attente", className: "theme-bad" }
      : user.contacts?.wait_for.map((item) => item.id).includes(userItem.id)
      ? { text: "Demande envoyée", className: "theme-care" }
      : user.contacts?.banned.map((item) => item.id).includes(userItem.id)
      ? { text: "Bannis", className: "theme-bad" }
      : user.contacts?.banned_you.map((item) => item.id).includes(userItem.id)
      ? { text: "Vous a bannis", className: "theme-bad" }
      : { text: "Pas en contact", className: "disabled" });

  const handleAsking = async () => {
    const response = await Requester.contacts.asking(userItem.id, token);
    if (response.statusCode === 200) {
      if (response.data) {
        setUser(response.data);
      }
      if (response.token) {
        setToken(response.token);
      }
    }
  };

  const handleRefuse = async () => {
    const response = await Requester.contacts.refuse(userItem.id, token);
    if (response.statusCode === 200) {
      if (response.data) {
        setUser(response.data);
      }
      if (response.token) {
        setToken(response.token);
      }
    }
  };

  const handleBan = async () => {
    const response = await Requester.contacts.ban(userItem.id, token);
    if (response.statusCode === 200) {
      if (response.data) {
        setUser(response.data);
      }
      if (response.token) {
        setToken(response.token);
      }
    }
  };

  return (
    <div className="contact-card">
      {userItem.image ? (
        <img
          src={`${process.env.REACT_APP_API_URL}/${userItem.image.path}`}
          alt={userItem.image.alt}
          className="avatar-small"
        />
      ) : (
        <ProfilIcon className="avatar-small" pathClassName="f-5" />
      )}
      <div className="informations">
        <p>
          <strong>{userItem.pseudo}</strong>
        </p>
        {userItem.actif_at && (
          <p>
            {Math.floor(
              (new Date().valueOf() - new Date(userItem.actif_at).valueOf()) /
                (1000 * 60 * 60)
            ) === 0
              ? "Il y a moins d'1 h"
              : Math.floor(
                  (new Date().valueOf() -
                    new Date(userItem.actif_at).valueOf()) /
                    (1000 * 60 * 60)
                ) < 24
              ? `Il y a ${Math.floor(
                  (new Date().valueOf() -
                    new Date(userItem.actif_at).valueOf()) /
                    (1000 * 60 * 60)
                )} h`
              : `Il y a ${Math.floor(
                  (new Date().valueOf() -
                    new Date(userItem.actif_at).valueOf()) /
                    (1000 * 60 * 60 * 24)
                )} j`}
          </p>
        )}
        <p className={`relation ${relation?.className}`}>{relation?.text}</p>
      </div>
      <div className="actions">
        <div>
          <button
            onClick={handleAsking}
            className={`theme-good`}
            disabled={
              relation?.text !== "En attente" &&
              relation?.text !== "Bannis" &&
              relation?.text !== "Pas en contact"
            }
          >
            <IconMonoPath
              path={EPath.ADD_CONTACT}
              tooltip="Ajouter aux contacts"
              pathClassName="f-2"
            />
          </button>
          <button
            onClick={handleRefuse}
            className={`theme-care`}
            disabled={
              relation?.text !== "Amis" &&
              relation?.text !== "En attente" &&
              relation?.text !== "Demande envoyée" &&
              relation?.text !== "Bannis"
            }
          >
            <IconMonoPath
              path={EPath.SUP_CONTACT}
              tooltip="Supprimer des contacts"
              pathClassName="f-2"
            />
          </button>
        </div>
        <div>
          <button
            className={`theme-good`}
            disabled={relation?.text !== "Amis" && relation?.text !== "Vous"}
          >
            <IconMonoPath
              path={EPath.MESSAGE}
              tooltip="Envoyer un message"
              pathClassName="f-2"
            />
          </button>
          <button
            onClick={handleBan}
            className={`theme-bad`}
            disabled={relation?.text === "Vous" || relation?.text === "Bannis"}
          >
            <IconMonoPath
              path={EPath.BAN_CONTACT}
              tooltip="Bannir des contacts"
              pathClassName="f-2"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
