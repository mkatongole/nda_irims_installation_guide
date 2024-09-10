Ext.define('Admin.view.registers.views.gvpregister.panel.GvpRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'gvpregisterpnl',
    margin: 2,
    layout: 'border',
    controller: 'registerctr',
    defaults: {
        bodyPadding: 1,
        scrollable: true,
    },
    items: [
     {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 35
        },
         {
            xtype: 'hiddenfield',
            name: 'gvp_location',
            value: 2
        },
      {
            xtype: 'gvpregisterfiltersfrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'gvpregistergrid',
            region: 'center'
        }],
  bbar: [{
        xtype: 'toolbar',
        width: '100%',
        ui: 'footer',
        items: [
         
        '->',
         {
            xtype:'button',
            ui: 'soft-green',
            filename: 'GVP_Register.xlsx',
            heading: 'GVP Register',
            function:'getGvpRegister',
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler: 'exportGvpRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            filename: 'GVP_Register.pdf',
            heading: 'GVP Register',
            title: 'GVP Register',
            iconCls: 'x-fa fa-print',
            handler: 'printGvpRegister'
        }

       
    ]
     }
    ],

 });