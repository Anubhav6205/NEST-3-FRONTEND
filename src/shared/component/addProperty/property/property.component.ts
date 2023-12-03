import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ThemeService } from 'src/shared/service/theme/theme.service';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent {
  relativeTo: string | null = null;
  constructor(public themeService:ThemeService,private location:Location)
  {

    

  }

  handleNavigateBack() {
    // this.router.navigateBack();
    this.location.back();
  }

}
