// =====================================================
// SUPER ADMIN VENUE API SERVICE
// Based on swagger.json - Single Source of Truth
// =====================================================

import api from '../instances/apiInstance';
import type {
    VenueCreateRequest,
    VenueAssignDetailsRequest,
    HoursAssignRequest,
    CuisinesAssignRequest,
    VenueAmenitiesAssignRequest,
    ContactsAssignRequest,
    BookingConditionsRequest,
    UpdatePublicAdminRequest,
    VenueAssignResponse,
    SimpleResponse,
    GetAllVenuesResponse,
    GetVenueBasicResponse,
    GetVenueDetailsResponse,
    GetVenueHoursResponse,
    GetVenueContactsResponse,
    GetVenueAmenitiesResponse,
    GetVenueDescriptionResponse,
    GetPublicAdminResponse,
    VenueFeedbackResponse,
} from '../dto/superAdminVenueDto';

export const superAdminVenueApi = {
    // ==================== CREATE VENUE (Multi-Step) ====================
    
    // Step 1: Add Basic Info
    addBasic: (data: VenueCreateRequest) =>
        api.post<VenueAssignResponse>('/super-admin-venue/add-basic', data),

    // Step 2: Add Venue Details
    addVenueDetails: (data: VenueAssignDetailsRequest) =>
        api.put<VenueAssignResponse>('/super-admin-venue/add-venue-details', data),

    // Step 3: Add/Update Working Hours
    addOrUpdateHours: (data: HoursAssignRequest) =>
        api.put<VenueAssignResponse>('/super-admin-venue/add-or-update-venue-hour', data),

    // Step 4: Add/Update Cuisines
    addOrUpdateCuisines: (data: CuisinesAssignRequest) =>
        api.put<VenueAssignResponse>('/super-admin-venue/add-or-update-venue-cuisines', data),

    // Step 5: Add/Update Amenities
    addOrUpdateAmenities: (data: VenueAmenitiesAssignRequest) =>
        api.put<VenueAssignResponse>('/super-admin-venue/add-or-update-venue-amenities', data),

    // Step 6: Add/Update Contacts
    addOrUpdateContacts: (data: ContactsAssignRequest) =>
        api.put<VenueAssignResponse>('/super-admin-venue/add-or-update-venue-contact', data),

    // Step 7: Add/Update Booking Conditions
    addOrUpdateConditions: (data: BookingConditionsRequest) =>
        api.put<VenueAssignResponse>('/super-admin-venue/add-or-update-venue-condition', data),

    // ==================== UPDATE VENUE ====================

    // Update Name & Description
    updateNameAndDescription: (venueId: number, name: string, description: string) =>
        api.put<SimpleResponse>(`/super-admin-venue/update-name-and-description/${venueId}`, null, {
            params: { name, description },
        }),

    // Update Public Admin
    updatePublicAdmin: (venueId: number, data: UpdatePublicAdminRequest) =>
        api.put<SimpleResponse>(`/super-admin-venue/update-public-admin-in-venue/${venueId}`, data),

    // Add Image to Venue
    addImage: (venueId: number, url: string) =>
        api.put<SimpleResponse>(`/super-admin-venue/add-image-in-venue/${venueId}`, null, {
            params: { url },
        }),

    // Delete Image from Venue
    deleteImage: (venueId: number, imageId: number) =>
        api.put<SimpleResponse>(`/super-admin-venue/delete-image-in-venue/${venueId}/${imageId}`),

    // ==================== GET VENUE DATA ====================

    // Get All Venues
    getAllVenues: () =>
        api.get<GetAllVenuesResponse[]>('/super-admin-venue/get-all-venues'),

    // Get Venue Basic Info
    getBasic: (venueId: number) =>
        api.get<GetVenueBasicResponse>(`/super-admin-venue/get-basic/${venueId}`),

    // Get Venue Details
    getDetails: (venueId: number) =>
        api.get<GetVenueDetailsResponse>(`/super-admin-venue/get-details/${venueId}`),

    // Get Venue Hours
    getHours: (venueId: number) =>
        api.get<GetVenueHoursResponse>(`/super-admin-venue/get-hours/${venueId}`),

    // Get Venue Contacts
    getContacts: (venueId: number) =>
        api.get<GetVenueContactsResponse>(`/super-admin-venue/get-contacts/${venueId}`),

    // Get Venue Amenities
    getAmenities: (venueId: number) =>
        api.get<GetVenueAmenitiesResponse>(`/super-admin-venue/get-amenities/${venueId}`),

    // Get Venue Description
    getDescription: (venueId: number) =>
        api.get<GetVenueDescriptionResponse>(`/super-admin-venue/get-description/${venueId}`),

    // Get Public Admin
    getPublicAdmin: (venueId: number) =>
        api.get<GetPublicAdminResponse>(`/super-admin-venue/get-public-admin/${venueId}`),

    // Get Venue Feedbacks
    getFeedbacks: (venueId: number) =>
        api.get<VenueFeedbackResponse[]>(`/super-admin-venue/feedbacks/${venueId}`),
};
