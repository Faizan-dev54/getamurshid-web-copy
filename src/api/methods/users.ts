import { getRequest } from "..";
import { adminUsersUrl } from "../urlHelpers";

export const getUsersAPI = (payload: any) => getRequest(`${adminUsersUrl(payload)}`);