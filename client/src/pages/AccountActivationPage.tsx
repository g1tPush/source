import { activate } from "../api/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const AccountActivationPage = () => {
  const { token } = useParams();
  const [result, setResult] = useState<"success" | "failure" | "">("");

  useEffect(() => {
    async function activateRequest() {
      setResult("");
      try {
        const activation = await activate(token!);
        setResult("success");
      } catch (e) {
        setResult("failure");
      }
    }
    activateRequest();
  }, [token]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );

  if (result === "success") {
    content = <Alert>Account is activated</Alert>;
  } else if (result === "failure") {
    content = <Alert type="danger">Activation failure</Alert>;
  }

  return <div data-testid="activation-page">{content}</div>;
};

export default AccountActivationPage;
