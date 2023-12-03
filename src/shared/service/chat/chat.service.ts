import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/shared/model/Chat';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl: string = 'https://nest-2-backend-production.up.railway.app/chat';

  constructor(private http:HttpClient) { }


  /**
   * 
   * @paramTakes personA and personB Id's as input 
   * @returns List of chats between the users
   */
  handleGetChats(chats:Chat):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/get`,chats);
  }


  /**
   * 
   * @param personA and personB Id's as input 
   * @returns Initialises a room with both users
   */
  handleAddChat(chats:Chat):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/add`,chats);

  }


  /**
   * 
   * @param currentUserId Current user's id 
   * @returns All the conversations of current user
   */
  handleGetConversations(currentUserId:string):Observable<any>{
    const userIdObject={
      currentUserId:currentUserId
    }
    return this.http.post<any>(`${this.baseUrl}/get/all`,userIdObject)
  }
}
