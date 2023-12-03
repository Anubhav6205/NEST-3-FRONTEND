import { Component, OnInit, HostBinding } from '@angular/core';
import { Chat, ChatMessage } from 'src/shared/model/Chat';
import { ChatService } from 'src/shared/service/chat/chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { routeAnimationState } from 'src/shared/animation/slideIn';
import { ThemeService } from 'src/shared/service/theme/theme.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [routeAnimationState],
})
export class ChatComponent implements OnInit {
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  senderId = '';
  recieverId = '';
  recieverName = '';
  recieverImage = '';
  chatForm: FormGroup;
  searchForm: FormGroup;
  chats: Chat = {} as Chat;

  showSearch = false;
  searchFromSubscribe: Subscription = {} as Subscription;
  filteredChats: ChatMessage[] = [] as ChatMessage[];
  orignalChats:ChatMessage[] = [] as ChatMessage[];

  pictureUrl = '';
  isChat = true;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    public themeService: ThemeService
  ) {
    this.chatForm = this.fb.group({
      currentChat: [''],
    });

    this.searchForm = this.fb.group({
      search: [''],
    });

    this.recieverName = history.state.data[2];
    console.log(this.recieverName);
    console.log('is rcvr name');

    this.recieverImage = history.state.data[3];
    console.log(this.recieverImage);
  }

  ngOnInit(): void {
    this.senderId = history.state.data[1];
    this.recieverId = history.state.data[0];
    // console.log(this.senderId + ' is sender');
    // console.log(this.recieverId + 'is reciever');
    this.chats = {
      personAId: this.senderId,
      personBId: this.recieverId,
    };
    this.chatService.handleGetChats(this.chats).subscribe((response: any) => {
      console.log(response.chat);

      this.chats = response.chat;
      if (this.chats && this.chats.messageDetail) {
        this.filteredChats = this.chats.messageDetail;
        this.orignalChats=this.chats.messageDetail;
      }
    });

    this.searchFromSubscribe = this.searchForm.valueChanges.subscribe(
      (value) => {
        this.filteredChats =
          this.orignalChats.filter((message) =>
            message.message
              ?.toLowerCase()
              .toString()
              .includes(value.search.toLowerCase())
          ) || [];
        this.chats.messageDetail = this.filteredChats;
      }
    );
  }

  handleImageToBase64(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = event;
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(image);
    });
  }

  async handleAddPictures(event: any) {
    console.log('files');

    const files = event.target.files;
    const base64stringsArray: string[] = [];

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(
      Array.from(files).map(async (file) => {
        const base64string = await this.handleImageToBase64(file);
        base64stringsArray.push(base64string);
      })
    );

    // Now you can proceed with the array of Base64 strings
    this.pictureUrl = base64stringsArray[0];

    // this.router.navigate(['./enlistProperty/rental']);
  }

  handleShowSearch() {
    this.showSearch = !this.showSearch;
  }
  handleSendChat() {
    this.senderId = history.state.data[1];
    this.recieverId = history.state.data[0];
    let imageOrChat = '';
    if (this.chatForm.value.currentChat === '') {
      imageOrChat = this.pictureUrl;
      this.isChat = false;
    } else {
      imageOrChat = this.chatForm.value.currentChat;
      this.isChat = true;
    }

    const currentMessage: ChatMessage = {
      senderId: history.state.data[1],

      message: imageOrChat,
      isChat: this.isChat,
    };

    this.chatForm.setValue({
      currentChat: '',
    });
    this.pictureUrl = '';

    console.log(currentMessage);
    console.log('is msg dtl');

    const currentMessageArray: ChatMessage[] = [currentMessage];
    this.chats = {
      personAId: this.senderId,
      personBId: this.recieverId,
      messageDetail: currentMessageArray,
    };

    this.chatService.handleAddChat(this.chats).subscribe((response) => {
      this.chats = response.chat;
      console.log(this.chats);
      this.filteredChats = this.chats.messageDetail!;
      console.log('are updted');
    });
  }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }
}
