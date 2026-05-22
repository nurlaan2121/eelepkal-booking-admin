import React, { useState } from 'react';
import { Tag, Plus, Percent, FileText } from 'lucide-react';
import { useVenues } from '../../../hooks/useVenues';
import { usePromo } from '../../../hooks/usePromo';
import Modal from '../../../components/ui/Modal';
import type { PromoType } from '../../../api/dto/superAdminPromoDto';

const Promo: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promoMode, setPromoMode] = useState<'quick' | 'detailed'>('quick');
    const { venues } = useVenues();
    const { addQuickPromo, addDetailedPromo, loading } = usePromo();

    // Form state
    const [selectedVenue, setSelectedVenue] = useState<number>(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercent, setDiscountPercent] = useState<number>(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [promoType, setPromoType] = useState<PromoType>('DISCOUNT');
    const [conditions, setConditions] = useState('');

    const handleSubmit = async () => {
        if (!selectedVenue || !title || !startDate || !endDate) {
            alert('Please fill all required fields');
            return;
        }

        if (promoMode === 'quick') {
            const success = await addQuickPromo(selectedVenue, {
                title,
                description,
                discountPercent,
                promotionStartDate: startDate,
                promotionEndDate: endDate,
                imageUrl,
            });

            if (success) {
                resetForm();
                setIsModalOpen(false);
            }
        } else {
            const success = await addDetailedPromo(selectedVenue, promoType, {
                title,
                description,
                conditions,
                promotionStartDate: startDate,
                promotionEndDate: endDate,
                imageUrl,
            });

            if (success) {
                resetForm();
                setIsModalOpen(false);
            }
        }
    };

    const resetForm = () => {
        setSelectedVenue(0);
        setTitle('');
        setDescription('');
        setDiscountPercent(0);
        setStartDate('');
        setEndDate('');
        setImageUrl('');
        setPromoType('DISCOUNT');
        setConditions('');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Promo Management</h1>
                    <p className="text-slate-600 mt-1">Create and manage promotions for venues</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/30"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Promo
                </button>
            </div>

            {/* Empty State */}
            <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
                <Tag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Promotions Yet</h3>
                <p className="text-slate-600 mb-6">Create your first promotion to attract more customers</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Promo
                </button>
            </div>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create Promotion"
                size="lg"
                footer={
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Promo'}
                        </button>
                    </div>
                }
            >
                <div className="space-y-6">
                    {/* Mode Selection */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setPromoMode('quick')}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                                promoMode === 'quick'
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            <Percent className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                            <p className="font-semibold text-slate-900">Quick Addition</p>
                            <p className="text-sm text-slate-600">Simple discount promo</p>
                        </button>
                        <button
                            onClick={() => setPromoMode('detailed')}
                            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                                promoMode === 'detailed'
                                    ? 'border-orange-500 bg-orange-50'
                                    : 'border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            <FileText className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                            <p className="font-semibold text-slate-900">Detailed Addition</p>
                            <p className="text-sm text-slate-600">Advanced promo with conditions</p>
                        </button>
                    </div>

                    {/* Venue Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Venue <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={selectedVenue}
                            onChange={(e) => setSelectedVenue(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        >
                            <option value={0}>Select a venue</option>
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Summer Special Offer"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Get 20% off on all menu items..."
                            rows={3}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Quick Mode Fields */}
                    {promoMode === 'quick' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Discount Percent <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={discountPercent}
                                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                                placeholder="20"
                                min={0}
                                max={100}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                            />
                        </div>
                    )}

                    {/* Detailed Mode Fields */}
                    {promoMode === 'detailed' && (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Promo Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={promoType}
                                    onChange={(e) => setPromoType(e.target.value as PromoType)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                >
                                    <option value="DISCOUNT">Discount</option>
                                    <option value="SPECIAL_OFFER">Special Offer</option>
                                    <option value="READY">Ready</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Conditions
                                </label>
                                <textarea
                                    value={conditions}
                                    onChange={(e) => setConditions(e.target.value)}
                                    placeholder="Valid for dine-in only..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                                />
                            </div>
                        </>
                    )}

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/promo.jpg"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Promo;
