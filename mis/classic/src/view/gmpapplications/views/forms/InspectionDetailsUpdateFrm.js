/**
 * Created by Softclans on 4/2/2019.
 */
 Ext.define('Admin.view.gmpapplications.views.forms.InspectionDetailsUpdateFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'inspectiondetailsupdatefrm',
    controller: 'gmpapplicationsvctr',
    frame: true,
    scrollable:true,
    layout: 'column',
    defaults:{
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [ {
        xtype: 'hiddenfield',
        name: 'inspection_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    },
        {
            xtype: 'hiddenfield',
            name: 'id'
        },

        // {
        //     xtype: 'combo',
        //     fieldLabel: 'Inspection Type',
        //     name: 'gmp_inspection_type_id',
        //     valueField: 'id',
        //     required: true,
        //     displayField: 'name',
        //     forceSelection: true,
        //     queryMode: 'local',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setGmpApplicationCombosStore',
        //             config: {
        //                 pageSize: 10000,
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams: {
        //                         table_name: 'par_gmp_inspection_types'
        //                     }
        //                 }
        //             },
        //             isLoad: true
        //         }
        //     }
        // },

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
        // {
        //     xtype: 'datefield',
        //     name: 'actual_start_date',
        //     fieldLabel: 'Actual Start Date',
        //     submitFormat: 'Y-m-d',
        //     format: 'd/m/Y',
        //     altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        // },
        // {
        //     xtype: 'datefield',
        //     name: 'actual_end_date',
        //     fieldLabel: 'Actual End Date',
        //     submitFormat: 'Y-m-d',
        //     format: 'd/m/Y',
        //     altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        // },

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
            name: 'gmpinspection_recommendation_id',
            forceSelection: true,
            hidden:true,
            allowBlank:true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpinspection_recommendation'
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
            name: 'gmpinspection_remarks', 
            fieldLabel: 'GMP Inspection Conclusions/Remarks'
        },{

            xtype: 'numberfield',
            fieldLabel: 'Renewal of the GMP Clearance (months)',
            hidden:true,
            allowBlank:true,
            name:'gmp_renewaltimeline',
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
            table_name: 'assigned_gmpinspections',
            storeID: 'inspectionscheduleselectionstr',
            action_url: 'gmpapplications/saveGmpApplicationCommonData',
            handler: 'doCreateGmpApplicationParamWin'
        }
    ]
});