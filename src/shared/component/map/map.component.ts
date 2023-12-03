import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/shared/service/theme/theme.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  
})
export class MapComponent implements OnInit{
  coordiantes={lat:17.3850,lng:78.4867};
  zoom=5;
  zoomInterval:any;

  constructor(public themeService:ThemeService)
  {}

  ngOnInit(): void {
    setTimeout(()=>{

      this.generateRandomCoodinates();
    },1000)

    this.zoomInterval=setInterval(() => {
      this.incrementZoom();
    }, 1000);

    
    
  
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    clearInterval(this.zoomInterval);
  }
  

  
  /**
   * @function Generates random coorinates around Hyderabad
   */

  generateRandomCoodinates():void{
    const randomLat=this.coordiantes.lat+(Math.random()-0.05);
    const randomLon=this.coordiantes.lng+(Math.random()+0.05);
    this.coordiantes={lat:randomLat,lng:randomLon};
  
  }

  

  /**
   * Increments zoom by 1 every second and destroys to stop it once limit reached
   */
  incrementZoom():void {
    this.zoom += 1;
    if(this.zoom>10)
    {
      this.ngOnDestroy();

    }
  }
  

 

}
