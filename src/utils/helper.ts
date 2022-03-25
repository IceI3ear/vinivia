import { CurrentFilter } from "modules/user/components/user.types";
import { ICity } from "types/user/city";

export const isEmpty = (value: any): boolean => {
  if (value === undefined || null) {
    return true;
  }
  return value.length === 0;
};

export const mergeParam = (currentPath: string, input: CurrentFilter) => {
  const newString = [];
  for (const [fieldName, value] of Object.entries(input)) {
    if (!isEmpty(value)) {
      newString.push(`${fieldName}=${value}`);
    }
  }

  return `${currentPath}?${newString.join("&")}`;
};

export const sortCityByName = (listCity: string[]): ICity[] => {
  const listCitySorted: any = [];
  for (let i = 0; i < listCity.length; i++) {
    const firstLetter = listCity[i].charAt(0);
    if (listCitySorted[firstLetter] === undefined) {
      listCitySorted[firstLetter] = [];
    }
    listCitySorted[firstLetter].push(listCity[i]);
  }
  return listCitySorted;
};
