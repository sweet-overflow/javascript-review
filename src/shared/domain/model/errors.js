/**
 * Custom error class for handling validation errors.
 */
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

// Place here any other custom error classes you may need
