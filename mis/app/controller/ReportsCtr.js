/**
 * Created by Kip on 2/25/2019.
 */
Ext.define('Admin.controller.ReportsCtr', {
    extend: 'Ext.app.Controller',
    stores:[
          //for system reports
            'Admin.store.summaryreport.ProductReportChartStr',
            'Admin.store.summaryreport.ProductReportGridStr',
            'Admin.store.summaryreport.CTReportChartStr',
            'Admin.store.summaryreport.CTReportGridStr',
            'Admin.store.summaryreport.GMPReportChartStr',
            'Admin.store.summaryreport.GMPReportGridStr',
            'Admin.store.summaryreport.IEReportChartStr',
            'Admin.store.summaryreport.IEReportGridStr',
            'Admin.store.summaryreport.PremiseReportGridStr',
            'Admin.store.summaryreport.PremiseReportChartStr',
            'Admin.store.summaryreport.ProdNoteReportGridStr',
            'Admin.store.summaryreport.ProdNoteReportChartStr',
            'Admin.store.summaryreport.PromAdvertReportChartStr',
            'Admin.store.summaryreport.PromAdvertReportGridStr',
            'Admin.store.summaryreport.UploadedDocStr',
            'Admin.store.summaryreport.AgeAnalysisDateSpanStr',
            'Admin.store.summaryreport.ReportsGlobalAbstractStr',
            'Admin.store.summaryreport.RegisteredProductGazetteStr',

            //for quality trauil audit
            'Admin.store.audit_trail.CurrentTableDataAuditStr',
            'Admin.store.audit_trail.UpdatedTableDataPortalAuditStr', 
            'Admin.store.audit_trail.PreviousTableDataPortalAuditStr',
            'Admin.store.audit_trail.UpdatedTableDataMISAuditStr', 
            'Admin.store.audit_trail.PreviousTableDataMISAuditStr',
            'Admin.store.audit_trail.AllTransRecordAuditStr'
           // 'Admin.store.audit_trail.ApplicationAuditReportAbstractStr',

    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }],

        control: {
            'invoicingpanel button[name=print_invoice]': {
                click: 'printApplicationInvoice'
            },'importpermitinvoicingpanel button[name=print_invoice]': {
                click: 'printApplicationInvoice'
            },'detailedReportExport':{
                refresh: 'refreshReportExportGrid'
            },'onlinemedicaldevicesreceivingwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },
            'onlineapplicationpaymentsgrid button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },
             'onlinepaymentinvoicingcostdetailsgrid button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },

            'onlinedrugproductreceivingwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'onlineantisepticproductreceivingwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'clinicaltrialonlinepreviewwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'newpremiseonlinepreviewwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'newgmponlinepreviewwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'onlinealtdrugproductreceivingwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'onlinealtmedicalproductreceivingwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },'promoadvertonlinepreviewwizard button[name=print_invoice]': {
                click: 'printOnlineApplicationInvoice'
            },
            'servicecharterreportgrid':{
                refresh: 'refreshservicechartergrid'
            }
        }
    },

    /**
     * Called when the view is created
     */
    init: function () {

    },

    listen: {
        controller: {
            '*': {
                printInvoice: 'printApplicationInvoice',
                printReceipt: 'printApplicationReceipt',
                generatePremiseCert: 'generatePremiseCertificate',
                generatePremisePermit: 'generatePremisePermit',
                generateTCPDPsurPermit: 'generateTCPDPsurPermit',
                 generateTCPDPremisePermit: 'generateTCPDPremisePermit',
                generatePremiseInspectionReport: 'generatePremiseInspectionReport',
                generateProductRegCertificate: 'generateProductRegCertificate',
                generatePromotionalRegCertificate:'generatePromotionalRegCertificate',
                generatePromotionalTCPDFRegCertificate:'generatePromotionalTCPDFRegCertificate',
                generateProductNotificationApprovalLetter:'generateProductNotificationApprovalLetter',
                
                generateProductNotificationCertificate:'generateProductNotificationCertificate',
                generateProductRejectionLetter: 'generateProductRejectionLetter',
                generateGmpCertificate: 'generateGMPCertificate',
                generateGvpCertificate: 'generateGvpCertificate',
                generateGmpInspectionReport: 'generateGmpInspectionReport',
                generateGmpApprovalLetter: 'generateGmpApprovalLetter',
                generateClinicalCertificate: 'generateClinicalTrialCertificate',
                generateImportExportpermit: 'generateImportExportpermit',
                generatePersonalUsePermit: 'generatePersonalUsePermit',
                generateNarcoticImportPermit:'generateNarcoticImportPermit',
                printHospitalNarcoticsPermit:'printHospitalNarcoticsPermit',
                generateOnlineApplicationInvoice: 'printOnlineApplicationInvoice',
                funcgenerateApplicationInvoice: 'generateApplicationInvoice',
                printSampleSubmissionReport:'printSampleSubmissionReport',
                generateDisposalpermit:'generateDisposalpermit',
                generateApplicationReceipt:'generateApplicationReceipt'
            }
        }
    },
    refreshservicechartergrid: function (me) {
        
        var store = me.store,
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('form'),
            formValues = activeTab.down('form').getValues();
            //get the 
            Ext.apply(store.getProxy().extraParams, formValues);
    },
    generateDisposalpermit:function(application_code,module_id,permit_watermark ){

        var action_url = 'reports/generateDisposalpermit?application_code=' + application_code + '&&module_id=' + module_id+'&permit_watermark='+permit_watermark;
            print_report(action_url);

    },
    generateNarcoticImportPermit:function(application_code,module_id,permit_watermark ){

        var action_url = 'reports/printNarcoticImportPermit?application_code=' + application_code + '&&module_id=' + module_id+'&permit_watermark='+permit_watermark;
            print_report(action_url);

    },
    printHospitalNarcoticsPermit:function(application_code,module_id,permit_watermark ){

        var action_url = 'reports/printHospitalNarcoticsPermit?application_code=' + application_code + '&&module_id=' + module_id+'&permit_watermark='+permit_watermark;
            print_report(action_url);

    },

    generateImportExportpermit:function(application_code,module_id,permit_watermark ){

        var action_url = 'reports/genenerateImportExportPermit?application_code=' + application_code + '&&module_id=' + module_id+'&permit_watermark='+permit_watermark;
            print_report(action_url);

    },

    generatePersonalUsePermit:function(application_code){

        var action_url = 'reports/generatePersonalUsePermit?application_code=' + application_code;
            print_report(action_url);

    },


    // generateImportExportpermit:function(application_code,module_id,sub_module_id,licence_type_id, has_registered_premises,report_type_id,isPreview) {
    //     Ext.getBody().mask();
    //       Ext.Ajax.request({
    //                       url: 'reports/getReportUrl',
    //                       method: 'GET',
    //                       params: {
    //                           application_code:application_code,
    //                           module_id: module_id,
    //                           sub_module_id:sub_module_id,
    //                           licence_type_id:licence_type_id,
    //                           has_registered_premises:has_registered_premises,
    //                           report_type_id:report_type_id,
    //                           isPreview:isPreview
    //                       },
    //                       headers: {
    //                           'Authorization': 'Bearer ' + access_token,
    //                           'X-CSRF-Token': token
    //                       },
    //                       success: function (response) {
    //                           Ext.getBody().unmask();
    //                           var resp = Ext.JSON.decode(response.responseText),
    //                               success = resp.success;
    //                           document_url = resp.document_url;
    //                           if (success == true || success === true) {
                                  
    //                               print_report(document_url);
                                  
    //                           } else {
    //                               toastr.error(resp.message, 'Failure Response');
    //                           }
    //                       },
    //                       failure: function (response) {
    //                           Ext.getBody().unmask();
    //                           var resp = Ext.JSON.decode(response.responseText),
    //                               message = resp.message;
    //                           toastr.error(message, 'Failure Response');
    //                       },
    //                       error: function (jqXHR, textStatus, errorThrown) {
    //                           Ext.getBody().unmask();
    //                           toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
    //                       }
    //               });
                  
              
    //   },

      generateImportExportVCPermit:function(application_code,module_id,sub_module_id,has_registered_premises,report_type_id,isPreview) {
        Ext.getBody().mask();
          Ext.Ajax.request({
                          url: 'reports/getReportUrl',
                          method: 'GET',
                          params: {
                              application_code:application_code,
                              module_id: module_id,
                              sub_module_id:sub_module_id,
                              has_registered_premises:has_registered_premises,
                              report_type_id:report_type_id,
                              isPreview:isPreview
                          },
                          headers: {
                              'Authorization': 'Bearer ' + access_token,
                              'X-CSRF-Token': token
                          },
                          success: function (response) {
                              Ext.getBody().unmask();
                              var resp = Ext.JSON.decode(response.responseText),
                                  success = resp.success;
                              document_url = resp.document_url;
                              if (success == true || success === true) {
                                  
                                  print_report(document_url);
                                  
                              } else {
                                  toastr.error(resp.message, 'Failure Response');
                              }
                          },
                          failure: function (response) {
                              Ext.getBody().unmask();
                              var resp = Ext.JSON.decode(response.responseText),
                                  message = resp.message;
                              toastr.error(message, 'Failure Response');
                          },
                          error: function (jqXHR, textStatus, errorThrown) {
                              Ext.getBody().unmask();
                              toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                          }
                  });
                  
              
      },
    printSampleSubmissionReport:function(btn){
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();

            var action_url = 'reports/printSampleSubmissionReport?application_code=' + application_code + '&&application_id=' + application_id;
            print_report(action_url);
    },
    printApplicationInvoice: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            application_id='',
            activeTab = mainTabPanel.getActiveTab(),
            record = btn.getWidgetRecord();
        
            if(btn.up('window')){
              var win = btn.up('window');
                 application_code = win.down('hiddenfield[name=active_application_code]').getValue();
                 if(win.down('hiddenfield[name=active_application_id]')){
                   application_id = win.down('hiddenfield[name=active_application_id]').getValue();
                 } 
                 module_id = activeTab.down('hiddenfield[name=module_id]').getValue();               
                // module_id = win.down('hiddenfield[name=module_id]').getValue();

            }
            else{
                var  application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
                application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
                module_id = activeTab.down('hiddenfield[name=module_id]').getValue();

            }
          
            invoice_id = record.get('invoice_id');
        if (!invoice_id) {
            toastr.warning('Please save invoice details first!!', 'Warning Response');
            return;
        }
        this.generateApplicationInvoice(application_id, module_id, invoice_id,application_code);
    },
    printOnlineApplicationInvoice: function (btn) {
        var me = this,
            win = btn.up('window'),

            application_code = win.down('hiddenfield[name=active_application_code]').getValue(),
            application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = win.down('hiddenfield[name=module_id]').getValue();

        this.generateApplicationInvoice(application_id, module_id, '',application_code);
    },
    
    generateApplicationInvoice: function (application_id, module_id, invoice_id,application_code) {
        var action_url = 'reports/generateApplicationInvoice?application_id='+application_id+'&module_id='+module_id+'&invoice_id='+invoice_id+'&application_code='+application_code;
        print_report(action_url);
    },

    printApplicationReceipt: function (payment_id) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
            
        this.generateApplicationReceipt(application_id, module_id, payment_id);
    },

    generateApplicationReceipt: function (application_id, module_id, payment_id) {
        var action_url = 'reports/generateApplicationReceipt?payment_id=' + payment_id + '&&module_id=' + module_id + '&&application_id=' + application_id;
        print_report(action_url);
    },

    generatePremiseCertificate: function (application_code) {
      Ext.getBody().mask();
        Ext.Ajax.request({
                        url: 'reports/getReportUrl',
                        method: 'GET',
                        params: {
                            application_code:application_code,
                            module_id: module_id,
                            sub_module_id:sub_module_id,
                            business_type_id:business_type_id,
                            report_type_id:report_type_id,
                            isPreview:isPreview
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success;
                            document_url = resp.document_url;
                            if (success == true || success === true) {
                                
                                print_report(document_url);
                                
                            } else {
                                toastr.error(resp.message, 'Failure Response');
                            }
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Ext.getBody().unmask();
                            toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                        }
                });
                
            
    },

     generateTCPDPremisePermit: function (application_code) {
        var action_url = 'reports/generatePremisePermit?application_code=' + application_code;
        print_report(action_url);
    },

     generateTCPDPsurPermit: function (application_code) {
        var action_url = 'reports/generateProductNotificationLetter?application_code=' + application_code;
        print_report(action_url);
    },

    generatePremisePermit: function (application_code,module_id,sub_module_id,business_type_id,report_type_id,isPreview) {
      Ext.getBody().mask();
        Ext.Ajax.request({
                        url: 'reports/getReportUrl',
                        method: 'GET',
                        params: {
                            application_code:application_code,
                            module_id: module_id,
                            sub_module_id:sub_module_id,
                            business_type_id:business_type_id,
                            report_type_id:report_type_id,
                            isPreview:isPreview
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success;
                            document_url = resp.document_url;
                            if (success == true || success === true) {
                                 //window.open(document_url,'_blank', 'resizable=yes,scrollbars=yes,directories=no, titlebar=no, toolbar=no,menubar=no,location=no,directories=no, status=no');

                                 var newWindow = window.open(document_url, '_blank', 'resizable=yes,scrollbars=yes,directories=no,titlebar=no,toolbar=no,menubar=no,location=no,status=no');
                                // Check if the new window was successfully opened
                                if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                                      Ext.MessageBox.confirm('Preview Confirmation', 'Do you want to open  this document?', function (button) {
                                        if (button === 'yes') {
                                            window.open(document_url, '_blank', 'resizable=yes,scrollbars=yes,directories=no,titlebar=no,toolbar=no,menubar=no,location=no,status=no');
                                        }
                                    })
                                }
                               // print_report(document_url);
                                
                            } else {
                                toastr.error(resp.message, 'Failure Response');
                            }
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Ext.getBody().unmask();
                            toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                        }
                });
                
            
    },


    generatePremiseInspectionReport: function (application_code,module_id,sub_module_id,premise_id,report_type_id,inspection_report_type_id) {
      Ext.getBody().mask();
        Ext.Ajax.request({
                        url: 'reports/getReportUrl',
                        method: 'GET',
                        params: {
                            application_code:application_code,
                            module_id: module_id,
                            sub_module_id:sub_module_id,
                            premise_id:premise_id,
                            report_type_id:report_type_id,
                            inspection_report_type_id:inspection_report_type_id
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success;
                            document_url = resp.document_url;
                            if (success == true || success === true) {
                                
                                print_report(document_url);
                                
                            } else {
                                toastr.error(resp.message, 'Failure Response');
                            }
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Ext.getBody().unmask();
                            toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                        }
                });
                
            
    },


    // generateProductRegCertificate: function (application_code,module_id,sub_module_id,report_type_id,isPreview) {
    //   Ext.getBody().mask();
    //     Ext.Ajax.request({
    //                     url: 'reports/getReportUrl',
    //                     method: 'GET',
    //                     params: {
    //                         application_code:application_code,
    //                         module_id: module_id,
    //                         sub_module_id:sub_module_id,
    //                         report_type_id:report_type_id,
    //                         isPreview:isPreview
    //                     },
    //                     headers: {
    //                         'Authorization': 'Bearer ' + access_token,
    //                         'X-CSRF-Token': token
    //                     },
    //                     success: function (response) {
    //                         Ext.getBody().unmask();
    //                         var resp = Ext.JSON.decode(response.responseText),
    //                             success = resp.success;
    //                         document_url = resp.document_url;
    //                         if (success == true || success === true) {
                                
    //                             print_report(document_url);
                                
    //                         } else {
    //                             toastr.error(resp.message, 'Failure Response');
    //                         }
    //                     },
    //                     failure: function (response) {
    //                         Ext.getBody().unmask();
    //                         var resp = Ext.JSON.decode(response.responseText),
    //                             message = resp.message;
    //                         toastr.error(message, 'Failure Response');
    //                     },
    //                     error: function (jqXHR, textStatus, errorThrown) {
    //                         Ext.getBody().unmask();
    //                         toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
    //                     }
    //             })
    // },

    generateProductRegCertificate: function (application_code) {
        var action_url = 'reports/generateProductRegCertificate?application_code=' + application_code;
        print_report(action_url);
    },
   
   
    
    generateProductNotificationApprovalLetter: function (application_code) {
        var action_url = 'reports/generateProductNotificationApprovalLetter?application_code=' + application_code;
        print_report(action_url);
    },


    generatePromotionalTCPDFRegCertificate: function (application_code) {
        var action_url = 'reports/generatePromotionalRegCertificate?application_code=' + application_code;
        print_report(action_url);
    },


    generatePromotionalRegCertificate: function (application_code,module_id,sub_module_id,report_type_id,isPreview) {
      Ext.getBody().mask();
        Ext.Ajax.request({
                        url: 'reports/getReportUrl',
                        method: 'GET',
                        params: {
                            application_code:application_code,
                            module_id: module_id,
                            sub_module_id:sub_module_id,
                            report_type_id:report_type_id,
                            isPreview:isPreview
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success;
                            document_url = resp.document_url;
                            if (success == true || success === true) {
                                
                                print_report(document_url);
                                
                            } else {
                                toastr.error(resp.message, 'Failure Response');
                            }
                        },
                        failure: function (response) {
                            Ext.getBody().unmask();
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Ext.getBody().unmask();
                            toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
                        }
                });
                
            
    },
    
    
    generateProductNotificationCertificate: function (application_code) {
        var action_url = 'reports/generateProductNotificationCertificate?application_code=' + application_code;
        print_report(action_url);
    },
    generateGMPCertificate: function (application_code, section_id) {
        var action_url = 'reports/generateGmpCertificate?application_code=' + application_code + '&&section_id=' + section_id;
        print_report(action_url);
    },
    generateGvpCertificate: function (application_code, section_id) {
        var action_url = 'reports/generateGvpCertificate?application_code=' + application_code + '&&section_id=' + section_id;
        print_report(action_url);
    },

    generateGmpInspectionReport: function (application_code, section_id) {
        var action_url = 'reports/generateGmpInspectionReport?application_code=' + application_code + '&&section_id=' + section_id;
        print_report(action_url);
    },

    generateGmpApprovalLetter: function (application_code, section_id) {
        var action_url = 'reports/generateGmpApprovalLetter?application_code=' + application_code + '&&section_id=' + section_id;
        print_report(action_url);
    },

    generateClinicalTrialCertificate: function (application_id, application_code) {
        var action_url = 'reports/generateClinicalTrialCertificate?application_id=' + application_id + '&&application_code=' + application_code;
        print_report(action_url);
    },
    //rejections 


    //   generateClinicalTrialCertificate: function (application_code,module_id,sub_module_id,report_type_id,isPreview) {
    //   Ext.getBody().mask();
    //     Ext.Ajax.request({
    //                     url: 'reports/getReportUrl',
    //                     method: 'GET',
    //                     params: {
    //                         application_code:application_code,
    //                         module_id: module_id,
    //                         sub_module_id:sub_module_id,
    //                         report_type_id:report_type_id,
    //                         isPreview:isPreview
    //                     },
    //                     headers: {
    //                         'Authorization': 'Bearer ' + access_token,
    //                         'X-CSRF-Token': token
    //                     },
    //                     success: function (response) {
    //                         Ext.getBody().unmask();
    //                         var resp = Ext.JSON.decode(response.responseText),
    //                             success = resp.success;
    //                         document_url = resp.document_url;
    //                         if (success == true || success === true) {
                                
    //                             print_report(document_url);
                                
    //                         } else {
    //                             toastr.error(resp.message, 'Failure Response');
    //                         }
    //                     },
    //                     failure: function (response) {
    //                         Ext.getBody().unmask();
    //                         var resp = Ext.JSON.decode(response.responseText),
    //                             message = resp.message;
    //                         toastr.error(message, 'Failure Response');
    //                     },
    //                     error: function (jqXHR, textStatus, errorThrown) {
    //                         Ext.getBody().unmask();
    //                         toastr.error('Error downloading data: ' + errorThrown, 'Error Response');
    //                     }
    //             });
                
            
    // },


    
    generateProductRejectionLetter: function (product_id) {
        var action_url = 'reports/generateProductRejectionLetter?product_id=' + product_id;
        print_report(action_url);
    },
    //for summary reports export window
     refreshReportExportGrid: function(me){
       var store = me.store,
            grid = me.up('form'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            section_id = activeTab.down('textfield[name=section_id]').getValue(),
            zone_id = activeTab.down('textfield[name=zone_id]').getValue(),
            sub_module_id = activeTab.down('textfield[name=sub_module_id]').getValue(),
            to_date = activeTab.down('textfield[name=to_date]').getValue(),
            from_date = activeTab.down('textfield[name=from_date]').getValue(),
            receivedOpt = activeTab.down('textfield[name=receivedOpt]').getValue(),
            approvalOpt = activeTab.down('textfield[name=approvalOpt]').getValue()
            classification = activeTab.down('textfield[name=Classification]').getValue()
            decision = activeTab.down('textfield[name=regDetails]').getValue();
            
            //json filters
             var filter = { 
                          't1.section_id':section_id,
                          't1.sub_module_id':sub_module_id,
                          'approvalOpt':approvalOpt,
                          'receivedOpt':receivedOpt,
                          'from_date':from_date,
                          'to_date':to_date
                        };
           filters = JSON.stringify(filter);
        store.removeAll();
            store.getProxy().extraParams = {
                  issueplace: zone_id,
                  filters:filters,
                  decision:decision,
                  Classification:classification

            };
    }

});