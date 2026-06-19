const CONFIG = {
  siteUrl: "https://indexofficial-aiyouxiyou.com.cn",
  keyword: "爱游戏",
  cardTitle: "欢迎访问",
  cardDescription: "这里为您提供一站式的游戏资讯与资源推荐。",
  badgeColor: "#2c3e50",
  badgeBg: "#ecf0f1",
};

function createStyleElement() {
  const style = document.createElement("style");
  style.textContent = `
    .helper-card {
      max-width: 480px;
      margin: 20px auto;
      padding: 24px 20px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.5;
      color: #1a1a2e;
      transition: transform 0.2s ease;
    }
    .helper-card:hover {
      transform: translateY(-2px);
    }
    .helper-card h3 {
      margin: 0 0 8px 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: ${CONFIG.badgeColor};
    }
    .helper-card p {
      margin: 0 0 16px 0;
      font-size: 0.95rem;
      color: #555;
    }
    .keyword-badge {
      display: inline-block;
      padding: 6px 14px;
      margin: 0 4px 8px 0;
      background: ${CONFIG.badgeBg};
      color: ${CONFIG.badgeColor};
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      border: 1px solid #d5d8dc;
      transition: background 0.15s;
    }
    .keyword-badge:hover {
      background: #d5d8dc;
    }
    .access-note {
      margin-top: 18px;
      padding: 12px 16px;
      background: #f7f9fc;
      border-left: 4px solid ${CONFIG.badgeColor};
      border-radius: 8px;
      font-size: 0.9rem;
      color: #2d3436;
    }
    .access-note a {
      color: ${CONFIG.badgeColor};
      font-weight: 600;
      text-decoration: none;
    }
    .access-note a:hover {
      text-decoration: underline;
    }
  `;
  return style;
}

function buildCardHtml() {
  const tagList = ["游戏推荐", "热门攻略", "玩家社区", CONFIG.keyword];
  const badgesHtml = tagList
    .map((tag) => `<span class="keyword-badge">#${escapeHtml(tag)}</span>`)
    .join(" ");

  return `
    <div class="helper-card">
      <h3>${escapeHtml(CONFIG.cardTitle)}</h3>
      <p>${escapeHtml(CONFIG.cardDescription)}</p>
      <div>${badgesHtml}</div>
      <div class="access-note">
        💡 访问说明：请前往 
        <a href="${escapeHtml(CONFIG.siteUrl)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(CONFIG.siteUrl)}
        </a> 
        获取更多关于「${escapeHtml(CONFIG.keyword)}」的内容与动态。
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderHelperCard(containerSelector = "body") {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn("site-helper: 未找到容器元素");
    return;
  }
  const style = createStyleElement();
  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildCardHtml();
  const cardEl = wrapper.firstElementChild;
  document.head.appendChild(style);
  container.appendChild(cardEl);
}

function initHelper() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderHelperCard());
  } else {
    renderHelperCard();
  }
}

initHelper();