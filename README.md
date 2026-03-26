# MARKET AI — Trend Forecaster

> **The Intelligence Revolution for Consumer Sentiment.**
> 
> Elite market analysis powered by high-fidelity AI and a premium motion-driven experience.

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)](https://fastapi.tiangolo.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-purple)](https://www.framer.com/motion/)

---

## 🚀 The Experience

**MARKET AI** is not just a dashboard; it's a cinematic data environment. We've transformed raw consumer feedback into a high-fidelity, interactive platform designed for enterprise-grade decision making.

### ✨ Premium Features

- **Interactive Motion Engine**: Immersive staggered entrance animations, parallax branding panels, and spring-physics-based UI transitions.
- **Micro-Interaction System**: Interactive `MouseGlow` cursor effects, animated text gradients, and tactile "wow-factor" feedback on every card.
- **Enterprise Sentiment Explorer**: Deep search and faceted filters across billions of data points (Amazon, YouTube, News).
- **Market Forecast AI**: Predictive modeling with p-value analysis, Risk Meters, and Key Driver identification.
- **Context-Aware Analytics**: Date-synced brand comparison and AI-detected anomaly alerts.
- **Visual Intelligence Reports**: Professional multi-page PDF/Excel export with dynamic charting.
- **Adaptive Navigation**: Fully responsive mobile-ready interface with a high-end glassmorphism aesthetic.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, **Framer Motion**, **Lucide React** |
| **Backend** | FastAPI (Python 3.10+), Uvicorn |
| **Database** | MongoDB (Local/Atlas) |
| **Intelligence** | OpenRouter (Multiple LLMs), RAG Pipelines |
| **Notifications**| **React Hot Toast** (Premium Feedback) |

---

## 🏗 Project Structure

```
Market-trend-forecaster/
├── Frontend/          # React + Vite (Motion Optimized)
│   └── src/
│       ├── pages/     # Cinematic Layouts (Landing, Dashboard, Auth)
│       ├── components/# Interactive Library (MouseGlow, AnimatedCounter)
│       └── services/  # Enterprise Data Fetchers
├── backend/           # FastAPI (High Performance)
│   └── app/
│       ├── routes/    # Sentiment, Forecast, Reports, Chat
│       └── static/    # Dynamic Media Storage
└── data/              # Curated Market Datasets
```

---

## 🏁 Getting Started (New Users)

Follow these steps to set up the project from scratch.

### 1 — Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)
- **MongoDB** (Running locally at `mongodb://localhost:27017` or a MongoDB Atlas URI)

---

### 2 — Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```
2. **Create a Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Environment Variables:**
   Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your details:
   - `OPENROUTER_API_KEY`: Get one from [OpenRouter](https://openrouter.ai/).
   - `JWT_SECRET`: A unique random string for security.
5. **Start the Server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *Your API will be live at http://localhost:8000*

---

### 3 — Frontend Setup

1. **Navigate to the Frontend directory:**
   ```bash
   cd ../Frontend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Launch the Dashboard:**
   ```bash
   npm run dev
   ```
   *Your App will be live at http://localhost:5173*

---

### 4 — Populating Initial Data
If your dashboard is empty, you need to ingest the pre-processed market data:
1. Ensure the backend is running.
2. Log in or Sign up on the website.
3. Click the **"Update Reviews"** button in the Dashboard sidebar.
4. The system will automatically ingest all `data/*.csv` files into your MongoDB.

---

## 📱 Mobile Architecture

MARKET AI is built with an **Adaptive Navigation System**. The responsive layout seamlessly transitions to a high-end mobile experience featuring a custom animated hamburger menu and touch-optimized data cards.

---

## 📉 Data Intelligence

We analyze ~2,700 high-signal interactions across:
- **Amazon** Echo Dot Reviews
- **Google** Nest Mini Discourse
- **Apple** HomePod Mini Sentiment
- **Social Media** (YouTube & News Signals)

---

Developed with ❤️ for the **Market Analysis Community**.
