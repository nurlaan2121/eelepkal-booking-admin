// =====================================================
// SUPER ADMIN VENUE DTOs
// Based on swagger.json - Single Source of Truth
// =====================================================

// Venue Creation - Step 1: Basic Info
export interface VenueCreateRequest {
    name: string;
    description: string;
    cityId: number;
    categoryId: number;
    address: string;
    latitude: number;
    longitude: number;
}

// Venue Details - Step 2
export interface VenueAssignDetailsRequest {
    venueId: number;
    capacity: number;
    averagePrice: number;
    cuisineIds: number[];
}

// Working Hours - Step 3
export interface HoursAssignRequest {
    venueId: number;
    hours: DayHour[];
}

export interface DayHour {
    dayOfWeek: string; // MONDAY, TUESDAY, etc.
    openTime: string; // "09:00"
    closeTime: string; // "23:00"
}

// Cuisines - Step 4
export interface CuisinesAssignRequest {
    venueId: number;
    cuisineIds: number[];
}

// Amenities - Step 5
export interface VenueAmenitiesAssignRequest {
    venueId: number;
    amenityIds: number[];
}

// Contacts - Step 6
export interface ContactsAssignRequest {
    venueId: number;
    phoneNumbers: string[];
    socialMediaLinks: SocialMediaLink[];
}

export interface SocialMediaLink {
    type: string; // INSTAGRAM, TELEGRAM, WHATSAPP
    url: string;
}

// Booking Conditions - Step 7
export interface BookingConditionsRequest {
    venueId: number;
    prepaymentAmount: number;
    cancellationPolicy: string;
    specialConditions: string;
    minGuests: number;
    maxGuests: number;
}

// Update Name & Description
export interface UpdateNameDescriptionRequest {
    venueId: number;
    name: string;
    description: string;
}

// Update Public Admin
export interface UpdatePublicAdminRequest {
    adminId: number;
}

// Venue Response
export interface VenueAssignResponse {
    venueId: number;
    status: string;
    message: string;
}

// Simple Response (generic)
export interface SimpleResponse {
    success: boolean;
    message: string;
}

// Get All Venues Response
export interface GetAllVenuesResponse {
    id: number;
    name: string;
    description: string;
    address: string;
    city: string;
    category: string;
    status: string;
    rating: number;
    imageUrl: string;
    createdAt: string;
}

// Venue Basic Info
export interface GetVenueBasicResponse {
    id: number;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    cityId: number;
    categoryId: number;
}

// Venue Details
export interface GetVenueDetailsResponse {
    venueId: number;
    capacity: number;
    averagePrice: number;
    cuisines: CuisineItem[];
}

export interface CuisineItem {
    id: number;
    name: string;
}

// Venue Hours
export interface GetVenueHoursResponse {
    venueId: number;
    hours: DayHour[];
}

// Venue Contacts
export interface GetVenueContactsResponse {
    venueId: number;
    phoneNumbers: string[];
    socialMediaLinks: SocialMediaLink[];
}

// Venue Amenities
export interface GetVenueAmenitiesResponse {
    venueId: number;
    amenities: AmenityItem[];
}

export interface AmenityItem {
    id: number;
    name: string;
}

// Venue Description
export interface GetVenueDescriptionResponse {
    venueId: number;
    description: string;
}

// Public Admin
export interface GetPublicAdminResponse {
    venueId: number;
    adminId: number;
    adminName: string;
    adminEmail: string;
}

// Venue Feedback
export interface VenueFeedbackResponse {
    id: number;
    venueId: number;
    clientName: string;
    rating: number;
    comment: string;
    createdAt: string;
    status: string;
}
