
Ext.define('Admin.view.clinicaltrial.views.forms.PreSubmissionEvaluationFrm', {
    extend: 'Ext.form.Panel',
    scrollable:true,
    xtype: 'presubmissionevaluationfrm',
    viewModel:'clinicaltrialvm',
    controller: 'clinicaltrialvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'evaluation_record_id'
        },

        
        {
            xtype: 'textarea',
            fieldLabel: 'Study Title',
            name: 'study_title',
            readOnly:true,
            grow: true, 
            growMax: 200, 
            columnWidth: 1
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            readOnly:true,
            grow: true, 
            growMax: 200, 
            fieldLabel: 'Brief summary describing the background and objectives of trial',
            name: 'brief_description'
        },
        {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            }, margin: 0,
            defaults: {
                labelAlign: 'top',
                margin: 5,
                readOnly:true,
                allowBlank: false
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Proposed Meeting Date',
                labelAlign: 'top',
                name: 'meeting_date',
                submitFormat: 'Y-m-d',
                readOnly:true,
                format: 'd/m/Y',width: '60%',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            },{
                xtype: 'timefield',
                fieldLabel:'Meeting Time',
                labelAlign: 'top',
                name: 'meeting_time',
                format: 'H:i',
                readOnly:true,
                altFormats:'H:i',
                increment: 30,width: '40%',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            }]
        },
        {
            xtype: 'combo',
            name: 'meeting_type_id',
            fieldLabel: 'Meeting Type',
            queryMode: 'local',
            forceSelection: true,
            readOnly:true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_meeting_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Venue',
            columnWidth: 0.99,
            readOnly:true,
            hidden:true,
            name: 'meeting_venue', 
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'meeting_invitation_details',  hidden: true,
            allowBlank: true,
            readOnly:true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, 
         {
                xtype: 'combo',
                fieldLabel: 'Okay with Proposed Meeting Date?',
                name: 'meeting_date_okay',
                columnWidth: 1,
                allowBlank: true,
                valueField: 'id',
                displayField: 'name',
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_confirmations'
                                }
                            }
                        },
                        isLoad: true
                    },
                    change: function(combo, newVal, oldValue, eopts) {
                        if(newVal == 1){

                            var form = combo.up('form'),
                            preferedDate = form.down('datefield[name=preferred_meeting_date]');
                            preferedDate.setVisible(false);
                            preferedDate.allowBlank = true;
                            preferedDate.validate();
                            preferedTime = form.down('timefield[name=preferred_meeting_time]');
                            preferedTime.setVisible(false);
                            preferedTime.allowBlank = true;
                            preferedTime.validate();
                            preferedMeetingType = form.down('combo[name=preferred_meeting_type_id]');
                            preferedMeetingType.setVisible(false);
                            preferedMeetingType.allowBlank = true;
                            preferedMeetingType.validate();
                        }else{

                            var form = combo.up('form'),
                            preferedDate = form.down('datefield[name=preferred_meeting_date]');
                            preferedDate.setVisible(true);
                            preferedDate.allowBlank = false;
                            preferedDate.validate();
                            preferedTime = form.down('timefield[name=preferred_meeting_time]');
                            preferedTime.setVisible(true);
                            preferedTime.allowBlank = false;
                            preferedTime.validate();
                            preferedMeetingType = form.down('combo[name=preferred_meeting_type_id]');
                            preferedMeetingType.setVisible(true);
                            preferedMeetingType.allowBlank = false;
                            preferedMeetingType.validate();
                            
                        }
                        
                    }
                   
                }
        },
         {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            }, margin: 0,
            defaults: {
                labelAlign: 'top',
                margin: 5,
                allowBlank: false
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Preferred Meeting Date',
                labelAlign: 'top',
                name: 'preferred_meeting_date',
                hidden: true,
                allowBlank: true,
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',width: '60%',
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s'
            },{
                xtype: 'timefield',
                fieldLabel:'Preferred Meeting Time',
                labelAlign: 'top',
                hidden: true,
                allowBlank: true,
                name: 'preferred_meeting_time',
                format: 'H:i',
                altFormats:'H:i',
                increment: 30,width: '40%'
            }]
        },{
            xtype: 'combo',
            name: 'preferred_meeting_type_id',
            fieldLabel: 'Preferred Meeting Type',
            queryMode: 'local',
            hidden: true,
            forceSelection: true,
            allowBlank: true,
            valueField: 'id',
            displayField: 'name',

            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_meeting_types'
                            }
                        }
                    },

                    isLoad: true
                },
                change:function(cbo, newValue){
                        var form = cbo.up('form');

                        if(newValue ==1){
                            form.down('textfield[name=preferred_meeting_venue]').setVisible(true);
                            form.down('textfield[name=preferred_meeting_invitation_details]').setVisible(false);
                            form.down('textfield[name=preferred_meeting_venue]').allowBlank = false;
                            form.down('textfield[name=preferred_meeting_invitation_details]').allowBlank = true;

                        }else{
                            form.down('textfield[name=preferred_meeting_venue]').setVisible(false);
                            form.down('textfield[name=preferred_meeting_invitation_details]').setVisible(true);
                            form.down('textfield[name=preferred_meeting_invitation_details]').allowBlank = false;
                            form.down('textfield[name=preferred_meeting_venue]').allowBlank = true;
                        }

                }
            }
        },{
            xtype: 'textarea',
            fieldLabel: 'Preferred Meeting Venue',
            columnWidth: 0.99,
            hidden: true,
            allowBlank: true,
            grow: true, 
            growMax: 200, 
            name: 'preferred_meeting_venue'
        },{
            xtype: 'textarea',
            grow: true, 
            growMax: 200, 
            allowBlank: true,
            fieldLabel: 'Preferred Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'preferred_meeting_invitation_details', 
            hidden: true
        },

        {
            xtype: 'textarea',
            name: 'remarks',
            grow: true, 
            growMax: 200, 
            columnWidth: 1,
            fieldLabel: 'Remarks',
            allowBlank: true
        }
        
    ],
    buttons: [
        {
            text: 'Save Assessment Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            name:'save_btn',
            ui: 'soft-purple',
            handler: 'doSaveEvaluationDetails',
            action_url: 'clinicaltrial/saveEvaluationDetails',
            table_name: 'tra_clinicaltrrial_assessment_report',
        }
    ]
});






