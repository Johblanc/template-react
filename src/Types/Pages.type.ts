import { TPage } from "./Page.type";

export type TPages = {
  pagesCount: number;
  itemsCount: number;
  first: TPage;
  current: TPage;
  last: TPage;
  prev?: TPage;
  next?: TPage;
};
