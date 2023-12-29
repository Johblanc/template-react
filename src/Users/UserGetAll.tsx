import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { TUser } from "../Types/User.type";
import { Requester } from "../Utilities/Requests/Requester";
import { ContactCard } from "./Contacts/ContactCard";
import { StringEntry } from "../Forms/String/StringEntry";

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

export function UserGetAll() {
  const { token, setToken } = useContext(TokenContext);
  const [users, setUsers] = useState<TUser[]>([]);
  const [query, setQuery] = useState<TRequestQuery>({
    itemsByPage : 5,
    page : 1,
    sort_keys:"pseudo",
    pseudo : ""
  });


  const handleItemByPage = (val : number)=> {
    const newQuery : TRequestQuery = {...query};
    newQuery.itemsByPage = val
    setQuery(newQuery)
  }

  const handlePseudo = (val : string | undefined)=> {
    const newQuery : TRequestQuery = {...query};
    newQuery.pseudo = val
    setQuery(newQuery)
  }

  useEffect(()=>{
    const handleSearch = async () => {
      const response = await Requester.users.getAll(token, query);
      if (response.statusCode === 200) {
        if (response.token) {
          setToken(response.token);
        }
        if (response.data) {
          setUsers(response.data);
        }
      }
    };
    handleSearch()
  },[query])

  return (
    <div>
      <h2>Tous les utilisateurs</h2>
      <StringEntry idName={"search-pseudo"} value={query.pseudo} setValue={handlePseudo} labelContent="Pseudo : " />
      <div>
        <label htmlFor="users-item-by-page" >Utilisateurs par page</label>
        <select id="users-item-by-page" defaultValue={5} onChange={e => handleItemByPage(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      {users.map((item, i) => (
        <ContactCard key={i} user={item} />
      ))}
    </ div>
  );
}
