
Ext.define('Admin.view.gvpapplications.views.grids.GvpMdProductLineDetailsGrid', {
   extend: 'Admin.view.gvpapplications.views.grids.GvpProductBlockLineAbstractGrid',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpmdproductlinedetailsgrid',
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
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Block & Product Line',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-blue',
        name: 'add_line',
        winTitle: 'GVP Product Line Details',
        childXtype: 'mdproductlinetabpnl',
        winWidth: '50%',
        stores: '[]'
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
            var store=this.getStore(),
                grid=this.up('grid'),
                 mainTabPanel = grid.up('#contentPanel');
                 if(mainTabPanel){
                  var activeTab = mainTabPanel.getActiveTab(),
                 site_id = activeTab.down('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                 }else{
                  var  win = grid.up('window'),
                  site_id = win.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue();
                 }
                
             store.getProxy().extraParams={
                manufacturing_site_id: site_id
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
                    url: 'gvpapplications/getSiteBlockDetails'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_line]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    winTitle: 'Product Line Details',
                    childXtype: 'mdproductlinetabpnl',
                    winWidth: '60%',
                    stores: '[]',
                    handler: 'showEditProductLineDetails'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_manufacturing_sites_blocks',
                    storeID: 'mansiteblockdetailsstr',
                    action_url: 'gvpapplications/deleteGvpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGvpApplicationWidgetParam',
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
                       }],
                        features: [{
                            ftype: 'searching',
                            minChars: 2,
                            mode: 'local'
                        }],
                      
                        listeners: {
                            beforerender: {
                                fn: 'setConfigGridsStore',
                                config: {
                                    pageSize: 1000,
                                    storeId: 'productlinetr', 
                                   
                                    proxy: {
                                        url: 'gvpapplications/getGvpInspectionLineDetails'
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
                          },
                          {
                            xtype: 'gridcolumn',
                            dataIndex: 'medical_device_family_name',
                            text: 'Medical Device Group/Family Name',
                            flex: 1
                        }, {
                            xtype: 'gridcolumn',
                            dataIndex: 'sterile_category',
                            tdCls:'wrap-text',
                            text: 'Sterile/Non-sterile',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'invasive_category',
                            tdCls:'wrap-text',
                            text: 'Invasive/Non- Invasive device',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'active_category',
                            tdCls:'wrap-text',
                            text: 'Active/Active',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'medicated_category',
                            tdCls:'wrap-text',
                            text: 'Medicated/Non-medicated',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'product_line_description',
                            tdCls:'wrap-text',
                            text: 'Device Description',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'block',tdCls:'wrap-text',
                            text: 'BLOCK',
                            flex: 1
                        },{
                            xtype: 'gridcolumn',
                            dataIndex: 'activities',
                            text: 'MANUFACTURING ACTIVITY',
                            flex: 2,
                            tdCls: 'wrap-text'
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


