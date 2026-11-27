const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const siteHeader = document.querySelector(".site-header");
const brandLink = document.querySelector(".brand");

const closeMobileMenu = () => {
  if (!menuButton || !siteNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

if (brandLink) {
  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash === "#top") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
}

const syncHeaderScroll = () => {
  if (!siteHeader) return;
  const scrolled = window.scrollY > 40;
  siteHeader.classList.toggle("is-scrolled", scrolled);
  if (scrolled && siteNav?.classList.contains("is-open")) {
    closeMobileMenu();
  }
};

window.addEventListener("scroll", syncHeaderScroll, { passive: true });
syncHeaderScroll();

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
