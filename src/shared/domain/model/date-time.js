import {ValidationError} from "./errors.js";

/**
 * DateTime value object
 */
export class DateTime {
    /**
     * @constructor
     * Instantiate a DateTime object
     * @param date {Date|String|Number} - Initial date value, current date if not provided
     */
    constructor(date = new Date()) {
        const parsedDate = date instanceof Date
            ? date
            : new Date(date);
        if(isNaN(parsedDate.getTime()))
            throw new ValidationError(`Invalid date: ${date}`);
        this._date = parsedDate;
    }

    /**
     * Get the date value
     * @returns {Date} - The date value
     */
    get date() { return this._date; }

    /**
     * Get the date value in ISO format
     * @returns {string} - The date value in ISO format
     */
    toISOString() {
        return this._date.toISOString();
    }

    /**
     * Get the date value in a human-readable format
     * @returns {string} - The date value in a human-readable format
     */
    toString() {
        return this._date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute:'2-digit',
            hour12: true
        });
    }

    /**
     * Compare two DateTime objects
     * @param other {DateTime} - The other DateTime object to compare
     * @returns {boolean} - True if the two DateTime objects are equal, false otherwise
     */
    equals(other) {
        return other instanceof DateTime &&
            this._date.getTime() === other.date.getTime();
    }

}