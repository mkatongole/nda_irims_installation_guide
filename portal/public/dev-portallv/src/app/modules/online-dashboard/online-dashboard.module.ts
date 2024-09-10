import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { OnlinedashboardRoutingModule } from 'src/app/routes/online-dashboard/onlinedashboard-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular5-data-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { ArchwizardModule } from 'ng2-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { HttpClientModule } from '@angular/common/http';
import { DxActionSheetModule, DxFileUploaderModule, DxPieChartModule, DxChartModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxRadioGroupModule, DxScrollViewModule, DxDropDownBoxModule, DxHtmlEditorModule, DxTagBoxModule, DxTabPanelModule } from 'devextreme-angular';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { OnlinedashboardComponent } from '../../views/online-dashboard/onlinedashboard/onlinedashboard.component';
import { OnlineheaderComponent } from '../../views/online-dashboard/onlineheader/onlineheader.component';
import { OnlinefooterComponent } from '../../views/online-dashboard/onlinefooter/onlinefooter.component';
import { OnlineLayoutComponent } from '../../views/online-dashboard/online-layout/online-layout.component';
import { OnlineNavigationComponent } from '../../views/online-dashboard/online-navigation/online-navigation.component';

@NgModule({
  declarations: [
    OnlinedashboardComponent,
    OnlineheaderComponent,
    OnlinefooterComponent,
    OnlineLayoutComponent,
    OnlineNavigationComponent
    ],
  imports: [
    CommonModule,
    OnlinedashboardRoutingModule,
    RouterModule,
    FormsModule,
    ArchwizardModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        timeOut: 3500,
        positionClass: 'toast-top-right',
        preventDuplicates: true
      }),
    HttpModule, DataTableModule.forRoot(),
    SharedModulesModule,
    NgxDatatableModule,
    DataTablesModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    ModalDialogModule.forRoot(),
    DxFileUploaderModule, DxPieChartModule, DxNumberBoxModule,DxChartModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule,DxScrollViewModule,
    DxHtmlEditorModule,DxTabPanelModule,
    DxDropDownBoxModule,DxTagBoxModule,
    DxRadioGroupModule,
    SafePipeModule
  ],
    exports: [
    OnlinedashboardRoutingModule
  ]
})
export class OnlineDashboardModule { }
