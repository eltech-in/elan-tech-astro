export interface Integration {
  id: string;
  name: string;
  category: 'Shipping & Logistics' | 'Payment Gateways' | 'eCommerce & ERP';
  description: string;
  icon: string; // Lucide icon name or can be replaced with custom SVGs
}

export const integrations: Integration[] = [
  // Shipping & Logistics
  {
    id: 'delhivery',
    name: 'Delhivery',
    category: 'Shipping & Logistics',
    description: 'Leading logistics provider in India for end-to-end supply chain solutions.',
    icon: 'Package',
  },
  {
    id: 'fedex',
    name: 'FedEx',
    category: 'Shipping & Logistics',
    description: 'Global delivery services with comprehensive tracking and API integration.',
    icon: 'Truck',
  },
  {
    id: 'dhl',
    name: 'DHL',
    category: 'Shipping & Logistics',
    description: 'International shipping, courier delivery and express mail services.',
    icon: 'Globe',
  },
  {
    id: 'bluedart',
    name: 'Blue Dart',
    category: 'Shipping & Logistics',
    description: 'Premium express delivery services across India and internationally.',
    icon: 'Plane',
  },
  {
    id: 'shiprocket',
    name: 'Shiprocket',
    category: 'Shipping & Logistics',
    description: 'E-commerce shipping platform aggregating multiple courier partners.',
    icon: 'Rocket',
  },
  {
    id: 'xpressbees',
    name: 'Xpressbees',
    category: 'Shipping & Logistics',
    description: 'B2B, B2C, and cross-border logistics solutions with robust APIs.',
    icon: 'Box',
  },
  {
    id: 'aramex',
    name: 'Aramex',
    category: 'Shipping & Logistics',
    description: 'Multinational logistics, courier and package delivery company.',
    icon: 'MapPin',
  },

  // Payment Gateways
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'Payment Gateways',
    description: 'Comprehensive Indian payment solution with UPI, cards, and net banking.',
    icon: 'CreditCard',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payment Gateways',
    description: 'Global payment processing infrastructure for the internet.',
    icon: 'CreditCard',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payment Gateways',
    description: 'Worldwide online payments system serving as an electronic alternative to traditional paper methods.',
    icon: 'Wallet',
  },
  {
    id: 'payu',
    name: 'PayU',
    category: 'Payment Gateways',
    description: 'Regulated online payment service provider for emerging markets.',
    icon: 'Banknote',
  },
  {
    id: 'paytm',
    name: 'Paytm',
    category: 'Payment Gateways',
    description: 'Indian multinational financial technology company that specializes in digital payment system, e-commerce and finance.',
    icon: 'Smartphone',
  },
  {
    id: 'ccavenue',
    name: 'CCAvenue',
    category: 'Payment Gateways',
    description: 'Leading payment gateway in India offering a wide range of payment options.',
    icon: 'ShieldCheck',
  },

  // eCommerce & ERP
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'eCommerce & ERP',
    description: 'Leading multi-channel commerce platform for web, mobile, and social media.',
    icon: 'ShoppingCart',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'eCommerce & ERP',
    description: 'Customizable, open-source eCommerce platform built on WordPress.',
    icon: 'Store',
  },
  {
    id: 'amazon',
    name: 'Amazon Seller Services',
    category: 'eCommerce & ERP',
    description: 'Integration with Amazon Seller Central for automated inventory and fulfillment syncing.',
    icon: 'ShoppingCart',
  },
];
