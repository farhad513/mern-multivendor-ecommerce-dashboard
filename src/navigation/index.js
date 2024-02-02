import { allNavs } from "./allNav";

export const getNavs = (role) => {
  const allNav = [];
  for (let i = 0; i < allNavs.length; i++) {
    if (role === allNavs[i].role) {
      allNav.push(allNavs[i]);
    }
  }
  return allNav;
};
