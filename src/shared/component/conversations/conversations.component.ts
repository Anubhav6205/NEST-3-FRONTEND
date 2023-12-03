import { Component, OnInit ,HostBinding} from '@angular/core';
import { Chat } from 'src/shared/model/Chat';
import { User } from 'src/shared/model/User';
import { ChatService } from 'src/shared/service/chat/chat.service';
import { UserService } from 'src/shared/service/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { routeAnimationState } from 'src/shared/animation/slideIn';
import { ThemeService } from 'src/shared/service/theme/theme.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  animations:[
    routeAnimationState
  ]
})
export class ConversationsComponent implements OnInit {
  @HostBinding('@routeAnimationTrigger') routeAnimation=true
  userConversations: Chat[] = [];
  userData: User = {} as User;
  showToast: boolean = false;
  toastMessage: string = '';
  headerMessage: string = '';
  conversationDetails: { conversation: Chat; otherPerson: any }[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    public themeService:ThemeService,
    private location:Location
    
  ) {}

  ngOnInit(): void {
    this.userService.handleGetUserData().subscribe((response: any) => {
      this.userData = response;

      this.chatService.handleGetConversations(this.userData.id!).subscribe((response: any) => {
        this.userConversations = response.conversations;

       
        
       
        const userIds = this.userConversations.reduce((ids: string[], convo: Chat) => {
          if (convo.personAId && !ids.includes(convo.personAId)) {
            ids.push(convo.personAId);
          }
          if (convo.personBId && !ids.includes(convo.personBId)) {
            ids.push(convo.personBId);
          }
          return ids;
        }, []);

        if (userIds.length > 0) {
          const fetchUserObservables: Observable<User>[] = userIds.map((userId) =>
            this.userService.handleGetUserById(userId)
           
          );
         
          

          forkJoin(fetchUserObservables).subscribe((otherPersons: any[]) => {
           
            
            // Map conversations and otherPersons
            console.log(otherPersons);
            console.log(this.userConversations);
            console.log("are user convo");
            console.log(this.userData);
            
            
            
            this.conversationDetails = this.userConversations.map((conversation, index) => {
              console.log(userIds);
              
              const otherUserIndex = otherPersons.findIndex(
                (otherPerson) => otherPerson.userData.id !==this.userData.id
                );
              const otherPerson = otherPersons[otherUserIndex];
         
              
              return { conversation, otherPerson };
            });
            console.log(this.conversationDetails);
            console.log("is other convi details");
            
            
          });
        }
      });
    });
  }

  showAndHideToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000); 
  }

  openDialog(action: string) {
    console.log('dialog triggered in navbar');
    console.log(action);
    

   
  }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }


  generateRandomTime(): string {
    const hours = Math.floor(Math.random() * 12) + 1; 
    const minutes = Math.floor(Math.random() * 60); 
    const amPm = Math.random() < 0.5 ? 'AM' : 'PM';

    // Format the time
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }


  
  handleChat(detail:any) {
    console.log(detail);
    console.log("is detail");
    
    
    if (this.userService.userExists===false) {
      this.toastMessage = `Login before you start a conversation.`;
      this.headerMessage = 'Hey?!';
      this.showAndHideToast();
      setTimeout(() => {
        this.openDialog('login');
      }, 2000);
    } else {
      // const chat: Chat = {
      //   personAId: this.userData.id!,
      //   personBId: detail.otherPerson.userData.id
      // };

      const recieverName =
        detail.otherPerson.userData.firstName +
        ' ' +
        detail.otherPerson.userData.lastName;
      const recieverImage =detail.otherPerson.userData.profilePicture;

      console.log(this.userService.handleGetUserData());

      this.router.navigate(['chat'], {
        state: {
          data: [
            detail.otherPerson.userData.id,
            this.userData.id,
            recieverName,
            recieverImage,
          ],
        },
      });
    }
  }
}
