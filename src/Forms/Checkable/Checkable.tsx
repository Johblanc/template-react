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
