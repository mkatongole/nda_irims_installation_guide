Ext.define('Admin.view.promotionmaterials.views.maininterfaces.grids.PromotionMaterialsManagerEvaluationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'promotionmaterialviewcontroller',
	xtype: 'promotionmaterialsmanagerevaluationgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly:1,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
            /*{
                fn:'moveSelectedRecordRowToTop'
            }*/
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar:[
        {
            xtype: 'displayfield',
            value: 'Double click to view more details!!',
            hidden: true,
            fieldStyle: {
                'color':'green'
            }
        }
    ],
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
                    table_name: 'tra_promotion_adverts_applications',
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
                    storeID: 'promotionmaterialapplicationstr',
                    table_name: 'tra_promotion_adverts_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setPromotionMaterialGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'promotionmaterials/getManagerApplicationsGeneric'
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
        },
    },
    columns: [
	{
            xtype: 'gridcolumn',
            dataIndex: 'tracking_no',
            text: 'Tracking Number',
             flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'reference_no',
            text: 'Ref Number',
             flex: 1,
            tdCls: 'wrap-text'
        },  {
            xtype: 'gridcolumn',
            text: 'From',
             hidden:true,
            dataIndex: 'from_user',
             flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
             hidden:true,
            dataIndex: 'to_user',
             flex: 1,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'applicant_name',
            text: 'Applicant',
            hidden:true,
             flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            dataIndex: 'applicant_name',
            text: 'Applicant',
             flex: 1,
            tdCls: 'wrap-text'
        },
    
        {
            xtype: 'gridcolumn',
            dataIndex: 'advertisement_type',
            text: 'Advertisement Type',
             flex: 1,
            tdCls: 'wrap-text'
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'description_of_advert',
            text: 'Description of Advertisement',
             flex: 1,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            hidden:true,
            dataIndex: 'venue_of_exhibition',
            text: 'Venue of the Advertisement/Exhibition',
             flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            hidden:true,
            dataIndex: 'exhibition_start_date',
            text: ' Advertisement/Exhibition Start Date',
             flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            hidden:true,
            dataIndex: 'exhibition_start_date',
            text: ' Advertisement/Exhibition End Date',
             flex: 1,
            tdCls: 'wrap-text'
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'sponsor_name',
            hidden:true,
            text: 'Sponsor Name',
             flex: 1,
            tdCls: 'wrap-text'
        }, 	
        {
            xtype: 'gridcolumn',
            dataIndex: 'workflow_stage',
             hidden:true,
            text: 'Workflow Stage',
             flex: 1,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Application Status',
             flex: 1,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            hidden:true,
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
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
                    items: [{
                        text: 'Request for Additional Information',
                        iconCls: 'x-fa fa-file-pdf-o',
                        handler: 'showApplicationQueries'
                    },{
                        xtype: 'button',
                        text: 'Return Back Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-green',
                        hidden:true,
                        storeID: 'productManagerMeetingStr',
                        table_name: 'tra_premises_applications',
                        action: 'process_returnsubmission_btn',
                        winWidth: '50%',
                        toaster: 0
                    },{
                        text: 'Preview Application Details',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Preview Record',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Promotional & Advertisements Information',
                        winWidth: '70%',
                        isReadOnly:1,
                        handler: 'showPromotionAndAdvertsApplicationMoreDetailsOnDblClick'
                    },{
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '70%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousUploadedDocs'
                    }, ,{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',
                        hidden:true,
                        handler: 'showApplicationChecklists'
                    }]
                }
            }
        }]
});
