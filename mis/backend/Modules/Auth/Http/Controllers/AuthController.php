<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuthController extends Controller
{

   
    protected $mis_app_client;
    protected $external_api_client;

    public function __construct()
    {
        $mis_app_id = Config('constants.api.mis_app_client_id');
        $this->mis_app_client = DB::table('oauth_clients')->where('id', $mis_app_id)->first();
        $external_api_id = Config('constants.api.external_api_client_id');
        $this->external_api_client = DB::table('oauth_clients')->where('id', $external_api_id)->first();
    }

    public function handleLogin(Request $req)
    {
        $email = $req->input('email');
        $password = $req->input('password');
        $remember_me = $req->input('remember_me'); 
        $check_rem = false;
        if (is_numeric($remember_me) || !is_null($remember_me)) {
            $check_rem = true;
        }
        $encryptedEmail = aes_encrypt($email);
      // $user = User::where('email', $encryptedEmail)->first();
        $user = User::where(function ($query) use($encryptedEmail,$email) {
            $query->where('email', '=', $encryptedEmail)
                  ->orWhere('username', '=', $email);
        })->first();
    
        if (is_null($user) || $user == null || empty($user) || (!$user->exists())) {
            //log the login attempt
            $email = $email;
            
            $attemptLoginParams = array(
                'email' => $email,
                'password' => $password,
                'ip_address' => request()->ip(),
                'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                'time' => Carbon::now(),//date('Y-m-d H:i:s'),
                'attempt_status' => 1//date('Y-m-d H:i:s')
            );
            DB::table('tra_login_attempts')->insert($attemptLoginParams);
            $res = array(
                'success' => false,
                'message' => 'Authentication Failed...User Not found!!'
            );
        } else {
            $uuid = $user->uuid;
            $user_id = $user->id;
            //check if account is blocked
            $is_account_blocked = DB::table('tra_blocked_accounts')->where(array('account_id' => $user_id))->first();

            if (!empty($is_account_blocked) || (!is_null($is_account_blocked))) {
                $res = array(
                    'success' => false,
                    'message' => 'Authentication Failed...This account is blocked from accessing the system!!'
                );
            } else {
                $authParams = array(
                    'email' => $encryptedEmail,
                    'password' => $password,
                    'uuid' => $uuid
                );
                if (\Auth::attempt($authParams, $check_rem)) {
                    //check if this user have login failed attempts then clear
                    DB::table('tra_failed_login_attempts')->where('account_id', \Auth::user()->id)->update(array('attempt_status' => 2));
                    //clear previous access tokens
                    $loggedInUser = \Auth::user();
                    $mis_client_id = Config('constants.api.mis_client_id');
                    $userTokens = $loggedInUser->tokens();
                    foreach ($userTokens as $token) {
                        if ($token->client_id == $mis_client_id) {
                            $token->revoke();
                            $token->delete();
                        }
                    }

                    $res = array(
                        'success' => true,
                        'message' => 'Login Successful. Redirecting...'
                    );
                } else {
                    //lets log the login attempts, for every attempted/failed login we increment the attempts counter
                    //first we get the number of attempts for this user within a 24hrs time span, beyond the time frame we reset the counter
                    //NB: max number of attempts is 5 after which we block the account
                    $attemptsCount = DB::table('tra_failed_login_attempts')->where(array('account_id' => $user_id,'attempt_status' => 1))->first();
                    if (!empty($attemptsCount) || (!is_null($attemptsCount))) {
                        $no_of_attempts = $attemptsCount->attempts;
                        $time1 = Carbon::now();//date('Y-m-d H:i:s');
                        $time2 = $attemptsCount->time;
                        //now check for time span
                        $timeSpan = getTimeDiffHrs($time1, $time2);
                        if ($timeSpan > 24) {
                            //clear or rather update the attempt count to 1
                            $update = array(
                                'attempt_status' => 2
                            );
                            DB::table('tra_failed_login_attempts')->where('account_id', $user_id)->update($update);
                            $no_of_attempts = 0;
                        } else {

                        }
                        //increment the counter
                        //if counter is 4 then this was the last attempt so block the account
                        if ($no_of_attempts == 4 || $no_of_attempts == '4' || $no_of_attempts > 4 || $no_of_attempts == 5 || $no_of_attempts == '5') {
                            $blockedAccountParams = array(
                                'account_id' => $user_id,
                                'email' => $email,
                                'date' => date('Y-m-d H:i:s'),
                                'reason' => 'Failed login attempts 5 times within 24hrs'
                            );
                            DB::table('tra_blocked_accounts')->insert($blockedAccountParams);
                            $res = array(
                                'success' => false,
                                'message' => 'Authentication Failed...Your account has been blocked!!'
                            );
                        } else {
                            $res = array(
                                'success' => false,
                                'message' => 'Authentication Failed...You have ' . (5 - ($no_of_attempts + 1)) . ' attempts remaining!!'
                            );
                        }
                        //update
                        DB::table('tra_failed_login_attempts')->where(array('account_id' => $user_id,'attempt_status'=>1))->update(array('attempts' => $no_of_attempts + 1));
                    } else {
                        //no attempts so fresh logging
                        $attempts = 1;
                        $loginAttemptsParams = array(
                            'account_id' => $user_id,
                            'email' => $email,
                            'ip_address' => request()->ip(),
                            'user_agent' => $_SERVER['HTTP_USER_AGENT'],
                            'attempts' => $attempts,
                            'time' => date('Y-m-d H:i:s'),
                            'attempt_status' => 1
                        );
                        DB::table('tra_failed_login_attempts')->insert($loginAttemptsParams);
                        $res = array(
                            'success' => false,
                            'message' => 'Authentication Failed...You have ' . (5 - $attempts) . ' attempts remaining!!!!'
                        );
                    }
                }
            }
        }
        return response()->json($res);
    }

      public function forgotPasswordHandler(Request $req)
    {
        $res = array();
        try {
            DB::transaction(function () use (&$res, $req) {
                $email = $req->input('email');
                $encryptedEmail = aes_encrypt($email);
                //check if this mail is registered in the system
                $user = User::where('email', $encryptedEmail)->first();
                if (is_null($user)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Request Failed...This email address is not registered in the system!!'
                    );
                } else {
                    $user_id = $user->id;
                    $guid = md5(uniqid());
                    $pwdResetParams = array(
                        'user_id' => $user_id,
                        'guid' => $guid,
                        'date_generated' => Carbon::now()
                    );
                    $user_passwordData = str_random(8);

                    DB::table('tra_password_reset')->insert($pwdResetParams);
                    if (is_connected()) {
                        //send the mail here
                        $subject = 'NDA iRIMS :Password Recovery';
                        $email_content = "Below is the reset Account Password</br>.";
                       
                        $email_content .= " <p>- Account Email Address: ".$email .".<p/>";
                        $email_content .= " - <h2>One Time Password(OTP):    ".$user_passwordData ."<br/></h2>";

                        $email_content.="<p>For more information visit IMIS for a full account access guide</p>";
                        $email_content.="<p><br/><br/></p>";
                        $base_url = url('/');
                        $email_content.="<p><center><h2><a href=".$base_url.">System Access(Login)<a/></h2></p>";
                       
                       // $link = url('/') . '/resetPassword?guid=' . $guid;
                        $vars = array(
                            '{username}' => $email
                        );
                        $res = forgotPasswordEmail(1, $email, $email_content, $vars);
                        
                        if($res['success']){
                            $user_exists = User::find($user_id);
                            if ($user_exists->count() > 0) {
                                $username = $user_exists->email;
                                $uuid = $user_exists->uuid;
                                $dms_id = $user_exists->dms_id;
                                $hashedPassword = hashPwd($username, $uuid, $user_passwordData);
                                $user_exists->password = $hashedPassword;
                                if ($user_exists->save()) {

                                }
                            }
                        }
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Whoops!! There is no internet connection. Check your connection then try again!!'
                        );
                    }
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }


    public function passwordResetLoader(Request $req)
    {
        $guid = $req->guid;
        $data['is_reset_pwd'] = true;
        $data['guid'] = $guid;
        $data['user_id'] = '';
        $data['title_id'] = '';
        $data['gender_id'] = '';
        $data['is_logged_in'] = false;
        $data['title'] = '';
        $data['first_name'] = '';
        $data['last_name'] = '';
        $data['year'] = date('Y');
        $data['base_url'] = url('/');
        $data['email'] = '';
        $data['phone'] = '';
        $data['mobile'] = '';
        $data['access_point'] = '';
        $data['role'] = '';
        $data['profile_pic_url'] = '';
        $data['system_name'] = Config('constants.sys.system_name');
        $data['organisation_name'] = Config('constants.sys.organisation_name');
        $data['org_name'] = Config('constants.sys.org_name');
        $data['iso_cert'] = Config('constants.sys.iso_cert');
        $data['ministry_name'] = Config('constants.sys.ministry_name');
        $data['system_version'] = Config('constants.sys.system_version');
        $data['system_version'] = Config('constants.sys.organisation_name');
        $data['access_token'] = '';
        $data['approval_lag_days'] = 2;
        $data['upload_directory'] = ''; 
        $data['system_dashboard'] = ''; 
        $data['scheduledtcmeeting_counter'] = ''; 
        $data['nonMenusArray'] = array();

        return view('init', $data);
    }

    function passwordResetHandler(Request $req)
    {
        $res = array();
        try {
            DB::transaction(function () use (&$res, $req) {
                $guid = $req->input('guid');
                $newPassword = $req->input('new_password');
                //check if guid exists
                $guid_exists = DB::table('tra_password_reset')->where('guid', $guid)->first();
                if (is_null($guid_exists) || empty($guid_exists)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Your password reset token is invalid. Try again requesting for password reset!!'
                    );
                } else {
                    //check for time validity of the reset token
                    $time1 = Carbon::now();
                    $time2 = $guid_exists->date_generated;
                    $user_id = $guid_exists->user_id;
                    $time_diff = getTimeDiffHrs($time1, $time2);
                    if ($time_diff > 24) {
                        //the token has expired...delete
                        DB::table('tra_password_reset')->where('guid', $guid)->delete();
                        $res = array(
                            'success' => false,
                            'message' => 'Your password reset token has expired. Try again requesting for password reset!!'
                        );
                    } else {
                        //all is well..allow for password reset
                        //check if the fetched user id really exists in users table
                        $user_exists = User::find($user_id);
                        if ($user_exists->count() > 0) {
                            $username = $user_exists->email;
                            $uuid = $user_exists->uuid;
                            $dms_id = $user_exists->dms_id;
                            $dms_pwd = md5($newPassword);
                            $hashedPassword = hashPwd($username, $uuid, $newPassword);
                            $user_exists->password = $hashedPassword;
                            if ($user_exists->save()) {
                                //save new dms password
                                /* $dms_db = DB::connection('dms_db');
                                 $dms_db->table('tblusers')
                                     ->where('id', $dms_id)
                                     ->update(array('pwd' => $dms_pwd));*/
                                //delete the reset password token
                                DB::table('tra_password_reset')->where('guid', $guid)->delete();
                                //also delete any tokens associated with this user
                                DB::table('tra_password_reset')->where('user_id', $user_id)->delete();
                                $res = array(
                                    'success' => true,
                                    'message' => 'Congratulations...Your password was reset successfully!!'
                                );
                            } else {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Sorry problem was encountered while saving your new password. Please try again!!'
                                );
                            }
                        } else {
                            $res = array(
                                'success' => false,
                                'message' => 'Your request couldn\'t be authenticated...User not found!!'
                            );
                        }
                    }
                }
            }, 5);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    public function updateUserPassword(Request $req)
    {
        $user_id = \Auth::user()->id;
        $username = \Auth::user()->email;
        $uuid = \Auth::user()->uuid;
        $password = \Auth::user()->password;
        $old_password = $req->input('old_password');
        $new_password = $req->input('new_password');
        $encryptedNewPwd = hashPwd($username, $uuid, $new_password);
        //check if the provided old password is correct
        $encryptedOldPwd = hashPwd($username, $uuid, $old_password);
        if ($encryptedOldPwd === $password) {
            $user = User::find($user_id);
            $user->password = $encryptedNewPwd;
            if ($user->save()) {
                $res = array(
                    'success' => true,
                    'message' => 'Password changed successfully!!'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Problem was encountered while changing your password. Please try again later!!'
                );
            }
        } else {
            $res = array(
                'success' => false,
                'message' => 'Your old password is wrong. Try again!!'
            );
        }

        return response()->json($res);
    }

    public function getUserAccessLevel(Request $req)
    {
        try {
            $menu_id = $req->menu_id;
            $superUserID = getSuperUserGroupId();
            //first get his/her groups
            $user_id = \Auth::user()->id;
            $groups = getUserGroups($user_id);
            //check if this user belongs to the super user group...if so then should have system full access
            if (in_array($superUserID, $groups)) {
                $access_level = 4;
            } else {
                $results = DB::table('tra_permissions')
                    ->select(DB::raw('max(accesslevel_id) as highestAccessLevel'))
                    ->where('menu_id', $menu_id)
                    ->whereIn('tra_permissions.group_id', $groups)
                    ->value('highestAccessLevel');
                if (is_null($results)) {
                    $access_level = 1;
                } else {
                    $access_level = convertStdClassObjToArray($results);
                }
            }
        } catch (\Exception $e) {
            $access_level = $e->getMessage();
        } catch (\Throwable $throwable) {
            $access_level = $throwable->getMessage();
        }
        return response()->json($access_level);
    }

    public function authenticateUserSession()
    {
        if (!\Auth::check()) {
            $res = array(
                'success' => false,
                'message' => 'Your session has expired. Please reload the application to continue!!'
            );
        } else {
            $res = array(
                'success' => true,
                'message' => 'Session still valid!!'
            );
        }
        return response()->json($res);
    }

    public function reValidateUser(Request $req)
    {
        $user_id = $req->input('user_id');
        $password = $req->input('password');
        try {
            $user = new User();
            $currentUser = $user->find($user_id);
            if (!is_null($currentUser)) {
                $email = $currentUser->email;
                $uuid = $currentUser->uuid;
                $authParams = array(
                    'email' => $email,
                    'password' => $password,
                    'uuid' => $uuid
                );
                if (\Auth::attempt($authParams)) {
                    $res = array(
                        'success' => true,
                        'message' => 'You were successfully authenticated, you can now proceed!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Wrong credentials, please try again or reload the application from your browser refresh/reload icon/button!!'
                    );
                }
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'User not found, please reload the application from your browser refresh/reload icon/button!!'
                );
            }
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    public function authenticateApiUser(Request $request)
    {
        $username = $request->input('username');//email address
        $password = $request->input('password');
        $username = aes_encrypt($username);
        if (is_null($this->external_api_client)) {
            $res = array(
                'success' => false,
                'message' => 'API user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'provider' => 'apiusers',
            'client_id' => $this->external_api_client->id,
            'client_secret' => $this->external_api_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $token = \Route::dispatch($tokenRequest);
        return \response($token->getContent(), 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }

    public function authApiUser(Request $request)
    {
        $username = $request->input('email');
        $password = $request->input('password');
        $username = aes_encrypt($username);
        if (is_null($this->mis_app_client)) {
            $res = array(
                'success' => false,
                'message' => 'MIS App user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'client_id' => $this->mis_app_client->id,
            'client_secret' => $this->mis_app_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $token = \Route::dispatch($tokenRequest);
        return \response($token->getContent(), 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }


    public function authenticateMisMobileUser(Request $request)
    {
        $username = $request->input('email');
        $password = $request->input('password');
        $username = aes_encrypt($username);
        
        if (is_null($this->mis_app_client)) {
            $res = array(
                'success' => false,
                'message' => 'MIS App user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'provider' => 'users',
            'client_id' => $this->mis_app_client->id,
            'client_secret' => $this->mis_app_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $token = \Route::dispatch($tokenRequest);
        
        $token_contents = $token->getContent();
        
        //TODO check if successfully
        $user_id = "";
        $status = false;
        $token_contents = json_decode($token_contents, TRUE);
        if (isset($token_contents['token_type'])) {
            //then, query user_id
            $qry = DB::table('users as t1')
                ->where('t1.email', $username);
            $user_id = $qry->value('id');
            $status = true;
        }
        $token_contents['user_id'] = $user_id;
        $token_contents['success'] = $status;
        $token_contents = json_encode($token_contents);
        return \response($token_contents, 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }

    public function authApiUsers(Request $request)
    {
        $username = $request->input('email');
        $password = $request->input('password');
        $username = aes_encrypt($username);
        if (is_null($this->mis_app_client)) {
            $res = array(
                'success' => false,
                'message' => 'MIS App user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'client_id' => $this->mis_app_client->id,
            'client_secret' => $this->mis_app_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $token = \Route::dispatch($tokenRequest);

        $token_contents = $token->getContent();
        //TODO check if successfully
        $user_id = "";
        $status = false;
        $token_contents = json_decode($token_contents, TRUE);
        if (isset($token_contents['token_type'])) {
            //then, query user_id
            $qry = DB::table('users as t1')
                ->where('t1.email', $username);
            $user_id = $qry->value('id');
            $status = true;
        }
        $token_contents['user_id'] = $user_id;
        $token_contents['success'] = $status;
        $token_contents = json_encode($token_contents);
        return \response($token_contents, 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }

    public function logout()
    {
        $loggedInUser = \Auth::user();
        $mis_client_id = Config('constants.api.mis_client_id');
        $userTokens = $loggedInUser->tokens();
        foreach ($userTokens as $token) {
            if ($token->client_id == $mis_client_id) {
                $token->revoke();
                $token->delete();
            }
        }
        \Auth::logout();
    }

    public function logoutMisMobileUser(Request $request)
    {
        $mobile_user_id = $request->input('user_id');
        $mobile_user = User::find($mobile_user_id);
        $tokenIdsArray = array();
        if (is_null($mobile_user)) {
            $res = array(
                'success' => false,
                'message' => 'Unknown user trying to logout!!'
            );
        } else {
            $mis_app_client_id = Config('constants.api.mis_app_client_id');
            $userTokens = $mobile_user->tokens;
            foreach ($userTokens as $token) {
                if ($token->client_id == $mis_app_client_id) {
                    $tokenIdsArray[] = array($token->id);
                    $token->revoke();
                    $token->delete();
                }
            }
            DB::table('oauth_refresh_tokens')
                ->whereIn('access_token_id', $tokenIdsArray)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Logged off successfully!!'
            );
        }
        return response()->json($res);
    }

    public function createAdminPwd($username, $uuid, $pwd)
    {
        $username = aes_encrypt($username);
        echo 'username is: ' . $username;
        echo '<br>';
        echo 'password is: ' . hashPwd($username, $uuid, $pwd);
    }

    //=========API INTEGRATION
    public function authenticateAPIIntegrationUser(Request $request)
    {
        $username = $request->input('email');
        $password = $request->input('password');
        $username = aes_encrypt($username);
        if (is_null($this->mis_app_client)) {
            $res = array(
                'success' => false,
                'message' => 'MIS App user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'client_id' => $this->mis_app_client->id,
            'client_secret' => $this->mis_app_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $token = \Route::dispatch($tokenRequest);

        $token_contents = $token->getContent();
        //TODO check if successfully
        $user_id = "";
        $status = false;
        $token_contents = json_decode($token_contents, TRUE);
        if (isset($token_contents['token_type'])) {
            //then, query user_id
            $qry = DB::table('users as t1')
                ->where('t1.email', $username);
            $user_id = $qry->value('id');
            $status = true;
        }
        $token_contents['user_id'] = $user_id;
        $token_contents['success'] = $status;
        $token_contents = json_encode($token_contents);
        return \response($token_contents, 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }


}
