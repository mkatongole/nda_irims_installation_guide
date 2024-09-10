
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopOtherLicensesDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopotherlicensesdetailsfrm',
    itemId: 'drugshopotherlicensesdetailsfrm',
    autoScroll: true,
    controller: 'premiseregistrationvctr',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        labelAlign: 'right',
        labelWidth: 135,
        margin: 5,
        xtype: 'textfield',
        width: '100%',
    },
    layout: {
        type: 'vbox'
    },
    layout: 'vbox',
    items: [{
            xtype: 'hidden',
            name: '_token',
            value: token
        },{
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_other_premises'
        },
        {
            xtype: 'hidden',
            name: 'premise_id'
        }, {   
            xtype: 'hiddenfield',
            name: 'applicant_id',
        },{
            xtype: 'hidden',
            name: 'other_premise_id'
        }, 
        {
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Premise Details',
              allowBlank: false,
              readOnly: true,
              labelAlign: 'right',
              labelWidth: 135,
              name: 'name',
              columnWidth: 0.9
          },{
                xtype: 'button',
                columnWidth: 0.1,
                tooltip: '  Select Premise',
                iconCls: 'x-fa fa-link',
                childXtype: 'showotherpremisepermitdetailsGrid',
                winTitle: 'Approved Premises',
                winWidth: '90%',
                handlerFn: 'loadSelectedAmmendmentPremise',
                handler: 'showOtherPremiseSearch'
          }]
    },
      
       {
            xtype: 'textfield',
            fieldLabel: 'Permit No',
            name: 'permit_no',
            readOnly: true
         },

         {
            xtype: 'textfield',
            fieldLabel: 'Premise Name',
            name: 'name',
            readOnly: true
         },

         
           {
            xtype: 'datefield',
            format: 'Y-m-d H:i:s',
             disabled:true,
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            name: 'approval_date',
            fieldLabel: 'Approval Date',
            allowBlank: false
        },
       {
            xtype: 'datefield',
            format: 'Y-m-d H:i:s',
             disabled:true,
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            name: 'expiry_date',
            fieldLabel: 'Expiry Date',
            allowBlank: false
         }
       
       ],
    buttons: [{
        text: 'Save',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        formBind: true,
        action_url: 'configurations/saveConfigCommonData',
        handler: 'doCreatePremiseRegParamWin',
        table_name: 'tra_other_premises',
        storeID: 'otherpremisesdetailsstr'
    }]
});