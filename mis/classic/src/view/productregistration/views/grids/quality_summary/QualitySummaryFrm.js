Ext.define('Admin.view.productregistration.views.grids.QualitySummaryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'qualitysummaryfrm',
    controller: 'productregistrationvctr',
    frame: true,
    scrollable:true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [{
    xtype:'fieldset',
    columnWidth: 1,
    title: 'Summary of product information:',
    collapsible: true,
    defaults: {
        labelAlign: 'top',
        columnWidth: 1,
    },
    layout: 'column',
    items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'summaryinformationgrid'

             }]
         }]
       },
       {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S ACTIVE PHARMACEUTICAL INGREDIENT (API)',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'activepharmaceuticalsgrid'

             }]
         }]
       }, {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.1 General Information',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.1.1 Nomenclature',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'nomenclaturegrid'

             }]
         }]
       },
       {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.1.3 General Properties (name, manufacturer)',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'propertiesgrid'

             }]
         }]
       }]
       },
//
        {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.2 Manufacture',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.2.1 Manufacturer(s) (name, manufacturer)',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'manufacturergrid'

             }]
         }]
       },
       {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.2.3 Control of Materials (name, manufacturer)',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'controlmaterialgrid'

             }]
         }]
       },{
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.2.4 Controls of Critical Steps and Intermediates (name, manufacturer)',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'controlcriticalgrid'

             }]
            }]
          }
       ]
       },
        {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.3 Characterisation',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.3.1 Elucidation of Structure and other Characteristics (name, manufacturer)',
        collapsible: true,
        collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'elucidationgrid'

             }]
         }]
       },
       {
        xtype:'fieldset',
        columnWidth: 1,
        title: '2.3.S.3.2 Impurities (name, manufacturer)',
        collapsible: true,
         collapsed: true,
        defaults: {
            labelAlign: 'top',
            columnWidth: 1,
        },
        layout: 'column',
        items:[ 
        {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                hideLabel: true,
                layout: 'fit',
                items:[{
                xtype: 'impuritiesgrid'

             }]
         }]
       }]
       },
    ]
});