export function addQuery(option: string, name: string){
    const oldSearch = window.location.search.slice(1,);
    const leftRegexp = new RegExp(`%E2%86%95${name}`);
    const rightRegexp = new RegExp(`${name}%E2%86%95`); 
    const moreThatString = oldSearch.split('&');

    if (oldSearch === '') window.location.search = `${option}=${name}`;
    else if (!oldSearch.includes(name)){
        if (oldSearch.replace(/=.*/,'') === option){
            if(!oldSearch.replace(/=/,'').includes('='))
                window.location.search = `${oldSearch}↕${name}`;
                else window.location.search = moreThatString[0] + '↕' + name + '&' + moreThatString[1];
        }
        else if(!oldSearch.includes(option)) window.location.search = `${oldSearch}&${option}=${name}`;
        else if (moreThatString[1].replace(/=.*/,'') === option) 
                    window.location.search = `${oldSearch}↕${name}`;
        else window.location.search = moreThatString[0] + '↕' + name + '&' + moreThatString[1];
        
    }
    else if (oldSearch.includes(`%E2%86%95${name}`)) window.location.search = oldSearch.replace(leftRegexp,'');
    else if (oldSearch.includes(`=${name}`) && oldSearch.includes('%E2%86%95')) 
        window.location.search = oldSearch.replace(rightRegexp,'');
    else window.location.search = '';
}
