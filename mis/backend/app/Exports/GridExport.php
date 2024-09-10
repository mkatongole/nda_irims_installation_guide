<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\BeforeWriting;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithDrawings;
class GridExport implements FromArray, WithHeadings, WithEvents, WithColumnFormatting
{
    use  RegistersEventListeners;
    protected $data,$headers,$heading;

    public function __construct(array $data,array $header,String $heading)
    {
        $this->data = $data;
        $this->headers=$header;
        $this->heading=$heading;
    }
     public function registerEvents(): array
    {
        return [
            // Handle by a closure.
           AfterSheet::class=>function(AfterSheet $event){

            $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];
            $styleHeaderArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ]
            ];

           $event->sheet->getCell('A1')->setValue("NDA UGANDA\n".$this->heading);
            $event->sheet->getStyle('A1')->applyFromArray($styleArray);

            //trial
            $length=count($this->headers);
            $size=count($this->data)+7;
            $letter= $this->number_to_alpha($length,"");
            $event->sheet->mergeCells('A1:'.$letter.'6');

            $event->sheet->getDelegate()->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);

            $cellRange = 'A7:'.$letter.''.$size;
            $headerRange = 'A7:'.$letter.'7';
            $event->sheet->getDelegate()->getStyle($headerRange)->applyFromArray($styleHeaderArray);

            if($length > 11){
                    $event->sheet->getDelegate()->getStyle($cellRange)->getAlignment()->setWrapText(true);
            }else{
        //set autosize true for all columns
                  if($length>26){
                      foreach(range('A','Z') as $column) {
                              $event->sheet->getColumnDimension($column)->setAutoSize(true);
                          }
                      $remainder=27;
                      while ($remainder <= $length) {
                        $column=$this->number_to_alpha($remainder,"");
                        $event->sheet->getColumnDimension($column)->setAutoSize(true);
                        $remainder++;
                      }
                  }else{
                  foreach(range('A',$letter) as $column) {
                          $event->sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                }
             }
             // $event->sheet->getHeaderFooter()->setOddHeader('&C&H&BTANZANIAN MEDICINE AND MEDICAL DEVICES AGENCY
             //    P.O. Box 77150, Nelson Mandela Road,Mabibo External
             //    Tell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484
             //    '.$this->heading);

                // $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();
                // $drawing->setName('PhpSpreadsheet logo');
                // $drawing->setPath(public_path('resources/images/header.png'));
                // $drawing->setHeight(100);
                // $event->sheet->getHeaderFooter()->addImage($drawing, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_LEFT);
            //drawing logo like pro
                // $drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
                // $drawing->setName('Logo');
                // $drawing->setDescription('Logo');
                // $drawing->setPath(public_path('resources/images/header.png'));
                // $drawing->setCoordinates('A1');
                // $drawing->setHeight(100);
                // //$drawing->setOffsetX(100);
                // $drawing->setWorksheet($event->sheet->getDelegate());

             $event->sheet->setPrintGridlines(true);

        }];
    }

   public function headings(): array
    {
        return [
            [' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' '],
            [' ',' ',' ',' ',' '],
            $this->headers
        ];
    }

    public function array(): array
    {

        return $this->data;
       
    }
    public function columnFormats(): array
    {
      if($this->heading != "DETAILED REVENUE GL_CODE PAYMENTS"){
            return ['V'=>'0,000.00','S'=>'0,000.00'];
        }else{
            return [];
        }
    }


    function number_to_alpha($num,$code)
        {   
        $alphabets = array('', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        if($num == 0){
            $num=1;
        }

        $division = floor($num / 26);
        $remainder = $num % 26; 

        if($remainder == 0)
        {
            $division = $division - 1;
            $code .= 'Z';
        }
        else
            $code .= $alphabets[$remainder];

        if($division > 26)
            return number_to_alpha($division, $code);   
        else
            $code .= $alphabets[$division];     

        return strrev($code);
        }
}

