document.addEventListener('DOMContentLoaded', () => {
    const jokeElement = document.getElementById('jokeElement');
    const toggleDarkModeButton = document.querySelector('.toggle-dark-mode');
    const copyJokeButton = document.querySelector('.copy-joke');
    const shareTwitterButton = document.querySelector('.share-twitter');

    // Fetch joke
    fetch('https://icanhazdadjoke.com/slack')
        .then(data => data.json())
        .then(jokeData => {
            const jokeText = jokeData.attachments[0].text;
            jokeElement.innerHTML = jokeText;
        });

    // Check and apply the saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    // Toggle dark mode
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });

    // Copy joke to clipboard
    copyJokeButton.addEventListener('click', () => {
        const jokeText = jokeElement.innerText;
        navigator.clipboard.writeText(jokeText).then(() => {
            alert('Joke copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy joke: ', err);
        });
    });

    // Share joke on Twitter
    shareTwitterButton.addEventListener('click', () => {
        const jokeText = jokeElement.innerText;
        const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(jokeText)}`;
        window.open(twitterUrl, '_blank');
    });
});