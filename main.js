document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const filters = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    items.forEach(item => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  }));

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const message = [
        "Bonjour CONTREPOIDSTECH,",
        "Je souhaite faire une demande de renseignements/devis.",
        "",
        "Nom : " + data.get("name"),
        "E-mail : " + data.get("email"),
        "Service : " + data.get("service"),
        "Message : " + data.get("message")
      ].join("\n");
      window.open("https://wa.me/243829603023?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }
});