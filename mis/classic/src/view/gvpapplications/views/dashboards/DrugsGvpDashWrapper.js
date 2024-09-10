/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gvpapplications.views.dashboards.DrugsGvpDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugsgvpdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugsgvpdash'
        }
    ]
});