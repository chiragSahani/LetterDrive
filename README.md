
# LetterDrive

LetterDrive is a full-stack web application that allows users to sign up using Google authentication, create and edit text-based letters, and save them directly to their Google Drive in Google Docs.

## 🚀 Features

### 1. User Authentication (Google OAuth)
- Sign in with Google using Firebase Auth.
- Secure session management with JWT.

### 2. Letter Creation & Editing
- Simple text editor for writing and formatting letters.
- Save drafts before uploading to Google Drive.
- Minimalistic and distraction-free UI.

### 3. Google Drive API Integration
- Save letters as Google Docs directly in Google Drive.
- Retrieve and view saved letters from Google Drive.
- Proper OAuth scopes and permissions for security.

### 4. Deployment
- Fully deployed front-end and back-end for public access.
- `.env.example` file for necessary environment variables.

## 🛠️ Technology Stack

### Front-End
- **Framework**: React + Vite
- **UI Library**: TailwindCSS 

### Back-End
- **Server**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: Google OAuth via Supabase Auth
- **Storage API**: Google Drive API

### Deployment
- **Frontend**: Netlify
- **Backend**: Supabase 
- **Database**: Supabase  PostgreSQL

## 📂 Project Structure
```
LetterDrive/project
├── src
│   ├── components
│   │   ├── Auth.tsx       # Google OAuth authentication component
│   │   ├── Editor.tsx     # Text editor component
│   ├── lib
│   │   ├── google-drive.ts # Google Drive API integration
│   │   ├── supabase.ts     # Database connection (if used)
│   ├── App.tsx           # Main React component
│   ├── main.tsx          # React entry point
│   ├── index.css         # Global styles
│   ├── vite-env.d.ts     # TypeScript environment configuration
├── eslint.config.js      # Linting configuration
├── index.html            # Main HTML template
```

## 📜 Installation & Setup

### Prerequisites
- Node.js installed (v16+ recommended)
- Google Cloud Project with Drive API enabled
- Supabase project for authentication

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/chiragSahani/LetterDrive.git
    cd LetterDrive
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    ```sh
    cp .env.example .env
    # Update with API keys and credentials
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## 🚀 Deployment

1. Build the project:
    ```sh
    npm run build
    ```

2. Deploy front-end (Vercel/Netlify)
    ```sh
    vercel deploy  # Or use Netlify UI
    ```

3. Deploy back-end (Heroku/AWS)
    ```sh
    git push heroku main
    ```

## 🌐 Deployed Link

You can access the deployed application [here](https://chirageditor.netlify.app/)

## 📜 License
MIT License

---

Feel free to contribute by submitting issues and pull requests! 🚀


