// =====================================================
// PAYMENT HOOK
// Production-ready hook for payment management
// =====================================================

import { useState, useCallback } from 'react';
import { superAdminPaymentApi } from '../../api/services/superAdminPaymentService';
import type { PaymentDetailRequest, PaymentDetailResponse } from '../../api/dto/superAdminPaymentDto';
import useToastStore from '../../store/useToastStore';

interface UsePaymentReturn {
    payments: PaymentDetailResponse[];
    loading: boolean;
    error: string | null;
    fetchPayments: (venueId: number) => Promise<void>;
    addPayment: (venueId: number, data: PaymentDetailRequest) => Promise<boolean>;
    updatePayment: (paymentId: number, data: PaymentDetailRequest) => Promise<boolean>;
    deletePayment: (paymentId: number) => Promise<boolean>;
}

export const usePayment = (): UsePaymentReturn => {
    const [payments, setPayments] = useState<PaymentDetailResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const showToast = useToastStore((state) => state.showToast);

    const fetchPayments = useCallback(async (venueId: number) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await superAdminPaymentApi.getAllPaymentDetails(venueId);
            setPayments(response.data);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch payments';
            setError(errorMessage);
            console.error('Failed to fetch payments:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addPayment = useCallback(async (venueId: number, data: PaymentDetailRequest): Promise<boolean> => {
        try {
            await superAdminPaymentApi.addPaymentDetail(venueId, data);
            showToast('success', 'Payment method added successfully');
            await fetchPayments(venueId);
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to add payment method';
            showToast('error', errorMessage);
            return false;
        }
    }, [fetchPayments, showToast]);

    const updatePayment = useCallback(async (paymentId: number, data: PaymentDetailRequest): Promise<boolean> => {
        try {
            await superAdminPaymentApi.updatePaymentDetail(paymentId, data);
            showToast('success', 'Payment method updated successfully');
            await fetchPayments(data.venueId);
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to update payment method';
            showToast('error', errorMessage);
            return false;
        }
    }, [fetchPayments, showToast]);

    const deletePayment = useCallback(async (paymentId: number): Promise<boolean> => {
        try {
            // Get venueId before deletion to refetch
            const venueId = payments.find((p) => p.id === paymentId)?.venueId;
            
            await superAdminPaymentApi.deletePaymentDetail(paymentId);
            showToast('success', 'Payment method deleted successfully');
            
            if (venueId) {
                await fetchPayments(venueId);
            }
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to delete payment method';
            showToast('error', errorMessage);
            return false;
        }
    }, [payments, fetchPayments, showToast]);

    return {
        payments,
        loading,
        error,
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
    };
};
