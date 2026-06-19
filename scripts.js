// Mbappé Dictator Comic - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    console.log('⚽ Mbappé Dictator Comic loaded!');
    
    // Add a fun easter egg - click the title
    const title = document.querySelector('header h1');
    if (title) {
        title.addEventListener('click', () => {
            const quotes = [
                '"I am the dictator of this pitch!"',
                '"Speed is my weapon!"',
                '"King of the game!"',
                '"Nobody stops me!"',
                '"MVP! MVP! MVP!"'
            ];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            alert(randomQuote);
        });
    }
    
    // Animate feature cards on scroll
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});