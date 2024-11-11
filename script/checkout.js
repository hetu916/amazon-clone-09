import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formateCurrency } from "./utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOption } from "../data/deliveryOption.js";




const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));
function renderOrderSummary() {


    let cartSummaryHTML = '';
    cart.forEach((item) => {
        const productId = item.productId;
        let macthingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                macthingProduct = product;
            }
        });

        cartSummaryHTML +=

            `<div class="cart-item-container js-cart-item-${macthingProduct.id}">
            <div class="delivery-date">
                Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${macthingProduct.image}" />

                <div class="cart-item-details">
                    <div class="product-name limit-text-to-2-lines">
                    ${macthingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formateCurrency(macthingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link"data-product-id="${macthingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHTML(macthingProduct, item)}
                    
                </div>
            </div>

        </div>
`;
    });
    function deliveryOptionHTML(macthingProduct, item) {
        let html = '';

        deliveryOption.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format(
                'dddd,MMMM D'
            );
            const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${formateCurrency(deliveryOption.priceCents)}-`;
            const isChecked = deliveryOption.id === item.deliveryOptionId;

            html += ` <div class="delivery-option js-delivery-option"data-product-id="${macthingProduct.id}"data-delivery-option-id="${deliveryOption.id}">   
                        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input"
                            name="delivery-option-${macthingProduct.id}" />
                        <div>
                            <div class="delivery-option-date">
                             ${dateString}
                            </div>
                            <div class="delivery-option-price">
                            ${priceString} - Shipping
                            </div>
                        </div>
             </div>`;
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    document.querySelectorAll('.js-delete-link').
        forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                const container = document.querySelector(`.js-cart-item-${productId}`);
                container.remove();
            });
        });
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                randerPaymentSummery(); 
            });
        });
}
renderOrderSummary();