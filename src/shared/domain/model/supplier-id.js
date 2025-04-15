import {generateUuid, validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

/**
 * SupplierId value object to represent a unique identifier for suppliers.
 */
export class SupplierId {
    /**
     * @constructor
     * Instantiate a new SupplierId.
     * @param value {string} - The UUID value of the supplier id. Must be a valid UUID.
     */
    constructor(value) {
        if (!validateUuid(value))
            throw new ValidationError(`Invalid supplier id: ${value}. Must be a valid UUID.`);
        this._value = value;
    }

    /**
     * Generate a new SupplierId containing a new UUID.
     * @returns {SupplierId} - A new SupplierId instance with a generated UUID.
     */
    static generate() { return new SupplierId(generateUuid()); }

    /**
     * Get the value of the SupplierId.
     * @returns {string} - The UUID value of the supplier id.
     */
    get value() { return this._value; }

    /**
     * Check if the current SupplierId is equal to another SupplierId.
     * @param other {SupplierId} - The other SupplierId to compare with.
     * @returns {boolean} - True if the SupplierIds are equal, false otherwise.
     */
    equals(other) {
        return other instanceof SupplierId && this._value === other.value;
    }
}