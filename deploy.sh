#!/bin/bash
# ================================================================
# Álibi Corporativo 3000 — Deploy Script
# Executa no servidor após git pull ou upload dos arquivos
# 
# Requisitos no servidor:
#   - Node.js 20+
#   - PM2 (npm install -g pm2)
#   - Arquivo .env.local com as variáveis de ambiente
# ================================================================

set -e

echo "🚀 Iniciando deploy do Álibi Corporativo 3000..."

# 1. Instalar dependências de produção
echo "📦 Instalando dependências..."
npm ci --omit=dev

# 2. Build da aplicação
echo "🔨 Building Next.js..."
npm run build

# 3. Copiar arquivos públicos para o standalone
echo "📁 Copiando assets estáticos para standalone..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 4. Copiar .env.local para dentro do standalone
echo "🔑 Copiando variáveis de ambiente..."
cp .env.local .next/standalone/.env.local

# 5. Iniciar/Reiniciar com PM2
echo "♻️  Reiniciando com PM2..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

echo "✅ Deploy concluído! App rodando na porta 3001."
echo "   Verifique: pm2 status"
echo "   Logs: pm2 logs alibi-corporativo"
