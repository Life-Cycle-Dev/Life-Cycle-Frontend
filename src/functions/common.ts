export function getLastSunday() {
    const today = new Date(); 
    const dayOfWeek = today.getDay(); 
    const daysSinceLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek; 
    const lastSunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysSinceLastSunday); 
    return lastSunday;
}

export function formatDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}