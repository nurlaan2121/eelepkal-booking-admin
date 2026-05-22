// =====================================================
// SUPER ADMIN PROMO API SERVICE
// Based on swagger.json - Single Source of Truth
// =====================================================

import api from '../instances/apiInstance';
import type {
    QuickAdditionPromoRequest,
    DetailedAdditionPromoRequest,
    PromoType,
} from '../dto/superAdminPromoDto';
import type { SimpleResponse } from '../dto/superAdminVenueDto';

export const superAdminPromoApi = {
    // Quick Addition Promo
    quickAddition: (venueId: number, data: QuickAdditionPromoRequest) =>
        api.post<SimpleResponse>(`/super-admin-promo/quickAddition/${venueId}`, data),

    // Detailed Addition Promo
    detailedAddition: (venueId: number, promoType: PromoType, data: DetailedAdditionPromoRequest) =>
        api.post<SimpleResponse>(`/super-admin-promo/detailedAddition/${venueId}`, data, {
            params: { promoType },
        }),
};
