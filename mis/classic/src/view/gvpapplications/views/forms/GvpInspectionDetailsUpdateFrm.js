/**
 * Created by Softclans on 4/2/2019.
 */
 Ext.define('Admin.view.gvpapplications.views.forms.GvpInspectionDetailsUpdateFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpinspectiondetailsupdatefrm',
    controller: 'gvpapplicationsvctr',
    frame: true,
    scrollable:true,
    layout: 'column',
    defaults:{
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [ 
        {
        xtype: 'hiddenfield',
        name: 'inspection_id'
        },
        {
        xtype: 'hiddenfield',
        name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'id'
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

        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'inspectionteam_details'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of Travel',
            name: 'travel_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            enableKeyEvents: true,
            listeners: {
                change: function (field,newVal,oldVal) {
                    var form=field.up('form'),
                        end_date=form.down('datefield[name=return_date]');
                    end_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of Return',
            name: 'return_date',
            allowBlank: false,
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            columnWidth: 0.5,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },

        {
            xtype: 'combo',
            fieldLabel: 'Inspection Recommendation',
            name: 'gvpinspection_recommendation_id',
            forceSelection: true,
            hidden:true,
            allowBlank:true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gvpinspection_recommendation'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{

            xtype:'textarea',
            columnWidth: 1,
            hidden:true,
            allowBlank:true,
            name: 'gvpinspection_remarks', 
            fieldLabel: 'GVP Inspection Conclusions/Remarks'
        },{

            xtype: 'numberfield',
            fieldLabel: 'Renewal of the GVP Clearance (months)',
            hidden:true,
            allowBlank:true,
            name:'gvp_renewaltimeline',
            columnWidth: 0.5
        }
    ],
    buttons: [
        {
            text: 'Update Details',
            ui: 'soft-green',
            hidden:true,
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'assigned_gvpinspections',
            storeID: 'inspectionscheduleselectionstr',
            action_url: 'gvpapplications/saveGvpApplicationCommonData',
            handler: 'doCreateGvpApplicationParamWin'
        }
    ]
});