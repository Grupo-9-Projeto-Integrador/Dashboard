# JP Mall Corporativo - Design System Implementation

## 📋 Resumo da Implementação

Sistema de Design completo implementado para o JP Mall - Sistema de Gestão de Sinistros e Ocorrências de Shopping Center, seguindo diretrizes corporativas rigorosas com suporte a modo claro e escuro.

---

## 🎨 Paleta de Cores

### Modo Light (Padrão)
- **Primary Dark**: `#8B1A1A` - Vermelho vinho escuro (navegação, sidebar)
- **Primary**: `#D93030` - Vermelho vibrante (botões de ação)
- **Background**: `#F7F4EF` - Bege/areia claro (fundo principal)
- **Surface**: `#FFFFFF` - Branco (cards e painéis)
- **Accent**: `#C8A882` - Dourado/bege (destaques)

### Modo Dark
- **Primary Dark**: `#8B1A1A` - Mantido (consistência visual)
- **Primary**: `#E04444` - Vermelho ajustado para dark
- **Background**: `#0F1117` - Cinza muito escuro
- **Surface**: `#1A1F2E` - Cinza escuro médio
- **Card**: `#242938` - Cinza para cards
- **Accent**: `#D4A96A` - Dourado mais claro

### Cores Semânticas
- **Success**: `#10B981` (light) / `#34D399` (dark)
- **Warning**: `#F59E0B` (light) / `#FBBF24` (dark)
- **Error**: `#D93030` (light) / `#E04444` (dark)
- **Info**: `#3B82F6` (light) / `#60A5FA` (dark)

---

## 📝 Tipografia

### Fonte Principal
- **Família**: Inter (primária), Roboto (fallback), system-ui, sans-serif
- **Tamanho Base**: 16px

### Escala Tipográfica
```css
--text-xs: 12px    /* Small text, badges */
--text-sm: 14px    /* Body text padrão */
--text-base: 16px  /* Base size */
--text-lg: 18px    /* Subtítulos */
--text-xl: 20px    /* H2 */
--text-2xl: 24px   /* H1 */
```

### Pesos de Fonte
- **Normal**: 400 (corpo de texto)
- **Medium**: 500 (labels, botões)
- **Semibold**: 600 (ênfase)
- **Bold**: 700 (headings)

---

## 📏 Espaçamento

Sistema baseado em **unidade de 8px**:

```css
--spacing-xs: 4px    /* 0.5 unit */
--spacing-sm: 8px    /* 1 unit */
--spacing-md: 16px   /* 2 units */
--spacing-lg: 24px   /* 3 units */
--spacing-xl: 32px   /* 4 units */
--spacing-2xl: 40px  /* 5 units */
--spacing-3xl: 48px  /* 6 units */
```

---

## 🔘 Componentes

### Botões
- **Min-height**: 44px (touch target accessibility)
- **Border-radius**: 8px
- **Primary**: Fundo vermelho `#D93030`, hover `#b92828`
- **Padding**: 0 24px (horizontal)
- **Focus**: Ring 2px com cor primária

### Inputs
- **Min-height**: 44px
- **Background**: `#F9FAFB` (light) / `#1E2435` (dark)
- **Border**: `#E5E7EB` (light) / `#2E3447` (dark)
- **Focus**: Ring 3px com 20% opacity da cor primária

### Cards
- **Background**: Branco (light) / `#242938` (dark)
- **Border**: `#E5E7EB` (light) / `#2E3447` (dark)
- **Border-radius**: 8px
- **Padding**: 24px
- **Shadow**: Leve elevação

### Badges
Quatro variantes (Success, Warning, Error, Info) com:
- Fundo com 50 opacity (light) ou 30% (dark)
- Borda sólida
- Text semibold
- Font-size: 12px
- Padding: 4px 12px

---

## ♿ Acessibilidade

### Conformidade WCAG
- **Light Mode**: AA/AAA
- **Dark Mode**: AA
- **Touch Targets**: Mínimo 44px
- **Focus Visible**: Outline 2px com cor primária + offset 2px
- **Contraste**: Todas as combinações de texto/fundo validadas

### Navegação por Teclado
- Todos os elementos interativos são navegáveis
- Estados de foco claramente visíveis
- Ordem lógica de tabulação

---

## 🌓 Dark Mode

### Implementação
1. **Toggle**: Botão no header (ícone Sol/Lua)
2. **Persistência**: localStorage (`jp-mall-theme`)
3. **Ativação**: Classe `.dark` no `<html>`
4. **Transições**: Suaves entre modos (0.2s)

### Hook Customizado
```typescript
useDarkMode() {
  isDarkMode: boolean
  toggleDarkMode: () => void
}
```

---

## 📂 Arquivos Principais

### CSS
- `/src/styles/theme.css` - Todas as variáveis e tokens do Design System
- `/src/styles/tailwind.css` - Configuração Tailwind v4
- `/src/styles/index.css` - Import unificado

### TypeScript
- `/src/app/hooks/useDarkMode.ts` - Hook para gerenciamento de tema
- `/src/app/components/Layout.tsx` - Layout principal com toggle
- `/src/app/pages/Login.tsx` - Tela de login atualizada
- `/src/app/pages/Dashboard.tsx` - Dashboard com KPIs e gráficos
- `/src/app/pages/NewClaim.tsx` - Formulário de novo sinistro

---

## 🎯 Variáveis CSS Principais

### Uso em Código
```jsx
// Backgrounds
className="bg-[var(--color-background)]"
className="bg-[var(--color-surface)]"
className="bg-[var(--color-card)]"

// Text
className="text-[var(--color-text-primary)]"
className="text-[var(--color-text-secondary)]"
className="text-[var(--color-text-muted)]"

// Borders & Inputs
className="border-[var(--color-border)]"
className="bg-[var(--color-input-bg)]"

// Brand & Actions
className="bg-[var(--color-primary)]"
className="bg-[var(--color-primary-dark)]"
className="hover:bg-[var(--color-primary-hover)]"

// Semantic
className="text-[var(--color-success)]"
className="text-[var(--color-warning)]"
className="text-[var(--color-error)]"
className="text-[var(--color-info)]"

// Focus
className="focus:ring-[var(--color-ring)]"
```

---

## ✅ Classes Utilitárias Customizadas

### Card JP
```jsx
<div className="card-jp">
  {/* Conteúdo do card com estilos pré-aplicados */}
</div>
```

### Botão Primário JP
```jsx
<button className="btn-primary-jp">
  Ação Principal
</button>
```

### Input JP
```jsx
<input className="input-jp" />
```

### Badges JP
```jsx
<span className="badge-success-jp">Aprovado</span>
<span className="badge-warning-jp">Pendente</span>
<span className="badge-error-jp">Rejeitado</span>
<span className="badge-info-jp">Em Análise</span>
```

---

## 🚀 Próximos Passos Sugeridos

1. **Páginas Restantes**: Aplicar Design System em:
   - `/src/app/pages/ClaimsHistory.tsx`
   - `/src/app/pages/StoreDirectory.tsx`
   - `/src/app/pages/Reports.tsx`
   - `/src/app/pages/ClaimDetails.tsx`

2. **Componentes Reutilizáveis**: Criar componentes UI genéricos:
   - `<Button />` com variantes (primary, secondary, outline)
   - `<Card />` padronizado
   - `<Badge />` com tipos semânticos
   - `<Input />` com validação visual
   - `<Select />` estilizado

3. **Animações**: Adicionar micro-interações com Motion
   - Transições de página
   - Hover states animados
   - Loading states

4. **Responsividade**: Garantir adaptação mobile
   - Sidebar colapsável em mobile
   - Tabelas com scroll horizontal
   - Formulários adaptáveis

5. **Testes de Acessibilidade**: Validar com ferramentas
   - axe DevTools
   - WAVE
   - Lighthouse

---

## 📖 Referências

- **Design System**: `/src/imports/DESIGN_SYSTEM__JP_Mall_Corporativo.txt`
- **Projeto**: Flamboyant Shopping | UFG 2026/1
- **Tailwind CSS**: v4.1.12
- **React**: 18.3.1
- **TypeScript**: Enabled

---

## 👥 Equipe

**Gerência de Relacionamento - JP Mall Operações**

---

*Última atualização: Abril 2026*
