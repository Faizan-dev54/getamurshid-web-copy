import { getRequest, putRequest } from "..";
import { adminConfigUrl } from "../urlHelpers";

export const getAdminConfigAPI = () => getRequest(`${adminConfigUrl()}`);
export const updateAdminConfigAPI = (payload: any) => putRequest(`${adminConfigUrl()}`, payload);
