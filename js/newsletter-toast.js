/*
 * Newsletter toast for the D3 Graph Gallery.
 *
 * Pops a small card at the bottom-right of the screen a few seconds after the
 * page loads, pitching the newsletter and embedding the Kit (ConvertKit) signup
 * form. Mirrors the toast used on dataviz-inspiration, rebuilt in vanilla JS
 * since this site is plain HTML/jQuery (no React/sonner).
 *
 * Self-contained: injects its own <style>, builds its own DOM, and injects the
 * Kit form script into its own container (so the form renders where we want it,
 * unlike loading the script through jQuery .load()).
 *
 * Drop it onto a page with a single tag:
 *   <script src="js/newsletter-toast.js"></script>          (root pages)
 *   <script src="../js/newsletter-toast.js"></script>       (graph/ pages)
 */
(function () {
  "use strict";

  // --- Config (tweak freely) ------------------------------------------------
  var KIT_FORM_UID = "2fe2715a3b";
  var KIT_SCRIPT_SRC =
    "https://prodigious-trailblazer-3628.kit.com/" + KIT_FORM_UID + "/index.js";
  var DELAY_MS = 8000; // show after a few seconds of usage
  var STORAGE_KEY = "d3gg-newsletter-toast-shown"; // once per browser session

  // Guard against double-inclusion of this script.
  if (window.__d3ggNewsletterToast) return;
  window.__d3ggNewsletterToast = true;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function injectStyles() {
    if (document.getElementById("nlt-styles")) return;
    var css =
      "" +
      ".nlt-toast{position:fixed;bottom:20px;right:20px;z-index:2000;" +
      "width:360px;max-width:calc(100vw - 40px);background:#fff;" +
      "border:1px solid #e2e2e2;border-radius:10px;" +
      "box-shadow:0 10px 30px rgba(0,0,0,0.18);padding:18px 18px 14px;" +
      "font-family:'Montserrat',Helvetica,Arial,sans-serif;color:#333;" +
      "opacity:0;transform:translateY(16px);" +
      "transition:opacity .35s ease,transform .35s ease;}" +
      ".nlt-toast.nlt-show{opacity:1;transform:translateY(0);}" +
      ".nlt-close{position:absolute;top:8px;right:10px;border:none;" +
      "background:none;font-size:20px;line-height:1;cursor:pointer;" +
      "color:#b0b0b0;padding:4px;}" +
      ".nlt-close:hover{color:#555;}" +
      ".nlt-title{margin:0 18px 8px 0;font-size:23px;font-weight:700;" +
      "line-height:1.2;color:#222;}" +
      ".nlt-body{margin:0 0 10px;font-size:13.5px;line-height:1.5;color:#555;}" +
      ".nlt-form{min-height:40px;}" +
      // Keep the Kit form flush with the toast padding (no break-out / centering).
      ".nlt-form .formkit-form,.nlt-form form{margin:0!important;width:100%!important;" +
      "max-width:100%!important;}" +
      ".nlt-form [data-element=\"fields\"]{padding:0!important;margin:0!important;}" +
      ".nlt-form input,.nlt-form .formkit-input,.nlt-form button{" +
      "box-sizing:border-box!important;max-width:100%!important;}" +
      ".nlt-foot{margin:8px 0 0;font-size:11.5px;line-height:1.4;color:#9a9a9a;}" +
      "@media (max-width:480px){.nlt-toast{right:10px;left:10px;bottom:10px;" +
      "width:auto;}}";
    var style = document.createElement("style");
    style.id = "nlt-styles";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function buildToast() {
    var toast = document.createElement("div");
    toast.className = "nlt-toast";
    toast.setAttribute("role", "dialog");
    toast.setAttribute("aria-label", "Newsletter signup");

    var close = document.createElement("button");
    close.className = "nlt-close";
    close.setAttribute("type", "button");
    close.setAttribute("aria-label", "Dismiss");
    close.innerHTML = "&times;";
    close.onclick = function () {
      toast.classList.remove("nlt-show");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    };

    var title = document.createElement("p");
    title.className = "nlt-title";
    title.textContent = "Struggling with D3.js?";

    var body = document.createElement("p");
    body.className = "nlt-body";
    body.innerHTML =
      "I know the pain and have been there before. A few key concepts and " +
      "tips can be a real game changer when working with D3. Want me to send " +
      "them your way?";

    var formWrap = document.createElement("div");
    formWrap.className = "nlt-form";

    var foot = document.createElement("p");
    foot.className = "nlt-foot";
    foot.textContent =
      "Join 19k+ subscribers, and leave whenever you want.";

    toast.appendChild(close);
    toast.appendChild(title);
    toast.appendChild(body);
    toast.appendChild(formWrap);
    toast.appendChild(foot);
    document.body.appendChild(toast);

    // Inject the Kit form script into its own container so the form renders here.
    var kit = document.createElement("script");
    kit.async = true;
    kit.src = KIT_SCRIPT_SRC;
    kit.setAttribute("data-uid", KIT_FORM_UID);
    formWrap.appendChild(kit);

    // Trigger the slide-in on the next frame.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add("nlt-show");
      });
    });
  }

  ready(function () {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setTimeout(function () {
      // Mark as shown once per session, regardless of whether they subscribe.
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {}
      injectStyles();
      buildToast();
    }, DELAY_MS);
  });
})();
