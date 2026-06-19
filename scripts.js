// ═══════════════════════════════════════════════
// EL PRESIDENTE — Mbappé Dictator Comic Website
// Interactive Scripts
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded',function(){

    'use strict';

    // ────────────────── SCROLL ANIMATIONS ──────────────────
    const fadeElements = document.querySelectorAll('.fade-scroll');

    function checkVisibility(){
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;

        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < triggerPoint){
                el.classList.add('visible');
            }
        });
    }

    // Check on load
    checkVisibility();

    // Check on scroll with requestAnimationFrame throttle
    let ticking = false;
    window.addEventListener('scroll',function(){
        if(!ticking){
            window.requestAnimationFrame(function(){
                checkVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('resize',checkVisibility);

    // ────────────────── SCROLL INDICATOR ──────────────────
    const scrollIndicator = document.getElementById('scrollIndicator');
    if(scrollIndicator){
        scrollIndicator.addEventListener('click',function(){
            const comicsSection = document.getElementById('comics');
            if(comicsSection){
                comicsSection.scrollIntoView({behavior:'smooth'});
            }
        });

        // Hide indicator after scrolling past hero
        window.addEventListener('scroll',function(){
            const scrollY = window.scrollY;
            const heroHeight = document.getElementById('hero').offsetHeight;
            if(scrollY > heroHeight * 0.7){
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // ────────────────── PARALLAX HEADER EFFECT ──────────────────
    const hero = document.getElementById('hero');
    const portrait = document.getElementById('portrait');

    if(hero && portrait){
        window.addEventListener('scroll',function(){
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if(scrollY <= heroHeight){
                const progress = scrollY / heroHeight;
                // Subtle parallax shift on portrait
                portrait.style.transform = `translateY(${progress * 30}px) scale(${1 - progress * 0.1})`;
                portrait.style.opacity = 1 - progress * 0.5;
            }
        });
    }

    // ────────────────── COMIC PANELS ENTRANCE ──────────────────
    const panels = document.querySelectorAll('.comic-panel');
    panels.forEach((panel, index) => {
        panel.style.setProperty('--panel-index', index);
    });

    // ────────────────── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e){
            const href = this.getAttribute('href');
            if(href !== '#'){
                e.preventDefault();
                const target = document.querySelector(href);
                if(target){
                    target.scrollIntoView({behavior:'smooth'});
                }
            }
        });
    });

    // ────────────────── DYNAMIC YEAR IN FOOTER ──────────────────
    const creditEl = document.querySelector('.footer-credit');
    if(creditEl && !creditEl.textContent.includes('202')){
        const year = new Date().getFullYear();
        creditEl.textContent += ` — ${year}`;
    }

    // ────────────────── IMAGE ERROR HANDLER ──────────────────
    // Apply fallback to any images that fail to load
    document.querySelectorAll('.panel-img img').forEach(img => {
        img.addEventListener('error', function(){
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:4rem;
                color:#DAA520;
            `;
            // Pick emoji based on panel context
            const parent = this.closest('.comic-panel');
            if(parent){
                const badge = parent.querySelector('.panel-badge');
                const badgeText = badge ? badge.textContent.trim().toLowerCase() : '';
                if(badgeText.includes('kebab')) fallback.textContent = '🥙';
                else if(badgeText.includes('bebé')) fallback.textContent = '🍼';
                else if(badgeText.includes('control')) fallback.textContent = '⚽';
                else if(badgeText.includes('throne') || badgeText.includes('legendary')) fallback.textContent = '👑';
                else if(badgeText.includes('fist') || badgeText.includes('stare')) fallback.textContent = '😤';
                else fallback.textContent = '⭐';
            } else {
                fallback.textContent = '⭐';
            }
            this.parentElement.appendChild(fallback);
        });
    });

    // ────────────────── KEYBOARD NAVIGATION ──────────────────
    // Press 'M' to scroll to comics, 'L' to scroll to lore
    document.addEventListener('keydown', function(e){
        if(e.key === 'm' || e.key === 'M'){
            document.getElementById('comics')?.scrollIntoView({behavior:'smooth'});
        }
        if(e.key === 'l' || e.key === 'L'){
            document.getElementById('lore')?.scrollIntoView({behavior:'smooth'});
        }
        if(e.key === 't' || e.key === 'T'){
            window.scrollTo({top:0,behavior:'smooth'});
        }
    });

    // ────────────────── CONSOLE EASTER EGG ──────────────────
    console.log('%c ⭐ EL PRESIDENTE ⭐ ', 'font-size:24px; font-weight:bold; color:#DAA520; text-shadow:2px 2px 0 #8B0000;');
    console.log('%c The pitch is my state. The goal is my law.', 'font-size:14px; font-style:italic; color:#DAA520;');
    console.log('%c Press M → Comics | L → Lore | T → Top', 'font-size:12px; color:#888;');

});