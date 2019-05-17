import { EAccountType } from "./EAccountType";

export interface IUserInfoDTO {
    id ?: string;
    publicUserId ?: string, 
    email ?: string,
    password ?: string,
    firstName ?: string,
    lastName ?: string,
    phoneNumber ?: string,
    accountType ?: EAccountType, 
    createdDate ?: string, 
}