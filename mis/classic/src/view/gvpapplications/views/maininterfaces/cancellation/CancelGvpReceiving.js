/**
 * Created by Kip on 5/21/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.cancellation.CancelGvpReceiving', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpReceiving',
    xtype: 'cancelgvpreceiving',
    items: [
        {
            xtype: 'cancelgvpreceivingwizard'
        }
    ]
});