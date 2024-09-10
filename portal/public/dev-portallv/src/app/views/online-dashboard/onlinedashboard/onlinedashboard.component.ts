import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { NavigationItems } from 'src/app/models/sharedpublicmdl.model';
import { ConfigurationsService } from '../../../services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { DxDataGridComponent, DxScrollViewModule } from 'devextreme-angular';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-onlinedashboard',
  templateUrl: './onlinedashboard.component.html',
  styleUrls: ['./onlinedashboard.component.css']
})
export class OnlinedashboardComponent implements OnInit, AfterViewInit{
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxScrollViewModule)
  filteredMenuItems:any[];
  navigation_type_id:number;
  isViewApplicationDueforRenewal:boolean = false;
  menuId: number
  module_id:number;
  trader_no:number;
  navResults:any;
  app_route:any;
  navItems:NavigationItems;
  assets_url:string = AppSettings.assets_url;
  singleServicesDataset:any;
  isPreviewsingleServicesDataset:boolean;
  app_renewalduenotifications:number=0;
  app_renewalduenotificationsdetails:any;
    currentDate: Date = new Date();
  isCalendarVisible: boolean = false;

  constructor(private configService:ConfigurationsService,public toastr: ToastrService,private router:Router,private utilityService:Utilities,private spinner:SpinnerVisibilityService ) { }
    toggleCalendarVisibility(isVisible: boolean) {
    this.isCalendarVisible = isVisible;
  }
  ngOnInit() {
    this.navigation_type_id =2;
    this.trader_no = 2015;
    this.onLoadNavigation(this.navigation_type_id);
    this.onLoadApplicationCounterDueforRenewal();
  

  }
  ngAfterViewInit(){
   
  }

  onLoadNavigation(nav_type:number){
    this.configService.onLoadNavigation(nav_type)
   .subscribe(
     navItems => {
        this.navResults = navItems;

     },
     error => {
       console.log('No Results');
     });
}  
  funcPreviewGuidelines(menuId){
      this.onLoadsingleServicesDataset(menuId);
      this.isPreviewsingleServicesDataset = true;
  } 
  onLoadsingleServicesDataset(menuId){
  this.spinner.show();
  this.configService.onLoadOnlineServicesDataset(menuId)
    .subscribe(
      data => {
          this.spinner.hide();
          this.singleServicesDataset = data;
      },
      error => {
        this.spinner.hide();
        console.log('No Results');
      });
}  
onServiceGridPreparing(e){
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Online Services',
      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  } refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  onLoadApplicationCounterDueforRenewal(){
    this.utilityService.getApplicationUniformDetails({},'onLoadApplicationCounterDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotifications =  resp_data.app_renewalduenotifications;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
    onLoadApplicationDetailsDueforRenewal(){
    if(this.app_renewalduenotifications <1){
      this.toastr.error('There is no application due for expiry (3months)!!', 'Alert!');
      return;
    }
    this.utilityService.getApplicationUniformDetails({},'onLoadApplicationDetailsDueforRenewal')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.app_renewalduenotificationsdetails =  resp_data.app_renewalduenotificationsdetails;
            this.isViewApplicationDueforRenewal = true;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  
  onMenuItemClick(menuId){ 
    const clickedMenuItem = this.navResults.find(item => item.id === menuId);
      if(clickedMenuItem){
      localStorage.setItem('clickedMenuItem', JSON.stringify(clickedMenuItem));
      this.configService.onLoadClickedMenuItem(clickedMenuItem); // Store the clicked menu item
      this.app_route = ['./online-services'];
      this.router.navigate(this.app_route)
      }else{
        console.error('No menu item found for menuId:', menuId);
      }



   }

funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}
}
