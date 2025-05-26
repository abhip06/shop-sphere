export function capitalizeFirstLetter(title: string) {
    return title.charAt(0).toUpperCase() + title.slice(1)
}

export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    }).format(price);
}

export function formatDate(date: string | Date) {
    // If the input is a string, convert it to a Date object
    const dateObject = typeof date === "string" ? new Date(date) : date;

    const createdAtLocal = dateObject.toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Calcutta",
    });

    return createdAtLocal;
}

export function formatDateTime(date: string | Date) {
    // const createdAtUTC = new Date(date + " UTC");
    // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateObject = typeof date === "string" ? new Date(date) : date;

    const createdAtLocal = dateObject.toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Calcutta",
    });

    return createdAtLocal;
}

// Function to generate username from the users email id
export const generateUsername = (email: string) => {
    let randomCharaters: string = "";
    const stringLength: number = 4;
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < stringLength; i++) {
        randomCharaters += charset.charAt(Math.floor(Math.random() * charset.length + 1));
    }

    const username: string = email.split('@')[0] + "_" + randomCharaters;

    return username;
}

export const generateId = () => {
    let ID: string = "";
    const stringLength: number = 20;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < stringLength; i++) {
        ID += charset.charAt(Math.floor(Math.random() * charset.length + 1));
    }

    return ID;
}