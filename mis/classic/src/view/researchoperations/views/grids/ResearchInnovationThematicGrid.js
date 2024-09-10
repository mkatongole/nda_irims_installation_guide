
Ext.define('Admin.view.research_operations.views.grids.ResearchInnovationThematicGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'researchoperationsvctr',
    xtype: 'researchinnovationthematicgrid',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_active = record.get('is_active');
            if (is_active==1 || is_active==1) {
                return 'valid-row';
            }else{
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        allowDeselect: true
    },
    tbar: [
    {
        xtype: 'button',
        text: 'Add Research Theme',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'addagendatabpnl',
        winTitle: 'Adding a Research Theme',
        winWidth: '60%',
        stores: '[]'
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        hidden: true,
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);	
        }

    }],


    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    width: '30%',
                    table_name: 'tra_gmp_applications',
                    doRefresh: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    },
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->', {
                    xtype: 'button',
                    text: 'Print Meeting Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    hidden: true,
                    table_name: 'tra_gmp_applications',
                    handler: 'exportMeetingDetails',
                    toaster: 1
                }, 
                {
                    xtype: 'button',
                    text: 'Save Meeting Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    name: 'save_button',
                    table_name: 'tra_researchinnovation_meeting_details',
                    toaster: 1
                },
                {
                    xtype: 'button',
                    text: 'Submit Application',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: false,
                    gridXtype:'researchinnovationthematicgrid',
                    action: 'process_submission_btnn',
                    winWidth: '50%'
                }
            ]
        }
    ],
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
                storeId: 'grantsApplicationStr',
                proxy: {
                    url: 'researchoperations/getMeetingThematicDetails',
                }
            },
            isLoad: true,
            autoLoad: true,
        }
        
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Thematic Area',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },
        {
            xtype: 'widgetcolumn',
            width: 150,
            hidden: true,
            widget: {
                width: 150,
                textAlign: 'left',
                xtype: 'button',
                ui: 'soft-red',
                text: 'Recommendation & Thematic Documents',
                iconCls: 'x-fa fa-retweet',
                handler: 'showResearchInnovationThematicRecommendation',
                childXtype: 'researchinnovationtcrecommendationpnl',
                winTitle: 'Thematic Recommendation',
                winWidth: '70%',
                stores: '["tcrecommendationdecisionsstr"]',
                name: 'recommendation',
                itemId: 'recomendationbtnresearchoperations',
                

            }
        },
        {
            xtype: 'widgetcolumn',
            text: 'Options',
            width: 100,
            widget: {
                textAlign: 'left',
                xtype: 'splitbutton',
                ui: 'gray',
                width: 75,
                iconCls: 'x-fa fa-th-list',
                // text: 'Action',
                menu: {
                    xtype: 'menu',
                    items: [
                        {
                        text: 'Edit Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Details',
                        handler: 'showEditThematicDetailsSplitButton'
                        }
                    ]
                }
            }
    
        }
    ],
    
    renderTo: Ext.getBody(),

});
