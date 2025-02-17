Ext.define('Admin.view.frontoffice.gvp.container.GvpSpreadSheetCtn',{
    extend: 'Ext.form.Panel',
    alias: 'widget.gvpspreadsheetctn',
    controller: 'spreadsheetgvpctr',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    layout: 'border',
    flex: 1,
    tbar:[
        {
            xtype: 'combobox',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'sub_module',
            width: 200,
            fieldLabel: 'Application Type',
            labelStyle: 'margin-left:20px',
            value: 'New',
            listeners:
             {
                 beforerender: {
                      //getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'sub_modules',
                                filters: '{"module_id":35}'
                            }
                            
                        }
                    },
                    isLoad: true
                },
                beforequery: function() {
                   var store=this.getStore();
                  
                   var all={name: 'All',id:0};
                   if (store) {
                      store.insert(0, all);
                   } else {
                      console.error('Store is not defined.');
                   }
                      
                },
                change: 'reloadSheetStore',
              
             }
         },
        '->',
    { 
        xtype: 'button', 
        text: 'Export Summary',
        name: 'summary',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-cloud-upload', 
        handler: 'func_exportgvpspreadsheet'
    },
    {
        xtype: 'button', 
        text: 'Export Detailed Report(All)',
        name: 'detailed',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-refresh', 
        handler: 'func_exportgvpspreadsheet'
    },
    {
        xtype: 'button', 
        text: 'clear Filter',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-print', 
        handler: 'func_clearfilters'
    }
    ],
    items: [
        {
        xtype: 'panel',
        titleCollapse: true,
        title: 'View Options',
        region:'west',
        collapsible: true, 
        preventHeader: true, 
        width: 200,
        border: true,
        split: true,
        layout: 'border',
        items: [
            {
              xtype: 'spreadsheetgvpapplicationtypes',
              xtype: 'spreadsheetgvpapplicationtypes',
              region: 'north',
               height: 150
            },
            {
                xtype: 'spreadsheetgvpvisiblecolumns',
                height:300,
                region: 'center'
            },
            {
                xtype:'gvpadditionalfiltersview',
                height: 200,
                region: 'south'
            }
            ]
        },
     {
        xtype: 'gvpspreadsheetview',
        region:'center',
     },
     {
        title: 'Additional Information',
        xtype: 'panel',
        collapsible: true, 
        collapsed: true,
        titleCollapse: true,
        width:250,
        split: true,
        autoScroll : true,
        border: true,
        region: 'east',
        layout: 'accordion',
        items:[
            {
                xtype: 'gvpsiteproductsview',
                height: 150
            },
            {
                xtype: 'gvpinspectionteamgrid',
                height: 150
            }
        ]
        }
    ]

    
});