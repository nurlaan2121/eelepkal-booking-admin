// =====================================================
// SUPER ADMIN PERSONAL API SERVICE
// Based on swagger.json - Single Source of Truth
// =====================================================

import api from '../instances/apiInstance';
import type {
    AddNewPersonalRequest,
    VerifyOtpRequest,
    UpdatePersonalRequest,
    AdminInfoResponse,
    AdminForReplaceResponse,
} from '../dto/superAdminDto';
import type { SimpleResponse } from '../dto/superAdminVenueDto';

export const superAdminApi = {
    // ==================== PERSONAL MANAGEMENT ====================

    // Get My Personal (Admins managed by super admin)
    getMyPersonal: () =>
        api.get<AdminInfoResponse[]>('/super-admin/myPersonal'),

    // Get Admins for Replace
    getAdminsForReplace: () =>
        api.get<AdminForReplaceResponse[]>('/super-admin/get-admins-for-replace'),

    // Add New Personal (Send OTP)
    addPersonalEmail: (data: AddNewPersonalRequest) =>
        api.post<SimpleResponse>('/super-admin/add-personal-email', data),

    // Verify OTP for New Personal
    addPersonalVerifyEmail: (data: VerifyOtpRequest) =>
        api.post<SimpleResponse>('/super-admin/add-personal-verify-email', data),

    // Update Personal/Admin
    updatePersonal: (adminId: number, data: UpdatePersonalRequest) =>
        api.put<SimpleResponse>(`/super-admin/update-personal/${adminId}`, data),

    // Replace Admin in Venue
    replaceAdmin: (venueId: number, newAdminId: number) =>
        api.post<SimpleResponse>(`/super-admin/replace-admin/${venueId}/${newAdminId}`),

    // Delete Personal/Admin
    deletePersonal: (adminId: number) =>
        api.delete<SimpleResponse>(`/super-admin/delete-personal/${adminId}`),
};
