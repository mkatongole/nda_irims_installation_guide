/**
 * Created by Kip on 3/6/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.PmsProgramProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pmsprogramproductsfrm',
    controller: 'surveillancevctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        labelAlign: 'top',
        columnWidth: 1
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'program_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
         },

           {
            xtype: 'tagfield',
             fieldLabel: 'Select Product(Generic Name)',
            name: 'product_ids',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            growMax: 100,
            multiSelect: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_common_names'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
        // {
        //     xtype: 'tagfield',1
        //     fieldLabel: 'Select Product(Generic Name)',
        //     margin: '0 20 20 0',
        //     store: 'commonnamesstr',
        //     name: 'product_ids',
        //     allowBlank: false,
        //     forceSelection: true,
        //     filterPickList: true,
        //     encodeSubmitValue: true,
        //     growMax: 100,
        //     queryMode: 'local',
        //     valueField: 'id',
        //     displayField: 'name',
            
        // }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/savePmsProgramProducts',
            table_name: 'pms_program_products',
            storeID: 'pmsprogramproductsstr',
        }
    ]
});