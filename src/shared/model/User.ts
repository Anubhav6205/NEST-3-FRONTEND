import { Appointment } from "./Appointment"
import { Property } from "./Property"

export interface User{
    id?:string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    role?: string,
    contactNumber?: string
    contact?: string
    profilePicture?:string
    propertiesDetails?:Property[],
    appointmentDetails?:Appointment[],
}