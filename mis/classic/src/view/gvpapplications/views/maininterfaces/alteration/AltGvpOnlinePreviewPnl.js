/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpOnlinePreviewPnl', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpOnlinePreviewPnl',
    xtype: 'altgvponlinepreviewpnl',
    items: [
        {
            xtype: 'altgvponlinepreviewwizard'
        }
    ]
});