export function createFilterButtons(){
    const reset = document.querySelector('.button-reset');
    const copy = document.querySelector('.button-copy');

    reset?.addEventListener('click', () => {
        window.location.search = '';
    });
    copy?.addEventListener('click', () => {
        copy.textContent = 'Copied!';
        setTimeout((copy) => copy.textContent = 'Copy Link', 500, copy);
        _copyToClipboard(window.location.href);
    });
}
function _copyToClipboard(str: string) {
    const area = document.createElement('textarea');
  
    document.body.appendChild(area);  
      area.value = str;
      area.select();
      document.execCommand("copy");
    document.body.removeChild(area);  
  }