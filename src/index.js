import {Currency} from "./shared/domain/model/currency.js";
import {PurchaseOrder} from "./procurement/domain/model/purchase-order.js";
import {SupplierId} from "./shared/domain/model/supplier-id.js";
import {DateTime} from "./shared/domain/model/date-time.js";
import {ProductId} from "./shared/domain/model/product-id.js";
import {Supplier} from "./scm/domain/model/supplier.js";

console.log('Happy developing ✨')
try {
    const supplier = new Supplier({
        id: SupplierId.generate(),
        name: 'Acme Corp',
        contactEmail: 'contact@acme.com'
    });
    const purchaseOrder = new PurchaseOrder({
        supplierId: supplier.id,
        currency: new Currency('USD'),
        orderDate: new DateTime(new Date('2025-04-10T10:00:00Z'))
    });
    purchaseOrder.addItem({
        productId: ProductId.generate(),
        quantity: 5,
        unitPriceAmount: 45.99
    });
    const totalPrice = purchaseOrder.calculateTotalPrice();
    console.log(`Purchase Order ID: ${purchaseOrder.id}`);
    console.log(`Supplier: ${supplier.name}`);
    console.log(`Total price: ${totalPrice}`);
} catch (error) {
    console.error('An error occurred:', error);
}
