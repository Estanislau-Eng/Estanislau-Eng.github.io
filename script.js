document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    MENU MOBILE
    ==========================================
    */

    const nav = document.querySelector("nav");
    const navContent = document.querySelector(".nav-content");

    const menuButton = document.createElement("button");

    menuButton.className = "menu-button";
    menuButton.innerHTML = "☰";
    menuButton.setAttribute("aria-label", "Abrir menu");
    menuButton.setAttribute("aria-expanded", "false");

    navContent.appendChild(menuButton);

    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("mobile-menu");

        menuButton.innerHTML = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("mobile-menu");
            menuButton.innerHTML = "☰";
            menuButton.setAttribute("aria-label", "Abrir menu");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });


    /*
    ==========================================
    ANIMAÇÃO AO APARECER NO ECRÃ
    ==========================================
    */

    const animatedElements = document.querySelectorAll(
        ".section-title, .about-content, .project-card, .skills span, .contact-content, .profile-content"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    animatedElements.forEach(element => {
        element.classList.add("hidden");
        observer.observe(element);
    });


    /*
    ==========================================
    GALERIAS DOS PROJETOS
    ==========================================
    */

    const galleries = document.querySelectorAll(".project-gallery");

    galleries.forEach(gallery => {
        const mainImage = gallery.querySelector(".gallery-main-image");
        const tabs = [...gallery.querySelectorAll(".gallery-tab")];
        const prevButton = gallery.querySelector(".gallery-arrow.prev");
        const nextButton = gallery.querySelector(".gallery-arrow.next");

        let currentIndex = 0;

        function showImage(index) {
            currentIndex = (index + tabs.length) % tabs.length;

            const selectedTab = tabs[currentIndex];

            mainImage.style.opacity = "0";

            setTimeout(() => {
                mainImage.src = selectedTab.dataset.image;
                mainImage.alt = selectedTab.dataset.alt;
                mainImage.style.opacity = "1";
            }, 120);

            tabs.forEach((tab, i) => {
                tab.classList.toggle("active", i === currentIndex);
            });
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => showImage(index));
        });

        prevButton.addEventListener("click", () => showImage(currentIndex - 1));
        nextButton.addEventListener("click", () => showImage(currentIndex + 1));

        mainImage.addEventListener("click", () => {
            openLightbox(gallery, currentIndex);
        });
    });


    /*
    ==========================================
    LIGHTBOX
    ==========================================
    */

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const closeButton = document.querySelector(".lightbox-close");
    const lightboxPrev = document.querySelector(".lightbox-prev");
    const lightboxNext = document.querySelector(".lightbox-next");

    let activeGallery = null;
    let activeGalleryIndex = 0;

    function openLightbox(gallery, index) {
        activeGallery = gallery;
        activeGalleryIndex = index;

        updateLightbox();

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function updateLightbox() {
        if (!activeGallery) return;

        const tabs = [...activeGallery.querySelectorAll(".gallery-tab")];
        activeGalleryIndex = (activeGalleryIndex + tabs.length) % tabs.length;

        const selectedTab = tabs[activeGalleryIndex];

        lightboxImage.src = selectedTab.dataset.image;
        lightboxImage.alt = selectedTab.dataset.alt;
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        activeGallery = null;
    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxPrev.addEventListener("click", event => {
        event.stopPropagation();
        if (!activeGallery) return;
        activeGalleryIndex--;
        updateLightbox();
    });

    lightboxNext.addEventListener("click", event => {
        event.stopPropagation();
        if (!activeGallery) return;
        activeGalleryIndex++;
        updateLightbox();
    });

    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") closeLightbox();

        if (event.key === "ArrowLeft") {
            activeGalleryIndex--;
            updateLightbox();
        }

        if (event.key === "ArrowRight") {
            activeGalleryIndex++;
            updateLightbox();
        }
    });


    /*
    ==========================================
    ANO AUTOMÁTICO NO FOOTER
    ==========================================
    */

    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
