import { User } from "./User"

export interface Review{
    review:string,
    userId?:string
    user?:User
    property:string
}