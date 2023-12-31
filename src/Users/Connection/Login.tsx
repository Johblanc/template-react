import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Requester } from "../../Utilities/Requests/Requester";
import { TokenContext } from "../../Context/TokenContext";
import { USER_DEFAULT } from "../../Context/UserDefault";
import { StringEntry } from "../../Forms/String/StringEntry";
import { Validator } from "../../Utilities/Validators/Validators";
import { EValidatorState } from "../../Utilities/Validators/ValidatorState.enum";

export function Login() {
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [body, setBody] = useState({
    pseudo: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    pseudo: false,
    password: false,
  });
  const [messages, setMessages] = useState<string[]>([]);

  const handleChange = (key: "pseudo" | "password", value: string) => {
    const newBody = { ...body };
    newBody[key] = value;
    setBody(newBody);
  };

  const handleValidate = (key: "pseudo" | "password", value: boolean) => {
    const newValidate = { ...validate };
    newValidate[key] = value;
    setValidate(newValidate);
  };
  const handleLogin = async () => {
    const response = await Requester.users.logIn(body);
    if (response.statusCode === 201) {
      if (response.data && response.token && response.message) {
        setUser(response.data);
        setToken(response.token);
        if (typeof response.message === "string") {
          setMessages([response.message]);
        } else {
          setMessages(response.message);
        }
      }
    } else {
      setUser(USER_DEFAULT);
      setToken("");
      if (response.message) {
        if (typeof response.message === "string") {
          setMessages([response.message]);
        } else {
          setMessages(response.message);
        }
      }
    }
  };

  return (
    <section>
      <h3>Connection</h3>
      <form>
        <StringEntry
          idName={"login-pseudo"}
          className={"form-entry"}
          labelContent={"Pseudo"}
          value={body.pseudo}
          setValue={(val) => handleChange("pseudo", val || "")}
          setValid={(val) => handleValidate("pseudo", val)}
          validators={[Validator.String.minLenght(5, EValidatorState.bad)]}
        />
        <StringEntry
          idName={"login-password"}
          className={"form-entry"}
          labelContent={"Mot de passe"}
          value={body.password}
          setValue={(val) => handleChange("password", val || "")}
          setValid={(val) => handleValidate("password", val)}
          validators={[Validator.String.passwords(EValidatorState.bad)]}
          isPass
        />
        <div>
          {messages.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          disabled={!validate.pseudo || !validate.password}
        >
          Connection
        </button>
      </form>
    </section>
  );
}
