document.addEventListener("DOMContentLoaded", function () {
  // --- START: UPGRADED NAVBAR SCRIPT ---
  const mainNav = document.getElementById("main-nav");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburgerIcon.classList.toggle("hidden", isOpen);
    closeIcon.classList.toggle("hidden", !isOpen);
  };

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from bubbling up to the document
      toggleMenu();
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        toggleMenu();
      }
    });
  });

  // Click outside to close
  document.addEventListener("click", (event) => {
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickInsideMenu = mobileMenu.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickInsideMenu &&
      mobileMenu.classList.contains("open")
    ) {
      toggleMenu();
    }
  });

  // Hero Carousel Functionality
  const slidesContainer = document.querySelector(".carousel-slides");
  if (slidesContainer) {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
      slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    });

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(currentIndex);
    });
    goToSlide(0);
  }

  // Project Gallery Functionality
  const galleryData = {
    residential: [
      {
        url: "assets shivom/residential/1masterBedroom.webp",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "master Bedroom",
      },
      {
        url: "assets shivom/residential/2DaughersBedroom.webp",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "Bedroom Daugher",
      },
      {
        url: "assets shivom/residential/3LivingRoom.webp",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "Living Room",
      },
      {
        url: "assets shivom/residential/3.5Kitchen.webp",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "Kitchen",
      },
      {
        url: "assets shivom/residential/4featureWall.png",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "featureWall",
      },
      {
        url: "assets shivom/residential/5TvUnit.png",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "Tv Unit",
      },
      {
        url: "assets shivom/residential/6DinningTable.webp",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "Dinning Table",
      },
      {
        url: "assets shivom/residential/7Kitchen.png",
        designer: "Residential Design",
        role: "Interior Designer",
        alt: "kitchen",
      },
    ],
    commercial: [
      // ... (your other categories like residential, etc.)

      {
        url: "assets shivom/commercial/1cafespace.webp",
        designer: "Commercial Design",
        role: "Interior Designer",
        alt: "cafe space",
      },
      {
        url: "assets shivom/commercial/2 Cabin.webp",
        designer: "Commercial Design",
        role: "Interior Designer",
        alt: "cabin ",
      },
      {
        url: "assets shivom/commercial/2.5 luxury Cabin.webp",
        designer: "Commercial Design",
        role: "Interior Designer",
        alt: "luxury cabin",
      },
      {
        url: "assets shivom/commercial/3officeEntrance.webp",
        designer: "Commercial Design",
        role: "Interior Designer",
        alt: "office Entrance",
      },
      {
        url: "assets shivom/commercial/3.5 workspace.webp",
        designer: "Commercial Design",
        role: "Interior Designer",
        alt: "office workspace",
      },
      {
        url: "assets shivom/commercial/4 Reception.webp",
        designer: "Commercial Design",
        role: "Interior Designer",
        alt: "Reception",
      },

      // ... (your other project objects for other categories)
    ],
    healthcare: [
      {
        url: "assets shivom/healthcare/1hospitalLobby.webp",
        designer: "Healthcare Design",
        role: "Interior Designer",
        alt: "hospital Lobby",
      },
      {
        url: "assets shivom/healthcare/2hospitalSuitroom.webp",
        designer: "Healthcare Design",
        role: "Interior Designer",
        alt: "Hospital Suitroom",
      },
      {
        url: "assets shivom/healthcare/3OperationTheater.webp",
        designer: "Healthcare Design",
        role: "Interior Designer",
        alt: "Operation theater ",
      },
      {
        url: "assets shivom/healthcare/4patient room.webp",
        designer: "Healthcare Design",
        role: "Interior Designer",
        alt: "patient room",
      },
      {
        url: "assets shivom/healthcare/5Doctor Cabin.webp",
        designer: "Healthcare Design",
        role: "Interior Designer",
        alt: "doctor cabin",
      },
      {
        url: "assets shivom/healthcare/6care Room.webp",
        designer: "Healthcare Design",
        role: "Interior Designer",
        alt: "care room",
      },
    ],
    furniture: [
      {
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=500&fit=crop",
        designer: "Custom Furniture",
        role: "Furniture Designer",
        alt: "Stylish green velvet sofa",
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop",
        designer: "Custom Furniture",
        role: "Furniture Designer",
        alt: "Modern wooden armchair",
      },
    ],
  };

  let currentCategory = "residential";
  let currentImageIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const galleryPrevBtn = document.getElementById("galleryPrevBtn");
  const galleryNextBtn = document.getElementById("galleryNextBtn");
  const categoryButtons = document.querySelectorAll(".category-button");
  const designerNameEl = document.getElementById("designerName");
  const designerRoleEl = document.getElementById("designerRole");

  function updateGalleryImage() {
    const images = galleryData[currentCategory];
    if (!images || !mainImage) return;

    const currentImageData = images[currentImageIndex];
    mainImage.src = currentImageData.url;
    mainImage.alt = currentImageData.alt;
    designerNameEl.textContent = currentImageData.designer;
    designerRoleEl.textContent = currentImageData.role;
  }

  function updateActiveButton(activeButton) {
    categoryButtons.forEach((btn) => {
      btn.classList.remove(
        "bg-[#F9A826]",
        "border-[#F9A826]",
        "text-black",
        "flex",
        "items-center",
        "justify-between"
      );
      btn.classList.add("bg-white", "border-gray-800");
      const arrow = btn.querySelector(".text-xs");
      if (arrow) arrow.remove();
    });

    activeButton.classList.remove("bg-white", "border-gray-800");
    activeButton.classList.add(
      "bg-[#F9A826]",
      "border-[#F9A826]",
      "text-black",
      "flex",
      "items-center",
      "justify-between"
    );

    if (!activeButton.querySelector(".text-xs")) {
      const arrowSpan = document.createElement("span");
      arrowSpan.className = "text-xs ml-2";
      arrowSpan.textContent = "→";
      activeButton.appendChild(arrowSpan);
    }
  }

  if (galleryPrevBtn && galleryNextBtn) {
    galleryPrevBtn.addEventListener("click", () => {
      const images = galleryData[currentCategory];
      currentImageIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      updateGalleryImage();
    });

    galleryNextBtn.addEventListener("click", () => {
      const images = galleryData[currentCategory];
      currentImageIndex =
        currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      updateGalleryImage();
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateActiveButton(button);
      currentCategory = button.dataset.category;
      currentImageIndex = 0;
      updateGalleryImage();
    });
  });

  if (mainImage) {
    updateGalleryImage();
    // Set the default active button on page load
    const defaultActiveButton = document.querySelector(
      '.category-button[data-category="residential"]'
    );
    if (defaultActiveButton) {
      updateActiveButton(defaultActiveButton);
    }
  }

  // FAQ Accordion Functionality
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".faq-icon");
      const isAnswerOpen =
        answer.style.maxHeight && answer.style.maxHeight !== "0px";

      // Close all other answers
      document.querySelectorAll(".faq-answer").forEach((ans) => {
        if (ans !== answer) {
          ans.style.maxHeight = "0px";
          ans.previousElementSibling
            .querySelector(".faq-icon")
            .classList.remove("rotate-45");
        }
      });

      // Toggle the clicked answer
      if (isAnswerOpen) {
        answer.style.maxHeight = "0px";
        icon.classList.remove("rotate-45");
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.classList.add("rotate-45");
      }
    });
  });
});

// <!-- WhatsApp Widget JavaScript -->

(function () {
  const fab = document.getElementById("waFab");
  const win = document.getElementById("waWindow");
  const closeBtn = document.getElementById("waClose");
  const input = document.getElementById("waInput");
  const sendBtn = document.getElementById("waSend");
  const msgs = document.getElementById("waMessages");
  const quickTextEl = document.getElementById("waQuickText");
  const quickSend = document.getElementById("waQuickSend");

  // --- START WIDGET CONFIGURATION ---

  // 1. Your Phone Number (International Format, no '+', no spaces)
  // Example for an Indian number like +91 98765 43210 would be '919876543210'
  const PHONE_NUMBER = "918078640646";

  // 2. Avatar Image URL
  const AVATAR_URL = "assets%20shivom/shivom-logo-new-1.png";

  // 3. Chat Header Texts
  const CHAT_NAME = "Shivom Designs";
  const CHAT_STATUS = "Typically replies in minutes";

  // 4. Quick Reply Message
  const QUICK_REPLY_TEXT =
    "Hello! I'm interested in your interior design services. Could you send me more info?";

  // --- END WIDGET CONFIGURATION ---

  // Apply configuration to the UI
  document.getElementById(
    "waAvatar"
  ).style.backgroundImage = `url('${AVATAR_URL}')`;
  document.getElementById("waName").textContent = CHAT_NAME;
  document.getElementById("waStatus").textContent = CHAT_STATUS;
  document.getElementById("waQuickText").textContent = QUICK_REPLY_TEXT;

  const openChat = () => {
    win.classList.add("open");
    setTimeout(() => input.focus(), 50);
  };
  const closeChat = () => {
    win.classList.remove("open");
    fab.focus();
  };

  fab.addEventListener("click", () => {
    if (win.classList.contains("open")) closeChat();
    else openChat();
  });
  closeBtn.addEventListener("click", closeChat);

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && win.classList.contains("open")) {
      e.preventDefault();
      closeChat();
    }
  });

  // Append a local sent bubble to UI
  function appendLocalBubble(text) {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const bubble = document.createElement("div");
    bubble.className = "wa-bubble sent";
    bubble.textContent = text;
    const t = document.createElement("span");
    t.className = "wa-time";
    t.textContent = ` ${hh}:${mm}`;
    bubble.appendChild(t);
    msgs.appendChild(bubble);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // Open WhatsApp with message
  function openWhatsAppWith(text) {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
    window.open(url, "_blank", "noopener");
  }

  // Send handler
  function handleSend(text) {
    if (!text || !text.trim()) return;
    appendLocalBubble(text.trim());
    openWhatsAppWith(text.trim());
    input.value = "";
  }

  sendBtn.addEventListener("click", () => handleSend(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input.value);
    }
  });

  // Quick message button
  quickSend.addEventListener("click", () =>
    handleSend(quickTextEl.textContent)
  );

  // Optional: click quick text to load into input instead of sending
  quickTextEl.addEventListener("click", () => {
    input.value = quickTextEl.textContent;
    input.focus();
  });

  // --- CTA BUTTONS TO OPEN WHATSAPP WIDGET ---
  const handleCtaClick = (event, message) => {
    event.preventDefault();
    openChat();
    input.value = message;
    input.focus();
  };

  const ctaButtonConfigs = [
    {
      selector: ".cta-quote",
      message:
        "Hello! I would like to get a free quote for my interior design project.",
    },
    {
      selector: ".cta-start",
      message:
        "Hi! I'm ready to get started on my project and would like to know the next steps.",
    },
    {
      selector: ".cta-work",
      message:
        "Hi Shivom Designs, I'm interested in working together on a project.",
    },
  ];

  ctaButtonConfigs.forEach(({ selector, message }) => {
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener("click", (e) => handleCtaClick(e, message));
    });
  });
})();
// <!-- Validation Script -->
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !service || !mobile || !message) {
    alert("Please fill all required fields marked with *");
    return false;
  }

  // Mobile validation (10 digits)
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number");
    return false;
  }

  return true;
}
