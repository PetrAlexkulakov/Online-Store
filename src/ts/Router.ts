export function addQuery(option: string, name: string | boolean){
    const oldSearch = window.location.search.slice(1,);
    const oldSearchArray = oldSearch.split('&');
    const ourFilter = oldSearchArray.find(item => item.includes(option));

    if (oldSearch === '') window.location.search = `${option}=${name}`;
    else if (ourFilter === undefined) window.location.search = `${oldSearch}&${option}=${name}`;
    else if (name === ''){
        const reg = new RegExp(`${option}=.`);
        window.location.search = oldSearch.replace(reg,'');
    }
    else if (typeof(name) === 'string' && option !== 'sort' && option !== 'search'){
        if (ourFilter.includes(String(name))){ 
            if (ourFilter.includes(`%E2%86%95${name}`))
                window.location.search = oldSearch.replace(`%E2%86%95${name}`, '');
            else {
                if(!ourFilter.includes(`${name}%E2%86%95`)){
                    oldSearchArray.splice(oldSearchArray.indexOf(ourFilter),1);
                    window.location.search = oldSearchArray.join('&');
                }else {
                    oldSearchArray[oldSearchArray.indexOf(ourFilter)] = 
                    oldSearchArray[oldSearchArray.indexOf(ourFilter)].replace(`${name}%E2%86%95`, '');
                    window.location.search = oldSearchArray.join('&');
                }
            }
        }
        else { 
            oldSearchArray[oldSearchArray.indexOf(ourFilter)] += `%E2%86%95${name}`;
            window.location.search = oldSearchArray.join('&');
        }
    }else{
        oldSearchArray[oldSearchArray.indexOf(ourFilter)] = `${option}=${name}`;
        window.location.search = oldSearchArray.join('&');
    }
}