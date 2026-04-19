/*  script.js — Gerold Portfolio*/


/* NAVBAR: scroll effect*/

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/*  MOBILE MENU: burger toggle*/

var burger   = document.getElementById('burger');
var navLinks = document.getElementById('navLinks');

burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

var navAnchors = navLinks.querySelectorAll('a');
navAnchors.forEach(function (link) {
    link.addEventListener('click', function () {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});


/*REVEAL ON SCROLL */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(function (el) {
    revealObserver.observe(el);
});


/*COUNTER ANIMATION (stats bar) */

var counters     = document.querySelectorAll('.count');
var statsBar     = document.querySelector('.stats-bar');
var hasAnimated  = false;

function animateCounter(el) {
    var target  = parseInt(el.getAttribute('data-target'), 10);
    var isBig   = target >= 100;
    var duration = isBig ? 2000 : 1500;
    var steps   = 60;
    var step    = Math.ceil(target / steps);
    var current = 0;
    var interval = duration / steps;

    var timer = setInterval(function () {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        if (isBig) {
            el.textContent = (current / 1000).toFixed(1);
        } else {
            el.textContent = current;
        }
    }, interval);
}

var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            counters.forEach(function (counter) {
                animateCounter(counter);
            });
        }
    });
}, {
    threshold: 0.5
});

if (statsBar) {
    statsObserver.observe(statsBar);
}


/*SKILL BAR ANIMATION*/

var skillBars = document.querySelectorAll('.skill-bar');

var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var bar   = entry.target;
            var width = bar.getAttribute('data-width');
            setTimeout(function () {
                bar.style.width = width + '%';
            }, 200);
            skillObserver.unobserve(bar);
        }
    });
}, {
    threshold: 0.3
});

skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
});


/*  SERVICES ACCORDION */

var serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(function (item) {
    item.addEventListener('click', function () {
        var isAlreadyActive = item.classList.contains('active');

        serviceItems.forEach(function (s) {
            s.classList.remove('active');
        });

        if (!isAlreadyActive) {
            item.classList.add('active');
        }
    });
});


/*  WORKS FILTER TABS */

var tabs      = document.querySelectorAll('.tab');
var workCards = document.querySelectorAll('.work-card');

tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {

        tabs.forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');

        var filter = tab.getAttribute('data-filter');

        workCards.forEach(function (card) {
            var cat = card.getAttribute('data-cat');

            if (filter === 'all' || cat === filter) {
                card.style.display = '';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';

                requestAnimationFrame(function () {
                    setTimeout(function () {
                        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        card.style.opacity    = '1';
                        card.style.transform  = 'scale(1)';
                    }, 10);
                });

            } else {
                card.style.display = 'none';
            }
        });
    });
});


/* TIMELINE STAGGER ANIMATION */

var timelineItems = document.querySelectorAll('.timeline-item');

var timelineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
                el.style.opacity   = '1';
                el.style.transform = 'translateX(0)';
            }, index * 110);
            timelineObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach(function (item) {
    item.style.opacity    = '0';
    item.style.transform  = 'translateX(-18px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease';
    timelineObserver.observe(item);
});


/*SKILL CARD STAGGER ANIMATION */

var skillCards = document.querySelectorAll('.skill-card');

var skillCardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            }, index * 80);
            skillCardObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.15
});

skillCards.forEach(function (card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(22px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    skillCardObserver.observe(card);
});


/*TESTIMONIAL CARD STAGGER ANIMATION */

var testiCards = document.querySelectorAll('.testi-card');

var testiObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            }, index * 120);
            testiObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.1
});

testiCards.forEach(function (card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(28px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    testiObserver.observe(card);
});


/* BLOG CARD STAGGER ANIMATION */

var blogCards = document.querySelectorAll('.blog-card');

var blogObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            }, index * 120);
            blogObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.1
});

blogCards.forEach(function (card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(28px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.35s ease, box-shadow 0.35s ease';
    blogObserver.observe(card);
});


/* ACTIVE NAV LINK ON SCROLL */

var sections    = document.querySelectorAll('section[id]');
var navAnchAll  = document.querySelectorAll('.nav-links a');

var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navAnchAll.forEach(function (a) {
                a.style.color = '';
                if (a.getAttribute('href') === '#' + id) {
                    a.style.color = 'var(--color-purple-light)';
                }
            });
        }
    });
}, {
    rootMargin: '-40% 0px -55% 0px'
});

sections.forEach(function (section) {
    sectionObserver.observe(section);
});


/*  PARALLAX HERO GLOW (desktop only) */

var heroGlows = document.querySelectorAll('.hero-glow');

document.addEventListener('mousemove', function (e) {
    if (window.innerWidth <= 768) {
        return;
    }
    var xFrac = e.clientX / window.innerWidth;
    var yFrac = e.clientY / window.innerHeight;

    heroGlows.forEach(function (glow, i) {
        var depth = i === 0 ? 22 : -16;
        var moveX = (xFrac - 0.5) * depth;
        var moveY = (yFrac - 0.5) * depth;
        glow.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
    });
});


/*  CONTACT FORM SUBMIT */

var contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showToast('Message sent successfully');
        contactForm.reset();
    });
}

function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) {
        return;
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 3500);
}


/*  PAGE LOAD FADE IN*/

window.addEventListener('load', function () {
    document.body.style.opacity    = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(function () {
        document.body.style.opacity = '1';
    });
});


const year = document.querySelector(".year");

function getYear(){
    let y = new Date().getFullYear();
    year.innerHTML = y;
}

getYear();