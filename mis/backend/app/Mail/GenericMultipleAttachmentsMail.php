<?php
/**
 * Created by PhpStorm.
 * Time: 9:07 PM
 */

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\SerializesModels;

class GenericMultipleAttachmentsMail extends Mailable
{

    use Queueable, SerializesModels;
    protected $notification_subject = '';
    protected $notification_message = '';
    protected $permit_report= '';
    protected $certificate_report= '';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($notification_subject, $notification_message, $permit_report, $certificate_report)
    {
        $this->notification_subject = $notification_subject;
        $this->notification_message = $notification_message;
        $this->permit_report = $permit_report;
        $this->certificate_report = $certificate_report;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $org_info = DB::table('tra_organisation_information')->first();
        $data['notification_subject'] = $this->notification_subject;
        $data['notification_message'] = $this->notification_message;
        $data['email_footer'] = $org_info->email_footer;
        $data['org_name'] = $org_info->name;
        $data['org_website'] = $org_info->website;
        $data['org_motto'] = $org_info->motto;
        $data['org_email'] = $org_info->email_address;
        $data['logo_url'] = $org_info->logo_url;
        return $this->view('mail.genericEmail')
            ->subject($this->notification_subject)
            ->with($data)
            ->attachData($this->certificate_report, 'Certificate_'.time().'.pdf', [
                'mime' => 'application/pdf',
            ])
            ->attachData($this->permit_report, 'Permit_'.time().'.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
