"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DADOS — Planos, Pix e Depoimentos
   ───────────────────────────────────────────── */

const PLANS = [
  {
    id: "ia-trading",
    name: "IA Trading",
    price: "97,00",
    priceShort: "97",
    period: "pagamento único",
    badge: null,
    highlight: false,
    features: [
      "Software de IA com validade de 1 ano",
      "Voucher de $100,00 para experimentar por 7 dias",
      "Caso faça depósito com nossas parceiras, vira vitalício",
      "Consultoria e programação do software personalizada",
      "Garantia incondicional de 7 dias",
    ],
    pixCode: "00020126580014br.gov.bcb.pix0136999211f3-7393-476f-b986-7465fa2be63a520400005303986540597.005802BR5911ECOTECH LTD6002NA622905250018a8007afc4aadbb1c1f450630417AC",
    qrImage: "https://i.ibb.co.com/Y44v0Sts/Captura-de-Tela-2026-03-11-a-s-23-54-19.png",
  },
  {
    id: "ia-trading-plus",
    name: "IA Trading PLUS",
    price: "597,00",
    priceShort: "597",
    period: "pagamento único",
    badge: "MAIS POPULAR",
    highlight: true,
    features: [
      "Software de IA Vitalício — sem mensalidades",
      "Saldo investido + Voucher de $100,00 (total $200,00 na conta)",
      "Programação personalizada com alavancagem",
      "Consultoria de investimentos completa",
      "Planejamento patrimonial exclusivo",
      "Garantia incondicional de 7 dias",
    ],
    pixCode: "00020126580014br.gov.bcb.pix0136999211f3-7393-476f-b986-7465fa2be63a5204000053039865406597.005802BR5911ECOTECH LTD6002NA62290525003caf232cfd4d738bc22996c63042CE0",
    qrImage: "https://i.ibb.co.com/TDdjcjqK/Captura-de-Tela-2026-03-11-a-s-23-57-23.png",
  },
  {
    id: "ia-trading-master",
    name: "IA Trading MASTER",
    price: "1.997,00",
    priceShort: "1.997",
    period: "pagamento único",
    badge: "RESULTADOS MÁXIMOS",
    highlight: false,
    features: [
      "Software de IA Vitalício — acesso ilimitado",
      "Saldo investido + Voucher Premium de $500,00",
      "Alavancagem avançada com IA de alta frequência",
      "Gerente de conta pessoal dedicado",
      "Consultoria VIP com especialistas do mercado",
      "Planejamento patrimonial e diversificação global",
      "Configurações exclusivas e estratégias institucionais",
      "Suporte prioritário 24/7 via WhatsApp",
      "Acesso antecipado a novas funcionalidades",
      "Garantia incondicional de 7 dias",
    ],
    pixCode: "00020126580014br.gov.bcb.pix0136999211f3-7393-476f-b986-7465fa2be63a52040000530398654071997.005802BR5911ECOTECH LTD6002NA6229052500f5db3b146348f184dbf8e6c6304A28F",
    qrImage: "https://i.ibb.co.com/TDyKfgHk/Captura-de-Tela-2026-03-11-a-s-23-58-07.png",
  },
];

const TESTIMONIALS = [
  {
    name: "Ricardo M.",
    role: "Investidor desde 2024",
    initials: "RM",
    text: "Eu sempre quis investir no mercado internacional, mas nunca tive tempo nem conhecimento técnico. Com a Apex Quantum, a IA faz todo o trabalho. Em 3 meses vi resultados que eu jamais conseguiria sozinho.",
    stars: 5,
  },
  {
    name: "Camila S.",
    role: "Empresária",
    initials: "CS",
    text: "O que mais me impressionou foi a automação completa. Não preciso acompanhar gráficos. A inteligência artificial analisa, identifica oportunidades e executa. Me poupou centenas de horas.",
    stars: 5,
  },
  {
    name: "Fernando T.",
    role: "Médico e investidor",
    initials: "FT",
    text: "Como médico, meu tempo é muito limitado. A Apex Quantum me deu acesso a um nível de análise que só grandes instituições tinham. A tecnologia é impressionante. Recomendo de olhos fechados.",
    stars: 5,
  },
];

/* ─────────────────────────
   ÍCONES SVG
   ───────────────────────── */

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#C49A38" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C49A38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C49A38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B9EAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C49A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C49A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ─────────────────────────
   COMPONENTE PRINCIPAL
   ───────────────────────── */

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState("ia-trading-plus");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const currentPlan = PLANS.find((p) => p.id === selectedPlan);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(currentPlan.pixCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Informe seu nome";
    if (!formData.email.trim() || !formData.email.includes("@")) e.email = "E-mail inválido";
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) e.phone = "WhatsApp inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setStep(2);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #070E1A 0%, #0A1626 60%, #070E1A 100%)",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.5s ease",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "400px",
        background: "radial-gradient(ellipse at center, rgba(196,154,56,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div className="checkout-wrap" style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── HEADER ── */}
        <header style={{ textAlign: "center", padding: "3rem 0 2rem" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
          }}>
            Apex Quantum
          </div>
          <div style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}>
            AI Trading System
          </div>
        </header>

        {/* ── TIMER ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          background: "rgba(196,154,56,0.06)",
          border: "1px solid rgba(196,154,56,0.15)",
          borderRadius: "999px",
          padding: "0.65rem 1.5rem",
          maxWidth: "320px", margin: "0 auto 3.5rem",
        }}>
          <ClockIcon />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", color: "var(--text-soft)" }}>
            Oferta expira em
          </span>
          <span style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.95rem", fontWeight: 700,
            color: "var(--gold-bright)",
            letterSpacing: "0.05em",
          }}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* ── TÍTULO ── */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="eyebrow" style={{ marginBottom: "1rem" }}>Escolha seu plano</div>
          <div className="gold-rule" style={{ margin: "0 auto 1.25rem" }} />
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            color: "var(--text-base)",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
          }}>
            Selecione o pacote ideal<br />para seus objetivos
          </h1>
          <p style={{ fontFamily: "var(--font-ui)", color: "var(--text-soft)", fontSize: "1rem" }}>
            Tecnologia institucional acessível para qualquer investidor
          </p>
        </div>

        {/* ── PLANOS ── */}
        <div className="plans-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
          marginBottom: "4rem",
        }}>
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`plan-card${isSelected ? " selected" : plan.highlight ? " highlight" : ""}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #C49A38, #E0B84A)",
                    color: "#07111E",
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em",
                    padding: "5px 18px", borderRadius: "999px",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-ui)",
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Nome */}
                <div style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.85rem", fontWeight: 600,
                  color: "var(--text-soft)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginTop: plan.badge ? "0.75rem" : 0,
                  marginBottom: "1rem",
                }}>
                  {plan.name}
                </div>

                {/* Preço */}
                <div style={{ marginBottom: "0.25rem", lineHeight: 1 }}>
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: "0.9rem",
                    color: "var(--text-soft)", verticalAlign: "top", lineHeight: "2.2",
                  }}>R$ </span>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.2rem, 5vw, 2.8rem)", fontWeight: 700,
                    color: isSelected ? "var(--gold-bright)" : "var(--text-base)",
                    transition: "color 0.3s ease",
                  }}>
                    {plan.priceShort}
                  </span>
                </div>
                <div style={{
                  fontFamily: "var(--font-ui)", fontSize: "0.75rem",
                  color: "var(--text-dim)", marginBottom: "1.5rem",
                }}>
                  {plan.period}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "var(--border)", marginBottom: "1.25rem" }} />

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem" }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: "10px",
                      padding: "5px 0",
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.82rem",
                      color: "var(--text-soft)",
                      lineHeight: 1.55,
                    }}>
                      <span style={{ flexShrink: 0, marginTop: "2px" }}><CheckIcon /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Select button */}
                <button style={{
                  width: "100%", padding: "0.75rem",
                  borderRadius: "10px", border: "none",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.82rem", fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: isSelected
                    ? "linear-gradient(135deg, #C49A38, #E0B84A)"
                    : "rgba(255,255,255,0.04)",
                  color: isSelected ? "#07111E" : "var(--text-dim)",
                  letterSpacing: "0.04em",
                }}>
                  {isSelected ? "✓ Selecionado" : "Selecionar"}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── FORMULÁRIO / PIX ── */}
        <div ref={formRef} className="form-card" style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-gold)",
          borderRadius: "20px",
          padding: "2.5rem",
          maxWidth: "520px",
          margin: "0 auto 4rem",
        }}>
          {/* Steps */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "2rem" }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-ui)", fontSize: "0.8rem", fontWeight: 700,
                  background: step >= s ? "linear-gradient(135deg, #C49A38, #E0B84A)" : "var(--bg-raised)",
                  color: step >= s ? "#07111E" : "var(--text-dim)",
                  border: step >= s ? "none" : "1px solid var(--border)",
                  transition: "all 0.4s ease",
                }}>
                  {s}
                </div>
                {s === 1 && (
                  <div style={{
                    width: "48px", height: "1px",
                    background: step >= 2 ? "var(--gold-dim)" : "var(--border)",
                    transition: "background 0.4s ease",
                  }} />
                )}
              </div>
            ))}
          </div>

          {step === 1 ? (
            <>
              {/* Plan summary */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "var(--bg-raised)",
                border: "1px solid var(--border-gold)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                marginBottom: "1.75rem",
              }}>
                <div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: "4px" }}>
                    Plano selecionado
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "1rem", fontWeight: 600, color: "var(--gold-bright)" }}>
                    {currentPlan.name}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--text-base)", lineHeight: 1 }}>
                    R$ {currentPlan.price}
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "4px" }}>
                    {currentPlan.period}
                  </div>
                </div>
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem", fontWeight: 700,
                color: "var(--text-base)",
                textAlign: "center", marginBottom: "0.25rem",
              }}>
                Seus dados
              </h2>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", color: "var(--text-soft)", textAlign: "center", marginBottom: "1.75rem" }}>
                Preencha para confirmar sua compra
              </p>

              {/* Inputs */}
              {[
                { key: "name", label: "Nome completo", type: "text", placeholder: "Seu nome completo" },
                { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                { key: "phone", label: "WhatsApp", type: "tel", placeholder: "(00) 00000-0000" },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: "1.1rem" }}>
                  <label className="form-label">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`form-input${errors[field.key] ? " error" : ""}`}
                    value={formData[field.key]}
                    onChange={(e) => {
                      setFormData({ ...formData, [field.key]: e.target.value });
                      if (errors[field.key]) setErrors({ ...errors, [field.key]: null });
                    }}
                  />
                  {errors[field.key] && (
                    <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "#F87171", marginTop: "5px", display: "block" }}>
                      {errors[field.key]}
                    </span>
                  )}
                </div>
              ))}

              <button className="btn-beam" onClick={handleSubmit} style={{ marginTop: "0.5rem" }}>
                <span className="btn-beam-text">Continuar para pagamento</span>
                <span className="btn-beam-arrow">→</span>
              </button>

              <SecurityBar />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>Pagamento via Pix</div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem", fontWeight: 700,
                color: "var(--text-base)", marginBottom: "0.5rem",
              }}>
                {currentPlan.name}
              </h2>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.2rem", fontWeight: 700,
                color: "var(--gold-bright)", marginBottom: "0.25rem",
              }}>
                R$ {currentPlan.price}
              </div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "1.75rem" }}>
                Escaneie o QR Code ou copie o código Pix
              </p>

              {/* QR Code */}
              <div style={{
                display: "inline-flex",
                padding: "1.25rem",
                background: "#FFFFFF",
                borderRadius: "16px",
                marginBottom: "1.5rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}>
                <img
                  src={currentPlan.qrImage}
                  alt={`QR Code Pix — ${currentPlan.name}`}
                  width={180}
                  height={180}
                  style={{ borderRadius: "8px", display: "block" }}
                />
              </div>

              {/* Copy button */}
              <button
                onClick={handleCopyPix}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "0.75rem 1.75rem",
                  borderRadius: "10px",
                  border: copied ? "1px solid rgba(196,154,56,0.5)" : "1px solid var(--border-gold)",
                  background: copied ? "rgba(196,154,56,0.12)" : "rgba(196,154,56,0.06)",
                  color: "var(--gold-bright)",
                  fontFamily: "var(--font-ui)", fontSize: "0.85rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.3s ease",
                  margin: "0 auto 1rem", width: "100%", justifyContent: "center",
                }}
              >
                {copied ? <CheckCircleIcon /> : <CopyIcon />}
                {copied ? "Código copiado!" : "Copiar código Pix"}
              </button>

              {/* Pix code preview */}
              <div style={{
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                background: "var(--bg-base)",
                border: "1px solid var(--border)",
                fontFamily: "monospace", fontSize: "0.68rem",
                color: "var(--text-dim)", wordBreak: "break-all",
                textAlign: "left", lineHeight: 1.6,
                maxHeight: "56px", overflow: "hidden",
                marginBottom: "1.25rem",
              }}>
                {currentPlan.pixCode}
              </div>

              {/* Notice */}
              <div style={{
                background: "rgba(196,154,56,0.06)",
                border: "1px solid rgba(196,154,56,0.15)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                marginBottom: "1.25rem",
                textAlign: "left",
              }}>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", color: "var(--gold)", lineHeight: 1.6, margin: 0 }}>
                  ⏳ Após o pagamento, envie o comprovante no WhatsApp para ativação imediata da sua conta.
                </p>
              </div>

              <button
                onClick={() => setStep(1)}
                style={{
                  width: "100%", padding: "0.75rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  fontFamily: "var(--font-ui)", fontSize: "0.82rem",
                  color: "var(--text-dim)", cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
              >
                ← Voltar para dados
              </button>

              <SecurityBar />
            </div>
          )}
        </div>

        {/* ── GARANTIA ── */}
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "1.5rem",
          background: "var(--bg-card)",
          border: "1px solid var(--border-gold)",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "640px", margin: "0 auto 5rem",
        }}>
          <div style={{ flexShrink: 0, marginTop: "2px" }}><ShieldIcon /></div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem", fontWeight: 700,
              color: "var(--text-base)", marginBottom: "0.5rem",
            }}>
              Garantia Incondicional de 7 Dias
            </div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.88rem", color: "var(--text-soft)", lineHeight: 1.7, margin: 0 }}>
              Se por qualquer motivo você não ficar satisfeito com a Apex Quantum nos primeiros 7 dias, basta nos enviar uma mensagem e devolvemos{" "}
              <strong style={{ color: "var(--gold)" }}>100% do seu investimento</strong>.
              Sem perguntas, sem burocracia. O risco é todo nosso.
            </p>
          </div>
        </div>

        {/* ── DEPOIMENTOS ── */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="eyebrow" style={{ marginBottom: "0.75rem" }}>Depoimentos</div>
          <div className="gold-rule" style={{ margin: "0 auto 1.25rem" }} />
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700,
            color: "var(--text-base)",
          }}>
            O que nossos clientes dizem
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem", marginBottom: "5rem",
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.75rem",
              transition: "border-color 0.3s ease",
            }}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "1rem" }}>
                {Array.from({ length: t.stars }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem", fontStyle: "italic",
                color: "var(--text-soft)", lineHeight: 1.7,
                margin: "0 0 1.25rem",
              }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #C49A38, #7A5E20)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 700,
                  color: "#07111E", flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-base)" }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--text-dim)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          padding: "2.5rem 0 3rem",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem", fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--text-dim)", marginBottom: "0.75rem",
          }}>
            Apex Quantum
          </div>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--text-dim)", margin: "0 0 0.4rem" }}>
            © 2026 Apex Quantum AI. Todos os direitos reservados.
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "#2A3D50", maxWidth: "480px", margin: "0 auto" }}>
            Todo investimento envolve riscos. Rentabilidade passada não é garantia de resultados futuros.
          </p>
        </footer>
      </div>
    </div>
  );
}

/* ── Security Bar ── */
function SecurityBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: "14px", padding: "1rem", marginTop: "0.75rem",
      fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--text-dim)",
      flexWrap: "wrap",
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <LockIcon /> Dados protegidos
      </span>
      <span style={{ color: "var(--border)" }}>•</span>
      <span>Ambiente seguro</span>
      <span style={{ color: "var(--border)" }}>•</span>
      <span>Criptografia 256-bit</span>
    </div>
  );
}
