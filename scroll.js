const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const scrollElements = document.querySelectorAll('.scroll');
scrollElements.forEach((el) => {observer.observe(el)});