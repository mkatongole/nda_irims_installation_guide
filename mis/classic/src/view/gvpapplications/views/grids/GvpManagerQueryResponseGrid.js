/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpManagerQueryResponseGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ManagerQueryAbstractGrid',
    xtype: 'gvpmanagerqueryresponsegrid',
    is_manager_query: 0,
    is_manager_query_response: 1,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'single',
        checkOnly: 'true',
        toggleOnClick: true,
        allowDeselect: true
    },
    listeners: {
        beforerender: {
            fn: 'setGvpApplicationGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gvpapplications/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'combo',
        fieldLabel: 'GVP Type',
        valueField: 'id',
        name: 'gvp_type_id',
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
                fn: 'setGvpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GvpType'
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
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'displayfield',
        value: 'Only single selection allowed',
        fieldStyle: {
            'color': 'red',
            'font-weight': 'bold'
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
                    table_name: 'tra_gvp_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    table_name: 'tra_gvp_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'gvp_type_txt',
        text: 'GVP Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
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
                        text: 'Queries/Responses',
                        iconCls: 'x-fa fa-cubes',
                        handler: 'showApplicationQueries',
                        childXtype: 'applicationunstructuredqueriesgrid'
                    },
                    {
                        text: 'Inspection Report',
                        iconCls: 'x-fa fa-exchange',
                        handler: 'printManagersReport',
                        report_type: 'manager_evaluation'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showGvpApplicationMoreDetails'
                    },{
                        text: 'View  Online Assessment Tool',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        winTitle: 'Online Assessment Tool Details',
                        handler: 'showGVPAssessmentToolDetails'
                    }, 
                    {
                        text: 'Compare Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'compareGvpApplicationDetails'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});