/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpCustomerConfirmationGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid',
    xtype: 'gmpcustomerconfirmationgrid',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    selModel: {
        selType: 'checkboxmodel'
    },
     features:[
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: '{[values.rows[0].data.inspection_details]} [{rows.length}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        },{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
     }
    ],
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'combo',
        fieldLabel: 'GMP Type',
        valueField: 'id',
        name: 'gmp_type_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 300,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setGmpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GmpType'
                        }
                    }
                },
                isLoad: true
            },
            change: 'reloadParentGridOnChange'
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
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
                    width: '60%',
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
                '->',
                {
                    xtype: 'button',
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    hidden:true,
                    name: 'save_btn',
                    table_name: 'tra_gmp_applications',
                    toaster: 1
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'inspection_details',
                proxy: {
                    url: 'gmpapplications/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    columns: [
     {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type', 
        tdCls: 'wrap-text',
        text: 'Inspection Type',
        flex:1
      },
      {
        xtype: 'gridcolumn',
        dataIndex: 'start_date', 
        tdCls: 'wrap-text',
        text: 'Start Date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        flex:1
      },
      {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_days', 
        tdCls: 'wrap-text',
        text: 'No of Inspection Days',
        flex:1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'end_date',
            text: 'End Date',
            tdCls: 'wrap-text',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        },
         {
            xtype: 'gridcolumn',
            dataIndex: 'client_rejection_reason',
            text: 'Client Rejection Reason',
            flex: 2,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'client_preferred_start_date',
            text: 'Preferred Start Date',
            tdCls: 'wrap-text',
            flex: 2,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
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
                            text: 'Preview Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'showGmpApplicationMoreDetails'
                        },{
                            text: 'Application Documents',
                            iconCls: 'x-fa fa-file',
                            tooltip: 'Application Documents',
                            action: 'edit',
                            childXtype: '',
                            winTitle: 'Application Documents',
                            winWidth: '80%',
                            isReadOnly: 1,
                            document_type_id: '',
                            handler: 'showPreviousUploadedDocs'
                        }, 
                        {
                            text: 'Dismiss/Cancel Application',
                            iconCls: 'x-fa fa-thumbs-down',
                            hidden:true,
                            handler: 'showApplicationDismissalForm'
                        }
                    ]
                }
            }
        }]
});