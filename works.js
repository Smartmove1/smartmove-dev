/* ============================================================
   works.js
   Handles all interactivity on the Works / Portfolio page.
============================================================ */


/* 
   NAVBAR — scroll effect + burger menu
   (same logic as main site script.js)
 */

var navbar   = document.getElementById('navbar');
var burger   = document.getElementById('burger');
var navLinks = document.getElementById('navLinks');

/* Navbar scroll class */
window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* Burger toggle */
burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

/* Close menu on link click */
var allNavLinks = navLinks.querySelectorAll('a');
allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});


/* 
   DATA — collect all cards on page load
 */

var portfolioGrid = document.getElementById('portfolioGrid');
var allCards      = Array.from(portfolioGrid.querySelectorAll('.portfolio-card'));
var noResults     = document.getElementById('noResults');
var resultsText   = document.getElementById('resultsText');

/* Current state */
var activeFilter  = 'all';
var searchQuery   = '';


/* 
   RESULTS TEXT — update the "Showing X projects" line
 */

function updateResultsText(visibleCount, total) {
    if (searchQuery === '' && activeFilter === 'all') {
        resultsText.innerHTML = 'Showing <span>all ' + total + ' projects</span>';
    } else if (visibleCount === 0) {
        resultsText.innerHTML = '<span>0 projects</span> found';
    } else {
        resultsText.innerHTML = 'Showing <span>' + visibleCount + '</span> of ' + total + ' projects';
    }
}


/* 
   FILTER + SEARCH LOGIC
   Runs every time the filter tab or search input changes
    */

function applyFilters() {
    var visibleCount = 0;

    allCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        var title    = card.getAttribute('data-title').toLowerCase();

        /* Tags inside the card — also search within them */
        var tags = card.querySelectorAll('.tag');
        var tagText = '';
        tags.forEach(function (tag) {
            tagText += ' ' + tag.textContent.toLowerCase();
        });

        /* Also search in description */
        var descEl = card.querySelector('.card-desc');
        var desc   = descEl ? descEl.textContent.toLowerCase() : '';

        /* Check filter */
        var passesFilter = (activeFilter === 'all') || (category === activeFilter);

        /* Check search */
        var passesSearch = (searchQuery === '') ||
            title.includes(searchQuery) ||
            tagText.includes(searchQuery) ||
            desc.includes(searchQuery);

        if (passesFilter && passesSearch) {
            card.classList.remove('hidden');
            visibleCount++;

            /* Animate card in */
            card.style.opacity   = '0';
            card.style.transform = 'translateY(16px)';

            var delay = visibleCount * 50;
            setTimeout((function (c) {
                return function () {
                    c.style.transition = 'opacity 0.35s ease, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease';
                    c.style.opacity    = '1';
                    c.style.transform  = 'translateY(0)';
                };
            })(card), delay);

        } else {
            card.classList.add('hidden');
        }
    });

    /* Show / hide no-results message */
    if (visibleCount === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }

    updateResultsText(visibleCount, allCards.length);
}


/*FILTER TABS */

var filterTabs = document.querySelectorAll('.ftab');

filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) {
            t.classList.remove('active');
        });
        tab.classList.add('active');
        activeFilter = tab.getAttribute('data-filter');
        applyFilters();
    });
});


/* SEARCH INPUT */

var searchInput = document.getElementById('searchInput');
var clearBtn    = document.getElementById('clearBtn');

searchInput.addEventListener('input', function () {
    searchQuery = searchInput.value.trim().toLowerCase();

    /* Show / hide clear button */
    if (searchQuery.length > 0) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
    }

    applyFilters();
});

/* Clear button */
clearBtn.addEventListener('click', function () {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');
    searchInput.focus();
    applyFilters();
});


/* RESET BUTTON (inside no-results message)*/

var resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', function () {
    /* Reset search */
    searchInput.value = '';
    searchQuery = '';
    clearBtn.classList.remove('visible');

    /* Reset filter to all */
    activeFilter = 'all';
    filterTabs.forEach(function (t) {
        t.classList.remove('active');
    });
    document.querySelector('.ftab[data-filter="all"]').classList.add('active');

    applyFilters();
});


/* VIEW TOGGLE — grid vs list */

var gridViewBtn = document.getElementById('gridViewBtn');
var listViewBtn = document.getElementById('listViewBtn');

gridViewBtn.addEventListener('click', function () {
    portfolioGrid.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', function () {
    portfolioGrid.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});


/* CARD CLICK — clicking anywhere on card navigates to project */

allCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
        /* Do not fire if user clicks a specific link or button */
        var clickedLink = e.target.closest('a');
        if (clickedLink) {
            return;
        }

        /* Find the primary CTA link and navigate to it */
        var cta = card.querySelector('.card-cta');
        if (cta) {
            window.location.href = cta.getAttribute('href');
        }
    });
});


/* KEYBOARD SUPPORT — press Enter on search to confirm */

searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        clearBtn.classList.remove('visible');
        applyFilters();
        searchInput.blur();
    }
});


/*  INITIAL RUN — set results text on page load */

window.addEventListener('load', function () {
    updateResultsText(allCards.length, allCards.length);

    /* Stagger cards in on load */
    allCards.forEach(function (card, index) {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(24px)';
        setTimeout(function () {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.35s ease, box-shadow 0.35s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
        }, index * 80);
    });
});

const year = document.querySelector(".year");

function getYear(){
    let y = new Date().getFullYear();
    year.innerHTML = y;
}

getYear();