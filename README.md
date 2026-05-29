# ✍️ AI Writing Assistant — Generate Professional Content in Seconds

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Groq](https://img.shields.io/badge/Groq-LLM-orange?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

> Stop staring at a blank page. Pick your content type, set your tone, describe what you need — and get polished, professional content in seconds. Powered by Groq's lightning-fast LLM.

🔗 **Live Demo:** [ai-writing-assistant.vercel.app](https://ai-writing-assistant.vercel.app)
👨‍💻 **Built by:** [Jev](https://johnnyjev.vercel.app) — Frontend Developer & AI Engineer

---

## 🎯 Why I Built This

Content creation is one of the biggest time sinks for businesses and professionals. Writing emails, LinkedIn posts, cover letters, product descriptions — it all takes time and mental energy that could be spent elsewhere.

Tools like Jasper and Copy.ai charge $50-100/month for exactly this capability. I built it from scratch to demonstrate how modern AI APIs combined with thoughtful UI design can produce a production-ready SaaS product.

This project demonstrates:
- TypeScript-first Next.js application development
- Complex multi-option form state management in React
- Dynamic prompt engineering with multiple user variables
- Fully responsive UI from mobile to large screens
- Production-ready SaaS product thinking and design

---

## ✨ Features

- 📝 **8 Content Types** — emails, blog posts, LinkedIn posts, cover letters, Twitter threads, product descriptions, cold outreach, Instagram captions
- 🎭 **6 Tone Options** — Professional, Casual, Persuasive, Friendly, Formal, Witty
- 📏 **3 Length Settings** — Short (50-100 words), Medium (150-250), Long (300-500)
- 🔢 **Word Count Display** — real-time word count on every generation
- 🔄 **Regenerate** — same inputs, fresh output with one click
- 📋 **One-Click Copy** — copy your content instantly
- 🕐 **Generation History** — last 3 generations saved in session
- 📱 **Mobile/Tablet Toggle** — Edit/Result tabs on small screens
- 🖥️ **TV/Large Screen Ready** — optimized layout up to 4K displays
- ⚡ **Lightning Fast** — sub-second responses via Groq inference

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Frontend | React 19, Tailwind CSS |
| AI / LLM | Groq API (llama-3.3-70b-versatile) |
| Markdown Rendering | react-markdown |
| Deployment | Vercel |
| Package Manager | npm |

---

## 📦 NPM Packages Used

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "groq-sdk": "^0.8.0",
    "react-markdown": "^9.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/cyber-jev/ai-writing-assistant.git

# Navigate into the project
cd ai-writing-assistant

# Install dependencies
npm install

# Create environment file
touch .env.local
```

### Environment Variables

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure
ai-writing-assistant/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts        # API route — dynamic prompt + Groq LLM
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main UI — controls + output
├── public/                      # Static assets
├── .env.local                   # Environment variables (not committed)
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md

---

## 🔄 How It Works
User selects content type, tone, length + describes topic
↓
Frontend sends all options to /api/generate
↓
Dynamic prompt built with user's exact specifications
↓
Groq LLM generates tailored content
↓
Content rendered as formatted markdown
↓
User copies, regenerates, or browses history

---

## 💡 Example Use Cases

- 📧 *"A cold email to a SaaS founder offering frontend development services"* → Professional tone, Medium length
- 💼 *"Announcing my new AI PDF Chat project"* → LinkedIn post, Casual tone
- 📄 *"Applying for a remote React developer role at a US startup"* → Cover letter, Formal tone
- 🐦 *"Why every developer should learn AI integration in 2025"* → Twitter thread, Witty tone
- 🛍️ *"An AI-powered resume builder that generates resumes in seconds"* → Product description, Persuasive tone

---

## 🌐 Deployment

Deployed on **Vercel**. To deploy your own:

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add `GROQ_API_KEY` environment variable
4. Deploy!

---

## 👨‍💻 About the Developer

Built by **Jev** — a Frontend Developer & AI Engineer based in Port Harcourt, Nigeria.

- 🌐 Portfolio: [johnnyjev.vercel.app](https://johnnyjev.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/johnnyjev](https://linkedin.com/in/johnnyjev)
- 🐙 GitHub: [github.com/cyber-jev](https://github.com/cyber-jev)
- 📧 Email: johnnye4u2c@gmail.com

---

## 📄 License

MIT License — free to use, modify, and build upon.

---

> *"The best way to learn is by building things that actually work."* — Jev