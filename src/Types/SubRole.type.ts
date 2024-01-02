export type TSubRole = {
  name : "admin";
  acces_level: 2;
} | {
  name : "user";
  acces_level: 1;
} | {
  name : "visitor";
  acces_level: 0;
};
