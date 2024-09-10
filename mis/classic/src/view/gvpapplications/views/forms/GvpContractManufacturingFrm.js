/**
 * Created by Kip on 4/25/2019.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpContractManufacturingFrm', {
    extend: 'Ext.form.Panel',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpcontractmanufacturingfrm',
    itemId: 'gvpcontractmanufacturingfrm',

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
    listeners:{
        afterrender: function(){
            var form = this
                gvp_site_id = form.down('hiddenfield[name=gvp_site_id]').getValue()
                if(gvp_site_id){
                    Ext.Ajax.request({
                        url: 'gvpapplications/getIndexGvpContractManufacturerDetails',
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        params:{
                            gvp_site_id: gvp_site_id,
                        },
                        success: function(response){
                            var result = Ext.decode(response.responseText)
                            model = Ext.create('Ext.data.Model', result)
                            form.getForm().loadRecord(model)
                        },

                        failure: function (form, action) {
                            toastr.error('Failed to retrieve data!', 'Failure Response');
                        }

                    })
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
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype:'hiddenfield',
            name:'cmd_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gvp_site_id',
        },
        {
            xtype: 'combo',
            name: 'contracted_or_contractor_id',
            fieldLabel: 'Is this site conducting all Pharmacovigilance Activities or has it contracted another site for some activities?',
            valueField: 'id',
            value: 1,
            columnWidth: 1,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false,
            readOnly: true,
            listeners: {
                 beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_gvp_contractdetails'
                                }
                            }
                        },
                        isLoad: true
                    }
            }
        },
        {
            xtype: 'fieldset',
            title: 'Contracted Gvp Site Activity Details',
            collapsible: false,
            name:'details_fieldset',
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
                    name: 'man_site_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name of Site',
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'contract_manufacturer_name',
                            columnWidth: 0.9,
                            readOnly: true
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            name: 'search_site',
                            childXtype: 'gvpsitesselectiongrid',
                            winTitle: 'Gvp Sites Selection List',
                            winWidth: '90%',
                            stores: '[]'
                        }
                    ],
                    
                },
                {
                    xtype: 'textfield',
                    name: 'contract_physical_address',
                    fieldLabel: 'Physical Address of Site',
                    readOnly: true
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'contract_country_id',
                    allowBlank:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    readOnly: true,
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/country'
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'contract_region_id',
                    allowBlank:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    readOnly: true,
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'parameters/region'
                                }
                            },
                            isLoad: true
                        }
                    }
                },  
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name of Contact Person',
                    readOnly: true,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'contract_personnel_name',
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
                },{
                    xtype: 'textfield',
                    name: 'contract_telephone_no',
                    fieldLabel: 'Telephone No of Contact Person',
                    readOnly: true
                },
                 {
                    xtype: 'textfield',
                    name: 'contract_email_address',
                    fieldLabel: 'Contact Person Email Address',
                    readOnly: true,
                }
                
          ]
        },

        {
            xtype: 'fieldset',
            title: 'Gvp Activity',
            collapsible: false,
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
                    xtype: 'combo',
                    name: 'gvp_activity_id',
                    fieldLabel: 'Gvp Activity Details to be inspected.',
                    valueField: 'id',
                    columnWidth: 1,
                    displayField: 'name',
                    queryMode: 'local',
                    forceSelection: true,
                    allowBlank: false,
                    listeners: {
                             beforerender: {
                                    fn: 'setConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            url: 'commonparam/getCommonParamFromTable',
                                            extraParams: {
                                                table_name: 'par_gvpinspection_activities'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                        }
                 }
                
          ]
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_gvp_contractmanufacturing_sites',
                    name: 'save_btn',
                    ui: 'soft-purple',
                    action_url: 'gvpapplications/saveGvpSitesContractManufacturers',
                },
                {
                    text: 'Reset',
                    iconCls: 'x-fa fa-times',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        console.log(btn.up('form'));
                        btn.up('form').getForm().reset();
                    }
                },
                
            ]
        }
    ]
});