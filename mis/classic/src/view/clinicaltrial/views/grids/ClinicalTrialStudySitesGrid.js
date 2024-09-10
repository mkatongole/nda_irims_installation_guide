/**
 * Created by Kip on 1/17/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialStudySitesGrid', {
    extend: 'Admin.view.commoninterfaces.grids.StudySitesAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialstudysitesgrid',
    autoScroll: true,
    autoHeight: true,
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
            xtype: 'button',
            text: 'Add Clinical Study Site',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            //hidden:true,
            name: 'add_clinical_site',
            childXtype: 'clinicalstudysitesfrm',
            winTitle: 'Clinical Trial Study Sites ',
            winWidth: '40%'
        },
        {
            xtype: 'displayfield',
            value: 'Double click to view all site details!!',
            fieldStyle: {
                'color':'green'
            }
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
                storeId: 'clinicaltrialstudysitesstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalStudySites'
                }
            },
            isLoad: true
        }, 

        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_clinical_site]'),
                view_btn =grid.down('widgetcolumn[name=view_sites]'),
                edit_btn =grid.down('widgetcolumn[name=edit_sites]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                //view_btn.setVisible(false);
                edit_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            }
        },
        itemdblclick: 'loadViewSiteDetails'
    },
    columns: [
          
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
                    items: [{
                        text: 'change',
                        iconCls: 'fa fa-cog',
                        handler: 'editClinicalStudySiteDetails',
                        winTitle: 'Clinical Study Site',
                        winWidth: '40%',
                         hidden:true,
                        childXtype: 'clinicalstudysitesfrm'
                    }, {
                            text: 'Delete',
                            iconCls: 'x-fa fa-trash',
                            tooltip: 'Delete Record',
                            table_name: 'clinical_trial_sites',
                            storeID: 'clinicaltrialstudysitesstr',
                            action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                            action: 'actual_delete',
                             hidden:true,
                            handler: 'doDeleteClinicalTrialWidgetParam',
                            hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                        }
                    ]
                }
            }
        }
    ]
});
