Ext.define('Admin.view.research_operations.views.grids.common.ResearchApprovalsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'researchoperationsvctr',
    xtype: 'researchapprovalsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
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
        selType: 'checkboxmodel'
    },
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
                    beforeLoad: function (store, operation, eOpts) {
                        var grid = this.up('grid'); // Get the reference to the grid
                        var approval_panel= grid.up('panel');
                        var approval_interface = approval_panel.up('researchapprovalinterfacepanel');
                        var workflowStageField = approval_interface.down('hiddenfield[name="workflow_stage_id"]');
                        var workflow_stage_id = workflowStageField.getValue();
                        var extraParams = store.getProxy().extraParams;
                        extraParams.table_name = 'tra_researchoperations_applications';
                        extraParams.workflow_stage_id = workflow_stage_id;
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
                    storeID: 'researchoperationapplicationstr',
                    table_name: 'tra_internalresearch_details',
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
            fn: 'custStoreConfig',
            config: {
                pageSize: 10000,
                storeId: 'approvalsstr',
                proxy: {
                    url: 'researchoperations/getInternalResearchApplicationsAtApproval',
                    params: {
                        table_name: 'tra_researchoperations_applications',
                    },
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                
                //grid.down('button[name=batch_tc_recommendation]').setDisabled(false);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
               // return true;
            } else {
             //   return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
              //  grid.down('button[name=batch_tc_recommendation]').setDisabled(true);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(true);
            }
        }
    },
    tbar:[{
        text:'Batch Approval Recommendation',
            name:'batch_approval_recommendation',
            disabled: true,
            table_name: 'tra_internalresearch_details',
            stores: '["productApprovalDecisionsStr"]',
            handler:'getBatchApplicationApprovalDetails',
            approval_frm: 'batchproductapprovalrecommfrm',
            iconCls: 'x-fa fa-chevron-circle-up',
            margin: 5
  }],
    columns: [
    {
        xtype: 'widgetcolumn',
        text: 'Print',
        width: 150,
        hidden: true,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-certificate',
            ui: 'soft-green',
            text: 'Print Certificate',
            name: 'certificate',
            tooltip: 'Print Certificate',
            backend_function: 'generatePromotionalRegCertificate',
            handler: 'generatePromotionalRegCertificate',
            bind: {
                disabled: '{record.decision_id <= 0 || record.decision_id === null}'
                //disabled: '{record.decision_id !== 1}'
            }
        }
    },
        {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking Number',
        flex: 2
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1,
        hidden: true,
    },  
    {
        xtype: 'gridcolumn',
        dataIndex: 'research_purpose',
        text: 'Purpose',
        flex: 1,
        hidden: true,
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'aim_research',
        text: 'Aim',
        flex: 1
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage',
        text: 'Workflow Stage',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Date Received',
        dataIndex: 'date_received',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    },
        {
            header: 'Manager Recommendation',
            dataIndex: 'recommendation_record_id',
            flex: 2,
            renderer: function (value, metaData,record) {
                var recommendation_record_id = record.get('recommendation_record_id')
                if (recommendation_record_id==1 || recommendation_record_id===1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "Recommended";
                }else if(recommendation_record_id==2 || recommendation_record_id===2){
                    metaData.tdStyle = 'color:white;background-color:red';
                    return "Not Recommended"
              }else if(recommendation_record_id==3 || recommendation_record_id===3){
                    metaData.tdStyle = 'color:white;background-color:blue';
                    return "Request for Additional Information";
               }else{
                 return ' ';
               }
            }
          },  
        {
            xtype: 'gridcolumn',
            dataIndex: 'manager_comment',
            text: 'Manager Comments',
             flex: 1,
            tdCls: 'wrap-text'
        },
        //  {
        //     header: 'Director Recommendation',
        //     dataIndex: 'director_recommendation_id',
        //     flex: 2,
        //     renderer: function (value, metaData,record) {
        //         var director_recommendation_id = record.get('director_recommendation_id')
        //         if (director_recommendation_id==1 || director_recommendation_id===1) {
        //             metaData.tdStyle = 'color:white;background-color:green';
        //             return record.get('director_recomm');
        //         }else if(director_recommendation_id==2 || director_recommendation_id===2){
        //           metaData.tdStyle = 'color:white;background-color:red';
        //           return record.get('director_recomm');
        //       }else if(director_recommendation_id==3 || director_recommendation_id===3){
        //         metaData.tdStyle = 'color:white;background-color:blue';
        //         return record.get('director_recomm');
        //        }else{
        //          return ' ';
        //        }
        //     }
        //   },  
        // {
        //     xtype: 'gridcolumn',
        //     dataIndex: 'director_comment',
        //     text: 'Director Comments',
        //      flex: 2,
        //     tdCls: 'wrap-text'
        // }, 
        {
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Recommendation',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 150,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-red',
            text: 'Approve/Reject',
            iconCls: 'x-fa fa-chevron-circle-up',
            handler: 'getApplicationApprovalDetails',
            stores: '["approvaldecisionsstr"]',
            table_name: 'tra_researchoperations_applications'
        }
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
                        text: 'Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        handler: 'getApplicationApprovalDetails',
                        stores: '["approvaldecisionsstr"]',
                        hidden:true,
                        table_name: 'tra_internalresearch_details'
                    }, 
                    
                    
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showResearchApplicationMoreDetails'
                    },
                    // {
                    //     text: 'Promot Certificate',
                    //      iconCls: 'x-fa fa-certificate',
                    //      hidden:true,
                    //      handler: 'printPromotionalRegCertificate'
                    // },
                    {
                        text: 'Application Details',
                        iconCls: 'x-fa fa-bars',
                        handler: 'onViewApprovalApplicationDetails',//viewPromotionMaterials
                        interfaceXtype: 'newsinglepremiseapproval',
                        hidden: true
                    }
                   
                ]
            }
        }
    }]
});
