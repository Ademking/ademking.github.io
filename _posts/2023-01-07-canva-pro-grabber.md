---
layout: post
title: Scraping Canva Pro Invite Links
date: 2023-01-07 10:00:00
categories: [php, tutorials]
cover_image: /../assets/images/1673405580915.png
tags: "php, tutorials"
canonical_url: null
published: true
description: Scraping Canva Pro Invite Links
---

My community has been asking me for Canva Pro invite links for a while now. I have been giving them out manually, but I thought it would be easier to automate the process. I decided to use PHP to scrape the latest tweets containing Canva Pro invite links and save them in a JSON file. This way, I can just send them the website link and they can get the invite link themselves.

## 0) How it works

Twitter can be a valuable source of information, especially when it comes to finding invite links for popular tools like Canva Pro.
In this tutorial, we will show you how to use PHP to scrape the latest tweets containing Canva Pro invite links and save them in a JSON file.

## 1) Getting Twitter API Keys 🗝️

To get started, you will need to create a Twitter developer account. You can do this by going to [https://developer.twitter.com/en/apply-for-access](https://developer.twitter.com/en/apply-for-access) and filling out the form. Once you have created your account, you will need to create an app. You can do this by going to [https://developer.twitter.com/en/apps](https://developer.twitter.com/en/apps) and clicking on the "Create an app" button. Once you have created your app, you will need to generate your API keys. You can do this by going to the "Keys and tokens" tab and clicking on the "Generate" button next to the "Access token & secret" section.

## 2) Grab a cup of coffee ☕ and start coding

#### Step 1: Setting up the search query and bearer token

The first thing we need to do is set up the search query and bearer token.
The search query is the term we want to use to find tweets containing Canva Pro invite links.
In this case, we are using `canva.com/brand` as the search query.

In the code, we define the search query and bearer token as variables:

```php
$search_query = 'canva.com/brand';
$bearer_token = 'YOUR_BEARER_TOKEN';
$max_results = '100'; // between 1 and 100 tweets
```

#### Step 2: Sending a GET request to the Twitter API

Next, we will use cURL to send a GET request to the Twitter API to search for recent tweets containing the search query.

We start by initializing a cURL handle using curl_init(). Then, we use curl_setopt_array() to set various options for the cURL request.

Here are the options we are setting:

```
CURLOPT_URL: the URL of the API endpoint we are sending the request to.
CURLOPT_RETURNTRANSFER: tells cURL to return the response as a string instead of printing it.
CURLOPT_ENCODING: allows us to set the encoding type.
CURLOPT_MAXREDIRS: sets the maximum number of redirects to follow.
CURLOPT_TIMEOUT: sets the maximum amount of time (in seconds) that the cURL request should take.
CURLOPT_SSL_VERIFYHOST: tells cURL to verify the authenticity of the SSL certificate.
CURLOPT_SSL_VERIFYPEER: tells cURL to verify the authenticity of the peer's SSL certificate.
CURLOPT_FOLLOWLOCATION: tells cURL to follow any redirects.
CURLOPT_HTTP_VERSION: sets the HTTP version to use.
CURLOPT_CUSTOMREQUEST: sets the request method to GET.
CURLOPT_HTTPHEADER: sets the HTTP headers for the request. In this case, we are setting the "Authorization" header to the bearer token.
```

#### Step 3: Extracting the Tweets from the API Response:

Once we have sent the cURL request, we can use curl_exec() to execute it and get the response from the API.
We then use json_decode() to parse the response into a PHP array. The array will contain the tweets in a "data" key.

We need to check if the URL has already been added to the `$canvaObjs` array using a helper function called `is_url_already_exists()`. If the URL does not exist in the array, we add it along with the tweet's array.

#### Step 4: Saving the Tweets in a JSON File.

Finally, we use the PHP function file_put_contents() to save the $canvaObjs array in a JSON file called "canva.json".

Final Code will look like this:

```php
<?php
function main() {
    $search_query = 'canva.com/brand';
    $bearer_token = 'YOUR_TWITTER_TOKEN_HERE';
    $max_results = '100'; // between 1 and 100 tweets
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.twitter.com/2/tweets/search/recent?tweet.fields=created_at&max_results='. $max_results .'&query=' . $search_query,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array('Authorization: Bearer ' . $bearer_token),)
    );
    $response = curl_exec($curl);
    $jsonResponse = json_decode($response, true);
    $rawTweetsObj = $jsonResponse['data'];
    $canvaObjs = [];
    // loop through the tweets
    foreach ($rawTweetsObj as $tweet) {
        // check if the tweet contains the word canva
        if (strpos($tweet['text'], 'https://t.co/') !== false) {
            // get the url from the tweet using regex
            preg_match('/https:\/\/t.co\/[a-zA-Z0-9]+/', $tweet['text'], $url);
            if (is_url_already_exists($url[0], $canvaObjs)) {
                continue;
            }
            $canvaObjs[] = array('date' => $tweet['created_at'], 'url' => $url[0]);
        }
    }
    // store the tweets in a json file
    file_put_contents('canva.json', json_encode($canvaObjs));
    curl_close($curl);
    // echo json
    header('Content-Type: application/json');
    echo json_encode(["message" => "Updated", "count" => count($canvaObjs) ]);
}
function is_url_already_exists($url, $arr) {
    foreach ($arr as $item) {
        if ($item['url'] == $url) {
            return true;
        }
    }
    return false;
}
main();

?>
```

## 3) Running the Script

To run the script every hour, you need to host the script on a server. You can use a free hosting service like [000webhost](https://www.000webhost.com/). Once you have hosted the script, you need to set up a cron job to run the script every hour. For this, I will use a service called [cron-job.org](https://cron-job.org/en/). It allows us to run a script every hour. It is free and easy to use.

Every time the script runs, it will update the `canva.json` file with the latest tweets containing Canva Pro invite links.

![](/../assets/images/1673405580912.png)

## 4) Using the Script

Now that we have the script running, we can use it to get the latest Canva Pro invite links. We can use the script in our own projects or we can use the JSON file directly. I used the JSON file in my own project to create a website that displays the latest Canva Pro invite links.

Link to the website: [https://canvapro.surge.sh/](https://canvapro.surge.sh/)

![](/../assets/images/1673405580924.png)

## Conclusion:

In this tutorial, I showed you how to use PHP to scrape the latest tweets containing Canva Pro invite links and save them in a JSON file. I hope you found this tutorial helpful and that you can use it as a starting point for your own projects.
