import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

/**
 * Generate a UUID (Universally Unique Identifier).
 * @returns {string | Uint8Array} A UUID string.
 */
export function generateUuid() {
    return uuidv4();
}

/**
 * Validate a UUID (Universally Unique Identifier).
 * @param value {string} The UUID string to validate.
 * @returns {boolean} True if the UUID is valid, false otherwise.
 */
export function validateUuid(value) {
    return uuidValidate(value);
}