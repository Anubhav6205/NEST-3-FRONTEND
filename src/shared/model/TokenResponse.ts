import { User } from "./User";

export interface TokenResponse{
    status:string,
    token?:string,
    userData?:User
}