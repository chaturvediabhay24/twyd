# Telegram Bot Setup Guide

## 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/start` to BotFather
3. Send `/newbot` to create a new bot
4. Choose a name for your bot (e.g., "TalkWithData Contact Bot")
5. Choose a username for your bot (e.g., "talkwithdata_contact_bot")
6. Copy the **bot token** (looks like: `123456789:ABCdef1234567890...`)

## 2. Get Your Chat ID

1. Search for **@userinfobot** on Telegram
2. Send `/start` to the bot
3. Copy your **chat ID** (a number like: `123456789`)

## 3. Configure the Server

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace with your values:
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCdef1234567890...
   TELEGRAM_CHAT_ID=123456789
   ```

## 4. Test Your Bot

1. Send a message to your bot on Telegram
2. Your bot should be able to receive messages once configured

## 5. Run the Server

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

The server will start on `http://localhost:8000`

## How It Works

When someone submits the contact form:
1. Form data is sent to `/api/contact`
2. Server formats the data into a nice message
3. Message is sent to your Telegram chat instantly
4. You get notified on your phone/desktop

## Benefits of Telegram vs Email

- ✅ **Instant notifications** on your phone
- ✅ **No spam folder** issues
- ✅ **No SMTP configuration** needed
- ✅ **Rich formatting** with emojis and HTML
- ✅ **More reliable** delivery
- ✅ **Free** to use