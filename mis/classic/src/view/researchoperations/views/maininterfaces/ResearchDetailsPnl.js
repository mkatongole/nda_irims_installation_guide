/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.researchoperations.views.maininterfaces.panels.ResearchDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'researchdetailspnl',
    layout: {//
        //type: 'fit'
    },autoScroll: true,
    defaults:{
        margin: 3
    },viewModel: {
        type: 'researchoperationsvm'
    },
   
    items: [
    {
        xtype: 'researchappdetailsfrm',
        autoScroll: true,
        title: 'Research Details'
    }, 
    
    {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});