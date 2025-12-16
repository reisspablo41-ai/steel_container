export type ContainerCondition = 'New' | 'Used - Wind & Watertight' | 'Refurbished';
export type ContainerSize = '10ft' | '16ft' | '20ft' | '24ft' | '30ft' | '40ft' | '45ft';
export type ContainerType = 'Standard' | 'High Cube' | 'Refrigerated' | 'Open Top' | 'Double Door';

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    size: ContainerSize;
    type: ContainerType;
    condition: ContainerCondition;
    image: string;
    images?: string[];
    inStock: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: '20ft-standard-used',
        slug: '20ft-standard-used',
        name: '20ft Used Standard Container',
        price: 2650, // Simulated market price
        size: '20ft',
        type: 'Standard',
        condition: 'Used - Wind & Watertight',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/20-one-trip-container-conexwest-6047.jpg?itok=y1B55k9Q',
        inStock: true
    },
    {
        id: '20ft-standard-new',
        slug: '20ft-standard-new',
        name: '20ft New Standard Container (One Trip)',
        price: 3850,
        size: '20ft',
        type: 'Standard',
        condition: 'New',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/20ft-standard-container-conexwest-(1).jpg',
        inStock: true
    },
    {
        id: '40ft-standard-used',
        slug: '40ft-standard-used',
        name: '40ft Used Standard Container',
        price: 3200,
        size: '40ft',
        type: 'Standard',
        condition: 'Used - Wind & Watertight',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/40ft-used-conexwest-container-7596.jpg?itok=3pW6hS6v',
        inStock: true
    },
    {
        id: '40ft-hc-used',
        slug: '40ft-hc-used',
        name: '40ft High Cube Used Container',
        price: 3450,
        size: '40ft',
        type: 'High Cube',
        condition: 'Used - Wind & Watertight',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/40-high-cube-one-trip-conexwest-(3).jpg?itok=5yJ4_eU8',
        inStock: true
    },
    {
        id: '40ft-hc-new',
        slug: '40ft-hc-new',
        name: '40ft High Cube New Container (One Trip)',
        price: 5900,
        size: '40ft',
        type: 'High Cube',
        condition: 'New',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/40-high-cube-one-trip-conexwest-6156.jpg',
        inStock: true
    },
    {
        id: '40ft-reefer-used',
        slug: '40ft-reefer-used',
        name: '40ft Used Refrigerated Container',
        price: 12500,
        size: '40ft',
        type: 'Refrigerated',
        condition: 'Used - Wind & Watertight',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/40ft-refrigerated-container-conexwest-4852.jpg',
        inStock: true
    },
    {
        id: '10ft-standard-new',
        slug: '10ft-standard-new',
        name: '10ft New Standard Container',
        price: 3600,
        size: '10ft',
        type: 'Standard',
        condition: 'New',
        image: 'https://www.conexwest.com/sites/default/files/styles/product_grid_360x280/public/10ft-standard-container-conexwest-7953.jpg',
        inStock: true
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find(p => p.slug === slug);
}
