import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { StringEntry } from "../Forms/String/StringEntry";
import { TPages } from "../Types/Pages.type";
import { TUser } from "../Types/User.type";
import { Requester } from "../Utilities/Requests/Requester";
import { RoleRow } from "./Roles/RoleRow";

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

export function Promote() {
  const { token, setToken } = useContext(TokenContext);
  const [users, setUsers] = useState<TUser[]>([]);
  const [pages, setPages] = useState<TPages>();
  const [query, setQuery] = useState<TRequestQuery>({
    itemsByPage: 5,
    page: 1,
    sort_keys: "pseudo",
    pseudo: "",
  });

  useEffect(() => {
    const handleSearch = async () => {
      const response = await Requester.users.getAll(token, query);
      if (response.statusCode === 200) {
        if (response.token) {
          setToken(response.token);
        }
        if (response.data) {
          setUsers(response.data);
        }
        setPages(response.pages);
      }
    };
    handleSearch();
  }, [query]);

  const handlePage = (val: number) => {
    const newQuery: TRequestQuery = { ...query };
    newQuery.page = val;
    setQuery(newQuery);
  };

  const handleItemByPage = (val: number) => {
    const newQuery: TRequestQuery = { ...query };
    newQuery.page = 1;
    newQuery.itemsByPage = val;
    setQuery(newQuery);
  };

  const handlePseudo = (val: string | undefined) => {
    const newQuery: TRequestQuery = { ...query };
    newQuery.pseudo = val;
    setQuery(newQuery);
  };

  return (
    <section className="section-promote">
      <h3>Promotion</h3>
      <div className="search-bar">
        <StringEntry
          idName={"search-pseudo"}
          value={query.pseudo}
          setValue={handlePseudo}
          labelContent="Pseudo "
        />
        <div>
          <label htmlFor="users-item-by-page">Utilisateurs par page </label>
          <select
            id="users-item-by-page"
            defaultValue={5}
            onChange={(e) => handleItemByPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="items">
        <table>
          <thead>
            <tr>
              <th>Pseudo</th>
              <th>Visiteur</th>
              <th>Utilisateur</th>
              <th>Admin</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <RoleRow key={i} userItem={item} />
            ))}
          </tbody>
        </table>
      </div>
      {pages && (
        <div className="pages">
          {pages.current.page === 1}
          <button
            disabled={pages.current.page === 1}
            onClick={() => handlePage(pages.first.page)}
          >
            {" "}
            {"<<"}{" "}
          </button>
          <button
            disabled={pages.current.page === 1}
            onClick={() => handlePage(pages.prev!.page)}
          >
            {" "}
            {"<"}{" "}
          </button>
          <p>{pages.current.page}</p>
          <button
            disabled={pages.current.page === pages.last.page}
            onClick={() => handlePage(pages.next!.page)}
          >
            {" "}
            {">"}{" "}
          </button>
          <button
            disabled={pages.current.page === pages.last.page}
            onClick={() => handlePage(pages.last.page)}
          >
            {" "}
            {">>"}{" "}
          </button>
        </div>
      )}
    </section>
  );
}
