import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { StringEntry } from "../Forms/String/StringEntry";
import { Validator } from "../Utilities/Validators/Validators";
import { EValidatorState } from "../Utilities/Validators/ValidatorState.enum";
import { Requester } from "../Utilities/Requests/Requester";
import { TokenContext } from "../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import { SelectFiles } from "../Forms/Files/SelectFiles";

type TBodyUserUpdate = {
  pseudo?: string;
  first_name?: string;
  last_name?: string;
  mail?: string;
};

export function UserUpdatePage() {
  const { user, setUser } = useContext(UserContext);
  const { token, setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  const [body, setBody] = useState<TBodyUserUpdate>({
    pseudo: user.pseudo,
    first_name: user.first_name === null ? undefined : user.first_name,
    last_name: user.last_name === null ? undefined : user.last_name,
    mail: user.mail === null ? undefined : user.mail,
  });
  const [validate, setValidate] = useState({
    pseudo: true,
    first_name: true,
    last_name: true,
    mail: true,
    image: true,
  });

  const [image, setImage] = useState<FileList>();

  const [messages, setMessages] = useState<string[]>([]);

  const handleChange = (
    key: "pseudo" | "first_name" | "last_name" | "mail",
    value?: string
  ) => {
    const newBody: TBodyUserUpdate = { ...body };
    newBody[key] = value;
    setBody(newBody);
  };
  const handleValidate = (
    key: "pseudo" | "first_name" | "last_name" | "mail" | "image",
    value: boolean
  ) => {
    const newValidate = { ...validate };
    newValidate[key] = value;
    setValidate(newValidate);
  };

  const handleUpdate = async () => {
    const response = await Requester.users.update(token, body, image);
    if (response.statusCode === 200) {
      if (response.token) {
        setToken(response.token);
      }
      if (response.data) {
        setUser(response.data);
        navigate("/users/profile");
      }
    } else {
      if (typeof response.message === "string") {
        setMessages([response.message]);
      } else {
        setMessages(response.message);
      }
    }
  };

  return (
    <section className="section-update-user">
      <h2>Modification Profile</h2>
      <form>
        <StringEntry
          idName={"update-user-pseudo"}
          className={"form-entry"}
          labelContent={"Pseudo"}
          value={body.pseudo}
          setValue={(val) => handleChange("pseudo", val)}
          setValid={(val) => handleValidate("pseudo", val)}
          validators={[Validator.String.minLenght(5, EValidatorState.bad)]}
          optional="optional"
        />
        <StringEntry
          idName={"update-user-first_name"}
          className={"form-entry"}
          labelContent={"Prénom"}
          value={body.first_name}
          setValue={(val) => handleChange("first_name", val)}
          setValid={(val) => handleValidate("first_name", val)}
          validators={[Validator.String.minLenght(1, EValidatorState.bad)]}
          optional="optional"
        />
        <StringEntry
          idName={"update-user-last_name"}
          className={"form-entry"}
          labelContent={"Nom"}
          value={body.last_name}
          setValue={(val) => handleChange("last_name", val)}
          setValid={(val) => handleValidate("last_name", val)}
          validators={[Validator.String.minLenght(1, EValidatorState.bad)]}
          optional="optional"
        />
        <StringEntry
          idName={"update-user-mail"}
          className={"form-entry"}
          labelContent={"Email"}
          value={body.mail}
          setValue={(val) => handleChange("mail", val)}
          setValid={(val) => handleValidate("mail", val)}
          validators={[Validator.String.mail(EValidatorState.bad)]}
          optional="optional"
        />
        <SelectFiles
          idName={"update-user-image"}
          className={"form-entry"}
          labelContent={"Avatar"}
          accept="image/*"
          current={user.image? `${process.env.REACT_APP_API_URL}/${user.image.path}` : undefined}
          setValue={(val) => setImage(val === null ? undefined : val)}
          setValid={(val) => handleValidate("image", val)}
          validators={[
            Validator.Files.notEmpty(EValidatorState.bad),
            Validator.Files.images(EValidatorState.bad),
          ]}
          optional="optional"
        />
        <div>
          {messages.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          disabled={
            !validate.pseudo ||
            !validate.first_name ||
            !validate.last_name ||
            !validate.mail ||
            !validate.image
          }
        >
          Enregistrer
        </button>
      </form>
    </section>
  );
}
