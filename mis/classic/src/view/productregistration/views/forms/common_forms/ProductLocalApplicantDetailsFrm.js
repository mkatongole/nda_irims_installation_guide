
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductLocalApplicantDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productlocalapplicantdetailsfrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    scrollable: true,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top'
    },
    items: [
        // {
        //     xtype: 'hiddenfield',
        //     name: 'premise_id'
        // },
        // {
        //     xtype: 'hiddenfield',
        //     name: '_token',
        //     value: token
        // },
        // {
        //     xtype: 'fieldcontainer',
        //     layout: 'column',
        //     defaults: {
        //         labelAlign: 'top'
        //     },
        //     fieldLabel: 'Local Agent Name',
        //     items: [
        //         {
        //             xtype: 'textfield',
        //             name: 'name',
        //             readOnly: true,
        //             columnWidth: 0.7
        //         },
        //         {
                    // xtype: 'button',
                    // iconCls: 'x-fa fa-link',
                    // columnWidth: 0.3,
                    // text: 'Search Local Technical Rep(Register)',
                    // tooltip: 'Search LTR',
                    // applicantType: 'local',
                    // name: 'link_localagent',
                    // handler: 'showLTRSelectionList'
        //         }
        //     ]
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'LTR Premise Applicant',
        //     readOnly: true,
        //     name: 'applicant_name'
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'TIN',
        //     readOnly: true,
        //     hidden:true,
        //     name: 'TIN'
        // },
        // {
        //     xtype: 'combo',
        //     fieldLabel: 'Country',
        //     name: 'app_country_id',
        //     store: 'countriesstr',
        //     forceSelection: true,
        //     hidden:true,
        //     queryMode: 'local',
        //     valueField: 'id',
        //     readOnly: true,
        //     displayField: 'name',
        //     listeners: {
        //         beforerender: function () {
        //             var store = this.store;
        //             store.removeAll();
        //             store.load();
        //         }
        //     }
        // },
        // {
        //     xtype: 'combo',
        //     fieldLabel: 'Region',
        //     name: 'app_region_id',
        //     store: 'regionsstr',
        //     hidden:true,
        //     forceSelection: true,
        //     queryMode: 'local',
        //     valueField: 'id',
        //     readOnly: true,
        //     displayField: 'name',
        //     listeners: {
        //         beforerender: function () {
        //             var store = this.store;
        //             store.removeAll();
        //             store.load();
        //         }
        //     }
        // },
        // {
        //     xtype: 'combo',
        //     fieldLabel: 'District',
        //     name: 'app_district_id',
        //     readOnly: true,
        //     hidden:true,
        //     store: 'districtsstr',
        //     forceSelection: true,
        //     queryMode: 'local',
        //     valueField: 'id',
        //     displayField: 'name',
        //     listeners: {
        //         beforerender: function () {
        //             var store = this.store;
        //             store.removeAll();
        //             store.load();
        //         }
        //     }
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Registration No',
        //     readOnly: true,
        //     hidden:true,
        //     name: 'premise_reg_no'
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Permit No',
        //     readOnly: true,
        //     name: 'permit_no'
        // },

        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Physical Address',
        //     readOnly: true,
        //     name: 'physical_address'
        // },
        // {
        //     xtype: 'textfield',
        //     readOnly: true,
        //     hidden:true,
        //     fieldLabel: 'Postal Address',
        //     name: 'postal_address'
        // },
        // {
        //     xtype: 'textfield',
        //     readOnly: true,
        //     fieldLabel: 'Telephone',
        //     name: 'prem_telephone'
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Fax',
        //     hidden:true,
        //     readOnly: true,
        //     name: 'app_fax'
        // },
        // {
        //     xtype: 'textfield',
        //     fieldLabel: 'Email',
        //     readOnly: true,
        //     hidden:true,
        //     name: 'app_email'
        // },
        // {
        //     xtype: 'textfield',
        //     readOnly: true,
        //     hidden:true,
        //     fieldLabel: 'Website',
        //     name: 'app_website'
        // }


        {
                    xtype: 'hiddenfield',
                    name: 'ltr_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: '_token',
                    value: token
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'ltr_name',
                            readOnly: true,
                            columnWidth: 0.9
                        },
                    
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search LTR',
                            name: 'link_localagent',
                            handler: 'showLTRSelectionList',
                            winTitle: 'LTR Selection List',
                            winWidth: '90%'

                        }
                    ]
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'TIN',
                    readOnly: true,
                    name: 'ltr_tin_no'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    name: 'link_country_id',
                    store: 'countriesstr',
                    forceSelection: true,
                    hidden:true,
                    queryMode: 'local',
                    valueField: 'id',
                    readOnly: true,
                    displayField: 'name',
                    listeners: {
                        beforerender: function () {
                            var store = this.store;
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Region',
                    name: 'link_region_id',
                    store: 'regionsstr',
                    hidden:true,
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    readOnly: true,
                    displayField: 'name',
                    listeners: {
                        beforerender: function () {
                            var store = this.store;
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'District',
                    name: 'link_district_id',
                    readOnly: true,
                    hidden:true,
                    store: 'districtsstr',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: function () {
                            var store = this.store;
                            store.removeAll();
                            store.load();
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Registration No',
                    readOnly: true,
                    hidden:true,
                    name: 'link_premise_reg_no'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Premise No',
                    readOnly: true,
                    name: 'link_permit_no'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Physical Address',
                    readOnly: true,
                    name: 'link_physical_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    hidden:true,
                    fieldLabel: 'Postal Address',
                    name: 'link_postal_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: 'Telephone',
                    name: 'link_telephone'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax',
                    hidden:true,
                    readOnly: true,
                    name: 'link_fax'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    readOnly: true,
                    hidden:true,
                    name: 'link_email'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    hidden:true,
                    fieldLabel: 'Website',
                    name: 'link_website'
        }
    ]
});