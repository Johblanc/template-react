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
