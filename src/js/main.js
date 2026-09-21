const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".carousel-dot");
const prevButton = document.getElementById("carousel-prev");
const nextButton = document.getElementById("carousel-next");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");
const modalTriggers = document.querySelectorAll(".modal-trigger");

let currentSlide = 0;


/* ---------- Smooth Scrolling ---------- */

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    const navbarHeight = navbar.offsetHeight;

    const targetPosition =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});


/* ---------- Navbar Resize ---------- */

function updateNavbarSize() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}


/* ---------- Position Indicator ---------- */

function updateActiveNavLink() {
  const navbarHeight = navbar.offsetHeight;

  /*
    Requirement:
    Find the section directly below the bottom edge
    of the navbar.
  */
  const checkPoint = window.scrollY + navbarHeight + 10;

  let activeSectionId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (
      checkPoint >= sectionTop &&
      checkPoint < sectionBottom
    ) {
      activeSectionId = section.id;
    }
  });

  /*
    Explicitly make the final menu item active
    when the user reaches the bottom of the page.
  */
  const reachedBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5;

  if (reachedBottom) {
    activeSectionId = "contact";
  }

  navLinks.forEach((link) => {
    const sectionId = link
      .getAttribute("href")
      .replace("#", "");

    if (sectionId === activeSectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}


/* ---------- Scroll Handler ---------- */

function handleScroll() {
  updateNavbarSize();
  updateActiveNavLink();
}

window.addEventListener("scroll", handleScroll);

window.addEventListener("resize", () => {
  updateActiveNavLink();
});

handleScroll();


/* ---------- Carousel ---------- */

function showSlide(index) {
  if (index < 0) {
    currentSlide = slides.length - 1;
  } else if (index >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  slides.forEach((slide, slideIndex) => {
    if (slideIndex === currentSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  dots.forEach((dot, dotIndex) => {
    if (dotIndex === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}


prevButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});


nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});


dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number(dot.dataset.slide);

    showSlide(slideIndex);
  });
});


showSlide(0);


/* ---------- Modal ---------- */

function openModal(title, text) {
  modalTitle.textContent = title;
  modalText.textContent = text;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const title = trigger.dataset.modalTitle;
    const text = trigger.dataset.modalText;

    openModal(title, text);
  });
});


modalClose.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", closeModal);


/* Close modal with Escape */

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    modal.classList.contains("open")
  ) {
    closeModal();
  }
});