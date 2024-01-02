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
      <h2>Vous n'êtes pas administrateur du site</h2>

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
