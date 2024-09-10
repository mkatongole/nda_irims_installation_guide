/**
 * Created by Softclans.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GVPOnlineAssessmentFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'GVPOnlineAssessmentfrm',
    controller: 'gvpapplicationsvctr',
    layout: 'column',
    autoScroll: true,
    bodyPadding: 5,
    width: '100%',
    listeners: {
        afterrender: 'loadGVPAssessmentFrm'
    },
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-blue',
            name:'save_assessement_btn',
            formBind: true,
    
        }
    ]
   
});