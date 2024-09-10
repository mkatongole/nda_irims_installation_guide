/**
 * Created by Softclans.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialOnlineAssessmentFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ClinicalTrialOnlineAssessmentfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    autoScroll: true,
    bodyPadding: 5,
    width: '100%',
    listeners: {
        afterrender: 'loadAssessmentFrm'
    },
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-blue',
            name:'save_btn',
            formBind: true,
    
        }
    ]
   
});