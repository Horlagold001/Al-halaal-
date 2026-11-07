
document.addEventListener("DOMContentLoaded", function () {

  // Business WhatsApp number
  const WHATSAPP_NUMBER = "2347061611944";

  // WhatsApp helper
  function openWhatsApp(message) {
    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.location.href = url;
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Automatic copyright year
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Set booking date minimum to today
  const appointmentDate = document.getElementById("appointmentDate");

  if (appointmentDate) {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    appointmentDate.min = localDate;
  }

  // Product enquiry buttons
  const productButtons = document.querySelectorAll(".product-enquire");

  productButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productName = button.dataset.product || "a product";

      const message =
        "Hello Al Halaal Sunamedic Therapy,\n\n" +
        "I am interested in making an enquiry about: " +
        productName +
        ".\n\n" +
        "Please provide more information about its availability and price.\n\n" +
        "Thank you.";

      openWhatsApp(message);
    });
  });

  // Product category filtering and search
  const categoryButtons = document.querySelectorAll(".category-btn");
  const productCards = document.querySelectorAll(".product-card");
  const productSearch = document.getElementById("productSearch");
  const noProducts = document.getElementById("noProducts");

  let activeCategory = "all";

  function filterProducts() {
    const searchTerm = productSearch
      ? productSearch.value.trim().toLowerCase()
      : "";

    let visibleCount = 0;

    productCards.forEach(function (card) {
      const category = card.dataset.category || "";
      const name = card.dataset.name || "";
      const cardText = card.textContent.toLowerCase();

      const matchesCategory =
        activeCategory === "all" || category === activeCategory;

      const matchesSearch =
        name.toLowerCase().includes(searchTerm) ||
        cardText.includes(searchTerm);

      const shouldShow = matchesCategory && matchesSearch;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount++;
      }
    });

    if (noProducts) {
      noProducts.hidden = visibleCount !== 0;
    }
  }

  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      categoryButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
      activeCategory = button.dataset.category || "all";

      filterProducts();
    });
  });

  if (productSearch) {
    productSearch.addEventListener("input", filterProducts);
  }

  // Booking form
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.reportValidity()) {
        return;
      }

      const getValue = function (id) {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
      };

      const fullName = getValue("fullName");
      const phone = getValue("phone");
      const consultationType = getValue("consultationType");
      const date = getValue("appointmentDate");
      const time = getValue("appointmentTime");
      const message = getValue("message");

      const formattedDate = date
        ? new Date(date + "T12:00:00").toLocaleDateString("en-NG", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : "Not specified";

      const whatsappMessage =
        "Hello Al Halaal Sunamedic Therapy,\n\n" +
        "I would like to make a consultation enquiry.\n\n" +
        "Name: " + fullName + "\n" +
        "Phone: " + phone + "\n" +
        "Consultation type: " + consultationType + "\n" +
        "Preferred date: " + formattedDate + "\n" +
        "Preferred time: " + (time || "Not specified") + "\n" +
        "Consultation fee: ₦5,000\n" +
        "Message: " + (message || "No additional message") +
        "\n\nThank you.";

      openWhatsApp(whatsappMessage);
    });
  }

});

// Opening animation
window.addEventListener("load", function () {
  const intro = document.getElementById("intro-screen");

  if (intro) {
    setTimeout(function () {
      intro.remove();
    }, 3400);
  }
});
