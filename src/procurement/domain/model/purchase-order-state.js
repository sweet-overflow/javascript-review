import {ValidationError} from "../../../shared/domain/model/errors.js";

export class PurchaseOrderState {
    static #VALID_STATES = {
        DRAFT: 'Draft',
        SUBMITTED: 'Submitted',
        APPROVED: 'Approved',
        SHIPPED: 'Shipped',
        COMPLETED: 'Completed',
        CANCELLED: 'Cancelled'
    }

    constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT) {
        this.#validateState(value);
        this._value = value;
    }

    #validateState(state) {
        if (!Object.values(PurchaseOrderState.#VALID_STATES).includes(state))
            throw new ValidationError(
                `Invalid state: ${state}. Must be one of: ${Object.values(PurchaseOrderState.#VALID_STATES).join(', ')}`);
    }

    toSubmittedFrom(currentState) {
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.DRAFT)
            throw new ValidationError(`Cannot submit from state: ${currentState.value}. Must be Draft`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SUBMITTED);
    }

    toApprovedFrom(currentState) {
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.SUBMITTED)
            throw new ValidationError(`Cannot approve from state: ${currentState.value}. Must be Submitted`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.APPROVED);
    }

    toShippedFrom(currentState) {
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.APPROVED)
            throw new ValidationError(`Cannot ship from state: ${currentState.value}. Must be Approved`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SHIPPED);
    }

    toCompletedFrom(currentState) {
        if(currentState.value !== PurchaseOrderState.#VALID_STATES.SHIPPED)
            throw new ValidationError(`Cannot complete from state: ${currentState.value}. Must be Shipped`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.COMPLETED);
    }

    toCancelledFrom(currentState) {
        if(currentState.value === PurchaseOrderState.#VALID_STATES.COMPLETED)
            throw new ValidationError(`Purchase Order cannot be cancelled once completed`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.CANCELLED);
    }

    isDraft() {
        return this._value === PurchaseOrderState.#VALID_STATES.DRAFT;
    }

    get value() {
        return this._value;
    }

    equals(other) {
        return other instanceof PurchaseOrderState && this._value === other.value;
    }

}