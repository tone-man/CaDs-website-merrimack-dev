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
export function emailToFirebase(email: String): String {
    return email.replace(/\./g, '%2E');

}

/**
 * Converts firebase email key back into an email.
 * @param firebaseStr to convert back into email
 * @returns string with all '|' replaced with '.'
 */
export function firebaseToEmail(firebaseStr: String): String {
    return firebaseStr.replace('%2E', '.');
}