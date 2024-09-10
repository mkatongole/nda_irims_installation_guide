/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductQualityReviewDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.QualityReviewApplicationDocUploadsGrid',
    xtype:'productqualityreviewDocUploadsGrid',
    upload_tab:'productDocUploadsGrid',
    table_name:'tra_product_applications',
    viewModel: {
        type: 'productregistrationvm'
    }
});
