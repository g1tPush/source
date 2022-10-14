import UserListItem from "./UserListItem";
import { useEffect, useState } from "react";
import { loadUsers } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import Spinner from "./Spinner";

interface contentStructure {
  id: number;
  username: string;
  email: string;
  image?: string;
}

const UserList = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState({
    page: {
      content: [] as contentStructure[],
      page: 0,
      size: 0,
      totalPages: 0,
    },
    pendingCallApi: false,
  });

  const loadData = async (pageIndex: number) => {
    setUsers({
      ...users,
      pendingCallApi: true,
    });
    try {
      const response = await loadUsers(pageIndex);
      setUsers({ pendingCallApi: false, page: response.data });
    } catch (e) {
      setUsers({
        ...users,
        pendingCallApi: false,
      });
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div className="card">
      <div className="card-header text-center">
        <h3>{t("users")}</h3>
      </div>
      <ul className="list-group list-group-flush">
        {users.page.content.map((user: contentStructure) => {
          return <UserListItem user={user} key={user.id} />;
        })}
      </ul>
      <div className="card-footer text-center">
        {users.page.page !== 0 && !users.pendingCallApi && (
          <button
            className="btn btn-outline-secondary btn-sm float-start"
            onClick={() => {
              loadData(users.page.page - 1);
            }}
          >
            {t("previousPage")}
          </button>
        )}
        {users.page.totalPages > users.page.page + 1 && !users.pendingCallApi && (
          <button
            className="btn btn-outline-secondary btn-sm float-end"
            onClick={() => {
              loadData(users.page.page + 1);
            }}
          >
            {t("nextPage")}
          </button>
        )}
        {users.pendingCallApi && <Spinner />}
      </div>
    </div>
  );
};

export default UserList;
