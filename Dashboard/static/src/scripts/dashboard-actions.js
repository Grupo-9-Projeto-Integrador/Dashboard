(function () {
  const stores = Array.isArray(window.dashboardStores) ? window.dashboardStores : [];
  const selectedCompareStores = [];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalizeText(value) {
    return String(value ?? "").trim().toLowerCase();
  }

  function getVisibleMetricText(selector, fallback) {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : fallback;
  }

  function buildStoreSummary(store) {
    return [
      `LUC: ${store.Luc || "-"}`,
      `Segmento: ${store.Segmento || "-"}`,
      `Sinistros: ${store.Sinistro || "-"}`,
      `Seguro: ${store.Seguro || "-"}`,
      `Vigência: ${store.VigenciaContrato || "-"}`,
      `Renovação: ${store.DiaDeRenovacao || "-"}`,
    ].join(" | ");
  }

  function countBy(items, getter) {
    const counts = new Map();
    items.forEach((item) => {
      const key = normalizeText(getter(item));
      if (!key) {
        return;
      }
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return counts;
  }

  function formatCounts(counts) {
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([key, total]) => `${key}: ${total}`)
      .join("\n");
  }

  function createModal() {
    const modal = document.createElement("div");
    modal.id = "dashboardModal";
    modal.className = "dashboard-modal hidden";
    modal.innerHTML = `
      <div class="dashboard-modal-panel" role="dialog" aria-modal="true" aria-labelledby="dashboardModalTitle">
        <div class="dashboard-modal-header">
          <div>
            <span id="dashboardModalEyebrow" class="dashboard-modal-eyebrow"></span>
            <h3 id="dashboardModalTitle" class="dashboard-modal-title"></h3>
          </div>
          <button type="button" id="dashboardModalClose" class="dashboard-modal-close" aria-label="Fechar">&times;</button>
        </div>
        <div id="compareMode" class="dashboard-modal-body">
          <p class="dashboard-modal-note">Digite o nome da loja, escolha na sugestão e monte um comparativo com duas ou mais lojas.</p>
          <div class="compare-picker">
            <input id="storeSearch" class="dashboard-modal-search" type="search" list="storeOptions" placeholder="Digite o nome da loja">
            <datalist id="storeOptions"></datalist>
            <button type="button" id="addStoreToCompare" class="report-btn dashboard-modal-action-btn">Adicionar</button>
          </div>
          <div id="selectedStoreChips" class="selected-store-chips"></div>
          <div class="dashboard-modal-actions">
            <button type="button" id="runComparison" class="dashboard-modal-primary">Abrir comparativo</button>
            <button type="button" id="clearSelection" class="dashboard-modal-secondary">Limpar seleção</button>
          </div>
          <div id="compareStatus" class="dashboard-modal-status"></div>
          <div id="compareResults" class="comparison-table-wrapper"></div>
        </div>
        <div id="reportMode" class="dashboard-modal-body hidden">
          <p class="dashboard-modal-note">Resumo automático do painel com base nos indicadores e na base de lojas carregada.</p>
          <div id="reportText" class="report-text"></div>
          <div class="report-actions">
            <button type="button" id="downloadReport" class="report-btn dashboard-modal-action-btn">Baixar relatório</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function getModalElements() {
    const modal = document.getElementById("dashboardModal") || createModal();
    return {
      modal,
      eyebrow: document.getElementById("dashboardModalEyebrow"),
      title: document.getElementById("dashboardModalTitle"),
      closeButton: document.getElementById("dashboardModalClose"),
      compareMode: document.getElementById("compareMode"),
      reportMode: document.getElementById("reportMode"),
      search: document.getElementById("storeSearch"),
      storeOptions: document.getElementById("storeOptions"),
      addStoreToCompare: document.getElementById("addStoreToCompare"),
      selectedStoreChips: document.getElementById("selectedStoreChips"),
      runComparison: document.getElementById("runComparison"),
      clearSelection: document.getElementById("clearSelection"),
      compareStatus: document.getElementById("compareStatus"),
      compareResults: document.getElementById("compareResults"),
      reportText: document.getElementById("reportText"),
      downloadReport: document.getElementById("downloadReport"),
    };
  }

  function openModal(mode) {
    const elements = getModalElements();
    elements.compareMode.classList.toggle("hidden", mode !== "compare");
    elements.reportMode.classList.toggle("hidden", mode !== "report");
    elements.eyebrow.textContent = mode === "compare" ? "Comparador de lojas" : "Relatório do dashboard";
    elements.title.textContent = mode === "compare" ? "Comparar lojas selecionadas" : "Gerar relatório do dashboard";
    elements.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = document.getElementById("dashboardModal");
    if (modal) {
      modal.classList.add("hidden");
    }
    document.body.style.overflow = "";
  }

  function renderStoreOptions(filterText = "") {
    const elements = getModalElements();
    const term = normalizeText(filterText);
    const filtered = stores.filter((store) => {
      if (!term) {
        return true;
      }
      return (
        normalizeText(store.Nome).includes(term) ||
        normalizeText(store.Segmento).includes(term) ||
        normalizeText(store.Luc).includes(term)
      );
    });

    elements.storeOptions.innerHTML = filtered
      .map((store) => `<option value="${escapeHtml(store.Nome)}"></option>`)
      .join("");
  }

  function findStoreByName(name) {
    const normalizedName = normalizeText(name);
    if (!normalizedName) {
      return undefined;
    }

    return (
      stores.find((store) => normalizeText(store.Nome) === normalizedName) ||
      stores.find((store) => normalizeText(store.Nome).includes(normalizedName))
    );
  }

  function renderSelectedStores() {
    const elements = getModalElements();
    if (selectedCompareStores.length === 0) {
      elements.selectedStoreChips.innerHTML = '<span class="dashboard-modal-status">Nenhuma loja adicionada ainda.</span>';
      elements.compareResults.innerHTML = "";
      return;
    }

    elements.selectedStoreChips.innerHTML = selectedCompareStores
      .map(
        (store) => `
          <span class="selected-store-chip">
            <strong>${escapeHtml(store.Nome)}</strong>
            <button type="button" data-store-name="${escapeHtml(store.Nome)}" aria-label="Remover ${escapeHtml(store.Nome)}">×</button>
          </span>
        `,
      )
      .join("");

    elements.compareResults.innerHTML = selectedCompareStores.length
      ? `
        <div class="compare-preview-grid">
          ${selectedCompareStores
            .map(
              (store) => `
                <article class="compare-preview-card">
                  <strong>${escapeHtml(store.Nome)}</strong>
                  <span>LUC ${escapeHtml(store.Luc || "-")}</span>
                  <span>${escapeHtml(store.Segmento || "-")}</span>
                </article>
              `,
            )
            .join("")}
        </div>
      `
      : "";

    elements.selectedStoreChips.querySelectorAll("button[data-store-name]").forEach((button) => {
      button.addEventListener("click", () => {
        const storeName = button.getAttribute("data-store-name");
        const index = selectedCompareStores.findIndex((store) => store.Nome === storeName);
        if (index >= 0) {
          selectedCompareStores.splice(index, 1);
          renderSelectedStores();
        }
      });
    });
  }

  function addStoreToComparison(name) {
    const store = findStoreByName(name);
    if (!store) {
      return "Selecione uma loja válida da lista.";
    }

    const alreadySelected = selectedCompareStores.some((item) => item.Nome === store.Nome);
    if (alreadySelected) {
      return "Essa loja já foi adicionada ao comparativo.";
    }

    selectedCompareStores.push(store);
    renderSelectedStores();
    return `${store.Nome} adicionada ao comparativo.`;
  }

  function renderComparison(selectedStores) {
    const elements = getModalElements();
    const rows = [
      ["LUC", (store) => store.Luc],
      ["Segmento", (store) => store.Segmento],
      ["Sinistros", (store) => store.Sinistro],
      ["Seguro", (store) => store.Seguro],
      ["Vigência do contrato", (store) => store.VigenciaContrato],
      ["Dia de renovação", (store) => store.DiaDeRenovacao],
    ];

    elements.compareResults.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Indicador</th>
            ${selectedStores.map((store) => `<th>${escapeHtml(store.Nome)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              ([label, getter]) => `
                <tr>
                  <td><strong>${escapeHtml(label)}</strong></td>
                  ${selectedStores.map((store) => `<td>${escapeHtml(getter(store) || "-")}</td>`).join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  function createReportData() {
    const totalLojas = getVisibleMetricText(".summary-card.card-blue .summary-value", String(stores.length));
    const taxaOcupacao = getVisibleMetricText(".summary-card.card-green .summary-value", "-");
    const notificacoesPendentes = getVisibleMetricText(".summary-card.card-yellow .summary-title + p", "-");
    const sinistrosAbertos = getVisibleMetricText(".summary-card.card-red .summary-title + p", "-");
    const segmentos = countBy(stores, (store) => store.Segmento);
    const seguros = countBy(stores, (store) => store.Seguro);
    const sinistros = stores
      .filter((store) => normalizeText(store.Sinistro))
      .slice(0, 10)
      .map((store) => `${store.Nome}: ${store.Sinistro}`);

    return {
      totalLojas,
      taxaOcupacao,
      notificacoesPendentes,
      sinistrosAbertos,
      baseLojas: stores.length,
      segmentos,
      seguros,
      sinistros,
    };
  }

  function buildReportHtml(reportData) {
    const segmentList = Array.from(reportData.segmentos.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([segmento, total]) => `
        <div class="report-list-item">
          <strong>${escapeHtml(segmento)}</strong>
          <span>${total} lojas</span>
        </div>
      `)
      .join("");

    const seguroList = Array.from(reportData.seguros.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([seguro, total]) => `
        <div class="report-list-item">
          <strong>${escapeHtml(seguro)}</strong>
          <span>${total} lojas</span>
        </div>
      `)
      .join("");

    const sinistrosList = reportData.sinistros.length
      ? reportData.sinistros
          .map((item) => {
            const [nome, detalhe] = item.split(": ");
            return `
              <div class="report-list-item">
                <strong>${escapeHtml(nome)}</strong>
                <span>${escapeHtml(detalhe || "-")}</span>
              </div>
            `;
          })
          .join("")
      : '<div class="report-list-item"><strong>Nenhum sinistro informado</strong><span>Base atual</span></div>';

    return `
      <div class="report-hero">
        <div class="report-hero-card">
          <h4>Resumo executivo</h4>
          <p>O painel está consolidado com ${escapeHtml(reportData.baseLojas)} lojas carregadas e ${escapeHtml(reportData.segmentos.size)} segmentos distintos.</p>
        </div>
        <div class="report-metrics">
          <div class="report-metric">
            <span>Lojas do shopping</span>
            <strong>${escapeHtml(reportData.totalLojas)}</strong>
          </div>
          <div class="report-metric">
            <span>Taxa de ocupação</span>
            <strong>${escapeHtml(reportData.taxaOcupacao)}</strong>
          </div>
          <div class="report-metric">
            <span>Notificações</span>
            <strong>${escapeHtml(reportData.notificacoesPendentes)}</strong>
          </div>
          <div class="report-metric">
            <span>Sinistros</span>
            <strong>${escapeHtml(reportData.sinistrosAbertos)}</strong>
          </div>
        </div>
      </div>
      <div class="report-grid">
        <section class="report-section">
          <h5>Segmentos por frequência</h5>
          <div class="report-list">${segmentList || '<div class="report-list-item"><strong>Sem segmentos disponíveis</strong><span>-</span></div>'}</div>
        </section>
        <section class="report-section">
          <h5>Seguros por frequência</h5>
          <div class="report-list">${seguroList || '<div class="report-list-item"><strong>Sem informações de seguro</strong><span>-</span></div>'}</div>
        </section>
      </div>
      <section class="report-list-card">
        <h5 style="font-size: 0.85rem; font-weight: 800; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;">Lojas com sinistro registrado</h5>
        <div class="report-list">${sinistrosList}</div>
      </section>
    `;
  }

  function buildReportText(reportData) {
    const segmentosTexto = formatCounts(reportData.segmentos) || "Sem segmentos disponíveis";
    const segurosTexto = formatCounts(reportData.seguros) || "Sem informações de seguro";
    const sinistrosTexto = reportData.sinistros.length
      ? reportData.sinistros.join("\n")
      : "Nenhum sinistro informado";

    return [
      "Resumo do dashboard",
      "",
      `Lojas do shopping: ${reportData.totalLojas}`,
      `Taxa de ocupação: ${reportData.taxaOcupacao}`,
      `Notificações pendentes: ${reportData.notificacoesPendentes}`,
      `Sinistros em aberto: ${reportData.sinistrosAbertos}`,
      `Base de lojas carregada: ${reportData.baseLojas}`,
      `Segmentos distintos: ${reportData.segmentos.size}`,
      "",
      "Segmentos por frequência:",
      segmentosTexto,
      "",
      "Situação do seguro por frequência:",
      segurosTexto,
      "",
      "Lojas com sinistro registrado:",
      sinistrosTexto,
    ].join("\n");
  }

  function downloadReport(reportText) {
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-dashboard-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function initialize() {
    const compareButton = document.querySelector(".compare-btn");
    const reportButton = document.querySelector(".report-btn");

    if (!compareButton && !reportButton) {
      return;
    }

    const elements = getModalElements();
    renderStoreOptions();

    compareButton?.addEventListener("click", () => {
      openModal("compare");
      renderStoreOptions(elements.search?.value || "");
      renderSelectedStores();
      elements.compareStatus.textContent = "";
    });

    reportButton?.addEventListener("click", () => {
      openModal("report");
      const reportData = createReportData();
      const reportHtml = buildReportHtml(reportData);
      const reportText = buildReportText(reportData);
      elements.reportText.innerHTML = reportHtml;
      elements.downloadReport.onclick = () => window.open("/relatorio", "_blank", "noopener,noreferrer");
    });

    elements.closeButton?.addEventListener("click", closeModal);
    elements.modal?.addEventListener("click", (event) => {
      if (event.target === elements.modal) {
        closeModal();
      }
    });

    elements.search?.addEventListener("input", (event) => {
      renderStoreOptions(event.target.value);
    });

    elements.search?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const message = addStoreToComparison(event.target.value);
        elements.compareStatus.textContent = message;
        event.target.value = "";
        renderStoreOptions();
      }
    });

    elements.addStoreToCompare?.addEventListener("click", () => {
      const message = addStoreToComparison(elements.search?.value || "");
      elements.compareStatus.textContent = message;
      if (elements.search) {
        elements.search.value = "";
        renderStoreOptions();
      }
    });

    elements.clearSelection?.addEventListener("click", () => {
      selectedCompareStores.splice(0, selectedCompareStores.length);
      renderSelectedStores();
      elements.compareStatus.textContent = "Seleção limpa.";
    });

    elements.runComparison?.addEventListener("click", () => {
      if (selectedCompareStores.length < 2) {
        elements.compareStatus.textContent = "Selecione duas ou mais lojas para comparar.";
        return;
      }

      const params = new URLSearchParams();
      selectedCompareStores.forEach((store) => {
        params.append("lojas", store.Nome);
      });
      window.location.href = `/comparativo?${params.toString()}`;
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();