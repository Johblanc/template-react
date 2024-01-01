import { EPath } from "./Paths.enum";

interface IIconMonoPathProps {
  path: EPath;
  tooltip?: string;
  className?: string;
  pathClassName?: string;
}
export function IconMonoPath({
  path,
  tooltip = undefined,
  className = undefined,
  pathClassName = undefined,
}: IIconMonoPathProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{tooltip}</title>
      <path className={pathClassName} d={path} />
    </svg>
  );
}
