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
          transition: "all 0.5s",
        }}
      />
    </svg>
  );
}
