export function createFilterButtons(){
    const reset = document.querySelector('.button-reset');
    const copy = document.querySelector('.button-copy');

    reset?.addEventListener('click', () => {
        window.location.search = '';
    });
    copy?.addEventListener('click', () => {
        copy.textContent = 'Copied!';
        setTimeout((copy) => copy.textContent = 'Copy Link', 500, copy);
        navigator.clipboard.writeText(window.location.href);
    });
}