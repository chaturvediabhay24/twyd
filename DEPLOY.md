# Railway Deployment with Custom Domain

## 🚀 Quick Deploy to Railway

### 1. Push to GitHub (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway auto-detects Python and deploys

### 3. Add Environment Variables
In Railway dashboard → **Variables** tab:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 4. Setup Custom Domain

#### Option A: Use Your Own Domain
1. Railway dashboard → **Settings** → **Domains**
2. Click **"Custom Domain"**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add CNAME record in your domain DNS:
   ```
   CNAME @ your-app.up.railway.app
   ```

#### Option B: Buy Domain Through Railway
1. Railway offers domain registration
2. Automatic SSL certificates
3. No DNS setup required

### 5. SSL Certificate (Automatic)
Railway automatically provides SSL certificates for all domains.

## 💡 Alternative: Cloudflare + Railway

For better performance and additional features:

1. **Deploy on Railway** (steps 1-3 above)
2. **Add domain to Cloudflare**
3. **Point Cloudflare to Railway**:
   ```
   CNAME @ your-app.up.railway.app
   ```
4. **Enable Cloudflare proxy** (orange cloud)

Benefits:
- CDN acceleration
- DDoS protection  
- Analytics
- Additional security

## 🔧 Troubleshooting

**Build fails?**
- Check `requirements.txt` has all dependencies
- Verify Python version compatibility

**App won't start?**
- Check environment variables are set
- Verify Telegram bot token is correct

**Custom domain not working?**
- DNS changes take 24-48 hours
- Verify CNAME record is correct
- Check domain registrar settings

## 📱 Testing Deployment

1. Visit your deployed URL
2. Fill out contact form
3. Check Telegram for notification
4. Verify all styling/functionality works

Your TalkWithData website is now live with professional hosting and your custom domain!