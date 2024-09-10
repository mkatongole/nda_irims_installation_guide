var sr_sectionid="";
var sr_sub_module="";
Ext.define('Admin.view.openOffice.safetyreporting.controller.SRSpreadSheetCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.srspreadsheetctr',

        reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                sr_sub_module=newValue;
                if(newValue==0){
                  sr_sub_module='';
                }
           store.load();
         },  
         
          loadApplicationColumns: function(sender,record) {
               sr_sectionid=record.data['id'];
               if(sr_sectionid==0){
                sr_sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':sr_sectionid};
              var   filters = JSON.stringify(filter);          

               //loading grid
               sr_sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':sr_sectionid,'t1.sub_module_id':sr_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('srsapplicationsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
            var application_code = record.get('application_code');
             Ext.data.StoreManager.lookup('spreadsheetsrmedicalhistorystr').reload({params:{ application_code:application_code}});
            },
            
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('srsapplicationsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name
                  var grid =this.lookupReference('srgridpanel')
                  grid.columns[chk_name].setVisible(value)
                  console.log(chk_name, value)
            },
        func_exportsrspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('srgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      console.log(filter_array);

                  var adr_category=grid.down('combo[name=adr_category_id]').getValue()
                    patient_gender_id=grid.down('combo[name=patient_gender_id]').getValue()
                    age_group_id=grid.down('combo[name=age_group_id]').getValue()
                    sourceofpsur_id=grid.down('combo[name=sourceofpsur_id]').getValue()
                    adr_report_type_id=grid.down('combo[name=adr_report_type_id]').getValue()
                    adr_reporter_category_id=grid.down('combo[name=adr_reporter_category_id]').getValue()
                    application_status=grid.down('combo[name=application_status]').getValue()
                    approval_recommendation=grid.down('combo[name=approval_recommendation]').getValue()
                    validity_status=grid.down('combo[name=validity_status]').getValue()
                    is_reporter_notified=grid.down('combo[name=is_reporter_notified]').getValue()


                      var Originalfilter = {'t1.section_id':sr_sectionid,'t1.sub_module_id':sr_sub_module};
                      var filters = JSON.stringify(Originalfilter);

                   //headers
                   if(name=='summary'){
                   var header=Ext.pluck(grid.query('gridcolumn:not([hidden])'), 'name');
                   var header2=[];
                   var x=0;
                   for (var i = 1; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }else{
                  var header=Ext.pluck(grid.columns, 'name');
                  var header2=[];
                   var x=0;
                   for (var i = 2; i <= header.length; i++) {
                    header2[x]= header[i];
                     x++;
                   }
                 }
                   
                  var header= Ext.encode(header2);
                  var now = new Date();
                  // Get the current month (zero-based index, so add 1)
                  var month = ('0' + (now.getMonth() + 1)).slice(-2); 
                  // Get the current year
                  var year = now.getFullYear();
                  // Create the filename string
                  var filename = `${month}_${year}_SRApplicationsSpreadsheet`;
                   filter_array = Ext.JSON.encode(filter_array);
                   Ext.getBody().mask('Exporting Records Please wait...');
                    Ext.Ajax.request({
                      url: 'openoffice/exportall',
                      method: 'POST',
                      params : {
                                  'header':header,
                                  'section_id':sectionid,
                                  'filters':filters,
                                  'filter':filter_array,
                                  'adr_category_id': adr_category,
                                  'patient_gender_id':patient_gender_id,
                                  'age_group_id':age_group_id,
                                  'sourceofpsur_id':sourceofpsur_id,
                                  'adr_report_type_id':adr_report_type_id,
                                  'adr_reporter_category_id':adr_reporter_category_id,
                                  'is_reporter_notified': is_reporter_notified,
                                  'validity_status': validity_status,
                                  'application_status': application_status,
                                  'approval_recommendation': approval_recommendation,
                                  'headingText': 'Safety Reporting APPLICATIONS SPREADSHEET',
                                  'function':'getSrSpreadSheets',
                                  'filename':filename,
                    },
                      
                       success: function (response, textStatus, request) {
                        var t = JSON.parse(response.responseText);
                        var a = document.createElement("a");
                        a.href = t.file; 
                        a.download = t.name;
                        document.body.appendChild(a);

                        a.click();
                     
                        a.remove();
                         Ext.getBody().unmask();
                      },
                      failure: function(conn, response, options, eOpts) {
                           Ext.Msg.alert('Error', 'please try again');
                           Ext.getBody().unmask();
                      }});
        

             },
             func_clearfilters: function(btn) {
                 grid = this.lookupReference('srgridpanel')
                 var t=grid.down('headercontainer').getGridColumns();

                 for (var i = t.length - 1; i >= 3; i--) {
                      column=t[i];
                      var textfield=column.down('textfield');
                      var combo=column.down('combobox');
                      console.log(combo);

                      if(textfield!=null){
                         textfield.setValue('');
                      }else{
                          combo.setValue(0);
                      }

                      grid = column.up('grid');
                      grid.getStore().removeFilter(column.filter.property || column.dataIndex);
                     // column.setText(column.textEl.dom.firstElementChild.innerText);
                 
                   }

             },
             setPageSize: function(combo, newValue){
               var pagesize=combo.getValue();
               Ext.apply(Ext.getStore('srsapplicationsstr'), {pageSize: pagesize});
               
             },
             setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
         
    func_viewUploadedDocs: function(btn) {
         var me = btn.up('button'),
              record = me.getWidgetRecord(),
              form = Ext.widget('uploadeddocsperapplicationGrid'),
              application_code = record.get('application_code');
              form.down('hiddenfield[name=application_code]').setValue(application_code);
              form.down('hiddenfield[name=appType]').setValue('sr');

              funcShowCustomizableWindow('Application Documents', '60%', form, 'customizablewindow');
    },

});

