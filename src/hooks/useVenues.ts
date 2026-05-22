// =====================================================
// VENUES HOOK
// Production-ready hook for venue management
// =====================================================

import { useState, useEffect, useCallback } from 'react';
import { superAdminVenueApi } from '../api/services/superAdminVenueService';
import type { GetAllVenuesResponse, GetVenueDetailsResponse, GetPublicAdminResponse } from '../api/dto/superAdminVenueDto';

interface VenueWithDetails extends GetAllVenuesResponse {
    averagePrice?: number;
    adminName?: string;
    adminEmail?: string;
}

interface UseVenuesReturn {
    venues: VenueWithDetails[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    getVenueDetails: (venueId: number) => Promise<GetVenueDetailsResponse | null>;
    getVenueAdmin: (venueId: number) => Promise<GetPublicAdminResponse | null>;
}

export const useVenues = (): UseVenuesReturn => {
    const [venues, setVenues] = useState<VenueWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVenues = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const venuesResponse = await superAdminVenueApi.getAllVenues();
            
            // Fetch details for each venue in parallel
            const venuesWithDetails = await Promise.all(
                venuesResponse.data.map(async (venue) => {
                    try {
                        const [detailsResponse, adminResponse] = await Promise.all([
                            superAdminVenueApi.getDetails(venue.id),
                            superAdminVenueApi.getPublicAdmin(venue.id),
                        ]);

                        return {
                            ...venue,
                            averagePrice: detailsResponse.data.averagePrice,
                            adminName: adminResponse.data.adminName || 'Не назначен',
                            adminEmail: adminResponse.data.adminEmail,
                        };
                    } catch (err) {
                        console.error(`Failed to fetch details for venue ${venue.id}:`, err);
                        return {
                            ...venue,
                            averagePrice: 0,
                            adminName: 'Не назначен',
                        };
                    }
                })
            );

            setVenues(venuesWithDetails);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch venues';
            setError(errorMessage);
            console.error('Failed to fetch venues:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const getVenueDetails = useCallback(async (venueId: number) => {
        try {
            const response = await superAdminVenueApi.getDetails(venueId);
            return response.data;
        } catch (err) {
            console.error(`Failed to fetch venue ${venueId} details:`, err);
            return null;
        }
    }, []);

    const getVenueAdmin = useCallback(async (venueId: number) => {
        try {
            const response = await superAdminVenueApi.getPublicAdmin(venueId);
            return response.data;
        } catch (err) {
            console.error(`Failed to fetch venue ${venueId} admin:`, err);
            return null;
        }
    }, []);

    useEffect(() => {
        fetchVenues();
    }, [fetchVenues]);

    return {
        venues,
        loading,
        error,
        refetch: fetchVenues,
        getVenueDetails,
        getVenueAdmin,
    };
};
