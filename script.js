
/* ===============================
   1. MOBILE NAVIGATION
================================ */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    document.body.classList.toggle("menu-open", isOpen);
});


/* ===============================
   2. SMOOTH NAVIGATION
================================ */

navLinks.forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        closeMenu();
    });
});


/* Close mobile menu with Escape */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeMenu();
    }
});


/* Close menu when switching back to desktop */

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


/* ===============================
   3. ACTIVE NAVIGATION LINK
================================ */

const pageSections = document.querySelectorAll(
    "#home, #about, #projects, #contact"
);

function setActiveLink() {
    let currentSection = "home";

    pageSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= 160) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", setActiveLink, {
    passive: true
});

window.addEventListener("load", setActiveLink);


/* ===============================
   4. ROTATING DEVELOPER ROLES
================================ */

const roleText = document.querySelector(".role-text");

const roles = [
    "Web Developer",
    "Software Developer",
    "Cloud Computing Enthusiast",
    "Aspiring DevOps Engineer"
];

let roleIndex = 0;

if (roleText) {
    roleText.textContent = roles[0];

    setInterval(() => {
        roleIndex = (roleIndex + 1) % roles.length;

        roleText.style.opacity = "0";

        setTimeout(() => {
            roleText.textContent = roles[roleIndex];
            roleText.style.opacity = "1";
        }, 250);

    }, 3000);
}


/* ===============================
   5. CONTACT FORM / EMAILJS
================================ */

const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

/*
  Keep your existing EmailJS public key,
  service ID, and template ID.
*/

if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "b8-xYWyEjuRKcqDiv"
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (typeof emailjs === "undefined") {
            formStatus.textContent =
                "The contact service could not load. Please try again later.";

            formStatus.className = "error";
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        formStatus.textContent = "";
        formStatus.className = "";

        try {
            await emailjs.sendForm(
                "service_igfjg6o",
                "template_90br93k",
                contactForm
            );

            formStatus.textContent =
                "Thank you! Your message has been sent successfully.";

            formStatus.className = "success";

            contactForm.reset();

        } catch (error) {
            console.error("EmailJS error:", error);

            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";

            formStatus.className = "error";

        } finally {
            submitButton.disabled = false;

            submitButton.innerHTML =
                'Send Message <i class="fa-solid fa-paper-plane"></i>';
        }
    });
}


/* ===============================
   6. AUTOMATIC FOOTER YEAR
================================ */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
