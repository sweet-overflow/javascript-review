import {SupplierId} from "../../../shared/domain/model/supplier-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Currency} from "../../../shared/domain/model/currency.js";
import {generateUuid} from "../../../shared/domain/model/uuid.js";
import {DateTime} from "../../../shared/domain/model/date-time.js";
import {PurchaseOrderState} from "./purchase-order-state.js";
import {Money} from "../../../shared/domain/model/money.js";

/**
 * Represents a purchase order aggregate root in the procurement bounded context.
 */
export class PurchaseOrder {
    /**
     * The maximum number of items allowed in a purchase order.
     * @type {number}
     * @private
     */
    #MAX_ITEMS = 50;

    /**
     * @constructor
     * Instantiates a new PurchaseOrder object.
     * @param supplierId {SupplierId} - The ID of the supplier associated with the purchase order.
     * @param currency {Currency} - The currency of the purchase order.
     * @param orderDate {DateTime} - The date of the order. Defaults to the current date and time.
     */
    constructor({ supplierId, currency, orderDate}) {
        if(!(supplierId instanceof SupplierId))
            throw new ValidationError('Supplier ID is required and must be an instance of SupplierId');
        if(!(currency instanceof Currency))
            throw new ValidationError('Currency is required and must be an instance of Currency');
        this._id = generateUuid();
        this._supplierId = supplierId;
        this._currency = currency;
        this._orderDate = orderDate instanceof DateTime ? orderDate : new DateTime();
        this._items = [];
        this._state = new PurchaseOrderState();
    }

    /**
     * Adds an item to the purchase order.
     * @param productId {ProductId} - The ID of the product to be added.
     * @param quantity {number} - The quantity of the product.
     * @param unitPriceAmount {number} - The unit price amount of the product.
     */
    addItem({ productId, quantity, unitPriceAmount }) {
        if(!this._state.isDraft())
            throw new ValidationError('Cannot add items to a purchase order that is not in draft state');
        if(this._items.length >= this.#MAX_ITEMS)
            throw new ValidationError(`Cannot add more than ${this.#MAX_ITEMS} items to a purchase order`);
        if(!Number.isFinite(unitPriceAmount) || unitPriceAmount < 0)
            throw new ValidationError('Unit price amount must be a non-negative number');
        this._items.push({
            orderId: this._id,
            productId,
            quantity,
            unitPrice: new Money({amount: unitPriceAmount, currency: this._currency}),
        });
    }

    /**
     * Calculates the total price of the purchase order.
     * @returns {Money} - The total price of the purchase order.
     */
    calculateTotalPrice() {
        if(this._items.length === 0)
            throw new ValidationError('No items in the purchase order to calculate total price');
        return this._items.reduce((total, item) => {
            return total.add(item.calculateSubtotal());
        }, new Money({amount: 0, currency: this._currency}));
    }

    /**
     * Submits the purchase order for approval.
     */
    submit() {
        this._state = this._state.toSubmittedFrom(this._state);
    }

    /**
     * Approves the purchase order.
     */
    approve() {
        this._state = this._state.toApprovedFrom(this._state);
    }

    /**
     * Ships the purchase order.
     */
    ship() {
        this._state = this._state.toShippedFrom(this._state);
    }

    /**
     * Completes the purchase order.
     */
    complete() {
        this._state = this._state.toCompletedFrom(this._state);
    }

    /**
     * Cancels the purchase order.
     */
    cancel() {
        this._state = this._state.toCancelledFrom(this._state);
    }

    /**
     * Retrieves the purchase order ID.
     * @returns {string|Uint8Array} - The ID of the purchase order.
     */
    get id() { return this._id; }

    /**
     * Retrieves the supplier ID.
     * @returns {SupplierId} - The ID of the supplier associated with the purchase order.
     */
    get supplierId() { return this._supplierId; }
    /**
     * Retrieves the currency.
     * @returns {Currency} The currency of the purchase order.
     */
    get currency() { return this._currency; }
    /**
     * Retrieves the order date.
     * @returns {DateTime} - The date of the order.
     */
    get orderDate() { return this._orderDate; }
    /**
     * Retrieves the items in the purchase order.
     * @returns {Array} - The items in the purchase order.
     */
    get items() { return this._items; }
    /**
     * Retrieves the state of the purchase order.
     * @returns {PurchaseOrderState} - The state of the purchase order.
     */
    get state() { return this._state; }
}