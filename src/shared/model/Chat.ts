export interface Chat{
    personAId?:string
    personBId?:string,
    messageDetail?:ChatMessage[]

}

export interface ChatMessage{
    senderId?:string;
    message?:string;
    isChat?:boolean
}