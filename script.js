(function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Reveal-on-scroll for sections and cards
  var revealTargets = document.querySelectorAll(
    ".section-head, .spec-card, .advantage, .gallery-item, .hero-card, .contact-form"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Phone formatter (RU)
  var phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      var digits = phoneInput.value.replace(/\D/g, "");
      if (digits.length > 0 && digits[0] === "8") {
        digits = "7" + digits.slice(1);
      }
      digits = digits.slice(0, 11);
      var formatted = "+7";
      if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
      if (digits.length >= 4) formatted += ") " + digits.slice(4, 7);
      if (digits.length >= 7) formatted += "-" + digits.slice(7, 9);
      if (digits.length >= 9) formatted += "-" + digits.slice(9, 11);
      phoneInput.value = formatted;
    });
  }

  // Lead form: client-side validation + fake submission
  var form = document.getElementById("leadForm");
  var statusEl = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.classList.remove("error");
      statusEl.textContent = "";

      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      var fields = [name, phone];
      var allValid = true;

      fields.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add("invalid");
          allValid = false;
        } else {
          field.classList.remove("invalid");
        }
      });

      var digits = phone.value.replace(/\D/g, "");
      if (digits.length < 11) {
        phone.classList.add("invalid");
        allValid = false;
      }

      if (!allValid) {
        statusEl.classList.add("error");
        statusEl.textContent = "Заполните имя и корректный телефон.";
        return;
      }

      var btn = form.querySelector("button[type=submit]");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Отправляем…";
      }

      // Simulated submit — replace with real endpoint integration later
      setTimeout(function () {
        statusEl.textContent = "Спасибо! Перезвоню в ближайшее время.";
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Перезвоните мне";
        }
      }, 700);
    });
  }
})();
