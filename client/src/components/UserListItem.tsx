import { useNavigate } from "react-router-dom";
const defaultProfileImage = require("../assets/profile.png");

interface contentStructure {
  id: number;
  username: string;
  email: string;
  image?: string;
}

const UserListItem = ({ user }: { user: contentStructure }) => {
  const navigate = useNavigate();

  return (
    <li
      className="list-group-item list-group-item-action"
      onClick={() => navigate(`/user/${user.id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={defaultProfileImage}
        alt="profile"
        width="25"
        className="rounded-circle shadow-sm me-3"
      />
      {user.username}
    </li>
  );
};

export default UserListItem;
