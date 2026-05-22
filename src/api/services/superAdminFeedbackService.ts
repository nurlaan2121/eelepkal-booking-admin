// =====================================================
// SUPER ADMIN FEEDBACK API SERVICE
// Based on swagger.json - Single Source of Truth
// =====================================================

import api from '../instances/apiInstance';
import type { SimpleResponse } from '../dto/superAdminVenueDto';

export const superAdminFeedbackApi = {
    // Delete Feedback
    deleteFeedback: (venueId: number, feedbackId: number) =>
        api.delete<SimpleResponse>(`/super-admin-feedback/delete/${venueId}/${feedbackId}`),
};
