/* 
   MOBILE MENU
 */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("#nav a");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    });
}


/* 
   NAVBAR SCROLL EFFECT
 */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 50) {
        header.style.background = "rgba(3, 3, 3, 0.95)";
        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.5)";
    } else {
        header.style.background =
            "rgba(3, 3, 3, 0.7)";
        header.style.boxShadow = "none";
    }
});


/* 
   TYPING EFFECT
 */

const typingText = document.getElementById("typing-text");

const roles = [
    "Software Developer",
    "Cybersecurity Enthusiast",
    "AI Explorer",
    "Student Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingText.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;
    } else {
        typingText.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (
        !isDeleting &&
        charIndex === currentRole.length
    ) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (
        isDeleting &&
        charIndex === 0
    ) {
        isDeleting = false;

        roleIndex =
            (roleIndex + 1) % roles.length;

        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

setTimeout(type, 1000);


/* 
   SCROLL REVEAL
 */

const revealElements =
    document.querySelectorAll(".reveal");

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);
                });

            },
            revealOptions
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("active");
    });
}


/* 
   ACTIVE NAVIGATION LINK
 */

const sections =
    document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        if (
            window.scrollY >=
            sectionTop - 200
        ) {
            current =
                section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href &&
            href.includes(current)
        ) {
            link.classList.add("active");
        }
    });
});


/* 
   BACK TO TOP
 */

const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}


/* 
   FOOTER COPYRIGHT YEAR
 */

const currentYear =
    document.getElementById("current-year");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


/* 
   PARTICLE BACKGROUND
 */

const canvas =
    document.getElementById("particles");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let particlesArray = [];

    const numberOfParticles =
        window.innerWidth < 768 ? 30 : 70;


    /* Set canvas size */

    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* 
       PARTICLE CLASS
     */

    class Particle {

        constructor() {

            this.x =
                Math.random() *
                canvas.width;

            this.y =
                Math.random() *
                canvas.height;

            this.size =
                Math.random() * 2 + 0.5;

            this.speedX =
                (Math.random() - 0.5) * 0.5;

            this.speedY =
                (Math.random() - 0.5) * 0.5;
        }


        update() {

            this.x += this.speedX;
            this.y += this.speedY;


            /* Bounce from horizontal edges */

            if (
                this.x < 0 ||
                this.x > canvas.width
            ) {
                this.speedX *= -1;
            }


            /* Bounce from vertical edges */

            if (
                this.y < 0 ||
                this.y > canvas.height
            ) {
                this.speedY *= -1;
            }
        }


        draw() {

            ctx.fillStyle =
                "rgba(59, 130, 246, 0.5)";

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    }


    /* 
       INITIALIZE PARTICLES
     */

    function initParticles() {

        particlesArray = [];

        for (
            let i = 0;
            i < numberOfParticles;
            i++
        ) {

            particlesArray.push(
                new Particle()
            );
        }
    }


    /* 
       ANIMATE PARTICLES
     */

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        for (
            let i = 0;
            i < particlesArray.length;
            i++
        ) {

            particlesArray[i].update();

            particlesArray[i].draw();


            /* Connect nearby particles */

            for (
                let j = i;
                j < particlesArray.length;
                j++
            ) {

                const dx =
                    particlesArray[i].x -
                    particlesArray[j].x;

                const dy =
                    particlesArray[i].y -
                    particlesArray[j].y;

                const distance =
                    dx * dx + dy * dy;


                if (distance < 12000) {

                    ctx.beginPath();

                    ctx.strokeStyle =
                        `rgba(
                            59,
                            130,
                            246,
                            ${0.15 - distance / 80000}
                        )`;

                    ctx.lineWidth = 0.5;

                    ctx.moveTo(
                        particlesArray[i].x,
                        particlesArray[i].y
                    );

                    ctx.lineTo(
                        particlesArray[j].x,
                        particlesArray[j].y
                    );

                    ctx.stroke();
                }
            }
        }


        requestAnimationFrame(
            animateParticles
        );
    }


    /* Start particles */

    initParticles();

    animateParticles();
}


/* 
   INITIALIZATION MESSAGE
 */

console.log(
    "Portfolio Template Initialized Successfully."
);
