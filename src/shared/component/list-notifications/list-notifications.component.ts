import { Component, OnInit } from '@angular/core';
import { Property } from 'src/shared/model/Property';
import { PropertyService } from 'src/shared/service/property/property.service';
import { ThemeService } from 'src/shared/service/theme/theme.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss'],
})
export class ListNotificationsComponent implements OnInit {
  notifications: Property[] = [] as Property[];
  constructor(
    private propertyService: PropertyService,
    public themeService: ThemeService,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.propertyService.handleGetNotifications().subscribe((Response)=>{
      this.notifications = this.propertyService.notifications;
      console.log(this.notifications);
      
    });

  }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }
}
