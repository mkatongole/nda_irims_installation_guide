/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpReceiving', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpReceiving',
    xtype: 'newgvpreceiving',
    items: [
        {
            xtype: 'newgvpreceivingwizard'
        }
    ]
});