Ext.define('Admin.view.frontoffice.safetyreporting.grids.SpreadSheetSrVisibleColumns', {
    extend: 'Ext.form.Panel',  
    width: '100%',
    xtype: 'spreadsheetsrvisiblecolumns',
    title: 'Select Visible Columns',
    titleCollapse: true,
    scroll: true,
        margin: 2,
        collapsible: true,
        autoScroll: true,
        defaults: {
            xtype: 'checkbox',
            labelAlign: 'right',
            margin: 5,
            labelSeparator: ':',
            hideLabel: true
        },
        items:[  {
            boxLabel: 'ADR Category',
            name: 1,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Tracking No',
            name: 2,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Reference No',
            name: 3,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Reporter',
            name: 4,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Medical Study',
            name: 5,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Drug History',
            name: 6,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Medical History',
            name: 7,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Suspected Drug',
            name: 8,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Tests & Procedures',
            name: 9,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Patient',
            name: 10,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Gender',
            name: 11,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Date of Birth',
            name: 12,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Patient Age',
            name: 13,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Age Group',
            name: 14,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Patient Weight',
            name:15,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Patient Height',
            name: 16,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'BMI',
            name: 17,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Source of Psur',
            name: 18,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Report Type',
            name: 19,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Report Category',
            name: 20,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Email',
            name: 21,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Telephone No',
            name: 22,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'NDA Receive Date',
            name: 23,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Report Date',
            name: 24,
            checked: false,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },
        {
            boxLabel: 'Application Status',
            name: 27,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Approval Recommendation',
            name: 28,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Validity Status',
            name: 29,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        },{
            boxLabel: 'Is Feedback Shared?',
            name: 30,
            checked: true,
            listeners: {
                change: 'func_showhideSpreasheetColumn'
            }
        }
        ]
});