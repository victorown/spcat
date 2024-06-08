tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
            }
        },
    }
}

const reloadButton = document.querySelector('.btn-reload');

reloadButton.addEventListener('click', () => {
    reloadButton.classList.add('animate-spin');
    setTimeout(() => {
        window.location.reload();
    }, 1000); 
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.animate-slide-up-delay');
    elements.forEach(element => {
        element.classList.add('animate-slide-up');
    });
});