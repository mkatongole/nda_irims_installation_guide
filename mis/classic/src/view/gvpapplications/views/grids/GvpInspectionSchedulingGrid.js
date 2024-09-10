/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpInspectionSchedulingGrid', {
    extend: 'Admin.view.gvpapplications.views.grids.GvpManagersAbstractGrid',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpinspectionschedulinggrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly: 1,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
      /*  listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }*/
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Inspection Categorisation',
        disabled: true,
        name: 'categorize_selected',
        ui: 'soft-green',
        iconCls: 'x-fa fa-bars',
        menu: {
            xtype: 'menu',
            items: [
                {
                    text: 'Physical Inspection',
                    iconCls: 'x-fa fa-check',
                    inspection_type_id: 1,
                    handler: 'categorizeGvpApplications'
                },
                {
                    text: 'Desk Review',
                    iconCls: 'x-fa fa-check',
                    inspection_type_id: 2,
                    handler: 'categorizeGvpApplications'
                },
                {
                    text: 'Virtual Inspection',
                    iconCls: 'x-fa fa-check',
                    inspection_type_id: 3,
                    handler: 'categorizeGvpApplications'
                }
            ]
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'GVP Type',
        valueField: 'id',
        name: 'gvp_type_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 220,
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
        xtype: 'combo',
        fieldLabel: 'Country',
        valueField: 'id',
        name: 'country_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 200,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                         url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                          table_name: 'par_countries'
                            }
                        }
                    },
                isLoad: true
            },
    
         change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                regionStore = grid.down('combo[name=region_id]').getStore(),
                filterObj = {district_id: newVal},
                filterStr = JSON.stringify(filterObj);
                regionStore.removeAll();
                regionStore.load({params: {filters: filterStr}});
                grid.getStore().load();
           }
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
        xtype: 'combo',
        fieldLabel: 'Region',
        valueField: 'id',
        name: 'region_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 200,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
                beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                         url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                          table_name: 'par_regions'
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
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            table_name: 'tra_gvp_applications',
            beforeLoad: function () {
                this.up('grid').fireEvent('refresh', this);
            }
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setGvpApplicationGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gvpapplications/getManagerApplicationsGeneric',
                    extraParams: {
                        table_name: 'tra_gvp_applications'
                    }
                },
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=categorize_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=categorize_selected]').setDisabled(true);
            }
        }
    },
    columns: [
        {
            text: 'Inspection Type',
            dataIndex: 'inspection_type',
            flex: 1
        },{
			text: 'GVP Categorisation',
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
							text: 'Physical Inspection',
							iconCls: 'x-fa fa-check',
							inspection_type_id: 1,
							handler: 'singlecategorizeGvpApplications'
						},
						{
							text: 'Desk Review',
							iconCls: 'x-fa fa-check',
							inspection_type_id: 2,
							handler: 'categorizeGvpApplications'
						}]
						
						
				}
			}
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
                        appDetailsReadOnly: 0,
                        handler: 'showGvpApplicationMoreDetails'
                    },
                    {
                        text: 'SMF Uploads',
                        iconCls: 'x-fa fa-folder',
                        childXtype: 'gvpappprevdocuploadsgenericgrid',
                        winTitle: 'SMF Uploads',
                        winWidth: '80%',
                        hidden: true,
                        handler: 'showPreviousUploadedDocs',
                        target_stage: 'smfuploads'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',
                        hidden: true,
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});
