/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.CtrRegistryContactPersonsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'ctrregistrycontactpersonsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 320,
    config: {
        isCompare: 0
    },
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
   
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                pnlXtype = '#clinicaltrialregistrypreviewpnl';
            
            var pnl = grid.up(pnlXtype),
                application_id = pnl.down('hiddenfield[name=active_application_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id
            };
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
                storeId: 'onlineclinicaltrialcontactpersongridstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalContactPersonsDetails'
                }
            },
            isLoad: true
        }
    },
    
    columns: [{
        dataIndex:'role',
        text:'Contact Person Role',
        flex:1

    },{
        dataIndex:'contact_personposition',
        text:'Position/Affiliation',
        flex:1

    },{
        dataIndex:'name',
        text:'Name',
        flex:1

    },{
        dataIndex:'country',
        text:'Country',
        flex:1

    },{
        dataIndex:'city',
        text:'Region',
        flex:1

    },{
        dataIndex:'physical_address',
          text:'Physical Address',
          flex:1

    } ,{
        dataIndex:'postal_address',
          text:'Postal Address',
          flex:1
    }   ,{
        dataIndex:'phone_no',
          text:'Phone Number',
          flex:1
    },{
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
                    text: 'Edit/Details',
                    iconCls: 'x-fa fa-edit',
                    handler: 'editClinicalStudySiteDetails',
                    winTitle: 'Clinical Contact Persons',
                    winWidth: '60%',
                    childXtype: 'ctrregistrycontactpersonsfrm'
                }]
            }
        }
    }    
]
   
});