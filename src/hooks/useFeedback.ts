// =====================================================
// FEEDBACK HOOK
// Production-ready hook for feedback management
// =====================================================

import { useState, useCallback } from 'react';
import { superAdminFeedbackApi } from '../../api/services/superAdminFeedbackService';
import { superAdminVenueApi } from '../../api/services/superAdminVenueService';
import type { VenueFeedbackResponse } from '../../api/dto/superAdminVenueDto';
import useToastStore from '../../store/useToastStore';

interface UseFeedbackReturn {
    feedbacks: VenueFeedbackResponse[];
    loading: boolean;
    error: string | null;
    fetchFeedbacks: (venueId: number) => Promise<void>;
    deleteFeedback: (venueId: number, feedbackId: number) => Promise<boolean>;
}

export const useFeedback = (): UseFeedbackReturn => {
    const [feedbacks, setFeedbacks] = useState<VenueFeedbackResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const showToast = useToastStore((state) => state.showToast);

    const fetchFeedbacks = useCallback(async (venueId: number) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await superAdminVenueApi.getFeedbacks(venueId);
            setFeedbacks(response.data);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch feedbacks';
            setError(errorMessage);
            console.error('Failed to fetch feedbacks:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteFeedback = useCallback(async (venueId: number, feedbackId: number): Promise<boolean> => {
        try {
            await superAdminFeedbackApi.deleteFeedback(venueId, feedbackId);
            showToast('success', 'Feedback deleted successfully');
            
            // Remove from local state
            setFeedbacks((prev) => prev.filter((f) => f.id !== feedbackId));
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to delete feedback';
            showToast('error', errorMessage);
            return false;
        }
    }, [showToast]);

    return {
        feedbacks,
        loading,
        error,
        fetchFeedbacks,
        deleteFeedback,
    };
};
