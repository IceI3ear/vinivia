import { useLocation } from "react-router";

export const useParseParams = (): any => {
  const location = useLocation();
  if (!location.search) {
    return {};
  }
  const search = location.search.replace("?", "").split("&");
  const arrParams = [] as any;
  search.forEach((item) => {
    const arrParam = item.split("=");
    arrParams.push(arrParam);
  });
  const objParams = Object.fromEntries(arrParams);
  return objParams;
};
