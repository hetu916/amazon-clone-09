import { cart } from '../../data/cart.js';

function renderOrderSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((item) => {
        const product = getproduct(item.productId);
        productPriceCents += product.priceCents * item.quantity;
        const deliveryOption = getDeliveryOption(item.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;
    const paymentSummaryHTML =``;
}