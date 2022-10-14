import { getUserById } from "../api/apiCalls";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

interface contentStructure {
  id: number;
  username: string;
  email: string;
  image?: string;
}

const UserPage = () => {
  const [user, setUser] = useState<contentStructure>();
  const [apiCall, setApiCall] = useState(false);
  const [wrongRequest, setWrongRequest] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function getUser() {
      setApiCall(true);
      try {
        const response = await getUserById(id!);
        setUser(response.data);
      } catch (e: any) {
        setWrongRequest(e.response.data.message);
      }
      setApiCall(false);
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );

  if (!apiCall) {
    if (wrongRequest) {
      content = (
        <Alert type="danger" center>
          {wrongRequest}
        </Alert>
      );
    } else {
      content = <ProfileCard user={user!} />;
    }
  }

  return <div data-testid="user-page">{content}</div>;
};

export default UserPage;
