<?php
// todo Firebase -> Settings -> Cloud Messaging Tab -> Server Key
$SERVER_API_KEY = "-YourServerApiKey-";

// todo Get this tokens from your server. You can send maximum 1000 token in the same request.
$registrationIds[] = '-YourTokensWillBeHere-';

$header = ['Authorization: Key='.$SERVER_API_KEY, 'Content-Type: Application/json'];
$msg = [
    'title' => 'Push Notification'.date('Y-m-d_H:i:s'),
    'body' => 'Body Text',
    'icon' => 'IconPath-192x192',
    'badge' => 'BadgePath-72x72',
    'image' => 'Image-1200x600',
    'click_action' => 'ClickActionURLForNotification'
];
$payload = ['registration_ids' => $registrationIds,	'data' => $msg];
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode( $payload ),
    CURLOPT_HTTPHEADER => $header,
    CURLOPT_SSL_VERIFYPEER => false
));
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

echo '<strong>Message:</strong>';
echo json_encode($msg,true);
echo '<br><br>';
echo '<strong>Response:</strong>';
echo $response;