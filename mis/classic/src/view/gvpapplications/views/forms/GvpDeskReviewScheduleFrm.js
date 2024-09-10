/**
 * Created by Kip on 5/15/2019.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpDeskReviewScheduleFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpdeskreviewschedulefrm',
    controller: 'gvpapplicationsvctr',
    layout: 'column',
    scrollable: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 3,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Team Name',
            name: 'inspectionteam_name',
            allowBlank: false
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Team Description',
            name: 'inspectionteam_desc'
        },
        // {
        //     xtype: 'datefield',
        //     fieldLabel: 'Date of Travel',
        //     name: 'travel_date',
        //     allowBlank: false,
        //     submitFormat: 'Y-m-d',
        //     format: 'd/m/Y',
        //     columnWidth: 0.5,
        //     altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        //     enableKeyEvents: true,
        //     listeners: {
        //         change: function (field,newVal,oldVal) {
        //             var form=field.up('form'),
        //                 end_date=form.down('datefield[name=return_date]');
        //             end_date.setMinValue(newVal);
        //         }
        //     }
        // },
        // {
        //     xtype: 'datefield',
        //     fieldLabel: 'Date of Return',
        //     name: 'return_date',
        //     allowBlank: false,
        //     submitFormat: 'Y-m-d',
        //     format: 'd/m/Y',
        //     columnWidth: 0.5,
        //     altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        // },
        {
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            name: 'start_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            minValue: new Date(),
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'End Date',
            name: 'end_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            minValue: new Date(),
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        }
    ]
});