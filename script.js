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

    navContent.appendChild(menuButton);

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("mobile-menu");

        menuButton.innerHTML = nav.classList.contains("mobile-menu")
            ? "✕"
            : "☰";
    });


    /*
    ==========================================
    FECHAR MENU AO CLICAR NUM LINK
    ==========================================
    */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("mobile-menu");
            menuButton.innerHTML = "☰";
        });
    });


    /*
    ==========================================
    ANIMAÇÃO AO APARECER NO ECRÃ
    ==========================================
    */

    const animatedElements = document.querySelectorAll(
        ".section-title, .about-content, .project-card, .skills span, .contact-content"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(element => {
        element.classList.add("hidden");
        observer.observe(element);
    });


    /*
    ==========================================
    ANO AUTOMÁTICO NO FOOTER
    ==========================================
    */

    const footer = document.querySelector("footer");

    if (footer) {
        footer.innerHTML = `
            <p>
                © ${new Date().getFullYear()} Estanislau Cuandoneque.
                Desenvolvido com código e propósito.
            </p>
        `;
    }

});
