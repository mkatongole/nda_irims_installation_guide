/**
 * Created by Kip on 10/12/2018.
 */

Ext.define('Admin.view.importexportpermits.views.maininterfaces.import.ImportPermitReceipting', {
    extend: 'Ext.panel.Panel',
    xtype: 'importpermitreceipting',
    viewModel: {
        type: 'importexportpermitsvm'
    },
    layout: 'fit',
    items:[{
        xtype: 'importexportpermitreceiptingpnl'
    }]
});