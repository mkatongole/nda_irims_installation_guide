/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpVariationRequestsOnlineGrid', {
    extend: 'Admin.view.commoninterfaces.grids.VariationRequestsAbstractGrid',
    xtype: 'gvpvariationrequestsonlinegrid',
    tbar: [],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                win = grid.up('window'),
                application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = win.down('hiddenfield[name=active_application_code]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id,
                application_code: application_code,
                isOnline: 1
            }
        }
    }],
    columns: []
});