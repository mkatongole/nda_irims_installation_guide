
Ext.define('Admin.view.clinicaltrial.views.forms.PreClinicalTrialDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'preclinicaltrialdetailsfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    autoScroll: true,
    scrollable: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
          {
            xtype: 'textarea',
            fieldLabel: 'Study Title',
            name: 'study_title',
            columnWidth: 1,
            grow: true, 
            growMax: 200, 
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            fieldLabel: 'Brief summary describing the background and objectives of trial',
            name: 'brief_description',
            grow: true, 
            growMax: 200, 
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
             defaults: {
            labelAlign: 'top'
             },
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Proposed Meeting Date',
                labelAlign: 'top',
                name: 'meeting_date',
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                columnWidth: 0.6,
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
                columnWidth: 0.4,
                // allowBlank:true,
                altFormats:'H:i',
                increment: 5,
                minValue: '08:00', 
                maxValue: '17:00',
                bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            }]
        },{
            xtype: 'combo',
            name: 'meeting_type_id',
            fieldLabel: 'Meeting Type',
            queryMode: 'local',
            forceSelection: true,
            // allowBlank: true,
           columnWidth: 0.99,
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
        }
        ,{
            xtype: 'textarea',
            fieldLabel: 'Meeting Venue',
            columnWidth: 0.99,
            hidden:true,
            grow: true, 
            growMax: 200, 
            name: 'meeting_venue', 
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textarea',
            fieldLabel: 'Meeting Invitation Details(Copy & Paste the Meeting Invitation Details & link) ', columnWidth: 0.99,
            name: 'meeting_invitation_details', 
             hidden: true,
            grow: true, 
            growMax: 200, 
             columnWidth: 0.99,
             allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
    ]
});