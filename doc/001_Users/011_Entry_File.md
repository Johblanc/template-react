# Entry File

## FilesValidator

new ```src/Utilities/Validators/FileValidators.ts``` :

```ts
import { TValidatorCallback } from "./ValidatorCallback.type";
import { TValidatorConfirmation } from "./ValidatorConfirmation.type";
import { EValidatorState } from "./ValidatorState.enum";

export class FilesValidator {

  static notEmpty(state?: EValidatorState): TValidatorCallback<FileList | null> {
    return (val: FileList | null): TValidatorConfirmation => {
      let test =  val !== null && val.length !== 0
      return {
        valid: test,
        message: test ? "_" : `Le champ ne doit pas être vide`,
        state: test ? undefined : state,
      };
    };
  }
  
  static images(state?: EValidatorState): TValidatorCallback<FileList | null> {
    return (val: FileList | null): TValidatorConfirmation => {
      let test = true;
      if (val !== null){
        for (let i = 0; i < val.length; i += 1) {
          const item = val.item(i);
          test = test && (item === null || item.type.split("/")[0] === "image");
        }
      }
      return {
        valid: test,
        message: test ? "_" : `Le champ doit être une image`,
        state: test ? undefined : state,
      };
    };
  }
}
```

## Validator

update ```src/Utilities/Validators/Validators.ts``` :

```ts
import { FilesValidator } from "./FileValidators";
import { StringValidator } from "./StringValidators";

export class Validator {
  static String = StringValidator;
  static Files = FilesValidator;
}
```

## SelectFiles

update ```src/Forms/Files/SelectFiles.tsx``` :

```ts
import { useEffect, useState } from "react";
import { TValidatorCallback } from "../../Utilities/Validators/ValidatorCallback.type";
import { TValidatorConfirmation } from "../../Utilities/Validators/ValidatorConfirmation.type";
import { Checkable } from "../Checkable/Checkable";
import "../form.style.css";

interface ISelectFilesProps {
  idName: string;
  labelContent?: string | JSX.Element;
  accept?: string;
  setValue?: (val?: FileList | null) => void;
  setValid?: (val: boolean) => void;
  validators?: TValidatorCallback<FileList | null>[];
  className?: string;
  optional?: "optional" | "required" | "forced";
  disabled?: boolean;
  multiple?: boolean;
}

export function SelectFiles({
  idName,
  labelContent = undefined,
  accept = undefined,
  setValue = undefined,
  setValid = undefined,
  validators = undefined,
  className = "",
  optional = "forced",
  disabled = false,
  multiple = false,
}: ISelectFilesProps) {
  const loopValidators = (val?: FileList | null): TValidatorConfirmation => {
    
    if (validators && val !== undefined) {
      let result: TValidatorConfirmation | undefined = undefined;
      for (const validator of validators) {
        result = validator(val);
        if (!result.valid) {
          return result;
        }
      }
      if (result) {
        return result;
      }
    }
    return {
      valid: true,
      message: "",
    } as TValidatorConfirmation;
  };

  const [isValid, setIsValid] = useState<TValidatorConfirmation>(
    loopValidators(null)
  );
  const [inputValue, setInputValue] = useState<FileList | null>(null);
  const [checkValue, setCheckValue] = useState(
    optional === "forced" || optional === "required"
  );

  useEffect(() => {
    const newValid = loopValidators(inputValue);
    setIsValid(newValid);
    if (setValid) {
      setValid(newValid.valid || !checkValue);
    }
  }, [checkValue,inputValue]);

  useEffect(() => {
    if (setValue) {
      setValue(inputValue);
    }
  }, [checkValue]);

  const handleChange = (val: FileList | null) => {
    const newValid = loopValidators(val);
    setIsValid(newValid);
    if (setValue) {
      if (val === null) {
        setValue(undefined);
      } else {
        setValue(val);
      }
    }
    setInputValue(val);
    if (setValid) {
      setValid(newValid.valid || !checkValue);
    }
  };

  return (
    <div className={`${isValid.state ? `${isValid.state} ` : ""}${className}`}>
      <div>
        {optional !== "forced" && (
          <Checkable
            idName={`${idName}-option`}
            value={checkValue}
            setValue={setCheckValue}
            hidden={optional === "required"}
            disabled={disabled}
            labelContent={`Activer : ${labelContent}`}
            labelHide={true}
          />
        )}
        <label className={disabled ? "disabled" : ""} htmlFor={idName}>
          {labelContent}
        </label>
        <input
          type="file"
          id={idName}
          accept={accept}
          onChange={(e) => handleChange(e.target.files)}
          disabled={disabled || !checkValue}
          multiple={multiple}
        />
      </div>
      <p>{isValid.message}</p>
    </div>
  );
}
```