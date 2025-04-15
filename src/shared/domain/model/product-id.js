import {generateUuid, validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

/**
 * ProductId value object represents a unique identifier for a product.
 */
export class ProductId {
    /**
     * @constructor
     * Creates a new ProductId instance.
     * @param value {string} - The UUID string representing the product ID.
     * @throws {ValidationError} - If the provided value is not a valid UUID.
     */
    constructor(value) {
        if (!validateUuid(value))
            throw new ValidationError(`Invalid ProductId: ${value}. Must be a valid UUID.`);
        this._value = value;
    }

    /**
     * Creates a new ProductId instance containing a new UUID.
     * @returns {ProductId} - A new ProductId instance with a generated UUID.
     */
    static generate() { return new ProductId(generateUuid()); }

    /**
     * Retrieves the value of the ProductId.
     * @returns {string} - The UUID string representing the product ID.
     */
    get value() { return this._value; }

    /**
     * Compares this ProductId with another ProductId for equality.
     * @param other {ProductId} - The ProductId to compare with.
     * @returns {boolean} - True if the ProductIds are equal, false otherwise.
     */
    equals(other) { return other instanceof ProductId && this._value === other.value; }
}