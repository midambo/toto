import * as Commerce from "commerce-kit";

// Initialize commerce-kit with a mock provider for development
export const commerce = Commerce.provider({
    type: "mock",
    data: {
        products: [
            {
                id: "mock_product_1",
                name: "Mock Product 1",
                description: "A mock product for development",
                price: 1999,
                currency: "USD",
                images: [],
                metadata: {},
            }
        ],
        orders: [],
        carts: [],
        account: {
            id: "mock_account",
            name: "Mock Store",
            description: "A mock store for development",
            logo: null,
            metadata: {},
        },
        shippingRates: [
            {
                id: "mock_shipping_1",
                name: "Standard Shipping",
                amount: 499,
                currency: "USD",
                delivery_estimate: {
                    minimum: {
                        unit: "business_day",
                        value: 3,
                    },
                    maximum: {
                        unit: "business_day",
                        value: 5,
                    },
                },
            }
        ],
    },
    config: {
        mock: {
            disablePaymentProviders: true,
            disableStripe: true,
            disableShipping: false,
            disableTax: true,
            mockCart: {
                cart: {
                    id: "mock_cart",
                    currency: "USD",
                    subtotal: 0,
                    total: 0,
                    lines: [],
                },
                cartCreate: () => ({
                    id: "mock_cart",
                    currency: "USD",
                    subtotal: 0,
                    total: 0,
                    lines: [],
                }),
                cartRetrieve: () => ({
                    id: "mock_cart",
                    currency: "USD",
                    subtotal: 0,
                    total: 0,
                    lines: [],
                }),
            }
        }
    }
});
