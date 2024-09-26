export function formatDate(param: string): string {
    const date: Date = new Date(param);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = { 
        month: 'long', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true 
    };
    
    // Format the date to the desired string
    return date.toLocaleString('en-US', options);
}