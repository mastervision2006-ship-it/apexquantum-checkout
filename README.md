# Apex Quantum — Checkout

Página de checkout da Apex Quantum AI Trading System.

## 🚀 Deploy na Vercel

### Opção 1: Via GitHub (recomendado)
1. Suba este projeto para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **"New Project"**
3. Importe o repositório do GitHub
4. Clique em **"Deploy"** — pronto!

### Opção 2: Via CLI
```bash
npm install -g vercel
cd apex-quantum-checkout
vercel
```

## 🛠️ Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## ✏️ Personalização

### Alterar planos e preços
Edite o array `PLANS` no arquivo `app/checkout.js` (linhas 10-50).

### Adicionar QR Code Pix
1. Coloque a imagem do QR Code na pasta `public/` (ex: `public/qrcode-pix.png`)
2. No arquivo `app/checkout.js`, procure o comentário `✏️ SUBSTITUA ESTE BLOCO` e troque por:
```jsx
<img src="/qrcode-pix.png" alt="QR Code Pix" width={200} height={200} style={{ borderRadius: '8px' }} />
```

### Alterar chave Pix
Edite a constante `PIX_KEY` no arquivo `app/checkout.js`.

### Alterar depoimentos
Edite o array `TESTIMONIALS` no arquivo `app/checkout.js`.

### Alterar tempo do timer
Modifique o valor `15 * 60` (15 minutos em segundos) na linha do `useState`.

## 📁 Estrutura

```
apex-quantum-checkout/
├── app/
│   ├── checkout.js    ← Componente principal (edite planos, preços, etc.)
│   ├── globals.css    ← Estilos globais
│   ├── layout.js      ← Layout e metadata
│   └── page.js        ← Página raiz
├── public/            ← Coloque o QR Code Pix aqui
├── next.config.js
├── package.json
└── README.md
```
