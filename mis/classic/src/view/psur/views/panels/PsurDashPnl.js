Ext.define('Admin.view.psur.views.panels.PsurDashPnl', {
    extend: 'Ext.Container',
    xtype: 'psurDashPnl',
    layout: 'border',
    items: [
        {
            xtype: 'psurGrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,
            bbar: [{
                xtype: 'pagingtoolbar',
                width: '100%',
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2} total records',
                emptyMsg: 'No Records',
                beforeLoad: function () {
                    var grid = this.up('grid'),
                        pnl = grid.up('psurDashPnl'),
                        wrapper = pnl.up('psurDashWrapperPnl'),
                        cnt = wrapper.up(),
                        store = this.getStore(),
                        sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                        section_id = cnt.down('hiddenfield[name=section_id]').getValue();
                    
                    store.getProxy().extraParams = {
                        sub_module_id: sub_module_id,
                        section_id: section_id
                    }
                }
            }]
        }
    ]
});