/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpNotificationsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.NotificationsAbstractGrid',
    xtype: 'gvpnotificationsgrid',
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            table_name: 'tra_gvp_applications',
            to_module_id: 3,
            beforeLoad: function () {
                var store = this.getStore();
                store.getProxy().extraParams = {
                    to_module_id: 3
                }
            }
        }
    ],
    columns: []
});