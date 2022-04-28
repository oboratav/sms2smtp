# sms2smtp

Quick-and-dirty Twilio Serverless function that receives SMS messages from one or more phone numbers, and relays them to one or more email addresses.

## Setup and Use
1. Clone this repo
~~~bash
git clone https://github.com/oboratav/sms2smtp.git
~~~
2. Make a copy of `routing.private.example.json` under `assets/`, rename it to `routing.private.json`
~~~bash
cd sms2smtp
cp assets/routing.private.example.json assets/routing.private.json
~~~
3. Edit `routing.private.json` such that there is a key for each Twilio phone number you will be receiving SMS messages through, and the value for each key is an array of email addresses that you need the messages to be forwarded to.
4. Create a `.env` file in the root directory of the repo and populate it with the necessary environment variables:
~~~bash
ACCOUNT_SID=    # Your Twilio Account SID 
AUTH_TOKEN=     # Your Twilio Auth Token

MAIL_PORT=      # Mailserver config
MAIL_HOST=
MAIL_USERNAME=
MAIL_PASSWORD=
~~~
5. Deploy
~~~bash
twilio serverless:deploy
~~~
6. Change the incoming message handler for the Twilio number(s) to the new service