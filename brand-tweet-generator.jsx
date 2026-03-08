import { useState } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #18181f;
    --border: rgba(255,255,255,0.07);
    --accent: #6c63ff;
    --accent2: #ff6b9d;
    --accent3: #00d9c0;
    --text: #f0f0f8;
    --muted: #7070a0;
    --card-bg: linear-gradient(135deg, #13131c 0%, #0f0f18 100%);
  }

  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }

  .app {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(108,99,255,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 110%, rgba(255,107,157,0.1) 0%, transparent 60%);
    padding: 0 0 80px;
  }

  .header {
    text-align: center;
    padding: 60px 20px 40px;
    position: relative;
  }
  .header-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(108,99,255,0.15); border: 1px solid rgba(108,99,255,0.3);
    border-radius: 20px; padding: 5px 14px; font-size: 12px; color: #a09aff;
    font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;
    margin-bottom: 20px;
  }
  .header h1 {
    font-family: 'Syne', sans-serif; font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
    background: linear-gradient(135deg, #fff 30%, #a09aff 70%, #ff6b9d 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 14px;
  }
  .header p { color: var(--muted); font-size: 1rem; font-weight: 300; max-width: 480px; margin: 0 auto; line-height: 1.6; }

  .container { max-width: 860px; margin: 0 auto; padding: 0 20px; }

  .form-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }
  .form-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(108,99,255,0.5), rgba(255,107,157,0.3), transparent);
  }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-grid .full { grid-column: 1 / -1; }

  .field { display: flex; flex-direction: column; gap: 8px; }
  .field label {
    font-size: 12px; font-weight: 500; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.08em;
  }
  .field label span { color: var(--accent); }

  input, select, textarea {
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    border-radius: 10px; color: var(--text); font-family: 'DM Sans', sans-serif;
    font-size: 14px; padding: 12px 14px; outline: none; width: 100%;
    transition: border-color 0.2s, background 0.2s;
  }
  input:focus, select:focus, textarea:focus {
    border-color: rgba(108,99,255,0.5); background: rgba(108,99,255,0.06);
  }
  input::placeholder, textarea::placeholder { color: var(--muted); }
  select option { background: #18181f; }
  textarea { resize: vertical; min-height: 80px; line-height: 1.5; }

  .tag-group { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 500;
    border: 1px solid var(--border); cursor: pointer;
    transition: all 0.18s; color: var(--muted); background: transparent;
    font-family: 'DM Sans', sans-serif;
  }
  .tag.active {
    background: rgba(108,99,255,0.2); border-color: rgba(108,99,255,0.5); color: #a09aff;
  }
  .tag:hover:not(.active) { border-color: rgba(255,255,255,0.15); color: var(--text); }

  .generate-btn {
    width: 100%; margin-top: 28px;
    padding: 15px 28px; border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.02em;
    background: linear-gradient(135deg, var(--accent), #8b7eff);
    color: white; transition: all 0.2s; position: relative; overflow: hidden;
  }
  .generate-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 30px rgba(108,99,255,0.35); }
  .generate-btn:active { transform: translateY(0); }
  .generate-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .loading-bar {
    height: 2px; background: var(--border); border-radius: 2px; overflow: hidden; margin: 16px 0;
  }
  .loading-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
    animation: loadingAnim 1.5s ease-in-out infinite;
    border-radius: 2px;
  }
  @keyframes loadingAnim {
    0% { width: 0%; margin-left: 0; }
    50% { width: 70%; }
    100% { width: 0%; margin-left: 100%; }
  }

  .results-section { animation: fadeUp 0.4s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .voice-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: 20px;
    padding: 28px; margin-bottom: 28px; position: relative; overflow: hidden;
  }
  .voice-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,217,192,0.5), transparent);
  }
  .voice-card h2 {
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--accent3); text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
  }
  .voice-bullets { display: flex; flex-direction: column; gap: 10px; }
  .voice-bullet {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 12px 14px; background: rgba(0,217,192,0.05);
    border: 1px solid rgba(0,217,192,0.1); border-radius: 10px;
    font-size: 13.5px; line-height: 1.5; color: #c8c8e8;
  }
  .voice-bullet-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent3);
    margin-top: 5px; flex-shrink: 0;
  }

  .tweets-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .tweets-header h2 {
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em;
  }
  .tweet-count { font-size: 12px; color: var(--muted); background: var(--surface2); border-radius: 20px; padding: 3px 10px; }

  .tweets-grid { display: flex; flex-direction: column; gap: 14px; }

  .tweet-card {
    background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px;
    padding: 20px 22px; transition: border-color 0.2s, transform 0.18s;
    cursor: default; position: relative; overflow: hidden;
    animation: fadeUp 0.4s ease both;
  }
  .tweet-card:hover { border-color: rgba(108,99,255,0.25); transform: translateX(3px); }
  .tweet-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }

  .tweet-type-badge {
    font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;
    padding: 3px 10px; border-radius: 20px;
  }
  .badge-engaging { background: rgba(108,99,255,0.15); color: #a09aff; border: 1px solid rgba(108,99,255,0.25); }
  .badge-promotional { background: rgba(255,107,157,0.15); color: #ff9fc7; border: 1px solid rgba(255,107,157,0.25); }
  .badge-witty { background: rgba(255,193,7,0.12); color: #ffd54f; border: 1px solid rgba(255,193,7,0.2); }
  .badge-informative { background: rgba(0,217,192,0.12); color: #6eeee4; border: 1px solid rgba(0,217,192,0.2); }

  .tweet-num { font-size: 11px; color: var(--muted); font-weight: 500; }
  .tweet-text { font-size: 14.5px; line-height: 1.65; color: #e0e0f5; }
  .tweet-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; }
  .tweet-chars { font-size: 11px; color: var(--muted); }
  .copy-btn {
    background: transparent; border: 1px solid var(--border); border-radius: 8px;
    color: var(--muted); font-size: 11px; font-weight: 500; padding: 5px 12px;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s;
    display: flex; align-items: center; gap: 5px;
  }
  .copy-btn:hover { border-color: rgba(108,99,255,0.4); color: #a09aff; }
  .copy-btn.copied { border-color: rgba(0,217,192,0.4); color: var(--accent3); }

  .error-box {
    background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.2);
    border-radius: 12px; padding: 16px 18px; color: #ff9090; font-size: 13.5px;
    margin-bottom: 20px; line-height: 1.5;
  }

  @media (max-width: 600px) {
    .form-grid { grid-template-columns: 1fr; }
    .form-card { padding: 22px 18px; }
    .header { padding: 40px 16px 28px; }
  }
`;

const OBJECTIVES = ["Engagement", "Promotion", "Awareness", "Product Launch", "Community Building", "Education"];
const TONES = ["Witty", "Premium", "Bold", "Playful", "Informative", "Minimalist", "Humorous", "Inspirational"];
const TWEET_TYPES = ["engaging", "promotional", "witty", "informative"];

const badgeClass = (type) => {
  const map = { engaging: "badge-engaging", promotional: "badge-promotional", witty: "badge-witty", informative: "badge-informative" };
  return map[type] || "badge-engaging";
};

function parseTweets(raw) {
  try {
    // Try JSON parse first
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    if (parsed.voice && parsed.tweets) return parsed;
  } catch {}

  // Fallback: extract tweets from numbered list
  const lines = raw.split("\n").filter(Boolean);
  const tweets = [];
  const voice = [];
  let inTweets = false;

  for (const line of lines) {
    const tweetMatch = line.match(/^\d+[\.\)]\s+(.+)/);
    const bulletMatch = line.match(/^[-•]\s+(.+)/);
    if (tweetMatch) { inTweets = true; tweets.push({ text: tweetMatch[1].trim(), type: TWEET_TYPES[tweets.length % 4] }); }
    else if (bulletMatch && !inTweets) { voice.push(bulletMatch[1].trim()); }
  }

  return { voice: voice.length ? voice : ["Brand voice analyzed"], tweets: tweets.slice(0, 10) };
}

export default function App() {
  const [form, setForm] = useState({
    brand: "", industry: "", objective: "", tones: [], products: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  const toggleTone = (t) => setForm(f => ({
    ...f,
    tones: f.tones.includes(t) ? f.tones.filter(x => x !== t) : [...f.tones, t].slice(0, 3)
  }));
  const toggleObjective = (o) => setForm(f => ({ ...f, objective: f.objective === o ? "" : o }));

  const handleGenerate = async () => {
    if (!form.brand.trim() && !form.products.trim()) {
      setError("Please enter at least a brand name or product description to get started.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    const prompt = `You are a world-class social media strategist and copywriter. Analyze the following brand and generate a complete tweet package.

Brand Name: ${form.brand || "Unknown"}
Industry/Category: ${form.industry || "General"}
Campaign Objective: ${form.objective || "Awareness"}
Preferred Tone Styles: ${form.tones.length ? form.tones.join(", ") : "Mix of styles"}
About the Brand/Products: ${form.products || "General consumer brand"}

Your task:
1. Analyze the brand voice from the given inputs
2. Generate exactly 10 tweets that feel authentic to this brand

Respond ONLY with a valid JSON object in this exact format (no markdown, no preamble):
{
  "voice": [
    "Bullet point 1 about brand tone and personality",
    "Bullet point 2 about target audience",
    "Bullet point 3 about content themes and style",
    "Bullet point 4 about communication approach"
  ],
  "tweets": [
    { "text": "Tweet text here #hashtag", "type": "engaging" },
    { "text": "Tweet text here", "type": "promotional" },
    { "text": "Tweet text here", "type": "witty" },
    { "text": "Tweet text here", "type": "informative" },
    { "text": "Tweet text here", "type": "engaging" },
    { "text": "Tweet text here", "type": "witty" },
    { "text": "Tweet text here", "type": "promotional" },
    { "text": "Tweet text here", "type": "informative" },
    { "text": "Tweet text here", "type": "engaging" },
    { "text": "Tweet text here", "type": "witty" }
  ]
}

Rules for tweets:
- Each tweet must be under 280 characters
- Use a mix of all 4 types: engaging, promotional, witty, informative
- Include relevant hashtags naturally (1-2 per tweet max)
- Vary the format: questions, statements, CTAs, facts, humor
- Make them feel genuinely brand-authentic, NOT generic
- Avoid starting multiple tweets with the same word
- For witty tweets: use wordplay, clever observations, or light humor relevant to the brand
- For promotional tweets: highlight value, not just features
- For engaging tweets: pose questions or invite responses
- For informative tweets: share a specific insight or stat-style fact`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("\n") || "";
      const parsed = parseTweets(raw);

      if (!parsed.tweets?.length) throw new Error("Couldn't parse tweets from response. Please try again.");
      setResult({ ...parsed, brand: form.brand || "Your Brand" });
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyTweet = (text, idx) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <div className="header">
          <div className="header-badge">✦ AI-Powered</div>
          <h1>Brand Tweet Generator</h1>
          <p>Input your brand details and get 10 on-brand tweets crafted to match your voice and campaign goals.</p>
        </div>

        <div className="container">
          <div className="form-card">
            <div className="form-grid">
              <div className="field">
                <label>Brand Name</label>
                <input placeholder="e.g. Nike, Oatly, Notion…" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
              </div>
              <div className="field">
                <label>Industry / Category</label>
                <input placeholder="e.g. Sportswear, SaaS, Food & Beverage…" value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} />
              </div>

              <div className="field full">
                <label>Campaign Objective</label>
                <div className="tag-group">
                  {OBJECTIVES.map(o => (
                    <button key={o} className={`tag ${form.objective === o ? "active" : ""}`} onClick={() => toggleObjective(o)}>{o}</button>
                  ))}
                </div>
              </div>

              <div className="field full">
                <label>Brand Tone <span>(pick up to 3)</span></label>
                <div className="tag-group">
                  {TONES.map(t => (
                    <button key={t} className={`tag ${form.tones.includes(t) ? "active" : ""}`} onClick={() => toggleTone(t)}>{t}</button>
                  ))}
                </div>
              </div>

              <div className="field full">
                <label>About the Brand & Products</label>
                <textarea
                  placeholder="Describe what your brand does, your key products/services, what makes you different, your mission, or anything that defines your brand…"
                  value={form.products}
                  onChange={e => setForm(f => ({ ...f, products: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>

            {error && <div className="error-box">⚠ {error}</div>}

            {loading && <div className="loading-bar"><div className="loading-bar-fill" /></div>}

            <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
              {loading ? "Crafting your tweets…" : "✦ Generate 10 Brand Tweets"}
            </button>
          </div>

          {result && (
            <div className="results-section">
              <div className="voice-card">
                <h2>◈ Brand Voice Analysis — {result.brand}</h2>
                <div className="voice-bullets">
                  {result.voice.map((b, i) => (
                    <div key={i} className="voice-bullet">
                      <div className="voice-bullet-dot" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tweets-header">
                <h2>Generated Tweets</h2>
                <span className="tweet-count">{result.tweets.length} tweets</span>
              </div>

              <div className="tweets-grid">
                {result.tweets.map((tweet, i) => (
                  <div key={i} className="tweet-card" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="tweet-card-header">
                      <span className={`tweet-type-badge ${badgeClass(tweet.type)}`}>{tweet.type}</span>
                      <span className="tweet-num">#{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="tweet-text">{tweet.text}</div>
                    <div className="tweet-footer">
                      <span className="tweet-chars">{tweet.text.length} / 280 chars</span>
                      <button className={`copy-btn ${copied === i ? "copied" : ""}`} onClick={() => copyTweet(tweet.text, i)}>
                        {copied === i ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
