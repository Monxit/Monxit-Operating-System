// download.js — Monxit OS download button logic

const ISO_URL = "assets/monxit-os-1.0-zena-cinnamon-x86_64.iso";
const VERSION_TEXT = "Monxit OS 1.0 (Zena)";

const BTN_ID = "downloadBtn";
const VERSION_ATTR = "data-monxit-version";

function setState(btn, enabled) {
  if (enabled) {
    btn.classList.remove("btn-disabled");
    btn.removeAttribute("aria-disabled");
    btn.href = ISO_URL;
    btn.textContent = `Download ${VERSION_TEXT}`;
  } else {
    btn.classList.add("btn-disabled");
    btn.setAttribute("aria-disabled", "true");
    btn.href = "javascript:void(0)";
    btn.textContent = "Coming soon";
  }
}

async function main() {
  console.log("[monxit] download.js loaded");

  const btn = document.getElementById(BTN_ID);
  if (!btn) {
    console.warn("[monxit] No #downloadBtn found in HTML");
    return;
  }

  document.querySelectorAll(`[${VERSION_ATTR}]`).forEach((el) => {
    el.textContent = VERSION_TEXT;
  });

  // default to "coming soon" until proven otherwise
  setState(btn, false);

  try {
    const res = await fetch(ISO_URL, { method: "HEAD", cache: "no-store" });
    console.log("[monxit] HEAD", ISO_URL, res.status);
    setState(btn, res.ok);
  } catch (e) {
    console.warn("[monxit] HEAD failed:", e);
    setState(btn, false);
  }
}

document.addEventListener("DOMContentLoaded", main);
