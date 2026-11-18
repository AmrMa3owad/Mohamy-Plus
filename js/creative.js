(() => {
    const photos = document.querySelectorAll(".cx-about-photo");
    if (!photos.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) {
        photos.forEach((photo) => photo.classList.add("cx-is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll(".cx-about-photo").forEach((photo) => {
                photo.classList.add("cx-is-visible");
            });
            currentObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });

    document.querySelectorAll(".cx-about-visual").forEach((visual) => {
        visual.querySelectorAll(".cx-about-photo").forEach((photo) => {
            photo.classList.add("cx-reveal-armed");
        });
        observer.observe(visual);
    });
})();
