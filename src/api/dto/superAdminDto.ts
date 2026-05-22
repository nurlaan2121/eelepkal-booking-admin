// =====================================================
// SUPER ADMIN PERSONAL/ADMIN DTOs
// Based on swagger.json - Single Source of Truth
// =====================================================

// Add New Personal (Admin)
export interface AddNewPersonalRequest {
    email: string;
    fullName: string;
    phone: string;
}

// Verify OTP for Personal
export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

// Update Personal/Admin
export interface UpdatePersonalRequest {
    fullName: string;
    phone: string;
    email: string;
}

// Admin Info Response
export interface AdminInfoResponse {
    id: number;
    email: string;
    fullName: string;
    phone: string;
    venueId: number | null;
    venueName: string | null;
    status: string;
    createdAt: string;
}

// Admin for Replace
export interface AdminForReplaceResponse {
    id: number;
    email: string;
    fullName: string;
    venueId: number | null;
    venueName: string | null;
}
