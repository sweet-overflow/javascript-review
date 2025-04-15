import {ValidationError} from "../../../shared/domain/model/errors.js";
import {ProductId} from "../../../shared/domain/model/product-id.js";
import {Money} from "../../../shared/domain/model/money.js";

/**
 * Represents an item in a purchase order aggregate.
 */
export class PurchaseOrderItem {
    /**
     * @constructor
     * Instantiate a PurchaseOrderItem object.
     * @param orderId {string} - The ID of the order.
     * @param productId {ProductId} - The ID of the product.
     * @param quantity {number} - The quantity of the product.
     * @param unitPrice {Money} - The unit price of the product.
     */
    constructor({ orderId, productId, quantity, unitPrice}) {
        if(!orderId || typeof orderId !== 'string')
            throw ValidationError('Order ID is required and must be a string');
        if(!(productId instanceof ProductId))
            throw ValidationError('Product ID is required and must be a ProductId instance');
        if(!Number.isInteger(quantity) || quantity <= 0 || quantity > 1000)
            throw ValidationError('Quantity must be an positive integer between 1 and 1000');
        if(!(unitPrice instanceof Money))
            throw ValidationError('Unit price is required and must be a Money instance');
        this._orderId = orderId;
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }

    /**
     * Retrieves the order ID.
     * @returns {ProductId} - The order ID.
     */
    get productId() { return this._productId; }

    /**
     * Retrieves the quantity of the product.
     * @returns {number} - The quantity of the product.
     */
    get quantity() { return this._quantity; }

    /**
     * Retrieves the unit price of the product.
     * @returns {Money} - The unit price of the product.
     */
    get unitPrice() { return this._unitPrice; }

    /**
     * Calculates the subtotal for this item by multiplying the unit price by the quantity.
     * @returns {Money} - The subtotal for this item.
     */
    calculateSubtotal() {
        return this._unitPrice.multiply(this._quantity);
    }
}