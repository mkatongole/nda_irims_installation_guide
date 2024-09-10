/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gvpapplications.views.forms.Gvpltrfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpltrfrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.down('button[action=link_ltr]').setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Applicant as Local Technical Representative',
            store: 'confirmationstr',
            valueField: 'id',
            columnWidth: 0.4,
            displayField: 'name',
            name: 'applicant_as_ltr',
            queryMode: 'local',
            forceSelection: true,
            value: 2, 
            readOnly:true, // Set the default value here
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        fieldSet = form.down('fieldset[name=ltr_details]');
                    if (newVal == 1 || newVal === 1) {
                        fieldSet.down('button[action=link_ltr]').setDisabled(true);
                        Ext.each(fieldSet.query('field'), function(field) {
                            field.reset();
                        });
                    } else {
                        fieldSet.down('button[action=link_ltr]').setDisabled(false);
                    }
                }
            }
          },
          {
            xtype: 'fieldset',
            title: 'Local Technical Representative Details',
            style: 'background:white',
            name: 'ltr_details',
            columnWidth: 1,
            collapsible: false,
            layout: {
                type: 'column'
            },
            bodyPadding: 5,
            defaults: {
                columnWidth: 0.25,
                margin: 5,
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ltr_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: '_token',
                    value: token
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
                            name: 'ltr_name',
                            readOnly: true,
                            columnWidth: 0.9
                        },
                    
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search LTR',
                            name:'link_ltr',
                            action:'link_ltr',
                            //handler: 'showLTRSelectionList',
                            winTitle: 'LTR Selection List',
                            winWidth: '90%'
                        }
                    ]
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'TIN',
                    readOnly: true,
                    name: 'ltr_tin_no'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'link_country_id',
                    store: 'countriesstr',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    readOnly: true,
                    displayField: 'name',
                    listeners: {
                        beforerender: function () {
                            var store = this.store;
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'link_region_id',
                    store: 'regionsstr',
                    hidden:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    readOnly: true,
                    displayField: 'name',
                    listeners: {
                        beforerender: function () {
                            var store = this.store;
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'District',
                    name: 'link_district_id',
                    readOnly: true,
                    hidden:true,
                    store: 'districtsstr',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: function () {
                            var store = this.store;
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Registration No',
                    readOnly: true,
                    name: 'link_premise_reg_no'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Premise No',
                    readOnly: true,
                    name: 'link_permit_no'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Physical Address',
                    readOnly: true,
                    name: 'link_physical_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    hidden:true,
                    fieldLabel: 'Postal Address',
                    name: 'link_postal_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: 'Telephone',
                    name: 'link_telephone'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax',
                    hidden:true,
                    readOnly: true,
                    name: 'link_fax'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    readOnly: true,
                    hidden:true,
                    name: 'link_email'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    hidden:true,
                    fieldLabel: 'Website',
                    name: 'link_website'
                }
            ]
        }
    ]
});


