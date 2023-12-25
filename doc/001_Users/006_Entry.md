# Entrée Texte

## CheckableIcon

new ```src/Forms/Checkable/CheckableIcon.tsx```

```ts
interface ICheckableIconProps {
  value?: boolean;
  setValue?: (value: boolean) => void;
  info?: string;
  className? : string
}

export function CheckableIcon({ value, setValue, info,className = "" }: ICheckableIconProps) {
  const pathCheck = "M -5,0 -1,2 5,-5 3,-2  1,1  -1,4 -2,3  -3,2 Z";
  const pathNotCheck = "M -5,-5 0,-1 5,-5 1,0 5,5 0,1  -5,5 -1,0 Z";

  return (
    <svg
      onClick={() => (setValue ? setValue(!value) : {})}
      viewBox="-8 -8 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${value ? "good" : "bad"}`}
    >
      <title>{info}</title>
      <rect
        x={-8}
        y={-8}
        width={16}
        height={16}
        rx={value ? 2 : 8}
        ry={value ? 2 : 8}
        className="fill-3"
        style={{
          transition: "all 0.5s",
        }}
      />
      <path
        d={value ? pathCheck : pathNotCheck}
        className="fill-8"
        style={{
          transform: `rotate(${value ? 0 : 900}deg)`,
        }}
      />
    </svg>
  );
}
```

## CheckableIcon

new ```src/Forms/Checkable/Checkable.tsx```

```ts
import { CheckableIcon } from "./CheckableIcon";

interface ICheckableProps {
  value: boolean;
  setValue: (val: boolean) => void;
  hidden?: boolean;
  disabled?: boolean;
  labelContent: string;
  labelHide?: boolean;
  idName: string;
}

export function Checkable({
  value,
  setValue,
  hidden,
  disabled,
  labelContent,
  labelHide,
  idName,
}: ICheckableProps) {
  return (
    <div className="togglable">
      <label
        htmlFor={idName}
        className={`${disabled ? "disabled" : ""} ${
          labelHide ? "no-size" : ""
        }`}
      >
        {labelContent}
      </label>
      <input
        type="checkbox"
        checked={value}
        onClick={() => !disabled && !hidden && setValue(!value)}
        disabled={disabled}
        readOnly
        id={idName}
      />
      <CheckableIcon
        value={value}
        setValue={() => !disabled && !hidden && setValue(!value)}
        info={labelContent}
        className={`${disabled ? "disabled" : ""} ${hidden ? "hidden" : ""}`}
      />
    </div>
  );
}
```

## StringEntry

new ```src/Forms/String/StringEntry.tsx```

```ts
import { useEffect, useState } from "react";
import { TValidatorCallback } from "../../Utilities/Validators/ValidatorCallback.type";
import { TValidatorConfirmation } from "../../Utilities/Validators/ValidatorConfirmation.type";
import { Checkable } from "../Checkable/Checkable";

interface IStringEntryProps {
  idName: string;
  labelContent?: string | JSX.Element;
  value: string | undefined;
  setValue?: (val: string | undefined) => void;
  setValid?: (val: boolean) => void;
  validators?: TValidatorCallback<string>[];
  isPass?: boolean;
  className?: string;
  optional?: "optional" | "required" | "forced";
  disabled?: boolean;
}

export function StringEntry({
  idName,
  labelContent = undefined,
  value = undefined,
  setValue = undefined,
  setValid = undefined,
  validators = undefined,
  isPass = undefined,
  className = "",
  optional = "forced",
  disabled = false,
}: IStringEntryProps) {
  const loopValidators = (val: string): TValidatorConfirmation => {
    if (validators) {
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
    loopValidators(value || "")
  );
  const [inputValue, setInputValue] = useState(value);
  const [checkValue, setCheckValue] = useState(
    optional === "forced" || optional === "required" || value !== undefined
  );

  useEffect(() => {
    const newValid = loopValidators(value || "");
    setIsValid(newValid);
    if (value !== undefined) {
      setInputValue(value);
    }
    if (setValid) {
      setValid(newValid.valid);
    }
  }, [value]);

  useEffect(() => {
    if (setValue) {
      if (checkValue) {
        setValue(inputValue);
      } else {
        setValue(undefined);
      }
    }
  }, [checkValue]);

  const handleChange = (val: string) => {
    if (setValue) {
      setValue(val);
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
          type={isPass ? "password" : "text"}
          id={idName}
          value={inputValue || ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled || !checkValue}
        />
      </div>
      <p>{isValid.message}</p>
    </div>
  );
}
```