/**
 * Created by Softclans on 7/29/2017.
 */
Ext.define('Admin.view.authentication.PasswordChangeWin', {
    extend: 'Ext.window.Window',
    xtype: 'passwordchangewin',
    modal: true,
    title: 'Password Change',
    padding: 3,
    requires: [
        'Ext.form.*',
        'Ext.layout.container.Form',
        'Ext.button.*'
    ],

    items: [
        {
            xtype: 'form',
            frame: true,
            layout: {
                type: 'form'
            },
            defaults:{
                allowBlank: false,
                msgTarget: 'under'
            },
            items:[
                {
                    xtype: 'textfield',
                    hidden: true,
                    fieldLabel: 'Token',
                    name: '_token',
                    value: token
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Old Password',
                    inputType: 'password',
                    name: 'old_password'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'New Password',
                    inputType: 'password',
                    id: 'new_password',
                    name: 'new_password'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Confirm New Password',
                    inputType: 'password',
                    id: 'confirm_new_password',
                    initialPassField: 'new_password',
                    vtype: 'password',
                    name: 'confirm_new_password'
                }
            ],
            buttons:[
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    formBind: true,
                     handler: function (btn) {
                         var me = this,
                         form = btn.up('form'),
                         win = form.up('window'),
                         confirm_new_password = form.down('textfield[name=confirm_new_password]').getValue(),
                         new_password = form.down('textfield[name=new_password]').getValue(),
                         frm = form.getForm(),
                          pass_response = pass_complexcheck(new_password),
                          error_message = pass_response.error_message
                         response = pass_response.response;

                         if(response){
                            if (frm.isValid()) {
                                frm.submit({
                                    url: 'updatePassword',
                                    waitMsg: 'Updating password...',
                                    success: function (form, action) {
                                        var response = Ext.decode(action.response.responseText),
                                            message = response.message;
                                        toastr.success(message, "Success Response");
                                        win.close();
                                    },
                                    failure: function (form, action) {
                                        var response = Ext.decode(action.response.responseText),
                                            message = response.message;
                                        toastr.error(message, 'Failure Response');
                                    }
                                });
                            }

                          }
                       else{
                        var message = "Password doesn't comform to the complexity policy, it must have "+error_message;
                        toastr.error(message, 'Failure Response');
                      }
                     }
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    iconCls: 'x-fa fa-times',
                    action: 'close',
                    handler: function (btn) {
                        btn.up('form').up('window').close();
                    }
                }
            ]
        }
    ]
});