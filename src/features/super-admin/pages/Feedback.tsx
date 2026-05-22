import React, { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Star, Building2 } from 'lucide-react';
import { useVenues } from '../../../hooks/useVenues';
import { useFeedback } from '../../../hooks/useFeedback';
import Modal from '../../../components/ui/Modal';
import Pagination from '../../../components/ui/Pagination';
import type { GetAllVenuesResponse } from '../../../api/dto/superAdminVenueDto';

const Feedback: React.FC = () => {
    const { venues } = useVenues();
    const { feedbacks, loading, fetchFeedbacks, deleteFeedback } = useFeedback();
    
    const [selectedVenue, setSelectedVenue] = useState<GetAllVenuesResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (selectedVenue) {
            fetchFeedbacks(selectedVenue.id);
        }
    }, [selectedVenue, fetchFeedbacks]);

    const handleVenueSelect = (venue: GetAllVenuesResponse) => {
        setSelectedVenue(venue);
        setIsModalOpen(true);
        setCurrentPage(1); // Reset page when selecting a new venue
    };

    const handleDeleteFeedback = async (feedbackId: number) => {
        if (selectedVenue && window.confirm('Are you sure you want to delete this feedback?')) {
            await deleteFeedback(selectedVenue.id, feedbackId);
        }
    };

    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
    const paginatedFeedbacks = feedbacks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Feedback Moderation</h1>
                <p className="text-slate-600 mt-1">Review and manage customer feedback</p>
            </div>

            {/* Venues List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                    <button
                        key={venue.id}
                        onClick={() => handleVenueSelect(venue)}
                        className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all text-left"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <Building2 className="w-8 h-8 text-orange-500" />
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                venue.status === 'ACTIVE' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-slate-100 text-slate-700'
                            }`}>
                                {venue.status}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{venue.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{venue.address}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                            <span className="font-semibold">{venue.rating}</span>
                            <span>•</span>
                            <MessageSquare className="w-4 h-4" />
                            <span>View Feedback</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Feedback Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Feedback - ${selectedVenue?.name}`}
                size="xl"
            >
                <div className="space-y-4">
                    {loading ? (
                        <div className="py-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            <p className="text-slate-600 mt-2">Loading feedbacks...</p>
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <div className="py-8 text-center">
                            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-600">No feedback yet</p>
                        </div>
                    ) : (
                        <>
                            {paginatedFeedbacks.map((feedback) => (
                                <div
                                    key={feedback.id}
                                    className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-semibold text-slate-900">{feedback.clientName}</p>
                                            <p className="text-sm text-slate-600">{formatDate(feedback.createdAt)}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteFeedback(feedback.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete feedback"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < feedback.rating
                                                        ? 'fill-orange-500 text-orange-500'
                                                        : 'text-slate-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <p className="text-slate-700">{feedback.comment}</p>
                                    
                                    <div className="mt-2">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            feedback.status === 'APPROVED'
                                                ? 'bg-green-100 text-green-700'
                                                : feedback.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                            {feedback.status}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={feedbacks.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Feedback;
