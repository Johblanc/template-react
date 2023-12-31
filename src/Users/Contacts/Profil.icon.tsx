interface IProfiliconProps {
  className?: string;
  pathClassName?: string;
}
export function ProfilIcon({ className, pathClassName }: IProfiliconProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        className={pathClassName}
        d="M 50 5 A 20 20 0 0 0 30 25 A 20 20 0 0 0 50 45 A 20 20 0 0 0 70 25 A 20 20 0 0 0 50 5 z M 50 50 A 45 47.5 0 0 0 9 78 A 50 50 0 0 0 50 100 A 50 50 0 0 0 91 78 A 45 47.5 0 0 0 50 50 z "
      />
    </svg>
  );
}
