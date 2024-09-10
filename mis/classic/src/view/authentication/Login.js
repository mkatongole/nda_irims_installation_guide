Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'login',
    header: false,
    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Admin.global.GlobalVars'
    ],
     bodyStyle:{
        'background': 'linear-gradient(50deg,#497d36, #E2E2E2, #497d36);'
    }, 
    //title: 'MIS',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    autoScroll: true,
    listeners: {
        afterrender: 'afterLoginPageRenders'
    },
    items: [{
        xtype: 'container',
        width: '56%',
        layout: 'responsivecolumn',
        items: [
            {
                xtype : 'panel',
                title: 'NDA IRIMS - LOGIN',
                headerStyle : { "background-color" : "#1E6912", "opacity" : "0.8" },
                userCls : 'big-100 small-100'
            },
            {
                xtype: 'panel',
                userCls: 'big-40 small-100',
                minHeight: 300,
                itemId: 'loginMetaId',
               
                bodyStyle : { "background-color" : "#F9F9F9", "opacity" : "0.8" },
                layout : { type : 'vbox', align : 'center', pack : 'center' },
                defaults : { width : '100%' },
                items: [
                    {
                        bodyStyle : { "background-color" : "#F/9F9F9", "text-align" : "center" },
                        xtype : 'image',
                        style :
                            'background-image:url(resources/images/logo.png); background-repeat: no-repeat;background-position: center;',
                        // src: 'resources/images/logo.jpg',
                        mode : 'image',
                        height : 120
                    },
                    {
                        itemId: 'version_meta',
                       // html: '<h3 style="color:black; font-size:13px; text-align: center">Tanzania Food and Drugs Authority<br>Integrated Management Information System<br/><small>Version: <span style="color: #3366ff">Rev 0 [F:' + Admin.global.GlobalVars.extVersion + ',B:' + backendVersion + ']</span> <i class="x-fa fa-copyright" style="font-size: 11px"></i> 2018 </small><\h3>'
                        bodyStyle : { "background-color" : "#F9F9F9", "line-height" : "25px" },
                        html : '<h3 style="line-height: 2;color:black; font-size:12px; text-align: center">NATIONAL DRUG AUTHORITY<br>' + system_name + '<br><small>(iRIMS)</small></h3>',
                        // height: 170
					}
                ]

            }, {
                xtype: 'panel',
                itemId: 'winFormsPanel',
                userCls: 'big-60 small-100',
                layout: {
                    type: 'card'
                },
                
                items: [{
                    xtype: 'authdialog',
                    defaultButton: 'loginButton',
                    autoComplete: true,
                    bodyPadding: '20 20',
                    cls: 'auth-dialog-login',
                    header: false,
                    width: 500,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '5 0'
                    },

                    items: [
                        {
                            xtype: 'label',
                            style: {
                                'font-weight': 'bold',
                                'font-size': '18px'
                            },
                            text: 'LOGIN'
                        },
                        {
                            xtype: 'textfield',
                            value: token,
                            name: '_token',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            name: 'email',
                            bind: '{userid}',
                            height: 55,
                            hideLabel: true,
                            allowBlank: false,
                            emptyText: 'Email Address',
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-email-trigger'
                                }
                            }
                        },
                        // {
                        //     xtype: 'textfield',
                        //     cls: 'auth-textbox',
                        //     height: 55,
                        //     hideLabel: true,
                        //     emptyText: 'Password',
                        //     inputType: 'password',
                        //     name: 'password',
                        //     bind: '{password}',
                        //     allowBlank: false,
                        //     triggers: {
                        //         reveal: {
                        //             cls: 'x-fa fa-eye password-trigger',
                        //             handler: function(field) {
                        //                 var inputEl = field.inputEl.dom;
                        //                 var currentType = inputEl.getAttribute('type');
                        //                 var newType = currentType === 'password' ? 'text' : 'password';
                        //                 inputEl.setAttribute('type', newType);
                        //                 var iconCls = newType === 'password' ? 'x-fa fa-eye-slash' : 'x-fa fa-eye';
                        //                 this.setIconCls(iconCls);
                        //                 field.inputEl.focus(); // Keep focus on the input field after toggling
                        //             }
                        //         }
                        //     },
                        //     listeners: {
                        //         afterrender: function(field) {
                        //             var triggerEl = field.getTrigger('reveal').getEl();
                        //             triggerEl.on('click', function() {
                        //                 field.triggers.reveal.handler(field);
                        //             });
                        //         }
                        //     }
                        // },
                         {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            height: 55,
                            hideLabel: true,
                            emptyText: 'Password',
                            inputType: 'password',
                            name: 'password',
                            bind: '{password}',
                            allowBlank: false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    cls: 'form-panel-font-color rememberMeCheckbox',
                                    height: 30,
                                    bind: '{persist}',
                                    boxLabel: 'Remember me',
                                    name: 'remember_me',
                                    inputValue: 1//submitValue
                                },
                                {
                                    xtype: 'box',
                                    html: '<a href="#passwordreset" class="link-forgot-password" onclick="event.preventDefault()"> Forgot Password ?</a>',
                                    listeners: {
                                        el: {
                                            delegate: 'a',
                                            click: 'onResetPasswordClick'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            ui: 'soft-green',
                            iconAlign: 'right',
                            iconCls: 'x-fa fa-sign-in',
                            text: 'Login',
                            formBind: true,
                            listeners: {
                                click: 'onLoginButton'
                            }
                        }]
                },
                    //email for password reset
                    {
                        xtype: 'authdialog',
                        defaultButton: 'loginButton',
                        autoComplete: true,
                        bodyPadding: '20 20',
                        cls: 'auth-dialog-login',
                        header: false,
                        width: 500,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        defaults: {
                            margin: '5 0'
                        },

                        items: [
                            {
                                xtype: 'label',
                                text: 'Enter your email address for further reset instructions!!',
                                style: {
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                }
                            },
                            {
                                xtype: 'textfield',
                                value: token,
                                name: '_token',
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                cls: 'auth-textbox',
                                name: 'email',
                                height: 55,
                                hideLabel: true,
                                allowBlank: false,
                                emptyText: 'Registered Email Address',
                                triggers: {
                                    glyphed: {
                                        cls: 'trigger-glyph-noop auth-envelope-trigger'
                                    }
                                }
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'box',
                                        html: '<a href="#login" class="link-forgot-password" onclick="event.preventDefault()"><i class="x-fa fa-angle-left"></i> Back to Log In</a>',
                                        listeners: {
                                            el: {
                                                delegate: 'a',
                                                click: 'onLoginClick'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                reference: 'resetPassword',
                                scale: 'large',
                                ui: 'soft-green',
                                formBind: true,
                                iconAlign: 'right',
                                iconCls: 'x-fa fa-angle-right',
                                text: 'Reset Password',
                                listeners: {
                                    click: 'onResetPwdClick'
                                }
                            }
                        ]
                    }
                ]
            }]

    }],

    initComponent: function () {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
