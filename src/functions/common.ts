export function getLastSunday() {
    const today = new Date(); 
    const dayOfWeek = today.getDay(); 
    const daysSinceLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek; 
    const lastSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceLastSunday); 
    return lastSunday;
}

export function formatDate(date:Date, prefix:string = '-') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if(prefix === '-') return `${year}-${month}-${day}`;
    else if(prefix === '/') return `${month}/${day}/${year}`;
}

export function getDateString(date:Date) {
    const monthList = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const month = monthList[date.getMonth()];
    const day = String(date.getDate());
    return `${day}${month}`;
}