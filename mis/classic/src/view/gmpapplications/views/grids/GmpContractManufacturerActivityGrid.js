/**
 * Created by Kip on 4/2/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpContractManufacturerActivityGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpcontractmanufactureractivitygrid',
    itemId: 'gmpcontractmanufactureractivitygrid',
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
        text: 'Add Contracted Gmp Site',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        action: 'add',
        winTitle: 'Contracted Site Selection',
        childXtype: 'contractmanufacturingfrm',
        winWidth: '80%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    },{
        xtype: 'tbspacer',
        width: 20
    }
],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: {
            fn: function () {
                this.up('grid').fireEvent('refresh', this);
            }
        }
        
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                proxy: {
                    url: 'gmpapplications/getGmpContractManufacturerDetails',
                }

            },
            isLoad: true,
        },
    },
    columns: [
        {
            xtype:'gridcolumn',
            text:'id',
            dataIndex:'id',
            hidden:true,
        },
        {
            xtype: 'gridcolumn',
            text: 'RefId',
            width: 70,
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view){

                return rowIndex + 1; 
            }
        },
        {
            xtype:'gridcolumn',
            text: 'Contract Activity',
            dataIndex: 'contract_activity',
            flex: 1,
        },
        {
            xtype:'gridcolumn',
            text: 'Name of Contracted Site',
            dataIndex: 'contracted_site_name',
            flex: 1,
        },
        {
            xtype: 'gridcolumn',
            text:  'Country',
            dataIndex: 'country',
            flex: 1,
        },
        {
            xtype: 'gridcolumn',
            text: 'Region',
            dataIndex:'region',
            flex: 1,
        },
        {
            xtype: 'gridcolumn',
            text: 'Inspection Activity',
            dataIndex: 'inspection_activity',
            flex: 1,
        },
        {
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
                items: [
                    {
                        text: 'Edit',
                        iconCls: 'x-fa fa-eye',
                        handler: 'showContractManufacturerSplitButton'
                    },
                    {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        table_name: 'tra_gmp_contractmanufacturing_sites',
                        storeID: 'mansiteblockdetailsstr',
                        action_url: 'gmpapplications/deleteGmpUnnestedData',
                        action: 'actual_delete',
                        handler: 'doDeleteGmpApplicationWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                ]
            }
        }
    }
    ]
});
