import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConfigurationsService } from '../../../services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit, AfterViewInit  {
  navigation_type_id:number;
  clickedMenuItem: any;
  trader_no:number;
  navOnlineNav:any;
  assets_url:string = AppSettings.assets_url;
  constructor(private configService:ConfigurationsService ) { }

  ngOnInit() {
    this.navigation_type_id =2;
    this.trader_no = 2015;
    this.onLoadNavigation(this.navigation_type_id);
    this.clickedMenuItem = this.configService.getClickedMenuItem(); 

  const storedClickedMenuItem = localStorage.getItem('clickedMenuItem');
    if (storedClickedMenuItem) {
        this.clickedMenuItem = JSON.parse(storedClickedMenuItem);
        localStorage.removeItem('clickedMenuItem');
    }
  }
  ngAfterViewInit(){
   
  }
  loadScripts(){
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = this.assets_url+'js/pikeadmin.js',
      script.async = true;
      script.defer = true;
      body.appendChild(script);
  }
  
  onLoadNavigation(nav_type: number) {
  this.configService.onLoadNavigation(nav_type).subscribe(
    navItems => {
      if (Array.isArray(navItems) && this.clickedMenuItem) {
        const parentItem = navItems.find(item => item.id === this.clickedMenuItem.id);

          if (parentItem && parentItem.children) {
            this.navOnlineNav = parentItem.children;
            localStorage.setItem('clickedMenuItem', JSON.stringify(this.clickedMenuItem));
          } else {
            console.error('Parent item not found for clickedMenuItem:', this.clickedMenuItem);
          }
      }

      
      this.loadScripts();
    },
    error => {
      console.log('Error:', error);
    }
  );
}


}
