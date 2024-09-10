/**
 * Created by Softclans
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductRegInOtherCountriesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productreginothercountriesfrm',
    controller: 'configurationsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_otherstates_productregistrations',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'combo',
            name: 'active_common_name_id',
            allowBlank: true,
            hidden:true,
            fieldLabel: 'Generic ATC Name',
            queryMode: 'local',
            valueField: 'common_name_id',
            displayField: 'generic_name',
            listeners: {
                    afterrender: {
                        fn: 'setConfigCombosProductfilterStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'productregistration/onLoadCopackedProductDetails'
                            }
                        },
                        isLoad: true
                    }
                }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCountriesByStateRegions'
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        approving_authorityStore = form.down('combo[name=approving_authority_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        approving_authorityStore.removeAll();
                        approving_authorityStore.load({params: {filters: filterStr}});
                       
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Approving Authority',
            name: 'approving_authority_id',
            allowBlank: true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_approving_authority'
                                }
                            }
                     },
                    isLoad: false
                }
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Registration Date',
            format: 'Y-m-d',
            allowBlank: false,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'date_of_registration',
            maxValue: new Date() 
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Registration Reference',
            allowBlank: false,
            name: 'registration_ref'
        },
         {
            xtype: 'combo',
            fieldLabel: 'Current Registration Status(Active, Withdrawn)',
            name: 'current_registrationstatus',
            allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_current_reg_status'
                                }
                            }
                     },
                    isLoad: true
                }
            }
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_otherstates_productregistrations',
                    storeID: 'productreginothercountriesStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});