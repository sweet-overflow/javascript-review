import {ValidationError} from "./errors.js";

/**
 * Represents a currency value object.
 */
export class Currency {
    static #VALID_CODES = ["USD", "EUR", "PEN", "JPY"];

    /**
     * Creates a new Currency instance.
     * @param code {string} The currency code.
     */
    constructor(code) {
        if (!Currency.#VALID_CODES.includes(code))
            throw new ValidationError(`Invalid currency code: ${code}. Valid codes are: ${Currency.#VALID_CODES.join(", ")}`);
        this._code = code;
    }

    /**
     * Returns the currency code.
     * @returns {string} The currency code.
     */
    get code() { return this._code;}

    /**
     * Compares this currency with another currency.
     * @param other {Currency} The other currency to compare with.
     * @returns {boolean} True if the currencies are equal, false otherwise.
     */
    equals(other) {
        return other instanceof Currency && this._code === other.code;
    }
}