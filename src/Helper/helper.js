export const RemoveSpecialChars = (str) => {
    return str.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().trim().replace(/\s+/g, '');
}