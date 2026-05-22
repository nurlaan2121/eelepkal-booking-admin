// =====================================================
// ADMINS HOOK
// Production-ready hook for admin/personnel management
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { superAdminApi } from '../api/services/superAdminService';
import type { AdminInfoResponse, AdminForReplaceResponse, AddNewPersonalRequest, UpdatePersonalRequest } from '../api/dto/superAdminDto';
import { useToastStore } from '../store/useToastStore';

interface UseAdminsReturn {
    admins: AdminInfoResponse[];
    adminsForReplace: AdminForReplaceResponse[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    addAdmin: (data: AddNewPersonalRequest) => Promise<boolean>;
    verifyAdminOtp: (email: string, otp: string) => Promise<boolean>;
    updateAdmin: (adminId: number, data: UpdatePersonalRequest) => Promise<boolean>;
    deleteAdmin: (adminId: number) => Promise<boolean>;
    replaceAdmin: (venueId: number, newAdminId: number) => Promise<boolean>;
}

export const useAdmins = (): UseAdminsReturn => {
    const [admins, setAdmins] = useState<AdminInfoResponse[]>([]);
    const [adminsForReplace, setAdminsForReplace] = useState<AdminForReplaceResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const addToast = useToastStore((state) => state.addToast);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [adminsResponse, replaceResponse] = await Promise.all([
                superAdminApi.getMyPersonal(),
                superAdminApi.getAdminsForReplace(),
            ]);

            setAdmins(adminsResponse.data);
            setAdminsForReplace(replaceResponse.data);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch admins';
            setError(errorMessage);
            console.error('Failed to fetch admins:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addAdmin = useCallback(async (data: AddNewPersonalRequest): Promise<boolean> => {
        try {
            await superAdminApi.addPersonalEmail(data);
            addToast('OTP sent to admin email', 'success');
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to add admin';
            addToast(errorMessage, 'error');
            return false;
        }
    }, [addToast]);

    const verifyAdminOtp = useCallback(async (email: string, otp: string): Promise<boolean> => {
        try {
            await superAdminApi.addPersonalVerifyEmail({ email, otp });
            addToast('Admin verified successfully', 'success');
            await fetchData();
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Invalid OTP';
            addToast(errorMessage, 'error');
            return false;
        }
    }, [fetchData, addToast]);

    const updateAdmin = useCallback(async (adminId: number, data: UpdatePersonalRequest): Promise<boolean> => {
        try {
            await superAdminApi.updatePersonal(adminId, data);
            addToast('Admin updated successfully', 'success');
            await fetchData();
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to update admin';
            addToast(errorMessage, 'error');
            return false;
        }
    }, [fetchData, addToast]);

    const deleteAdmin = useCallback(async (adminId: number): Promise<boolean> => {
        try {
            await superAdminApi.deletePersonal(adminId);
            addToast('Admin deleted successfully', 'success');
            await fetchData();
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to delete admin';
            addToast(errorMessage, 'error');
            return false;
        }
    }, [fetchData, addToast]);

    const replaceAdmin = useCallback(async (venueId: number, newAdminId: number): Promise<boolean> => {
        try {
            await superAdminApi.replaceAdmin(venueId, newAdminId);
            addToast('Admin replaced successfully', 'success');
            await fetchData();
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to replace admin';
            addToast(errorMessage, 'error');
            return false;
        }
    }, [fetchData, addToast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        admins,
        adminsForReplace,
        loading,
        error,
        refetch: fetchData,
        addAdmin,
        verifyAdminOtp,
        updateAdmin,
        deleteAdmin,
        replaceAdmin,
    };
};
