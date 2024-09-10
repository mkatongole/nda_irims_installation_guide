<?php
/**
 * Created by PhpStorm.
 * Time: 10:24 AM
 */

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\SerializesModels;

class GenericPlainMail extends Mailable
{
    use Queueable, SerializesModels;
    protected $notification_subject = '';
    protected $notification_message = '';

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($notification_subject, $notification_message)
    {
        $this->notification_subject = $notification_subject;
        $this->notification_message = $notification_message;

        
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
            ->with($data);

    }
}
