import { Component, OnInit } from '@angular/core';
import { Property } from 'src/shared/model/Property';
import { User } from 'src/shared/model/User';
import { ThemeService } from 'src/shared/service/theme/theme.service';
import { UserService } from 'src/shared/service/user/user.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.scss'],
})
export class ListPropertiesComponent implements OnInit {
  landlordProperties: Property[] = [] as Property[];

  constructor(
    private userService: UserService,
    public themeService: ThemeService,
    private location:Location
  ) {}

  /**
   * Sends current user as parameter and gets its properties Details
   */
  ngOnInit(): void {
    console.log('before properties getting');

    this.userService.handleGetUserData().subscribe((response: User) => {
      this.landlordProperties = response.propertiesDetails!;
      console.log(this.landlordProperties);
      console.log('gettig user properties');
    });

    // this.currentImage = this.landlordProperties.propertyGallery![this.currentIndex];
    // this.userService.handleGetUserData().subscribe((response:User)=>{
    //   this.currentUserId=response.id!;

    // })
  }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }
}
