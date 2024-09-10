/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpmanagersabstractgrid',
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
                flex: 1
            },{
                xtype: 'gridcolumn',
                dataIndex: 'reference_no',
                text: 'Ref Number',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'premise_name',
                text: 'Manufacturing Site',
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
                dataIndex: 'gmp_type_txt',
                text: 'GMP Type',
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
                xtype: 'gridcolumn',
                dataIndex: 'blocks_no',
                text: 'Blocks No',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'lines_no',
                text: 'Lines No',
                flex: 1
            }, 

            {
                header: 'Status',
                dataIndex: 'application_status_id',
                flex: 2,
                renderer: function (value, metaData,record) {
                    var application_status_id = record.get('application_status_id')
                    if (application_status_id==28 || application_status_id===28) {
                        metaData.tdStyle = 'color:white;background-color:green';
                        return record.get('application_status');
                    }else if(application_status_id==29 || application_status_id===29){
                      metaData.tdStyle = 'color:white;background-color:red';
                      return record.get('application_status');
                  }else{
                    return record.get('application_status');
                   }
                }
         }, 
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }

});
