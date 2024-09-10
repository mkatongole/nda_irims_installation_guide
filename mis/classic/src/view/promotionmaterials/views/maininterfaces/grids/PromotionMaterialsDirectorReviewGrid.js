Ext.define('Admin.view.promotionmaterials.views.maininterfaces.grids.PromotionMaterialsDirectorReviewGrid', {
	xtype:'promotionmaterialsdirectorreviewgrid',
    extend: 'Ext.grid.Panel',
    controller:'promotionmaterialviewcontroller',
    
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
         getRowClass: function (record, rowIndex, rowParams, store) {
            var director_recommendation_id = record.get('director_recommendation_id');
            if (director_recommendation_id > 0) {
                return 'valid-row';
            } else {
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
            fn: 'setCustomPromotionMaterialGridsStore',
            config: {
               storeId: 'promotionmaterialsdirectorreviewgridStr',
                proxy: {
                    url: 'promotionmaterials/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        },select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
         beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('director_recommendation_id');
            if (recommendation_id > 0) {
                return true;
            } else {
                return false;
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
             flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            dataIndex: 'applicant_name',
            text: 'Applicant',
            hidden:true,
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
            dataIndex: 'venue_of_exhibition',
            hidden:true,
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
            dataIndex: 'exhibition_start_date',
            hidden:true,
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
            text: 'Workflow Stage',
             hidden:true,
             flex: 1,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Application Status',
             flex: 1,
            tdCls: 'wrap-text',
            hidden:true,
        },
        {
            header: 'Manager Recommendation',
            dataIndex: 'review_recommendation_id',
            flex: 2,
            renderer: function (value, metaData,record) {
                var review_recommendation_id = record.get('review_recommendation_id')
                if (review_recommendation_id==1 || review_recommendation_id===1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return record.get('review_recomm');
                }else if(review_recommendation_id==2 || review_recommendation_id===2){
                  metaData.tdStyle = 'color:white;background-color:red';
                  return record.get('review_recomm');
              }else if(review_recommendation_id==3 || review_recommendation_id===3){
                metaData.tdStyle = 'color:white;background-color:blue';
                return record.get('review_recomm');
               }else{
                 return ' ';
               }
            }
          },  
        {
            xtype: 'gridcolumn',
            dataIndex: 'manager_comment',
            text: 'Manager Comments',
             flex: 2,
            tdCls: 'wrap-text'
        },
         {
            header: 'Director Recommendation',
            dataIndex: 'director_recommendation_id',
            flex: 2,
            renderer: function (value, metaData,record) {
                var director_recommendation_id = record.get('director_recommendation_id')
                if (director_recommendation_id==1 || director_recommendation_id===1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return record.get('director_recomm');
                }else if(director_recommendation_id==2 || director_recommendation_id===2){
                  metaData.tdStyle = 'color:white;background-color:red';
                  return record.get('director_recomm');
              }else if(director_recommendation_id==3 || director_recommendation_id===3){
                metaData.tdStyle = 'color:white;background-color:blue';
                return record.get('director_recomm');
               }else{
                 return ' ';
               }
            }
          },  
        {
            xtype: 'gridcolumn',
            dataIndex: 'director_comment',
            text: 'Director Comments',
             flex: 2,
            tdCls: 'wrap-text'
        }, {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            flex: 1,
            hidden:true,
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
                        items: [ {
                                text: 'Asssesment',
                                iconCls: 'x-fa fa-exchange',
                                menu: {
                                    xtype: 'menu',
                                    items: [{
                                            text: 'Reports',
                                            iconCls: 'x-fa fa-exchange',
                                            menu: {
                                                xtype: 'menu',
                                                items: [
                                                    
                                                    {
                                                        text: 'Asssesment Report ',
                                                        iconCls: 'x-fa fa-clipboard',
                                                        action: 'inspection_report',
                                                        handler: 'previewManagersReport',
                                                        report_type: 'Asssesment Report'
                                                    }
                                                ]
                                            }
                                        },{
                                            text: 'Documents',
                                            iconCls: 'x-fa fa-upload',
                                            childXtype: 'premregappprevdocuploadsgenericgrid',
                                            winTitle: 'Asssesment uploaded Documents',
                                            winWidth: '80%',
                                            handler: 'showPreviousUploadedDocs',
                                            target_stage: 'evaluation'
                                        },
                                        {
                                            text: 'Comments',
                                            iconCls: 'x-fa fa-weixin',
                                            childXtype: 'applicationprevcommentsgrid',
                                            winTitle: 'Evaluation Comments',
                                            winWidth: '70%',
                                            handler: 'showPreviousComments',
                                            stores: '[]',
                                            comment_type_id: 2,
                                            target_stage: 'evaluation',
                                            isWin: 1
                                        }
                                    ]
                                }
                            },
                             {
                              text: 'Director Recommendation',
                                iconCls: 'x-fa fa-retweet',
                                handler: 'showTcRecommendation',
                                childXtype: 'promotiondirectorrecommendationpnl',
                                winTitle: 'Director Recommendation',
                                winWidth: '70%',
                                stores: '["tcrecommendationdecisionsstr"]'
                            },
                            {
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
                            },  {
                                text: 'Preview Application Queries',
                                iconCls: 'x-fa fa-edit',
                                tooltip: 'Preview Record',
                                action: 'edit',
                                childXtype: '',
                                winTitle: 'Preview Application Queries',
                                winWidth: '70%',
                                isReadOnly: 1,
                                handler: 'previewproductApplicationQueries'
                            },{
                                text: 'View Assessment Checklists & Recommendation',
                                iconCls: 'x-fa fa-check-square',
                                handler: 'showApplicationChecklists'
                            }
                        ]
                    }
                }
    }]
});
