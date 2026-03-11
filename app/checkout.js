"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   CONFIGURAÇÃO — Edite aqui seus planos e dados
   ───────────────────────────────────────────── */

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "1.497",
    period: "/mês",
    badge: null,
    features: [
      "Acesso à IA de análise de mercado",
      "Operações automáticas básicas",
      "Suporte por e-mail",
      "1 ativo monitorado",
      "Relatórios semanais",
    ],
    highlight: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "2.997",
    period: "/mês",
    badge: "MAIS POPULAR",
    features: [
      "Tudo do plano Starter +",
      "Operações ilimitadas",
      "Suporte prioritário via WhatsApp",
      "Até 10 ativos monitorados",
      "Relatórios diários em tempo real",
      "Gestão automática de risco",
      "Acesso ao painel avançado",
    ],
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "5.997",
    period: "/mês",
    badge: "MÁXIMO RESULTADO",
    features: [
      "Tudo do plano Professional +",
      "Ativos ilimitados",
      "Gerente de conta dedicado",
      "Configurações personalizadas de IA",
      "Análise institucional exclusiva",
      "Execução de alta frequência",
      "Relatórios sob demanda",
      "Linha direta com especialistas",
    ],
    highlight: false,
  },
];

const PIX_KEY = "SUA-CHAVE-PIX-AQUI";

const TESTIMONIALS = [
  {
    name: "Ricardo M.",
    role: "Investidor desde 2024",
    avatar: "RM",
    text: "Eu sempre quis investir no mercado internacional, mas nunca tive tempo nem conhecimento técnico suficiente. Com a Apex Quantum, a IA faz todo o trabalho pesado. Em 3 meses já vi resultados que eu jamais conseguiria sozinho.",
    stars: 5,
  },
  {
    name: "Camila S.",
    role: "Empresária",
    avatar: "CS",
    text: "O que mais me impressionou foi a automação completa. Eu não preciso ficar acompanhando gráficos o dia inteiro. A inteligência artificial analisa, identifica oportunidades e executa. Me poupou centenas de horas de estudo e operação manual.",
    stars: 5,
  },
  {
    name: "Fernando T.",
    role: "Médico e investidor",
    avatar: "FT",
    text: "Como médico, meu tempo é muito limitado. A Apex Quantum me deu acesso a um nível de análise que só grandes instituições tinham. A tecnologia é impressionante e o suporte é excelente. Recomendo de olhos fechados.",
    stars: 5,
  },
];

/* ─────────────────────────
   ÍCONES SVG
   ───────────────────────── */

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PixIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" />
      <path d="M21 14h-3v3" />
      <path d="M18 21v-3h3" />
    </svg>
  );
}

/* ─────────────────────────
   COMPONENTE PRINCIPAL
   ───────────────────────── */

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [copied, setCopied] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const currentPlan = PLANS.find((p) => p.id === selectedPlan);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Informe seu nome";
    if (!formData.email.trim() || !formData.email.includes("@")) e.email = "Informe um e-mail válido";
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um WhatsApp válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={pageStyle}>
      <style>{responsiveCSS}</style>

      {/* Background effects */}
      <div style={gridBgStyle} />
      <div style={glowTopStyle} />
      <div style={glowRedStyle} />

      <div
        style={{
          ...containerStyle,
          opacity: animateIn ? 1 : 0,
          transform: animateIn ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* ── HEADER ── */}
        <header style={headerStyle}>
          <div style={logoStyle}>APEX QUANTUM</div>
          <div style={logoSubStyle}>AI TRADING SYSTEM</div>
        </header>

        {/* ── TIMER ── */}
        <div style={timerBarStyle}>
          <ClockIcon />
          <span style={{ color: "#FCA5A5", fontSize: "14px" }}>Oferta exclusiva expira em</span>
          <span style={timerCountStyle}>{formatTime(timeLeft)}</span>
        </div>

        {/* ── TÍTULO ── */}
        <div style={sectionTitleStyle}>
          <h1 className="page-title" style={h1Style}>
            Escolha seu plano
          </h1>
          <p style={subtitleStyle}>
            Selecione o pacote ideal para seus objetivos de investimento
          </p>
        </div>

        {/* ── PLANOS ── */}
        <div className="plans-grid" style={plansGridStyle}>
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  position: "relative",
                  padding: "28px 22px",
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isSelected ? "scale(1.03)" : "scale(1)",
                  border: isSelected
                    ? "2px solid #22D3EE"
                    : plan.highlight
                    ? "2px solid rgba(34,211,238,0.25)"
                    : "1px solid rgba(148,163,184,0.1)",
                  background: isSelected
                    ? "linear-gradient(180deg, rgba(34,211,238,0.1) 0%, rgba(13,18,36,0.95) 100%)"
                    : "rgba(15,23,42,0.6)",
                  boxShadow: isSelected
                    ? "0 0 40px rgba(34,211,238,0.12), 0 8px 32px rgba(0,0,0,0.3)"
                    : "0 4px 16px rgba(0,0,0,0.2)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "5px 18px",
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "1.2px",
                      borderRadius: "20px",
                      whiteSpace: "nowrap",
                      background:
                        plan.id === "enterprise"
                          ? "linear-gradient(135deg, #EF4444, #DC2626)"
                          : "linear-gradient(135deg, #22D3EE, #0891B2)",
                      color: plan.id === "enterprise" ? "#fff" : "#0A0E1A",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div style={{ fontSize: "18px", fontWeight: "600", color: "#E2E8F0", marginTop: plan.badge ? "8px" : "0", marginBottom: "10px" }}>
                  {plan.name}
                </div>

                <div style={{ marginBottom: "4px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#94A3B8", verticalAlign: "top" }}>R$ </span>
                  <span className="plan-price" style={{ fontSize: "38px", fontWeight: "800", color: "#F1F5F9", lineHeight: "1" }}>
                    {plan.price}
                  </span>
                </div>
                <div style={{ fontSize: "14px", color: "#64748B", marginBottom: "22px" }}>{plan.period}</div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "5px 0", fontSize: "13px", color: "#CBD5E1", lineHeight: "1.5" }}>
                      <span style={{ flexShrink: 0, marginTop: "1px" }}><CheckIcon /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  style={{
                    width: "100%",
                    marginTop: "22px",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: isSelected ? "linear-gradient(135deg, #22D3EE, #0891B2)" : "rgba(148,163,184,0.08)",
                    color: isSelected ? "#0A0E1A" : "#94A3B8",
                  }}
                >
                  {isSelected ? "✓ Selecionado" : "Selecionar plano"}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── FORMULÁRIO / PAGAMENTO ── */}
        <div className="form-section" style={formSectionStyle}>
          {/* Steps */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "28px" }}>
            <div style={stepDot(true)}>1</div>
            <div style={{ width: "48px", height: "2px", background: step >= 2 ? "rgba(34,211,238,0.4)" : "rgba(148,163,184,0.12)", transition: "background 0.4s" }} />
            <div style={stepDot(step >= 2)}>2</div>
          </div>

          {step === 1 ? (
            <>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#F1F5F9", textAlign: "center", marginBottom: "4px" }}>
                Seus dados
              </h2>
              <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", marginBottom: "24px" }}>
                Preencha para confirmar sua assinatura
              </p>

              {/* Plan Summary */}
              <div style={planSummaryStyle}>
                <div>
                  <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Plano selecionado
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "700", color: "#22D3EE" }}>
                    {currentPlan.name}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: "#F1F5F9" }}>
                    R$ {currentPlan.price}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>{currentPlan.period}</div>
                </div>
              </div>

              {/* Inputs */}
              {[
                { key: "name", label: "Nome completo", type: "text", placeholder: "Seu nome completo" },
                { key: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
                { key: "phone", label: "WhatsApp", type: "tel", placeholder: "(00) 00000-0000" },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{
                      ...inputStyle,
                      borderColor: errors[field.key] ? "rgba(239,68,68,0.5)" : "rgba(148,163,184,0.15)",
                    }}
                    value={formData[field.key]}
                    onChange={(e) => {
                      setFormData({ ...formData, [field.key]: e.target.value });
                      if (errors[field.key]) setErrors({ ...errors, [field.key]: null });
                    }}
                  />
                  {errors[field.key] && (
                    <span style={{ fontSize: "12px", color: "#F87171", marginTop: "4px", display: "block" }}>
                      {errors[field.key]}
                    </span>
                  )}
                </div>
              ))}

              <button style={primaryBtnStyle} onClick={handleSubmit}>
                Continuar para pagamento →
              </button>

              <SecurityBar />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#F1F5F9", marginBottom: "4px" }}>
                Pagamento via Pix
              </h2>
              <p style={{ fontSize: "14px", color: "#94A3B8", marginBottom: "2px" }}>
                Plano <strong style={{ color: "#22D3EE" }}>{currentPlan.name}</strong>
              </p>
              <p style={{ fontSize: "26px", fontWeight: "800", color: "#F1F5F9", marginBottom: "4px" }}>
                R$ {currentPlan.price}<span style={{ fontSize: "14px", color: "#64748B", fontWeight: "400" }}>{currentPlan.period}</span>
              </p>
              <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "20px" }}>
                Escaneie o QR Code ou copie o código Pix abaixo
              </p>

              {/* QR Code Placeholder */}
              <div style={qrBoxStyle}>
                {/* 
                  ✏️ SUBSTITUA ESTE BLOCO PELA SUA IMAGEM DO QR CODE:
                  <img src="/qrcode-pix.png" alt="QR Code Pix" width={200} height={200} />
                */}
                <PixIcon />
                <div style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>QR Code Pix</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Substitua por sua imagem</div>
              </div>

              {/* Copy Button */}
              <button
                onClick={handleCopyPix}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  border: copied ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(34,211,238,0.3)",
                  background: copied ? "rgba(34,197,94,0.1)" : "rgba(34,211,238,0.05)",
                  color: copied ? "#22C55E" : "#22D3EE",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "16px",
                }}
              >
                {copied ? <CheckCircleIcon /> : <CopyIcon />}
                {copied ? "Código copiado!" : "Copiar código Pix"}
              </button>

              {/* Comprovante notice */}
              <div style={noticeBoxStyle}>
                <p style={{ fontSize: "13px", color: "#FCD34D", margin: 0 }}>
                  ⏳ Após o pagamento, envie o comprovante no WhatsApp para ativação imediata da sua conta.
                </p>
              </div>

              {/* Voltar */}
              <button
                onClick={() => setStep(1)}
                style={{
                  ...primaryBtnStyle,
                  marginTop: "16px",
                  background: "rgba(148,163,184,0.08)",
                  color: "#94A3B8",
                }}
              >
                ← Voltar para dados
              </button>

              <SecurityBar />
            </div>
          )}
        </div>

        {/* ── GARANTIA ── */}
        <div className="guarantee-box" style={guaranteeBoxStyle}>
          <div style={{ flexShrink: 0 }}>
            <ShieldIcon />
          </div>
          <div>
            <div style={{ fontSize: "17px", fontWeight: "700", color: "#F1F5F9", marginBottom: "6px" }}>
              Garantia Incondicional de 7 Dias
            </div>
            <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: "1.7", margin: 0 }}>
              Se por qualquer motivo você não ficar satisfeito com a Apex Quantum nos primeiros 7 dias, basta nos enviar uma mensagem e devolvemos <strong style={{ color: "#22D3EE" }}>100% do seu investimento</strong>. Sem perguntas, sem burocracia. O risco é todo nosso.
            </p>
          </div>
        </div>

        {/* ── DEPOIMENTOS ── */}
        <div style={{ ...sectionTitleStyle, marginTop: "56px" }}>
          <h2 style={{ ...h1Style, fontSize: "24px" }}>O que nossos clientes dizem</h2>
          <p style={subtitleStyle}>Resultados reais de pessoas que confiam na Apex Quantum</p>
        </div>

        <div className="testimonial-grid" style={testimonialGridStyle}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={testimonialCardStyle}>
              <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              <p style={{ fontSize: "13.5px", color: "#CBD5E1", lineHeight: "1.75", margin: "0 0 18px", fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={avatarStyle}>{t.avatar}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#E2E8F0" }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748B" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <footer style={footerStyle}>
          <div style={{ marginBottom: "8px", fontSize: "15px", fontWeight: "700", color: "#475569" }}>
            APEX QUANTUM
          </div>
          <p style={{ margin: "0 0 6px", fontSize: "12px" }}>
            © 2025 Apex Quantum AI. Todos os direitos reservados.
          </p>
          <p style={{ margin: 0, fontSize: "11px", color: "#334155" }}>
            Todo investimento envolve riscos. Rentabilidade passada não é garantia de resultados futuros.
          </p>
        </footer>
      </div>
    </div>
  );
}

/* ─────────────────────────
   MINI-COMPONENTE
   ───────────────────────── */

function SecurityBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", padding: "16px", marginTop: "12px", fontSize: "12px", color: "#64748B", flexWrap: "wrap" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <LockIcon /> Dados protegidos
      </span>
      <span style={{ color: "#334155" }}>•</span>
      <span>Ambiente seguro</span>
      <span style={{ color: "#334155" }}>•</span>
      <span>Criptografia 256-bit</span>
    </div>
  );
}

/* ─────────────────────────
   ESTILOS
   ───────────────────────── */

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #0A0E1A 0%, #0D1224 50%, #0A0E1A 100%)",
  color: "#E2E8F0",
  position: "relative",
  overflow: "hidden",
};

const gridBgStyle = {
  position: "fixed",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)",
  backgroundSize: "60px 60px",
  pointerEvents: "none",
  zIndex: 0,
};

const glowTopStyle = {
  position: "fixed",
  top: "-220px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "900px",
  height: "500px",
  background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)",
  pointerEvents: "none",
  zIndex: 0,
};

const glowRedStyle = {
  position: "fixed",
  bottom: "-120px",
  right: "-120px",
  width: "450px",
  height: "450px",
  background: "radial-gradient(ellipse, rgba(239,68,68,0.05) 0%, transparent 70%)",
  pointerEvents: "none",
  zIndex: 0,
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "24px 16px 60px",
  position: "relative",
  zIndex: 1,
  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "12px",
  paddingTop: "24px",
};

const logoStyle = {
  fontSize: "30px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  background: "linear-gradient(135deg, #22D3EE, #06B6D4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "2px",
};

const logoSubStyle = {
  fontSize: "11px",
  color: "#64748B",
  letterSpacing: "5px",
  textTransform: "uppercase",
};

const timerBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "12px 24px",
  margin: "20px auto 32px",
  maxWidth: "480px",
  background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.04))",
  border: "1px solid rgba(239,68,68,0.2)",
  borderRadius: "12px",
};

const timerCountStyle = {
  fontWeight: "700",
  fontSize: "20px",
  color: "#F87171",
  fontVariantNumeric: "tabular-nums",
};

const sectionTitleStyle = {
  textAlign: "center",
  marginBottom: "36px",
};

const h1Style = {
  fontSize: "30px",
  fontWeight: "700",
  color: "#F1F5F9",
  marginBottom: "8px",
  lineHeight: "1.2",
};

const subtitleStyle = {
  fontSize: "15px",
  color: "#94A3B8",
};

const plansGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  marginBottom: "48px",
};

const formSectionStyle = {
  maxWidth: "540px",
  margin: "0 auto 48px",
  padding: "36px 32px",
  borderRadius: "20px",
  background: "rgba(15,23,42,0.7)",
  border: "1px solid rgba(148,163,184,0.08)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
};

const stepDot = (active) => ({
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "700",
  background: active ? "linear-gradient(135deg, #22D3EE, #0891B2)" : "rgba(148,163,184,0.08)",
  color: active ? "#0A0E1A" : "#64748B",
  transition: "all 0.4s ease",
});

const planSummaryStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 20px",
  borderRadius: "12px",
  background: "rgba(34,211,238,0.04)",
  border: "1px solid rgba(34,211,238,0.12)",
  marginBottom: "24px",
};

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#94A3B8",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(148,163,184,0.15)",
  background: "rgba(10,14,26,0.8)",
  color: "#E2E8F0",
  fontSize: "15px",
  outline: "none",
  transition: "border 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const primaryBtnStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "none",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  background: "linear-gradient(135deg, #22D3EE, #0891B2)",
  color: "#0A0E1A",
  marginTop: "8px",
  transition: "all 0.3s ease",
  letterSpacing: "0.3px",
};

const qrBoxStyle = {
  width: "240px",
  height: "240px",
  margin: "8px auto 0",
  borderRadius: "16px",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const noticeBoxStyle = {
  marginTop: "24px",
  padding: "16px 20px",
  borderRadius: "12px",
  background: "rgba(250,204,21,0.05)",
  border: "1px solid rgba(250,204,21,0.15)",
};

const guaranteeBoxStyle = {
  maxWidth: "560px",
  margin: "0 auto 40px",
  padding: "28px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, rgba(34,211,238,0.06), rgba(6,182,212,0.02))",
  border: "1px solid rgba(34,211,238,0.15)",
  display: "flex",
  gap: "18px",
  alignItems: "flex-start",
};

const testimonialGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  marginBottom: "48px",
};

const testimonialCardStyle = {
  padding: "24px",
  borderRadius: "16px",
  background: "rgba(15,23,42,0.6)",
  border: "1px solid rgba(148,163,184,0.08)",
  backdropFilter: "blur(10px)",
};

const avatarStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #1E293B, #334155)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "700",
  color: "#22D3EE",
  border: "2px solid rgba(34,211,238,0.2)",
  flexShrink: 0,
};

const footerStyle = {
  textAlign: "center",
  padding: "36px 16px",
  borderTop: "1px solid rgba(148,163,184,0.06)",
  fontSize: "12px",
  color: "#475569",
};

const responsiveCSS = `
  @media (max-width: 768px) {
    .plans-grid {
      grid-template-columns: 1fr !important;
      max-width: 420px;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .testimonial-grid {
      grid-template-columns: 1fr !important;
      max-width: 420px;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .form-section {
      margin-left: 8px !important;
      margin-right: 8px !important;
      padding: 28px 18px !important;
    }
    .guarantee-box {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      margin-left: 12px !important;
      margin-right: 12px !important;
    }
    .plan-price {
      font-size: 32px !important;
    }
    .page-title {
      font-size: 24px !important;
    }
  }
`;
