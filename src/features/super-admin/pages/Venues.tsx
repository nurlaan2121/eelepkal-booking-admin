import React, { useState } from 'react';
import { Building2, Users, Search, Plus, Edit2, Trash2, Eye, MapPin, Star, CheckCircle, XCircle, MoreVertical, Image as ImageIcon } from 'lucide-react';
import { useVenues } from '../../../hooks/useVenues';
import { useAdmins } from '../../../hooks/useAdmins';
import Pagination from '../../../components/ui/Pagination';

const Venues: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'venues' | 'staff'>('venues');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Use custom hooks
    const { venues, loading: venuesLoading } = useVenues();
    const { admins, loading: adminsLoading, deleteAdmin } = useAdmins();

    const getStatusBadge = (status: string) => {
        const styles = {
            ACTIVE: 'bg-green-100 text-green-700',
            INACTIVE: 'bg-slate-100 text-slate-700',
            PENDING: 'bg-yellow-100 text-yellow-700',
            BLOCKED: 'bg-red-100 text-red-700',
        };

        const icons = {
            ACTIVE: <CheckCircle className="w-3 h-3" />,
            INACTIVE: <XCircle className="w-3 h-3" />,
            PENDING: <CheckCircle className="w-3 h-3" />,
            BLOCKED: <XCircle className="w-3 h-3" />,
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]}
                {status}
            </span>
        );
    };

    const StarRating = ({ rating }: { rating: number }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={`full-${i}`} className="w-4 h-4 fill-purple-500 text-purple-500" />
                ))}
                {hasHalfStar && <Star className="w-4 h-4 fill-purple-500/50 text-purple-500" />}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="ml-1.5 text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>
            </div>
        );
    };

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredStaff = admins.filter((staffMember) =>
        staffMember.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffMember.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (staffMember.venueName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination
    const totalVenuesPages = Math.ceil(filteredVenues.length / itemsPerPage);
    const totalStaffPages = Math.ceil(filteredStaff.length / itemsPerPage);
    const paginatedVenues = filteredVenues.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const paginatedStaff = filteredStaff.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteAdmin = async (adminId: number) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            await deleteAdmin(adminId);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
            {/* Modern Header with Purple/Indigo Gradient - Vendor Admin Theme */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 shadow-xl shadow-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                Мои заведения
                            </h1>
                            <p className="text-orange-100 mt-1 text-sm font-medium">
                                Управляйте вашими заведениями и персоналом
                            </p>
                        </div>
                        <button 
                            className="inline-flex items-center px-6 py-3 bg-white hover:bg-purple-50 text-purple-600 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            aria-label={activeTab === 'venues' ? 'Add new venue' : 'Add new admin'}
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            {activeTab === 'venues' ? 'Добавить заведение' : 'Добавить администратора'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Modern Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-2 mb-8 inline-flex gap-2">
                    <button
                        onClick={() => { setActiveTab('venues'); setCurrentPage(1); }}
                        className={`
                            inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200
                            ${activeTab === 'venues'
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }
                        `}
                    >
                        <Building2 className="w-5 h-5 mr-2" />
                        Заведения
                        <span className={`ml-2 px-3 py-1 rounded-lg text-xs font-bold ${
                            activeTab === 'venues' ? 'bg-white/20' : 'bg-slate-100'
                        }`}>
                            {venues.length}
                        </span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('staff'); setCurrentPage(1); }}
                        className={`
                            inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200
                            ${activeTab === 'staff'
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }
                        `}
                    >
                        <Users className="w-5 h-5 mr-2" />
                        Персонал
                        <span className={`ml-2 px-3 py-1 rounded-lg text-xs font-bold ${
                            activeTab === 'staff' ? 'bg-white/20' : 'bg-slate-100'
                        }`}>
                            {admins.length}
                        </span>
                    </button>
                </div>

                {/* Modern Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Поиск ${activeTab === 'venues' ? 'заведений' : 'персонала'}...`}
                        className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-base shadow-sm hover:shadow-md"
                    />
                </div>

                {/* Content Area */}
                {(venuesLoading || adminsLoading) ? (
                    <div className="py-24 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                        </div>
                        <p className="text-slate-600 font-semibold text-lg">Загрузка...</p>
                        <p className="text-slate-500 text-sm mt-2">Пожалуйста, подождите</p>
                    </div>
                ) : activeTab === 'venues' ? (
                    <>
                        {/* Venues Grid - Modern Card Design */}
                        {filteredVenues.length === 0 ? (
                            <div className="py-24 text-center bg-white rounded-3xl shadow-sm border border-slate-200/60">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                                    <Building2 className="w-12 h-12 text-slate-400" />
                                </div>
                                <p className="text-slate-900 font-bold text-xl mb-2">Заведения не найдены</p>
                                <p className="text-slate-500">Попробуйте изменить параметры поиска</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedVenues.map((venue) => (
                                        <div
                                            key={venue.id}
                                            className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200/60 hover:border-purple-300 transform hover:-translate-y-1"
                                        >
                                            {/* Card Image Section - Left Side Layout */}
                                            <div className="flex flex-col sm:flex-row">
                                                {/* Image Container */}
                                                <div className="sm:w-40 sm:flex-shrink-0 relative overflow-hidden">
                                                    <div className="aspect-[4/3] sm:aspect-auto sm:h-full bg-gradient-to-br from-slate-100 to-slate-200">
                                                        {venue.imageUrl ? (
                                                            <img
                                                                src={venue.imageUrl}
                                                                alt={venue.name}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <ImageIcon className="w-12 h-12 text-slate-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Status Badge - Top Left Overlay */}
                                                    <div className="absolute top-3 left-3">
                                                        {getStatusBadge(venue.status)}
                                                    </div>
                                                </div>

                                                {/* Card Content - Right Side */}
                                                <div className="flex-1 p-5 flex flex-col">
                                                    {/* Title & Context Menu */}
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-purple-600 transition-colors" title={venue.name}>
                                                            {venue.name}
                                                        </h3>
                                                        <button 
                                                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 ml-2"
                                                            aria-label="Actions"
                                                        >
                                                            <MoreVertical className="w-5 h-5 text-slate-600" />
                                                        </button>
                                                    </div>

                                                    {/* Location Row */}
                                                    <div className="flex items-start gap-2.5 text-slate-600 mb-2.5">
                                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-500" />
                                                        <p className="text-sm line-clamp-2 leading-relaxed">{venue.address}</p>
                                                    </div>

                                                    {/* Manager Row */}
                                                    <div className="flex items-center gap-2.5 text-slate-600 mb-4">
                                                        <Users className="w-4 h-4 flex-shrink-0 text-purple-500" />
                                                        <p className="text-sm font-medium">{venue.adminName || 'Не назначен'}</p>
                                                    </div>

                                                    {/* Divider */}
                                                    <div className="border-t border-slate-200 mb-4" />

                                                    {/* Bottom Info Row */}
                                                    <div className="flex items-center justify-between mt-auto">
                                                        {/* Average Price */}
                                                        <div>
                                                            <p className="text-xs text-slate-500 mb-1 font-medium">Средний чек:</p>
                                                            <p className="text-base font-bold text-slate-900">
                                                                {venue.averagePrice && venue.averagePrice > 0
                                                                    ? `${venue.averagePrice} сом`
                                                                    : '—'}
                                                            </p>
                                                        </div>

                                                        {/* Rating */}
                                                        <div className="text-right">
                                                            <p className="text-xs text-slate-500 mb-1 font-medium">Рейтинг:</p>
                                                            <StarRating rating={venue.rating} />
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                                                        <button
                                                            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                                                            aria-label="Edit venue"
                                                        >
                                                            <Edit2 className="w-4 h-4 mr-1.5" />
                                                            Изменить
                                                        </button>
                                                        <button
                                                            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                                                            aria-label="View venue"
                                                        >
                                                            <Eye className="w-4 h-4 text-slate-600" />
                                                        </button>
                                                        <button
                                                            className="p-2.5 hover:bg-red-50 rounded-xl transition-colors"
                                                            aria-label="Delete venue"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-600" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Modern Pagination */}
                                <div className="mt-8">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalVenuesPages}
                                        totalItems={filteredVenues.length}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                    {/* Modern Table Header */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b-2 border-slate-200">
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Сотрудник
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider hidden md:table-cell">
                                        Заведение
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Роль
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Статус
                                    </th>
                                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {paginatedStaff.map((staffMember, index) => (
                                    <tr key={staffMember.id} className={`hover:bg-orange-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                                                    <span className="text-base font-bold text-white">
                                                        {staffMember.fullName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{staffMember.fullName}</p>
                                                    <p className="text-sm text-slate-600">{staffMember.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-sm font-medium text-slate-700">{staffMember.venueName || 'Не назначено'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800">
                                                Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(staffMember.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    className="p-2.5 hover:bg-purple-100 rounded-xl transition-colors" 
                                                    title="Edit"
                                                    aria-label="Edit admin"
                                                >
                                                    <Edit2 className="w-4 h-4 text-purple-600" />
                                                </button>
                                                <button 
                                                    className="p-2.5 hover:bg-red-100 rounded-xl transition-colors" 
                                                    title="Delete"
                                                    onClick={() => handleDeleteAdmin(staffMember.id)}
                                                    aria-label="Delete admin"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredStaff.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6">
                                <Users className="w-12 h-12 text-slate-400" />
                            </div>
                            <p className="text-slate-900 font-bold text-xl mb-2">Персонал не найден</p>
                            <p className="text-slate-500">Попробуйте изменить параметры поиска</p>
                        </div>
                    )}

                    {/* Modern Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalStaffPages}
                        totalItems={filteredStaff.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
            </div>
        </div>
    );
};

export default Venues;
