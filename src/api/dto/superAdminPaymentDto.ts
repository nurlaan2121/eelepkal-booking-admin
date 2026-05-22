// =====================================================
// SUPER ADMIN PAYMENT DTOs
// Based on swagger.json - Single Source of Truth
// =====================================================

// Payment Detail Request (Create/Update)
export interface PaymentDetailRequest {
    venueId: number;
    paymentType: string; // CASH, CARD, QR, etc.
    paymentDetails: string; // JSON or description
    isActive: boolean;
}

// Payment Detail Response
export interface PaymentDetailResponse {
    id: number;
    venueId: number;
    paymentType: string;
    paymentDetails: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
