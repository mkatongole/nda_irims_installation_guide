Ext.define('Admin.view.reports.appsreport.drugshopreport.panel.DrugshopReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'drugshopreportpnl',
    margin: 2,
    layout: 'border',
    controller: 'productreportctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [
     {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 29
        },
      {
            xtype: 'drugshopreportfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'drugshoptabpnl',
            region: 'center'
        }],
   bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Summary Report',
            iconCls: 'x-fa fa-print',
            handler: 'printDrugshopSummary',
           
            
        },
        //  {
        //     xtype:'externalExportBtn',
        //     ui: 'soft-green',
        //     text: 'Export',
        //     iconCls: 'x-fa fa-file',
        //     containerName: 'panel',
        //     gridName: 'producttabularrepresentationgrid' 
           
        // },
          {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Summary Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportDrugshopSummaryReport',
            xFileName: 'ProductSummaryReport'
           
        },
        '->',
        {
            xtype: 'combo',
            fieldLabel: 'Process',
            labelAlign : 'left',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            margin: '0 ,0 ,0 ,0',
            name: 'classification_process',
            allowBlank: false,
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                   config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_process_classifications',
                           // filters: JSON.stringify({'module_id':29})
                        }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                                var store=this.getStore();
                            
                                },
                                
                afterrender: 'pickFirstEntryOnCombo',
                change: 'func_toggleExportBtn'
            }
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Preview & Export Detailed Report',
            handler: 'ExpDrugshopWinShow',
            childXtype: 'detaileddrugshopreportfiltersfrm',
            winTitle: 'Export Detailed Report',
            name: 'DetailedExport',
            module: 'premiseWin',
            winWidth: '70%',
            xFileName: 'DrugshopDetailedReport',
            xPrintFunc: 'premiseDetailedReportPreview',
            xspreadsheet: 'detaileddrugshopviewgrid',
            xvisibleColumns: 'detaileddrugshopcolumnsfrm',
            xheading:'Drug Shop Application Detailed Report'
            
            
        }

       
    ]
     }
    ],

 });