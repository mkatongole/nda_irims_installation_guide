/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.NarcoticImportPermitsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'narcoticimportpermitsdashwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'narcoticimportpermitsdash'
        }
    ]
});