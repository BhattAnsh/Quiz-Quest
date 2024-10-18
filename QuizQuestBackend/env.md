# Setting up your .env Guide

```
PORT = 8000 (You can put any port)
ORIGIN = ['http://localhost:3000/']
NODE_ENV = 'development'
```

```
DB_URL = '(Put your mongodb uri or run locally!)'
```

```
CLOUD_NAME= (create a cloud account and get the cloud name)
CLOUD_API_KEY = ( create a cloud account and get the cloud api key)
CLOUD_SECRET_KEY = ( create a cloud account and get the cloud secret key)
```

```
ACCESS_TOKEN = ("go to https://www.lastpass.com/features/password-generator and generate a long password)
REFRESH_TOKEN = ("go to https://www.lastpass.com/features/password-generator and generate a long password)
ACCESS_TOKEN_EXPIRE = 5
REFRESH_TOKEN_EXPIRE = 7
```

```
REDIS_URL = (Login to UPstash and create a redis database)
(NOTE redis:// is Unencrypted Connection: and rediss:// is Encrypted Connection - TLS/SSL:)
// That's why, make sure your redis url starts with rediss://default
REDIS_URL = rediss://default......

ACTIVATION_SECRET = create your own password just 8letter password works



SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_SERVICE = gmail
SMTP_EMAIL = put your email for sending email
SMTP_PASSWORD = //SMTP password is typically found in the settings or security section of your email service provider. You may need to generate an App Password for services like Gmail to use in SMTP configurations. REMEMBER, IT is NOT your generic old gmail password!s

ENV_UPDATE = none
```
