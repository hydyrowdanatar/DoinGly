export function checkIsAuth(){
    if(!window.location.pathname.includes('auth')){
        const token = window.localStorage.getItem('token');
        if(!token || typeof token === 'undefined' || token === null || token === ''){
            window.location.href = '/auth'
        }
    }
}