/**
 * Created by Softclans.
 */
Ext.define('Admin.view.gmpapplications.views.forms.GMPOnlineAssessmentFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'GMPOnlineAssessmentfrm',
    controller: 'gmpapplicationsvctr',
    layout: 'column',
    autoScroll: true,
    bodyPadding: 5,
    width: '100%',
    listeners: {
        afterrender: 'loadGMPAssessmentFrm'
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