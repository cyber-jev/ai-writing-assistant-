"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface FormState {
  topic: string;
  contentType: string;
  tone: string;
  length: string;
}

interface HistoryItem {
  topic: string;
  contentType: string;
  content: string;
}

const contentTypes = [
  { value: "email", label: "📧 Email" },
  { value: "blog post", label: "📝 Blog Post" },
  { value: "LinkedIn post", label: "💼 LinkedIn Post" },
  { value: "cover letter", label: "📄 Cover Letter" },
  { value: "Twitter/X thread", label: "🐦 Twitter/X Thread" },
  { value: "product description", label: "🛍️ Product Description" },
  { value: "cold outreach message", label: "🎯 Cold Outreach" },
  { value: "Instagram caption", label: "📸 Instagram Caption" },
];

const tones = [
  { value: "Professional", label: "💼 Professional" },
  { value: "Casual", label: "😊 Casual" },
  { value: "Persuasive", label: "🎯 Persuasive" },
  { value: "Friendly", label: "🤝 Friendly" },
  { value: "Formal", label: "🎩 Formal" },
  { value: "Witty", label: "😄 Witty" },
];

const lengths = [
  { value: "short", label: "Short", desc: "50-100 words" },
  { value: "medium", label: "Medium", desc: "150-250 words" },
  { value: "long", label: "Long", desc: "300-500 words" },
];

export default function Home() {
  const [form, setForm] = useState<FormState>({
    topic: "",
    contentType: "email",
    tone: "Professional",
    length: "medium",
  });
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [wordCount, setWordCount] = useState<number>(0);
  const [showOutput, setShowOutput] = useState<boolean>(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generate = async () => {
    if (!form.topic.trim()) return;
    setLoading(true);
    setContent("");
    setShowOutput(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setContent(data.content);
      setWordCount(data.content.split(/\s+/).filter(Boolean).length);
      setHistory((prev) => [
        { topic: form.topic, contentType: form.contentType, content: data.content },
        ...prev.slice(0, 2),
      ]);
    } catch {
      setContent("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = "w-full bg-gray-900 border border-gray-700 focus:border-green-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors text-white placeholder-gray-500";

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-400 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            AI Powered
          </div>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white mb-2">AI Writing Assistant</h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">Generate professional content in seconds — emails, posts, cover letters and more</p>
        </div>

        {/* Mobile Output Toggle */}
        {content && (
          <div className="flex lg:hidden gap-2 mb-4">
            <button
              onClick={() => setShowOutput(false)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${!showOutput ? "bg-green-500 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => setShowOutput(true)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${showOutput ? "bg-green-500 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              ✨ Result
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-6">

          {/* Left — Controls */}
          <div className={`xl:col-span-2 space-y-4 ${showOutput && content ? "hidden lg:block" : "block"}`}>

            {/* Topic */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5">
              <label className="block text-xs font-medium text-gray-400 mb-2">What do you want to write about? *</label>
              <textarea
                className={`${inputClass} resize-none`}
                rows={3}
                placeholder="e.g. A cold email to a potential client introducing my AI development services..."
                value={form.topic}
                onChange={(e) => update("topic", e.target.value)}
              />
            </div>

            {/* Content Type */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5">
              <label className="block text-xs font-medium text-gray-400 mb-3">Content Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {contentTypes.map((ct) => (
                  <button
                    key={ct.value}
                    onClick={() => update("contentType", ct.value)}
                    className={`text-left px-3 py-2.5 sm:py-2 rounded-xl text-xs transition-all active:scale-95 ${
                      form.contentType === ct.value
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5">
              <label className="block text-xs font-medium text-gray-400 mb-3">Tone</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tones.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => update("tone", t.value)}
                    className={`px-3 py-2.5 sm:py-2 rounded-xl text-xs transition-all active:scale-95 ${
                      form.tone === t.value
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5">
              <label className="block text-xs font-medium text-gray-400 mb-3">Length</label>
              <div className="grid grid-cols-3 gap-2">
                {lengths.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => update("length", l.value)}
                    className={`px-3 py-3 sm:py-2 rounded-xl text-center transition-all active:scale-95 ${
                      form.length === l.value
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <div className="text-xs font-medium">{l.label}</div>
                    <div className="text-xs opacity-70 hidden sm:block">{l.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={loading || !form.topic.trim()}
              className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed py-4 rounded-xl font-semibold transition-all active:scale-95 text-sm sm:text-base"
            >
              {loading ? "✨ Generating..." : "✨ Generate Content"}
            </button>
          </div>

          {/* Right — Output */}
          <div className={`xl:col-span-3 space-y-4 ${!showOutput && content ? "hidden lg:block" : "block"}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5 min-h-[350px] sm:min-h-[400px] xl:min-h-[500px] flex flex-col">

              {/* Output Header */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="text-xs font-medium text-gray-400">Generated Content</span>
                {content && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-600">{wordCount} words</span>
                    <button
                      onClick={copy}
                      className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95"
                    >
                      {copied ? "✅ Copied!" : "📋 Copy"}
                    </button>
                    <button
                      onClick={generate}
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95"
                    >
                      🔄 Regenerate
                    </button>
                  </div>
                )}
              </div>

              {/* Content Area */}
              {!content && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                  <div className="text-4xl sm:text-5xl">✍️</div>
                  <p className="text-gray-500 text-sm">Your generated content will appear here</p>
                  <p className="text-gray-700 text-xs">Fill in the details and hit Generate</p>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="text-3xl">⚡</div>
                  <p className="text-green-400 text-sm font-medium">Writing your content...</p>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              )}

              {content && !loading && (
                <div className="flex-1 prose prose-invert prose-sm max-w-none text-gray-100 leading-relaxed overflow-y-auto">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5">
                <p className="text-xs font-medium text-gray-400 mb-3">Recent Generations</p>
                <div className="space-y-2">
                  {history.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setContent(item.content); setWordCount(item.content.split(/\s+/).filter(Boolean).length); setShowOutput(true); }}
                      className="w-full text-left bg-gray-800 hover:bg-gray-700 rounded-xl px-3 py-2.5 transition-all active:scale-95"
                    >
                      <span className="text-xs text-green-400">{item.contentType}</span>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{item.topic}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs mt-8">Built with Next.js & Groq AI</p>
      </div>
    </main>
  );
}