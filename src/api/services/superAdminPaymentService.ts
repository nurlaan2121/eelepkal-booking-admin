// =====================================================
// SUPER ADMIN PAYMENT API SERVICE
// Based on swagger.json - Single Source of Truth
// =====================================================

import api from '../instances/apiInstance';
import type {
    PaymentDetailRequest,
    PaymentDetailResponse,
} from '../dto/superAdminPaymentDto';
import type { SimpleResponse } from '../dto/superAdminVenueDto';

export const superAdminPaymentApi = {
    // Add Payment Detail
    addPaymentDetail: (venueId: number, data: PaymentDetailRequest) =>
        api.post<SimpleResponse>(`/super-admin-venue/payment/add-payment-detail/${venueId}`, data),

    // Update Payment Detail
    updatePaymentDetail: (paymentId: number, data: PaymentDetailRequest) =>
        api.put<SimpleResponse>(`/super-admin-venue/payment/update-payment-detail/${paymentId}`, data),

    // Delete Payment Detail
    deletePaymentDetail: (paymentId: number) =>
        api.delete<SimpleResponse>(`/super-admin-venue/payment/delete-payment-detail/${paymentId}`),

    // Get All Payment Details for Venue
    getAllPaymentDetails: (venueId: number) =>
        api.get<PaymentDetailResponse[]>(`/super-admin-venue/payment/get-all-payment-details/${venueId}`),
};
