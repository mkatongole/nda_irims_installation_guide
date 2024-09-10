/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.cancellation.CancelGvpOnlinePreviewPnl', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpOnlinePreviewPnl',
    xtype: 'cancelgvponlinepreviewpnl',
    items: [
        {
            xtype: 'cancelgvponlinepreviewwizard'
        }
    ]
});