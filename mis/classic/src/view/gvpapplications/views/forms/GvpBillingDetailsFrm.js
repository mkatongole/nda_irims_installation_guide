/**
 * Created by Kip on 4/25/2019.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpBillingDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpbillingdetailsfrm',
    controller: 'gvpapplicationsvctr',

    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.33,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.down('button[action=link_personnel]').setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    config:{
        moreDetails: 0
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'personnel_type',
            value: 'gvp_billing_person'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_personnel_information'
        },
        {
            xtype: 'hiddenfield',
            name: 'trader_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'billing_person_id'
        },
         {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'combo',
            store: 'confirmationstr',
            name: 'applicant_as_billingperson',
            fieldLabel: 'Same as the Applicant Address',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
           // value: 2,
            listeners: { 
                afterrender: function (cmbo) {
                    var newVal = cmbo.getValue();
                    if (newVal === null || newVal === '') {
                        cmbo.setValue(2);
                    } else {
                        cmbo.setValue(newVal);
                     }
                  },
                change: function(cmbo,newVal){
                    var form=cmbo.up('form'),
                        fieldSet=form.down('fieldset[name=billing_person]');
                    if(newVal==1||newVal===1){
                        Ext.each(fieldSet.query('field'), function(field) {
                            field.reset();
                            field.setReadOnly(true);
                        });
                        fieldSet.down('button[action=link_personnel]').setDisabled(true);
                    }else{
                        Ext.each(fieldSet.query('field'), function(field) {
                            field.setReadOnly(false);
                        });
                        fieldSet.down('button[action=link_personnel]').setDisabled(false);
                    }
                }
            }
        },
        {
            xtype: 'fieldset',
            title: 'Billing Receipient Details',
            collapsible: false,
            name: 'billing_person',
            columnWidth: 1,
            layout: 'column',
            style: 'background:white',
            defaults: {
                columnWidth: 0.33,
                margin: 4,
                labelAlign: 'top'
            },
            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'contact_name',
                            columnWidth: 0.9,
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-link',
                            columnWidth: 0.1,
                            tooltip: 'Link Personnel',
                            action: 'link_personnel',
                            childXtype: 'traderpersonnelgrid',
                            winWidth: '70%'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    name: 'contact_postal_address',
                    fieldLabel: 'Postal Address',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    name: 'contact_telephone_no',
                    fieldLabel: 'Telephone No',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    name: 'contact_email_address',
                    fieldLabel: 'Email Address',
                    readOnly: true
                }
            ]
        }
    ]
});