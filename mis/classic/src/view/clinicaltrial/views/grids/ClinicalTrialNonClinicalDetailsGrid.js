
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialNonClinicalDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialnonclinicaldetailsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 320,
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
            text: 'Add Staff',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            hidden:true,
            name: 'add_otherinvestigator',
            childXtype: 'clinicaltrialpersonnelgrid',
            winTitle: 'Clinical Trial Personnel Selection List',
            winWidth: '90%',
            personnel_type: 'clinical_monitor'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'clinicaltrialnonclinicaldetailsstr',
                proxy: {
                    url: 'clinicaltrial/getNonClinicaltrailToxicologyData'
                }
            },
            isLoad: true
        }
        },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'dose_type',
            text: 'Dosage Type',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'species',
            text: 'Species',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'dose_route',
            text: 'Dosage Route',
            flex: 1
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'mntd',
            text: 'Mntd',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'major_findings',
            text: 'Major Findings',
            flex: 1
        }, 

         {
            text: 'Options',
            xtype: 'widgetcolumn',
            hidden:true,
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
                            text: 'Delete',
                            iconCls: 'x-fa fa-trash',
                            tooltip: 'Delete Record',
                            table_name: 'tra_clinical_trial_monitors',
                            storeID: 'clinicaltrialmonitorssstr',
                            action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                            action: 'actual_delete',
                            handler: 'doDeleteClinicalTrialWidgetParam',
                            hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                        }
                    ]
                }
            }
        }
    ]
});
