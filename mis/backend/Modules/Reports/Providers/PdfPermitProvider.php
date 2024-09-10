<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 4/9/2019
 * Time: 8:41 PM
 */

namespace Modules\Reports\Providers;

use setasign\Fpdi\TcpdfFpdi;
class PdfPermitProvider extends TcpdfFpdi
{
  public $params = array();
	public function __construct($qr_data=array()){
			parent::__construct();
		$this->params = $qr_data;
		
	}
  function Header(){
   $this->setMargins(10,10,10,true);
  
		if ($this->PageNo() ==1) {
						$org_info = $this->getOrganisationInfo();
			//	$logo = getcwd() . '/resources/images/org-logo.jpg';
			//$this->Image($logo,90,13,30,33);
		 
		}
	}
	
	
  function Footer()
	{
		//content here
	}
	public function get_Docqrcode($params){
		$qr_code = new Ciqrcode($params);
		//get the details 
		
		$qr_code->generate($params); 
		
	 }
function getOrganisationInfo(){
			
						$org_info = getSingleRecord('tra_organisation_information', array('id'=>1));
			
			return $org_info;
		}
}