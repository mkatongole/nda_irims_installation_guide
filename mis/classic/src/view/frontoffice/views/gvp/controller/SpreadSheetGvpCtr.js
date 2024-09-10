var gvp_sectionid="";
var gvp_sub_module="";
Ext.define('Admin.view.openOffice.gvp.controller.SpreadSheetGvpCtr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.spreadsheetgvpctr',

        reloadSheetStore: function(combo,newValue,old,eOpts) {
           var form=combo.up('form'),
                store=form.down('pagingtoolbar').getStore();
                gvp_sub_module=newValue;
                if(newValue==0){
                  gvp_sub_module='';
                }
           store.load();
         },  
          loadApplicationColumns: function(sender,record) {
               gvp_sectionid=record.data['id'];
               if(gvp_sectionid==0){
                gvp_sectionid='';
               }
              //load filters to other depedent stores
              var filter = {'t1.section_id':gvp_sectionid};
              var   filters = JSON.stringify(filter);          

               //loading grid
               gvp_sub_module=this.getView().down('combo[name=sub_module]').getValue();
              //add filters
              var filter = {'t1.section_id':gvp_sectionid,'t1.sub_module_id':gvp_sub_module};
              var   filters = JSON.stringify(filter);
              Ext.data.StoreManager.lookup('spreadsheetgvpapplicationcolumnsstr').load({params:{filters:filters}});

            },
          loadadditionalinfo:  function(sender,record) {
              var gvp_site_id=record.data['gvp_site_id'];
              var filter = { 't1.gvp_site_id':gvp_site_id };
              var   filters = JSON.stringify(filter);
             Ext.data.StoreManager.lookup('spreadsheetgvpproductsstr').reload({params:{filters:filters}});
             //for inspection team
              var application_code = record.get('application_code');
              Ext.data.StoreManager.lookup('gvpInspectionTeamgridStr').reload({params:{application_code:application_code}});

            },
            
          funcReloadspreadSheetStrs: function() {
                   Ext.data.StoreManager.lookup('spreadsheetgvpapplicationcolumnsstr').reload();
                 }, 
          func_showhideSpreasheetColumn: function (chk, value) {
                  var  chk_name = chk.name
                  var grid =this.lookupReference('gvpgridpanel')
                  grid.columns[chk_name].setVisible(value)
                  console.log(chk_name, value)
            },
        func_exportgvpspreadsheet: function (btn) {

                 var name=btn.name;
                  var grid = this.lookupReference('gvpgridpanel'),
                  filterfield = grid.getPlugin('filterfield');
                  //filters
                      var filter_array =Ext.pluck( filterfield.getgridFilters(grid), 'config');
                      console.log(filter_array);

                      var  assessment_type_id=grid.down('combo[name=assessment_type_id]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue(),
                      gvp_type_id=grid.down('combo[name=gvp_type_id]').getValue(),
                      gvp_inspection_id = grid.down('combo[name=gvp_inspection_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      application_status=grid.down('combo[name=application_status]').getValue(),
                      approval_recommendation=grid.down('combo[name=approval_recommendation]').getValue();

                      var Originalfilter = {'t1.section_id':gvp_sectionid,'t1.sub_module_id':gvp_sub_module};
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
                                  'assessment_type':assessment_type_id,
                                  'gvp_inspection': gvp_inspection_id,
                                  'gvp_type':gvp_type_id,
                                  'registration_status':registration_status,
                                  'validity_status':validity_status,
                                  'application_status':application_status,
                                  'approval_recommendation':approval_recommendation,
                                  'headingText': 'GVP APPLICATIONS SPREADSHEET',
                                  'issueplace':zone_id,
                                  'function':'getGvpSpreadSheet',
                                  'filename':'GVPApplicationsSpreadsheet'
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
                 grid = this.lookupReference('gvpgridpanel')
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
               Ext.apply(Ext.getStore('spreadsheetgvpapplicationcolumnsstr'), {pageSize: pagesize});
               
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
              form.down('hiddenfield[name=appType]').setValue('gvp');

              funcShowCustomizableWindow('Application Documents', '60%', form, 'customizablewindow');
    },

});

