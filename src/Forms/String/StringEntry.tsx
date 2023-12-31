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
      setValid(newValid.valid || !checkValue);
    }
  }, [value, checkValue]);

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
    <div
      className={`${
        isValid.state ? `theme-${isValid.state} ` : ""
      }${className}`}
    >
      <div>
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
        </div>
        <input
          type={isPass ? "password" : "text"}
          id={idName}
          className={!checkValue ? "theme-default" : ""}
          value={inputValue || ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled || !checkValue}
        />
      </div>
      <p className={!checkValue ? "theme-default" : ""}>
        {!checkValue ? "_" : isValid.message}
      </p>
    </div>
  );
}
