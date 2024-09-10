/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.NewDrugShopSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'newdrugshopselectiongrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
    width: '100%',
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green'
            }
        },
         {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gmp_type_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'region_id'
        },{
            xtype: 'hiddenfield',
            name: 'district_id'
        },{
            xtype: 'hiddenfield',
            name: 'premise_id'
        },{
            xtype: 'hiddenfield',
            name: 'is_nearest_premise'
        },{
            xtype: 'hiddenfield',
            name: 'is_inspection_nearest_premise'
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        }
    ],
   bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                region_id = grid.down('hiddenfield[name=region_id]').getValue();
                is_nearest_premise = grid.down('hiddenfield[name=is_nearest_premise]').getValue();
                is_inspection_nearest_premise = grid.down('hiddenfield[name=is_inspection_nearest_premise]').getValue();
                premise_id = grid.down('hiddenfield[name=premise_id]').getValue();
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
                premise_id = grid.down('hiddenfield[name=premise_id]').getValue();
                district_id = grid.down('hiddenfield[name=district_id]').getValue();

            if(is_nearest_premise==1 || is_nearest_premise===1){
                store.getProxy().extraParams = {
                section_id: section_id,
                is_nearest_premise: is_nearest_premise,
                premise_id: premise_id,
                application_code: application_code,
                region_id: region_id,
            };

            }else if(is_inspection_nearest_premise==1 || is_inspection_nearest_premise===1){
                store.getProxy().extraParams = {
                section_id: section_id,
                is_inspection_nearest_premise: is_inspection_nearest_premise,
                premise_id: premise_id,
                application_code: application_code,
                region_id: region_id,
            };

            }
            else{
                store.getProxy().extraParams = {
                section_id: section_id,
                region_id: region_id,
             };

            }
            
        }
    }],
    /* features: [{
         ftype: 'searching',
         minChars: 2,
         mode: 'local'
     }],*/
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'premiseregistration/getDrugShopRenewalList',
					reader: {
                        type: 'json',
                        totalProperty: 'totalCount',
                        rootProperty: 'results'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'DrugShop Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        text: 'Registration No',
        flex: 1,
        hidden:true,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Premise No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        hidden:true,
        text: 'Postal Address',
        flex: 1
    }]
});
