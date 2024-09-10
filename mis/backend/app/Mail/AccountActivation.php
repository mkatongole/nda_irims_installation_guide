<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\DB;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AccountActivation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $username = " ";
    public $password = " ";
    public $link = " ";
    protected $notification_subject = '';
    protected $notification_message = '';

    public function __construct($notification_subject, $notification_message, $email, $password, $link)
    {
        $this->username = $email;
        $this->password = $password;
        $this->link = $link;
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
        $data['username'] = $this->username;
        $data['password'] = $this->password;
        $data['link'] = $this->link;
        $data['notification_subject'] = $this->notification_subject;
        $data['notification_message'] = $this->notification_message;
        $data['email_footer'] = $org_info->email_footer;
        $data['org_name'] = $org_info->name;
        $data['org_website'] = $org_info->website;
        $data['org_motto'] = $org_info->motto;
        $data['org_email'] = $org_info->email_address;
        $data['logo_url'] = $org_info->logo_url;

        //dd($data);
        return $this->view('mail.accountActivation')
            ->subject($this->notification_subject)
            ->with($data);
    }
}
