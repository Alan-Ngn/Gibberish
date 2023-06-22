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
          "user_id": ,
          "channel_id": ,
          "message": ,
          "created_at":,
          "user": {
            "id": "id",
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_pic": self.profile_pic,
            "admin": self.admin
          },
          "replies": [
            {
            "id": self.id,
            "message_id": self.message_id,
            "user_id": self.user_id,
            "reply": self.reply,
            "created_at": self.created_at,
            "user": self.replies_users.to_dict()
            }
          ],
          "channel": {
            "id": self.id,
            "admin_id": self.admin_id,
            "title": self.title
           }
        }
      ], 
      "members": [
        {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_pic": self.profile_pic,
            "admin": self.admin
        }
      ]
  }
  ```

### POST api/channels/new/<int:id>
Create a new channel


  
Request:
* Headers:
    * Content-Type: application/json
* Body ("artist" field not required):

    ```json
    {
        "title": "Demo Channel"
    }
    ```

* Successful Response Body:
  ```json
  {
      "id": 1,
      "admin_id": 2,
      "title": "Demo Channel"
  }
  ```
## Messages

## Replies

## Members
