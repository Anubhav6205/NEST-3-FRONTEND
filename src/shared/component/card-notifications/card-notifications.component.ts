import { Component, Input, OnInit } from '@angular/core';
import { Property } from 'src/shared/model/Property';
import { ThemeService } from 'src/shared/service/theme/theme.service';

@Component({
  selector: 'app-card-notifications',
  templateUrl: './card-notifications.component.html',
  styleUrls: ['./card-notifications.component.scss'],
})
export class CardNotificationsComponent implements OnInit {
  @Input() notification: Property = {} as Property;
  constructor(public themeService:ThemeService) {
 
    
    
  }

  ngOnInit(): void {
    console.log(this.notification);
    console.log("in notification card");
  }

  
  handleGetBhkType(bhkType: string | undefined): string {
    switch (bhkType) {
      case '1_BHK':
        return '1 BHK';
      case '2_BHK':
        return '2 BHK';
      case '3_BHK':
        return '3 BHK';
      case '4_BHK':
        return '4 BHK';
      case '4plus_BHK':
        return '4+ BHK';
      default:
        return 'Unknown BHK Type';
    }
  }
}
