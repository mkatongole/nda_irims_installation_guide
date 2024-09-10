/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineDetailsInspectionGrid', {
extend: 'Admin.view.gmpapplications.views.grids.ProductBlockLineAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'productlinedetailsinspectiongrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Previous Recommendation',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        hidden:true,
        name: 'prev_productline_details',
        winTitle: 'Previous GMP Product Line Details',
        childXtype: 'prevproductlinedetailsgrid',
        winWidth: '80%',
        stores: '[]'
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
    }],
    export_title: 'Product line Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid')
                if(grid.up('window')){
                    var win = grid.up('window');
                    if(win.down('gmpassessmentDetailsPnl')){
                      var site_id = win.down('gmpassessmentDetailsPnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                      //section_id = win.down('hiddenfield[name=section_id]').getValue();
                    }
                    else{
                       var site_id = win.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue(),
                       section_id = win.down('hiddenfield[name=section_id]').getValue();
                    
                    }

                }
                else{
                    var mainTabPanel = grid.up('#contentPanel'),
                    activeTab = mainTabPanel.getActiveTab(),
                    site_id = activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue(),
                    section_id = activeTab.down('hiddenfield[name=section_id]').getValue();

                }
               
            store.getProxy().extraParams = {
                manufacturing_site_id: site_id,
                //section_id:section_id
            };
        }
    }],

    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'mansiteblockdetailsstr',
                proxy: {
                    url: 'gmpapplications/getSiteBlockDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
               // add_btn = grid.down('button[name=add_line]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                //add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                //add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    winTitle: 'Product Line Details',
                    childXtype: 'productlinetabpnl',
                    winWidth: '50%',
                    stores: '[]',
                    handler: 'showEditProductLineDetails'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_manufacturing_sites_blocks',
                    storeID: 'mansiteblockdetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [ {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: []
            }
        }
    }],
    leadingBufferZone: 8,
    trailingBufferZone: 8,
   
   plugins: [{
       ptype: 'rowwidget',
           widget: {
                   xtype: 'tabpanel',
                   bind: {
                       title: 'Product Lines'
                   },header:false,
                   tbar:[{
                       xtype: 'hiddenfield',
                       name:'manufacturing_site_id',
                       bind: {
                           value: '{record.manufacturing_site_id}'
                       }
                   },
                   
                   {
                       xtype: 'hiddenfield',
                       name:'block_id',
                       bind: {
                           value: '{record.id}'
                       }
                   }],
                   items:[{
                       xtype:'grid',
                       height: 200,
                       width: '100%',
                       bind: {
                           title: 'Product Lines'
                       },
                       tbar:[{
                           xtype: 'hiddenfield',
                           name:'manufacturing_site_id',
                           bind: {
                               value: '{record.manufacturing_site_id}'
                           }
                       },
                       
                       {
                           xtype: 'hiddenfield',
                           name:'block_id',
                           bind: {
                               value: '{record.id}'
                           }
                       },{
                            xtype: 'button',
                            text: 'Update Product Line Details',
                            iconCls: 'x-fa fa-plus',
                            itemId: 'update_line',
                            name:'update_line',
                            ui: 'soft-green',
                            winWidth: '35%',
                            stores: '[]'
                        }],
                        features: [{
                            ftype: 'searching',
                            minChars: 2,
                            mode: 'local'
                        }],

                        plugins: [{
                            ptype: 'gridexporter'
                        }, {
                            ptype: 'cellediting',
                            clicksToEdit: 1,
                            editing: true
                        },{
                            ptype: 'filterfield'
                        }],
                        listeners: {
                            beforerender: {
                                fn: 'setConfigGridsStore',
                                config: {
                                    pageSize: 1000,
                                    storeId: 'productlinetr', 
                                   
                                    proxy: {
                                        url: 'gmpapplications/getGmpInspectionLineDetails'
                                    }
                                },
                                isLoad: false
                            },
                            afterrender:function(grid){
                                    grid.getStore().load();
                            }
                        },
                        columns: [{
                            xtype: 'rownumberer'
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'product_line_name',
                            text: 'Dosage Form(line type)',
                            flex: 1
                        }, {
                            xtype: 'gridcolumn',
                            dataIndex: 'product_line_category',
                            tdCls:'wrap-text',
                            text: 'Product Category',
                            flex: 1
                        }, {
                            xtype: 'gridcolumn',
                            dataIndex: 'product_line_description',
                            tdCls:'wrap-text',
                            text: 'Dosage Form Description',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'block',tdCls:'wrap-text',
                            text: 'Block',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'activities',
                            text: 'Manufacturing Activity',
                            flex: 2,
                            tdCls: 'wrap-text' 
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'prodline_inspectionstatus_id', 
                            text: 'Inspection Recommendation',
                            flex: 1,
                            tdCls: 'wrap-text',   
                            tdcls: 'editor-text',
                            width: 120,
                            editor: {
                                xtype: 'combo',
                                store: 'gmpproductlinestatusstr',
                                valueField: 'id',
                                displayField: 'name',
                                queryMode: 'local',
                                listeners: {
                                   
                                }
                            },
                            
                            renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                                var textVal = 'Select Inspection Recommendation';
                                if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                                    textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                                }
                                return textVal;
                            }
                        },
                         {
                            xtype: 'gridcolumn',
                            dataIndex: 'inspection_confirmation_id',
                            text: 'Inspection Confirmation',
                            flex: 1,
                            tdCls: 'wrap-text',   
                            tdcls: 'editor-text',
                            width: 110,
                             editor: {
                                xtype: 'combo',
                                queryMode: 'local',
                                valueField: 'id',
                                displayField: 'name',
                                listeners: {
                                    beforerender: {
                                        fn: 'setCompStore',
                                        config: {
                                            pageSize: 1000,
                                            proxy: {
                                                extraParams: {
                                                    table_name: 'par_confirmations'
                                                }
                                            }
                                        },
                                        isLoad: true
                                    }
                                }
                            },
                            
                            renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                                var textVal = 'Select Confirmation';
                                if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                                    textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                                }
                                return textVal;
                            }
                        },


                       {
                        xtype: 'gridcolumn',
                        dataIndex: 'no_inspection_justification', 
                        tdCls: 'wrap-text',
                        text: 'Justification',
                        flex:1,
                        editor: {
                            xtype: 'textareafield'
                        },
                        renderer: function (val) {
                            if (val === '') { 
                                val = 'Justification where inspection wasn’t done';
                            }
                            return val;
                         }
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'product_line_status',
                            text: 'Status',
                            hidden: true,
                            flex: 1
                        }],
                       bbar: [{
                           xtype: 'pagingtoolbar',
                           width: '60%',
                           displayInfo: true,
                           displayMsg: 'Showing {0} - {1} of {2} total records',
                           emptyMsg: 'No Records',
                      
                           beforeLoad: function() {
                               var grid = this.up('grid'),
                                   store= grid.getStore(),
                                   manufacturing_site_id = grid.down('hiddenfield[name=manufacturing_site_id]').getValue();
                                   block_id = grid.down('hiddenfield[name=block_id]').getValue();
                                  
                                   store.removeAll();
                                   store.getProxy().extraParams = {
                                    site_id: manufacturing_site_id,
                                    block_id:block_id
                                          
                                   };
                           }
                       },'->']
                   }

           ]
        }
       
   }]
});


