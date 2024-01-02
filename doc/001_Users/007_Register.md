# Register

## RequesterUser

Update ```src/Utilities/Requests/RequesterUsers.ts``` with ```register``` and ```login```

```ts
import { TResponse } from "../../Types/Response.type";
import { TUser } from "../../Types/User.type";
import { RequestMethods } from "./RequestMethods.enum";
import { RequesterBase } from "./RequesterBase";

export class RequesterUser extends RequesterBase {
  /* ... */
  async register(body: {
    pseudo: string;
    password: string;
  }): Promise<TResponse<TUser>> {
    const response = await RequesterUser.base<TUser>(
      `${this.route}/register`,
      RequestMethods.POST,
      [],
      body
    );
    return response;
  }

  async logIn(body: {
    pseudo: string;
    password: string;
  }): Promise<TResponse<TUser>> {
    const response = await RequesterUser.base<TUser>(
      `${this.route}/login`,
      RequestMethods.POST,
      [],
      body
    );
    return response;
  }
}
```

## Register

new ```src/Users/Connection/Register.tsx```

```ts
import { useContext, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { UserContext } from "../../Context/UserContext";
import { USER_DEFAULT } from "../../Context/UserDefault";
import { Requester } from "../../Utilities/Requests/Requester";
import { StringEntry } from "../../Forms/String/StringEntry";
import { Validator } from "../../Utilities/Validators/Validators";
import { EValidatorState } from "../../Utilities/Validators/ValidatorState.enum";

export function Register () {
  
  const { setUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const [body, setBody] = useState({
    pseudo: "",
    password: "",
    verified: "",
  });
  const [validate, setValidate] = useState({
    pseudo: false,
    password: false,
    verified: false,
  });
  const [messages, setMessages] = useState<string[]>([]);

  const handleChange = (key: "pseudo" | "password" | "verified", value: string) => {
    const newBody = { ...body };
    newBody[key] = value;
    setBody(newBody);
  };
  const handleValidate = (key: "pseudo" | "password" | "verified", value: boolean) => {
    const newValidate = { ...validate };
    newValidate[key] = value;
    setValidate(newValidate);
  };
  const handleRegister = async () => {
    console.log(body);
    let response = await Requester.users.register(body);
    if (response.statusCode === 201) {
      
      response = await Requester.users.logIn(body);
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
    <form>
      <h2>Enregistrement</h2>
      <StringEntry
        idName={"register-pseudo"}
        labelContent={"Pseudo"}
        value={body.pseudo}
        setValue={(val) => handleChange("pseudo", val || "")}
        setValid={(val) => handleValidate('pseudo', val)}
        validators={[
          Validator.String.minLenght(5,EValidatorState.bad)
        ]}
      />
      <StringEntry
        idName={"register-password"}
        labelContent={"Mot de passe"}
        value={body.password}
        setValue={(val) => handleChange("password", val || "")}
        setValid={(val) => handleValidate('password', val)}
        validators={[
          Validator.String.passwords(EValidatorState.bad)
        ]}
        isPass
      />
      <StringEntry
        idName={"register-verify"}
        labelContent={"Vérification du mot de passe"}
        value={body.verified}
        setValue={(val) => handleChange("verified", val || "")}
        setValid={(val) => handleValidate('verified', val)}
        validators={[
          Validator.String.samePasswords(body.password, EValidatorState.bad),
          Validator.String.passwords(EValidatorState.bad)
        ]}
        isPass
      />
      <div>
        {messages.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        disabled={!validate.pseudo || !validate.password || !validate.verified}
      >
        Connection
      </button>
    </form>
  )
}
```