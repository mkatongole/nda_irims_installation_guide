/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.PreClinicalTrialManagersAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'preclinicaltrialmanagersabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
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
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
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
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'tracking_no',
                text: 'Tracking No',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Ref Number',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'applicant_name',
                text: 'Applicant',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'study_title',
                text: 'Study Title',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'brief_description',
                text: 'Brief Description',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'date_received',
                text: 'Date Received',
                hidden: true,
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
