Ext.define('Admin.view.registers.views.drugshopregister.panel.DrugshopRegisterPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'drugshopregisterpnl',
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
            value: 29
        },
      {
            xtype: 'drugshopregisterfiltersFrm',
            region: 'north',
            title: 'Filters',
            collapsible:true,
            collapsed: false
         },
      {
            xtype: 'drugshopregistergrid',
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
            text: 'Export Register',
            iconCls: 'x-fa fa-cloud-upload', 
            handler:'exportDrugshopRegister'   
        },
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Register',
            iconCls:'x-fa fa-print',
            handler:'printDrugshopRegister'
            
            
        }

       
    ]
     }
    ],

 });