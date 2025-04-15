import {SupplierId} from "../../../shared/domain/model/supplier-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";

/**
 * Supplier aggregate root for the SCM bounded context.
 */
export class Supplier {
    /**
     * @constructor
     * Instantiate a new Supplier.
     * @param id {SupplierId} The supplier id. Must be an instance of SupplierId.
     * @param name {string} The supplier name. Must be a string between 2 and 100 characters.
     * @param contactEmail {string|null} The supplier contact email. Must be a valid email address or null.
     * @param lastOrderTotalPrice {Money|null} The supplier last order total price. Must be an instance of Money or null.
     */
    constructor({ id, name, contactEmail = null, lastOrderTotalPrice =  null }) {
        if(!(id instanceof SupplierId))
            throw new ValidationError(`Supplier id must be an instance of SupplierId`);
        if(!name || typeof name !== 'string' || name.length < 2 || name.length > 100)
            throw new ValidationError(`Supplier name must be a string between 2 and 100 characters`);
        if(contactEmail !== null && !(this.#isValidEmail(contactEmail)))
            throw new ValidationError(`Contact email must be a valid email address or null`);
        if(lastOrderTotalPrice !== null && !(lastOrderTotalPrice instanceof Money))
            throw new ValidationError(`Last order total price must be an instance of Money or null`);
        this._id = id;
        this._name = name;
        this._contactEmail = contactEmail;
        this._lastOrderTotalPrice = lastOrderTotalPrice;
    }

    /**
     * Validate the supplier contact email.
     * @param email {string} The email to validate.
     * @returns {boolean} True if the email is valid, false otherwise.
     */
    #isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Get the supplier id.
     * @returns {SupplierId} The supplier id.
     */
    get id() { return this._id; }

    /**
     * Get the supplier name.
     * @returns {string} The supplier name.
     */

    get name() { return this._name; }
    /**
     * Get the supplier contact email.
     * @returns {string|null} The supplier contact email.
     */
    get contactEmail() { return this._contactEmail; }

    /**
     * Get the supplier last order total price.
     * @returns {Money|null} The supplier last order total price.
     */
    get lastOrderTotalPrice() { return this._lastOrderTotalPrice; }
}