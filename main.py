from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
import requests
from datetime import datetime
import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="TalkWithData API", description="Contact form handler for TalkWithData website")

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (CSS, JS, etc.)
from fastapi.responses import FileResponse

@app.get("/styles.css")
async def get_styles():
    return FileResponse("styles.css", media_type="text/css")

@app.get("/script.js")
async def get_script():
    return FileResponse("script.js", media_type="application/javascript")

# Telegram bot configuration
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "YOUR_CHAT_ID_HERE")

print(f"Bot token loaded: {TELEGRAM_BOT_TOKEN[:10]}..." if TELEGRAM_BOT_TOKEN != "YOUR_BOT_TOKEN_HERE" else "Bot token not loaded")
print(f"Chat ID loaded: {TELEGRAM_CHAT_ID}" if TELEGRAM_CHAT_ID != "YOUR_CHAT_ID_HERE" else "Chat ID not loaded")

class ContactForm(BaseModel):
    fullName: str
    email: EmailStr
    company: str
    role: Optional[str] = None
    companySize: Optional[str] = None
    useCase: str
    phone: Optional[str] = None

def send_telegram_message(message: str):
    """Send message to Telegram chat"""
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        data = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }
        
        print(f"Sending to Telegram URL: {url[:50]}...")
        response = requests.post(url, data=data)
        print(f"Telegram API response: {response.status_code}")
        print(f"Response content: {response.text}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"Error sending Telegram message: {str(e)}")
        return False

@app.get("/")
async def serve_index():
    """Serve the main HTML file"""
    return FileResponse("index.html")

@app.post("/api/contact")
async def submit_contact_form(form_data: ContactForm):
    """Handle contact form submission and send email"""
    
    try:
        # Create Telegram message
        message = f"""
🚀 <b>New Demo Request - TalkWithData</b>

👤 <b>Contact Information:</b>
• Name: {form_data.fullName}
• Email: {form_data.email}
• Company: {form_data.company}
• Role: {form_data.role or 'Not specified'}
• Company Size: {form_data.companySize or 'Not specified'}
• Phone: {form_data.phone or 'Not provided'}

💡 <b>Use Case:</b>
{form_data.useCase}

📅 <b>Submitted:</b> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        # Send to Telegram
        message_sent = send_telegram_message(message)
        
        if message_sent:
            return {
                "success": True,
                "message": "Demo request submitted successfully"
            }
        else:
            # Log the error for debugging
            print(f"Failed to send Telegram message. Bot token: {TELEGRAM_BOT_TOKEN[:10]}...")
            print(f"Chat ID: {TELEGRAM_CHAT_ID}")
            raise HTTPException(status_code=500, detail="Failed to send notification")
            
    except Exception as e:
        print(f"Error processing form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)