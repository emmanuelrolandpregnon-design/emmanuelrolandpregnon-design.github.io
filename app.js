const grid = document.querySelector("#grid");
const filters = document.querySelector("#filters");
const about = document.querySelector("#about");
const timeline = document.querySelector("#timeline");
const skills = document.querySelector("#skills");
const contactRow = document.querySelector("#contact-row");

fetch("projects.json")
  .then((r) => r.json())
  .then(render)
  .catch(() => {
    grid.textContent = "Impossible de charger projects.json.";
  });

function render(data) {
  const p = data.profile || {};
  if (p.edition) document.querySelector("#edition").textContent = p.edition;
  if (p.legalName) document.querySelector("#legal-name").textContent = p.legalName;
  if (p.availability) document.querySelector("#availability").textContent = p.availability;

  about.innerHTML = (data.about || []).map((t) => `<p>${esc(t)}</p>`).join("");

  const tags = ["Tout", ...new Set((data.projects || []).map((x) => x.tag).filter(Boolean))];
  filters.innerHTML = tags
    .map((tag, i) => `<button type="button" aria-pressed="${i === 0}" data-tag="${esc(tag)}">${esc(tag)}</button>`)
    .join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    paint(data.projects, btn.dataset.tag);
  });
  paint(data.projects || [], "Tout");

  timeline.innerHTML = (data.parcours || [])
    .map(
      (item) => `<li>
        <span class="period">${esc(item.period)}</span>
        <div>
          <strong>${esc(item.title)}</strong>
          <div>${esc(item.org)}${item.place ? " · " + esc(item.place) : ""}</div>
          <p>${esc(item.detail || "")}</p>
        </div>
      </li>`
    )
    .join("");

  skills.innerHTML = (data.skills || []).map((s) => `<li>${esc(s)}</li>`).join("");

  const links = [];
  if (p.email) links.push(`<a class="btn gold" href="mailto:${esc(p.email)}">${esc(p.email)}</a>`);
  if (p.github) links.push(`<a class="btn gold" href="${esc(p.github)}">GitHub</a>`);
  if (!p.email) links.unshift(`<span class="btn">Mail à renseigner dans projects.json</span>`);
  contactRow.innerHTML = links.join("");
}

function paint(projects, tag) {
  const list = tag === "Tout" ? projects : projects.filter((x) => x.tag === tag);
  grid.innerHTML = list
    .map(
      (item) => `<article class="card${item.featured ? " featured" : ""}>
        <div class="card-top"><span>${esc(item.tag || "")}</span><span>${esc(item.year || "")}</span></div>
        <h3>${esc(item.title)}</h3>
        <div class="card-meta"><span>${esc(item.role || "")}</span><span>${esc(item.status || "")}</span></div>
        <p>${esc(item.summary || "")}</p>
        <ul>${(item.points || []).map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        ${item.link ? `<a class="more" href="${esc(item.link)}">Voir le projet</a>` : ""}
      </article>`
    )
    .join("");
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
