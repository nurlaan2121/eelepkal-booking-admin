// =====================================================
// PROMO HOOK
// Production-ready hook for promo management
// =====================================================

import { useState, useCallback } from 'react';
import { superAdminPromoApi } from '../../api/services/superAdminPromoService';
import type { QuickAdditionPromoRequest, DetailedAdditionPromoRequest, PromoType } from '../../api/dto/superAdminPromoDto';
import useToastStore from '../../store/useToastStore';

interface UsePromoReturn {
    loading: boolean;
    error: string | null;
    addQuickPromo: (venueId: number, data: QuickAdditionPromoRequest) => Promise<boolean>;
    addDetailedPromo: (venueId: number, promoType: PromoType, data: DetailedAdditionPromoRequest) => Promise<boolean>;
}

export const usePromo = (): UsePromoReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const showToast = useToastStore((state) => state.showToast);

    const addQuickPromo = useCallback(async (venueId: number, data: QuickAdditionPromoRequest): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            
            await superAdminPromoApi.quickAddition(venueId, data);
            showToast('success', 'Promo added successfully');
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to add promo';
            setError(errorMessage);
            showToast('error', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    const addDetailedPromo = useCallback(async (venueId: number, promoType: PromoType, data: DetailedAdditionPromoRequest): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);
            
            await superAdminPromoApi.detailedAddition(venueId, promoType, data);
            showToast('success', 'Promo added successfully');
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to add promo';
            setError(errorMessage);
            showToast('error', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    return {
        loading,
        error,
        addQuickPromo,
        addDetailedPromo,
    };
};
