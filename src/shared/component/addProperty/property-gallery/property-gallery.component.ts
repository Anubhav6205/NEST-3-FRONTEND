import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/shared/service/property/property.service';
import { Router } from '@angular/router';
import { User } from 'src/shared/model/User';
import { UserService } from 'src/shared/service/user/user.service';
import { ThemeService } from 'src/shared/service/theme/theme.service';
@Component({
  selector: 'app-property-gallery',
  templateUrl: './property-gallery.component.html',
  styleUrls: ['./property-gallery.component.scss'],
})
export class PropertyGalleryComponent implements OnInit {
  pictureUrls:string[]=[];
  showToast= false;
  toastMessage = '';
  headerMessage = '';

  userData:User={} as User;
  
  constructor(
    public propertyService: PropertyService,
    private router: Router,
    private userService:UserService,
    public themeService:ThemeService

  ) {}

  ngOnInit(): void {
    this.userService.handleGetUserData().subscribe((response:User)=>{
      this.userData=response;
      console.log(this.userData);
      console.log("in ng on init");
      
      

    })
  }

  

  /**
   * 
   * @param event event for Sincgle or group of images , 
   * @returns All images as string[] converted to base64
   */
  async handleImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result as string);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  }
  
  async handleAddPictures(event: Event) {
    console.log('files');
  
    const files = (event.target as HTMLInputElement).files;
    const base64stringsArray: string[] = [];
  
    // Use Promise.all to wait for all promises to resolve
    await Promise.all(
      Array.from(files!).map(async (file: File) => {
        const base64string = await this.handleImageToBase64(file);
        base64stringsArray.push(base64string);
      })
    );
  
    // Now you can proceed with the array of Base64 strings
    this.pictureUrls = base64stringsArray;
    // this.router.navigate(['./enlistProperty/rental']);
  }
  

  /**
   *@function Called after all 3 form pages are fillted, takes current images array and uploades in DB
   */
  handleAddProperty():void
  {
    this.toastMessage=`Property Added.`
    this.headerMessage="Amazing!"
    this.showAndHideToast();
    console.log("passing ");
    

    setTimeout(()=>{
      this.propertyService
      .handleAddProperty(this.pictureUrls,this.userData)
      .subscribe((respone: any) => {
        console.log(respone);
        console.log('is response for adding property');
        this.router.navigate([''])

      });

    },2000)
    
   
  }

  showAndHideToast():void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }

}
