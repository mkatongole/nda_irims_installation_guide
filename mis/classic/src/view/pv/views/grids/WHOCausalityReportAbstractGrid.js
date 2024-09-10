
Ext.define('Admin.view.pv.views.grids.WHOCausalityReportAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'whocausalityreportabstractgrid',
    features: [
    {
        ftype: 'summary',
        dock: 'bottom'
    }],
    export_title: 'Causality Evaluation Report',
 
    
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'question', tdCls: 'wrap-text',   
                text: 'Question',
                flex: 1,
                tdCls: 'wrap-text'
            },
           {
                xtype: 'gridcolumn',
                dataIndex: 'score_id',
                tdCls: 'wrap-text',
                text: ' ',
                width: 160,
                editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_pv_assessment_confirmation'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                summaryType: function (records, values) {
                    let certainQuestionIds = [1, 2, 3, 4, 5];
                    let probableQuestionIds = [1, 2, 3, 4];
                    let possibleQuestionIds = [1, 4];
                    let unlikelyQuestionIds = [4];
                    let conditionalQuestionIds = [6,7];
                    let unassessableQuestionIds = [8];

                    let outcomeCounts = {};

                    for (let i = 0; i < records.length; i++) {
                        let record = records[i];
                        let questionId = record.get('question_id');
                        let scoreId = record.get('score_id');

                        if (scoreId === 1) {
                            if (!(questionId in outcomeCounts)) {
                                outcomeCounts[questionId] = 0;
                            }
                            outcomeCounts[questionId]++;
                        }
                    }

                    let maxCount = 0;
                    let maxOutcome = '';

                    if (certainQuestionIds.every(qId => outcomeCounts[qId] === 1)) {
                        maxOutcome = 'Certain';
                    } else if (probableQuestionIds.every(qId => outcomeCounts[qId] === 1)) {
                        maxOutcome = 'Probable / Likely';
                    } else if (possibleQuestionIds.every(qId => outcomeCounts[qId] === 1)) {
                        maxOutcome = 'Possible';
                    } else if (unlikelyQuestionIds.every(qId => outcomeCounts[qId] === 1)) {
                        maxOutcome = 'Unlikely';
                    } else if (conditionalQuestionIds.every(qId => outcomeCounts[qId] === 1)) {
                        maxOutcome = 'Conditional / Unclassified';
                    } else if (unassessableQuestionIds.every(qId => outcomeCounts[qId] === 1)) {
                        maxOutcome = 'Unassessable / Unclassifiable';
                    }

                    return maxOutcome;
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (value) {
                        return 'Outcome(' + value + ')';
                    }
                    return 'Outcome Unknown';
                },
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = 'Select yes or No or Do Not Know';
                    if (val) {
                        if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                            textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                        } else {
                            textVal = record.get('score_option');
                        }
                    }
                    return textVal;
                }
            },

            {
                xtype: 'gridcolumn',
                dataIndex: 'comment', 
                tdCls: 'wrap-text',
                text: ' Comment(Assessor)',
                flex:1,
                editor: {
                    xtype: 'textareafield'
                }
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'reviewer_comment', 
                tdCls: 'wrap-text',
                text: ' Comment(Reviewer)',
                flex:1,
                editor: {
                    xtype: 'textareafield'
                }
            },


            // {
            //     xtype: 'gridcolumn',
            //     dataIndex: 'score', 
            //     tdCls: 'wrap-text',   
            //     text: 'Score',
            //     readOnly: true,
            //     flex: 1,
            //     tdCls: 'wrap-text',
            //     summaryType: 'sum',
            //     renderer: function (val, meta, record) {
            //         return val;
            //     },
            //     summaryRenderer: function (val) {
            //         val = Ext.util.Format.number(val, '0,000.00');
            //         var message = 'Total Score: ' + val;
            //         if (val > 9) {
            //             message =  message+' '+'(Definite)';
            //         } else if (val >= 5 && val <= 8) {
            //             message = message+' '+'(Probable)';
            //         } else if (val >= 1 && val <= 4) {
            //             message = message+' '+'(Possible)';
            //         } else if (val <= 0) {
            //             message = message+' '+'(Doubtful)';
            //         }

            //         return message;
            //     }
            // }
        ];
            this.columns = defaultColumns.concat(this.columns);
            this.callParent(arguments);
    }
});