/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpScreening', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpScreeningPanel',
    xtype: 'newgvpscreening',
    items: [
        {
            xtype: 'newgvpscreeningpanel'
        }
    ]
});