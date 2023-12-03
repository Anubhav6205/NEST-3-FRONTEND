import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme:string='light'

  constructor() { }



  /**
   * @function Toggles current application theme
   */
  handleThemeToggle():void
  {
    this.currentTheme=this.currentTheme==='light'?'dark':'light';
  }
}
