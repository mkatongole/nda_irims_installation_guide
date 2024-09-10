Ext.define('Admin.view.RevenueManagement.views.forms.AdvancedCustomerApplicantDetailsFrm', {
    //extend: 'Admin.view.commoninterfaces.views.forms.ApplicantDetailsCommonFrm',
    extend: 'Ext.form.Panel',
    xtype: 'advancedCustomerApplicantDetailsfrm',
    layout: {
        type: 'column'
    },
    autoScroll: true,
    scrollable: true,
    bodyPadding: 5,
    reference: 'customerFrm',
    itemId: 'customerFrm',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        readOnly: true,
        labelAlign: 'top',
        bind: {
           // disabled: '{isReadOnly}'
        }
    },
     items: [{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Customer Account Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: false,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[
            {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                fieldLabel: 'Applicant Name',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'applicant_name',
                        readOnly: true,
                        columnWidth: 0.9
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-link',
                        columnWidth: 0.1,
                        tooltip: 'Link Applicant',
                        name: 'link_applicant',
                        bind: {
                           disabled: '{isReadOnly}'
                        },
                        handler: 'showCustomerSelectionList'
                    }
                ]
        },{
            fieldLabel: 'Account Type',
            name: 'account_type',
            readOnly:true,
            allowBlank: true,
        },{
            fieldLabel: 'Account Status',
            name: 'account_status',
            readOnly:true,
            allowblank: true,
        }, {
            fieldLabel: 'TIN No',
            name: 'tpin_no',
            allowBlank: true,
            hidden: true,
            xtype: 'textfield',
            labelAlign: 'top'
        },{
            fieldLabel: 'Pacra Reg No',
            name: 'pacra_reg_no',
            hidden: true,
            allowBlank: true,
            xtype: 'textfield',
            labelAlign: 'top'
        }]
    },{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Refund Request',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: true,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[{
            xtype: 'numberfield',
            minimum: 0,
            columnWidth: 0.5,
            fieldLabel: 'Refund Amount',
            allowblank: false,
            name: 'refund_amount'
        } ,{
            xtype: 'combo', 
            anyMatch: true,
            fieldLabel: 'Customer Type',
            margin: '0 20 20 0',
            columnWidth: 0.5,
            name: 'customer_type_id',
            valueField: 'id',
            allowBlank: true,
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setCompStore',
                    config: {
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_customer_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        threshold = form.down('numberfield[name=threshold]');
                    if(newVal == 1){
                        threshold.setVisible(true);
                    }else{
                        threshold.setVisible(false);
                    }

                }

            }
        },{
            xtype: 'numberfield',
            minValue: 0,
            hidden: true,
            name: 'threshold',
            fieldLabel: 'Deposit Threshold (IF Applicable)',
            allowBlank: true
        },{
           xtype: 'htmleditor',
           allowblank: false,
           columnWidth: 1,
           fieldLabel: 'Reason/Justification',
           name: 'reason',
           readOnly: false,
        }
        ]
    },{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Contacts & Location Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: true,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[
            {
                fieldLabel: 'Country',
                name: 'country_name',
                readOnly:true,
                allowBlank: true,
        
            },
          {
            fieldLabel: 'District',
            name: 'district_name',
            readOnly:true,
            allowBlank: true,
    
          }, 
          {
            fieldLabel: 'Region/City/Town',
            name: 'region_name',
            readOnly:true,
            allowBlank: true,
          }, 
          
         {
            fieldLabel: 'Postal Address',
            name: 'app_postal_address',
            readOnly:true,
            allowBlank: true,
    
        }, 
        {
            fieldLabel: 'Telephone NO',
            name: 'app_telephone',
           readOnly:true,
           allowBlank: true,
    
        }, {
            fieldLabel: 'Mobile NO',
            name: 'app_mobile_no',
            xtype: 'textfield',
            labelAlign: 'top',
            allowBlank: true,
           //readOnly:true
        },{
            fieldLabel: 'Physical Address',
            name: 'app_physical_address',
            columnWidth: 1,
            xtype: 'textarea',
            allowBlank: true,
            //readOnly:true
        }]
    },{
        xtype:'fieldset',
        columnWidth: 1,
        title: 'Primary Contact Person Details',
        collapsible: true,
        defaults: {
            labelAlign: 'top',
            //allowBlank: false,
            labelAlign: 'top',
            margin: 5,
            xtype: 'textfield',
            allowBlank: true,
            columnWidth: 0.33,
        },
        layout: 'column',
        items :[{
            fieldLabel: 'Contact Person',
            emptyText: 'Enter Contact Person',
            name: 'contact_person',
            allowBlank: true,
        }, {
            fieldLabel: 'Contact Person Email ',
            maxlength: 9,
            name: 'ltr_email',
            vtype: 'email',
            readOnly:true,
            allowBlank: true,
        },  {
            fieldLabel: 'Contact Person Telephone ',
            maxlength: 9,
            name: 'ltr_telephone',
            readOnly:true,
            allowBlank: true,
        }]
    }, 
    {

        xtype: 'hiddenfield',
        name: 'id'
    }
    , {

        xtype: 'hiddenfield',
        name: '_token',
        value: token
    },{

        xtype: 'hiddenfield',
        name: 'identification_no'
    },{

        xtype: 'hiddenfield',
        name: 'portal_id'
    },
    {

        xtype: 'hiddenfield',
        name: 'applicant_id'
    },
  
]
});