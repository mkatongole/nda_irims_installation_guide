/**
 * Created by Kip on 2/14/2019.
 */
Ext.define('Admin.view.gvpapplications.views.grids.GvpAppOnlineDocUploadsGenericGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'gvpapponlinedocuploadsgenericgrid',
    table_name: 'tra_gvp_applications',
    portal_uploads: 1
});