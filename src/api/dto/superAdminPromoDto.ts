// =====================================================
// SUPER ADMIN PROMO DTOs
// Based on swagger.json - Single Source of Truth
// =====================================================

// Quick Addition Promo
export interface QuickAdditionPromoRequest {
    title: string;
    description: string;
    discountPercent: number;
    promotionStartDate: string; // date format: "2024-01-01"
    promotionEndDate: string; // date format: "2024-12-31"
    imageUrl: string;
}

// Detailed Addition Promo
export interface DetailedAdditionPromoRequest {
    title: string;
    description: string;
    conditions: string;
    promotionStartDate: string;
    promotionEndDate: string;
    imageUrl: string;
    menuItems?: number[]; // optional menu item IDs
}

// Promo Type Enum
export type PromoType = 'DISCOUNT' | 'SPECIAL_OFFER' | 'READY';
