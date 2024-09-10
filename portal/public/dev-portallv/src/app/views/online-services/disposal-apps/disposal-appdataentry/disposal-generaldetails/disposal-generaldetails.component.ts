import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,Validators } from '@angular/forms';
import { DisposalSharedclassComponent } from '../../disposal-sharedclass/disposal-sharedclass.component';

@Component({
  selector: 'app-disposal-generaldetails',
  templateUrl: './disposal-generaldetails.component.html',
  styleUrls: ['./disposal-generaldetails.component.css']
})
export class DisposalGeneraldetailsComponent  extends DisposalSharedclassComponent  {
  @Input() dispapplicationGeneraldetailsfrm: FormGroup;

  @Input() isRegisteredProductsWinshow: boolean;
  @Input() registeredProductsData: any;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() status_id: number;
  @Input() trader_id: number;
  @Input() isOtherDisposalClass:boolean;
  @Input() isOtherDisposalReason:boolean;
  @Input() sub_module_id: number;
  @Input() application_code: number;
  isReadOnly:boolean;
  ispremisesSearchWinVisible:boolean;
  registered_premisesData:any;
  is_readonly:boolean;
  isReadOnlyPremise:boolean=false;
  licensed_premise:boolean=false;
  non_licensed_premise:boolean=false;
  isOwnerDisposalSite:boolean=false;
  private isFetchingData = false;

  minDate:Date=new Date();

  ngOnInit() {
    this.dispapplicationGeneraldetailsfrm.get('trader_id').setValue(this.trader_id);

  }

  onRegisteredPremisesSearch() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });

  }  
  onOtherPremisesnChange($event) {
    
    if($event.value == 1){
        this.isReadOnlyPremise = false;
        this.licensed_premise = true;
        this.non_licensed_premise =false;
        this.dispapplicationGeneraldetailsfrm.get('premises_name').setValidators(Validators.required);
        this.dispapplicationGeneraldetailsfrm.get('premises_name').updateValueAndValidity(); 

    }else{
      this.premappService.onLoadApplicant().subscribe(
                (response: any) => {
                  if (response && Array.isArray(response.data) && response.data.length > 0) {
                    const dataItem = response.data[0];
                    this.dispapplicationGeneraldetailsfrm.get('trader_id').setValue(dataItem.id);
                  } 

                  this.isFetchingData = false;
                },
                (error) => {
                  this.isFetchingData = false;
                }
              );
      this.dispapplicationGeneraldetailsfrm.get('premises_name').clearValidators();
      this.dispapplicationGeneraldetailsfrm.get('premises_name').updateValueAndValidity();
      this.isReadOnlyPremise = true;
     
      this.licensed_premise = false;
      this.non_licensed_premise =true

    }
    

  }

  onOtherDisposalProdClassChange($event) {
    
    if($event.selectedItem.id == 4){
        this.isOtherDisposalClass = true;
      this.dispapplicationGeneraldetailsfrm.get('company_disposal_id').setValidators(Validators.required);
      this.dispapplicationGeneraldetailsfrm.get('company_disposal_id').updateValueAndValidity();

    }else{
      this.isOtherDisposalClass = false;
        this.dispapplicationGeneraldetailsfrm.get('company_disposal_id').clearValidators();
        this.dispapplicationGeneraldetailsfrm.get('company_disposal_id').updateValueAndValidity();
    }
    

  }  
  onOwnerProposedSiteChange($event) {
    
    if($event.selectedItem.id == 2){
        this.isOwnerDisposalSite = true;

    }else{
      this.isOwnerDisposalSite = false;
    }
    

  }

   onOtherDisposalReasonsChange($event) {
    
    if($event.selectedItem.id == 2){
        this.isOtherDisposalReason = true;

    }else{
      this.isOtherDisposalReason = false;
    }
    

  }

  funcSelectPremiseDetails(data) {
      this.dispapplicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.dispapplicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;
  
  }
}
