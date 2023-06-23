# Gibberish

Please visit our website at: https://gibberish-z0ju.onrender.com



For more info about this project please check out our [wiki]!

## Splash Page
![GibberishSplashPage](https://github.com/Alan-Ngn/Gibberish/assets/118578374/69f8982f-7db0-4148-8c9f-291adb619ebb)

## Home Page

![GibberishHomePage](https://github.com/Alan-Ngn/Gibberish/assets/118578374/ad9b778d-ca46-4e1f-8709-ca8b9d73afe5)

## Channel Page
![GibberishChannels](https://github.com/Alan-Ngn/Gibberish/assets/118578374/7d5b5c2b-7b8f-4424-88d6-ce0e3312a989)

# Routes

## Auth
### Get User
Return current user details
* Require Authenication: true
* Request:
  * Method: GET
  * URL: /api/auth/
  * Body: none
  
* Successful Response:
  * Headers:
      * Content-Type: application/json
  ```json
  {
     "id": 1,
     "username": "DemoUser",
     "email": "demo@aa.io",
     "first_name": "Demo",
     "last_name": "User",
     "profile_pic": "profile_url",
     "admin": false,
     "admin_channels": [
       {
            "id": 3,
            "admin_id": 3,
            "title": "Another another Channel"
        },
      ],
      "messages": [
        {
          "id": 1,
          "user_id": 1,
          "channel_id": 1,
          "message": "Hey dood",
          "created_at": "2023-06-21 05:59:48",
          "user": {
            "id": 1,
            "username": "DemoUser",
            "email": "demo@aa.io",
            "first_name": "Demo",
            "last_name": "User",
            "profile_pic": "profile_url",
            "admin": false
          },
          "replies": [
            {
            "id": 1,
            "message_id": 1,
            "user_id": 2,
            "reply": "Sup man",
            "created_at": "2023-06-21 05:59:48",
            "user": {
              "id": 2,
              "username": "DemoAdmin",
              "email": "admin@aa.io",
              "first_name": "Demo",
              "last_name": "Admin",
              "profile_pic": "profile_url",
              "admin": true
            }
            }
          ],
        "channels": [
         {
           "id": 1,
           "admin_id": 2,
           "title": "Demo Channel"
           "messages": [
             {
               "id": 1,
               "user_id": 1,
               "channel_id": 1,
               "message": "Hey dood",
               "created_at": "2023-06-21 05:59:48",
               "user": {
                 "id": 1,
                 "username": "DemoUser",
                 "email": "demo@aa.io",
                 "first_name": "Demo",
                 "last_name": "User",
                 "profile_pic": "profile_url",
                 "admin": false
               },
               "replies": [
                 {
                 "id": 1,
                 "message_id": 1,
                 "user_id": 2,
                 "reply": "Sup man",
                 "created_at": "2023-06-21 05:59:48",
                 "user": {
                   "id": 2,
                   "username": "DemoAdmin",
                   "email": "admin@aa.io",
                   "first_name": "Demo",
                   "last_name": "Admin",
                   "profile_pic": "profile_url",
                   "admin": true
                 }
                 }
               ],
               "channel": {
                 "id": 1,
                 "admin_id": 2,
                 "title": "Demo Channel"
                }
             }
           ], 
           "members": [
             {
                 "id": 1,
                 "username": "DemoUser",
                 "email": "demo@aa.io",
                 "first_name": "Demo",
                 "last_name": "User",
                 "profile_pic": "profile_url",
                 "admin": false
             },
             {
                   "id": 2,
                   "username": "DemoAdmin",
                   "email": "admin@aa.io",
                   "first_name": "Demo",
                   "last_name": "Admin",
                   "profile_pic": "profile_url",
                   "admin": true
             }
           ]
       },
      ],
      "replies": [
        {
         "id": 1,
         "message_id": 1,
         "user_id": 2,
         "reply": "Sup man",
         "created_at": "2023-06-21 05:59:48",
         "user": {
           "id": 2,
           "username": "DemoAdmin",
           "email": "admin@aa.io",
           "first_name": "Demo",
           "last_name": "Admin",
           "profile_pic": "profile_url",
           "admin": true
          }
        },
       ]
  }
  ```
## Users

## Channel

### Get details of a Channel from an id 
Return channnel by id
* Require Authenication: true
* Request:
  * Method: GET
  * URL: /api/channels/<int:channelId>
  * Body: none
  
* Successful Response:
  * Headers:
      * Content-Type: application/json
  ```json
  {
      "id": 1,
      "admin_id": 2,
      "title": "Demo Channel"
      "messages": [
        {
          "id": 1,
          "user_id": 1,
          "channel_id": 1,
          "message": "Hey dood",
          "created_at": "2023-06-21 05:59:48",
          "user": {
            "id": 1,
            "username": "DemoUser",
            "email": "demo@aa.io",
            "first_name": "Demo",
            "last_name": "User",
            "profile_pic": "profile_url",
            "admin": false
          },
          "replies": [
            {
            "id": 1,
            "message_id": 1,
            "user_id": 2,
            "reply": "Sup man",
            "created_at": "2023-06-21 05:59:48",
            "user": {
              "id": 2,
              "username": "DemoAdmin",
              "email": "admin@aa.io",
              "first_name": "Demo",
              "last_name": "Admin",
              "profile_pic": "profile_url",
              "admin": true
            }
            }
          ],
          "channel": {
            "id": 1,
            "admin_id": 2,
            "title": "Demo Channel"
           }
        }
      ], 
      "members": [
        {
            "id": 1,
            "username": "DemoUser",
            "email": "demo@aa.io",
            "first_name": "Demo",
            "last_name": "User",
            "profile_pic": "profile_url",
            "admin": false
        },
        {
              "id": 2,
              "username": "DemoAdmin",
              "email": "admin@aa.io",
              "first_name": "Demo",
              "last_name": "Admin",
              "profile_pic": "profile_url",
              "admin": true
        }
      ]
  }
  ```

### Create a Channel
Create and returns a new channel
* Require Authenication: true
* Request:
  * Method: POST
  * URL: /api/channels/new/<int:userId>
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
    {
        "title": "Demo Channel",
        "admin_id": 2
    }
    ```

* Successful Response:
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
    {
        "id": 1,
        "admin_id": 2,
        "title": "Demo Channel"
    }
    ```

 ### Edit Channel
 Updates and return an existing channel.
 * Require Authenication: true
 * Request:
   * Method: PUT
   * URL: /api/channels/<int:channelId>/edit
   * Headers:
      * Content-Type: application/json
      * Body:
     ```json
     {
         "title": "Another Demo Channel",
         "admin_id": 2
     }
     ```
 
 * Successful Response:
   * Headers:
      * Content-Type: application/json
      * Body:
     ```json
     {
         "id": 1,
         "admin_id": 2,
         "title": "Another Demo Channel"
     }
     ```
  ### Delete Channel
  Delete an existing channel.
  * Require Authenication: true
  * Request:
    * Method: DELETE
    * URL: /api/channels/<int:channelId>
    * Headers:
       * Content-Type: application/json
       * Body: none
  
  * Successful Response:
    * Headers:
       * Content-Type: application/json
       * Body:
      ```json
      {
          "id": 1,
          "admin_id": 2,
          "title": "Another Demo Channel"
      }
      ```
       
## Messages
### Create a Message
Create and returns a new message
* Require Authenication: true
* Request:
  * Method: POST
  * URL: /api/messages/channel/<int:channel_id>/user/<int:user_id>
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
    {
        "user_id": 1,
        "channel_id": 1,
        "message": "Hey dood"
    }
    ```

* Successful Response:
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
    {
          "id": 1,
          "user_id": 1,
          "channel_id": 1,
          "message": "Hey dood",
          "created_at": "2023-06-21 05:59:48",
          "user": {
            "id": 1,
            "username": "DemoUser",
            "email": "demo@aa.io",
            "first_name": "Demo",
            "last_name": "User",
            "profile_pic": "profile_url",
            "admin": false
          },
          "replies": [
            {
            "id": 1,
            "message_id": 1,
            "user_id": 2,
            "reply": "Sup man",
            "created_at": "2023-06-21 05:59:48",
            "user": {
              "id": 2,
              "username": "DemoAdmin",
              "email": "admin@aa.io",
              "first_name": "Demo",
              "last_name": "Admin",
              "profile_pic": "profile_url",
              "admin": true
            }
            }
          ],
          "channel": {
            "id": 1,
            "admin_id": 2,
            "title": "Demo Channel"
           }
        }
    ```

 ### Edit Message
 Updates and return an existing message.
 * Require Authenication: true
 * Request:
   * Method: PUT
   * URL: /api/messages/<int:id>/edit
   * Headers:
      * Content-Type: application/json
      * Body:
     ```json
     {
        "message": "Hey dood!!!!!"
     }
     ```
 
 * Successful Response:
   * Headers:
      * Content-Type: application/json
      * Body:
     ```json
         {
           "id": 1,
           "user_id": 1,
           "channel_id": 1,
           "message": "Hey dood!!!!!",
           "created_at": "2023-06-22 05:59:48",
           "user": {
             "id": 1,
             "username": "DemoUser",
             "email": "demo@aa.io",
             "first_name": "Demo",
             "last_name": "User",
             "profile_pic": "profile_url",
             "admin": false
           },
           "replies": [
             {
             "id": 1,
             "message_id": 1,
             "user_id": 2,
             "reply": "Sup man",
             "created_at": "2023-06-21 05:59:48",
             "user": {
               "id": 2,
               "username": "DemoAdmin",
               "email": "admin@aa.io",
               "first_name": "Demo",
               "last_name": "Admin",
               "profile_pic": "profile_url",
               "admin": true
             }
             }
           ],
           "channel": {
             "id": 1,
             "admin_id": 2,
             "title": "Demo Channel"
            }
        }
     ```
  ### Delete Message
  Delete an existing message.
  * Require Authenication: true
  * Request:
    * Method: DELETE
    * URL: /api/messages/<int:id>
    * Headers:
       * Content-Type: application/json
       * Body: none
  
  * Successful Response:
    * Headers:
       * Content-Type: application/json
       * Body:
      ```json
        {
          "id": 1,
          "user_id": 1,
          "channel_id": 1,
          "message": "Hey dood!!!!!",
          "created_at": "2023-06-22 05:59:48",
          "user": {
            "id": 1,
            "username": "DemoUser",
            "email": "demo@aa.io",
            "first_name": "Demo",
            "last_name": "User",
            "profile_pic": "profile_url",
            "admin": false
          },
          "replies": [
            {
            "id": 1,
            "message_id": 1,
            "user_id": 2,
            "reply": "Sup man",
            "created_at": "2023-06-21 05:59:48",
            "user": {
              "id": 2,
              "username": "DemoAdmin",
              "email": "admin@aa.io",
              "first_name": "Demo",
              "last_name": "Admin",
              "profile_pic": "profile_url",
              "admin": true
            }
            }
          ],
          "channel": {
            "id": 1,
            "admin_id": 2,
            "title": "Demo Channel"
           }
       }
      ```
      
## Replies
### Create a Reply
Create and returns a new reply
* Require Authenication: true
* Request:
  * Method: POST
  * URL: /api/replies/message/<int:message_id>/user/<int:user_id>
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
    {
        "user_id": 2,
        "message_id": 1,
        "reply": "Sup man"
    }
    ```

* Successful Response:
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
         {
          "id": 1,
          "message_id": 1,
          "user_id": 2,
          "reply": "Sup man",
          "created_at": "2023-06-21 05:59:48",
          "user": {
            "id": 2,
            "username": "DemoAdmin",
            "email": "admin@aa.io",
            "first_name": "Demo",
            "last_name": "Admin",
            "profile_pic": "profile_url",
            "admin": true
          }
         }

    ```

 ### Edit Reply
 Updates and return an existing message.
 * Require Authenication: true
 * Request:
   * Method: PUT
   * URL: /api/replies/<int:reply_id>/edit
   * Headers:
      * Content-Type: application/json
      * Body:
     ```json
     {
        "reply": "Hey dood!!!!!"
     }
     ```
 
 * Successful Response:
   * Headers:
      * Content-Type: application/json
      * Body:
     ```json
         {
          "id": 1,
          "message_id": 1,
          "user_id": 2,
          "reply": "Hey dood!!!!!",
          "created_at": "2023-06-22 05:59:48",
          "user": {
            "id": 2,
            "username": "DemoAdmin",
            "email": "admin@aa.io",
            "first_name": "Demo",
            "last_name": "Admin",
            "profile_pic": "profile_url",
            "admin": true
          }
         }
     ```
  ### Delete Reply
  Delete an existing message.
  * Require Authenication: true
  * Request:
    * Method: DELETE
    * URL: /api/replies/<int:id>
    * Headers:
       * Content-Type: application/json
       * Body: none
  
  * Successful Response:
    * Headers:
       * Content-Type: application/json
       * Body:
      ```json
         {
          "id": 1,
          "message_id": 1,
          "user_id": 2,
          "reply": "Hey dood!!!!!",
          "created_at": "2023-06-22 05:59:48",
          "user": {
            "id": 2,
            "username": "DemoAdmin",
            "email": "admin@aa.io",
            "first_name": "Demo",
            "last_name": "Admin",
            "profile_pic": "profile_url",
            "admin": true
          }
         }
      ```
## Members
### Create a Member
Add a new member to a channel
* Require Authenication: true
* Request:
  * Method: POST
  * URL: /api/members/channel/<int:channelId>
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
    {
        "user_id": 2,
    }
    ```

* Successful Response:
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
         {
           "success"
         }

    ```
### Delete a Member
Delete an existing member.
* Require Authenication: true
* Request:
  * Method: DELETE
  * URL: /api/members/<int:id>/channel/<int:channelId>/delete
  * Headers:
     * Content-Type: application/json
     * Body: none
  
* Successful Response:
  * Headers:
     * Content-Type: application/json
     * Body:
    ```json
         {
           "success"
         }

    ```
