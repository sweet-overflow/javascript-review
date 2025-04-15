import {ValidationError} from "./errors.js";
import {Currency} from "./currency.js";

/**
 * Represents a monetary value with a specific currency.
 */
export class Money {

    /**
     * Creates a new Money instance.
     * @param amount {number} - The amount of money.
     * @param currency {Currency} - The currency of the money.
     */
    constructor({ amount, currency }) {
        if (!Number.isFinite(amount) || amount <0)
            throw new ValidationError("Amount must be a non-negative number");
        if (!(currency instanceof Currency))
            throw new ValidationError("Currency must be an instance of Currency");
        this._amount = Number(amount.toFixed(2));
        this._currency = currency;
    }

    /**
     * Getters for amount and currency.
     * @returns {number} - The amount of money.
     */
    get amount() { return this._amount; }

    /**
     * Getters for currency.
     * @returns {Currency} - The currency of the money.
     */
    get currency() { return this._currency; }

    /**
     * Adds another Money instance to this instance.
     * @param other {Money} - The other Money instance to add.
     * @returns {Money} - A new Money instance with the sum of the amounts.
     */
    add(other) {
        if (!(other instanceof Money) || !this._currency.equals(other.currency))
            throw new ValidationError("Cannot add money of different currencies");
        return new Money({ amount: this._amount + other.amount, currency: this._currency});
    }

    /**
     * Multiplies the amount of money by a given multiplier.
     * @param multiplier {number} - The multiplier to apply.
     * @returns {Money} - A new Money instance with the multiplied amount.
     */
    multiply(multiplier) {
        if (!Number.isFinite(multiplier) || multiplier < 0)
            throw new ValidationError("Multiplier must be a non-negative number");
        return new Money({ amount: this._amount * multiplier, currency: this._currency });
    }

    /**
     * Transforms the money into a human-readable string format.
     * @returns {string} - The string representation of the money.
     */
    toString() {
        return `${this._currency.code}${this._amount.toFixed(2)}`;
    }

    /**
     * Compares this Money instance with another for equality.
     * @param other {Money} - The other Money instance to compare.
     * @returns {boolean} - True if the instances are equal, false otherwise.
     */
    equals(other) {
        return other instanceof Money &&
            this._amount === other.amount && this._currency.equals(other.currency);
    }
}