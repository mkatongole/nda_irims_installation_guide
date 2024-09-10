Ext.define('Admin.store.parameters.RevenueAccountsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.revenueaccountsstr', 
    storeId: 'revenueaccountsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getRevenueAccounts',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
