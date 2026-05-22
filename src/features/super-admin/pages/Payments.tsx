import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Edit2, Trash2, Building2, CheckCircle, XCircle } from 'lucide-react';
import { useVenues } from '../../../hooks/useVenues';
import { usePayment } from '../../../hooks/usePayment';
import Modal from '../../../components/ui/Modal';
import type { GetAllVenuesResponse } from '../../../api/dto/superAdminVenueDto';
import type { PaymentDetailRequest, PaymentDetailResponse } from '../../../api/dto/superAdminPaymentDto';

const Payments: React.FC = () => {
    const { venues } = useVenues();
    const { payments, loading, fetchPayments, addPayment, updatePayment, deletePayment } = usePayment();
    
    const [selectedVenue, setSelectedVenue] = useState<GetAllVenuesResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null);

    // Form state
    const [paymentType, setPaymentType] = useState('CASH');
    const [paymentDetails, setPaymentDetails] = useState('');
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (selectedVenue) {
            fetchPayments(selectedVenue.id);
        }
    }, [selectedVenue, fetchPayments]);

    const handleVenueSelect = (venue: GetAllVenuesResponse) => {
        setSelectedVenue(venue);
        setIsModalOpen(true);
        setIsEditMode(false);
        resetForm();
    };

    const resetForm = () => {
        setPaymentType('CASH');
        setPaymentDetails('');
        setIsActive(true);
        setEditingPaymentId(null);
    };

    const handleAddPayment = async () => {
        if (!selectedVenue || !paymentType || !paymentDetails) {
            alert('Please fill all required fields');
            return;
        }

        const data: PaymentDetailRequest = {
            venueId: selectedVenue.id,
            paymentType,
            paymentDetails,
            isActive,
        };

        const success = await addPayment(selectedVenue.id, data);
        if (success) {
            resetForm();
        }
    };

    const handleUpdatePayment = async () => {
        if (!editingPaymentId || !paymentType || !paymentDetails) {
            alert('Please fill all required fields');
            return;
        }

        const data: PaymentDetailRequest = {
            venueId: selectedVenue!.id,
            paymentType,
            paymentDetails,
            isActive,
        };

        const success = await updatePayment(editingPaymentId, data);
        if (success) {
            resetForm();
            setIsEditMode(false);
        }
    };

    const handleEditClick = (payment: PaymentDetailResponse) => {
        setIsEditMode(true);
        setEditingPaymentId(payment.id);
        setPaymentType(payment.paymentType);
        setPaymentDetails(payment.paymentDetails);
        setIsActive(payment.isActive);
    };

    const handleDeletePayment = async (paymentId: number) => {
        if (window.confirm('Are you sure you want to delete this payment method?')) {
            await deletePayment(paymentId);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Payment Management</h1>
                <p className="text-slate-600 mt-1">Manage payment methods for venues</p>
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                    <button
                        key={venue.id}
                        onClick={() => handleVenueSelect(venue)}
                        className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all text-left"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <CreditCard className="w-8 h-8 text-orange-500" />
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
                        <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                            <Building2 className="w-4 h-4" />
                            <span>Manage Payments</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Payment Methods Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Payment Methods - ${selectedVenue?.name}`}
                size="lg"
                footer={
                    !isEditMode && (
                        <button
                            onClick={() => {
                                setIsEditMode(false);
                                resetForm();
                            }}
                            className="w-full inline-flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Payment Method
                        </button>
                    )
                }
            >
                <div className="space-y-4">
                    {/* Add/Edit Form */}
                    {isEditMode && (
                        <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200 space-y-4">
                            <h3 className="font-bold text-slate-900">
                                {editingPaymentId ? 'Edit Payment Method' : 'Add Payment Method'}
                            </h3>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Payment Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                >
                                    <option value="CASH">Cash</option>
                                    <option value="CARD">Card</option>
                                    <option value="QR">QR Code</option>
                                    <option value="TRANSFER">Bank Transfer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Details <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={paymentDetails}
                                    onChange={(e) => setPaymentDetails(e.target.value)}
                                    placeholder="Payment details, account info, etc."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                                />
                                <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">
                                    Active
                                </label>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setIsEditMode(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editingPaymentId ? handleUpdatePayment : handleAddPayment}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : editingPaymentId ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Payment Methods List */}
                    {loading ? (
                        <div className="py-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            <p className="text-slate-600 mt-2">Loading payment methods...</p>
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="py-8 text-center">
                            <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-600">No payment methods configured</p>
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="mt-3 inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add First Payment Method
                            </button>
                        </div>
                    ) : (
                        payments.map((payment) => (
                            <div
                                key={payment.id}
                                className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-6 h-6 text-orange-500" />
                                        <div>
                                            <p className="font-semibold text-slate-900">{payment.paymentType}</p>
                                            <p className="text-sm text-slate-600">{payment.paymentDetails}</p>
                                        </div>
                                    </div>
                                    {payment.isActive ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-600" />
                                    )}
                                </div>

                                <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                                    <button
                                        onClick={() => handleEditClick(payment)}
                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 mr-1.5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeletePayment(payment.id)}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Payments;
