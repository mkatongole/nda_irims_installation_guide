/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductBioequivalenceTrialInformationDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.BioequivalenceTrialInformationApplicationDocUploadsGrid',
    xtype:'productbioequivalencetrialinformationDocUploadsGrid',
    upload_tab:'productDocUploadsGrid',
    table_name:'tra_product_applications',
    viewModel: {
        type: 'productregistrationvm'
    }
});
