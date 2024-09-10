/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpManagersAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gvpapplicationsvctr',
    xtype: 'gvpmanagersabstractgrid',
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
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'tracking_no',
                text: 'Tracking No',
                flex: 2
            },{
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Ref Number',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'premise_name',
                text: 'Gvp Site',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'applicant_name',
                text: 'Applicant',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'date_received',
                hidden: true,
                text: 'Date Received',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'gvp_type_txt',
                text: 'GVP Type',
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'country_name',
                text: 'Country',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'region_name',
                text: 'Region',
                flex: 1
            },
            {
                header: 'Status',
                dataIndex: 'application_status_id',
                flex: 1,
                renderer: function (value, metaData,record) {
                    var application_status = record.get('application_status')
                    if (application_status=='In-Review' || application_status==='In-Review') {
                        metaData.tdStyle = 'color:white;background-color:green';
                        return record.get('application_status');
                    }else{
                      metaData.tdStyle = 'color:white;background-color:red';
                      return record.get('application_status');
                  }
                }
         }, 
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }

});
