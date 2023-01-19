export function addQuery(option: string, name: string | boolean){
    const oldSearch = window.location.search.slice(1,);
    const oldSearchArray = oldSearch.split('&');
    const ourFilter = oldSearchArray.find(item => item.includes(option));
    const SEPARATOR = '%E2%86%95';

    if (oldSearch === '') window.location.search = `${option}=${name}`;
    else if (ourFilter === undefined) window.location.search = `${oldSearch}&${option}=${name}`;
    else if (name === ''){
        const reg = new RegExp(`${option}=.`);
        window.location.search = oldSearch.replace(reg,'');
    }
    else if (typeof(name) === 'string' && option !== 'sort' && option !== 'search' && option !== 'price' && option !== 'stock'){
        if (ourFilter.includes(String(name))){ 
            if (ourFilter.includes(`${SEPARATOR}${name}`))
                window.location.search = oldSearch.replace(`${SEPARATOR}${name}`, '');
            else {
                if(!ourFilter.includes(`${name}${SEPARATOR}`)){
                    oldSearchArray.splice(oldSearchArray.indexOf(ourFilter),1);
                    window.location.search = oldSearchArray.join('&');
                }else {
                    oldSearchArray[oldSearchArray.indexOf(ourFilter)] = 
                    oldSearchArray[oldSearchArray.indexOf(ourFilter)].replace(`${name}${SEPARATOR}`, '');
                    window.location.search = oldSearchArray.join('&');
                }
            }
        }
        else { 
            oldSearchArray[oldSearchArray.indexOf(ourFilter)] += `${SEPARATOR}${name}`;
            window.location.search = oldSearchArray.join('&');
        }
    }else{
        oldSearchArray[oldSearchArray.indexOf(ourFilter)] = `${option}=${name}`;
        window.location.search = oldSearchArray.join('&');
    }
}