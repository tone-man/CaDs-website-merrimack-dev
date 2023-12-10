/**
 * This file provides helpers to convert emails into storable form for the realtime database, and vice versa.
 * 
 * @author Antonio Craveiro (tone-man)
 */

/**
 * Converts email into something firebase can store as a key
 * @param email to convert to firebase format
 * @returns string with all '.' replaced with '|'
 */
export function emailToFirebase(email: string): string {
    return email.replace(/\./g, '%2E');
}

/**
 * Converts firebase email key back into an email.
 * @param firebaseStr to convert back into email
 * @returns string with all '|' replaced with '.'
 */
export function firebaseToEmail(firebaseStr: string): string {
    return firebaseStr.replace('%2E', '.');
}

