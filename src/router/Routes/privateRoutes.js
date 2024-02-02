import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sellerRoutes";

export const privateRoute = [...adminRoutes, ...sellerRoutes];
