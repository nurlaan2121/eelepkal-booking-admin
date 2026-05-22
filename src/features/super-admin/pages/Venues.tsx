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
                    <Star key={`full-${i}`} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
                {hasHalfStar && <Star className="w-4 h-4 fill-orange-500/50 text-orange-500" />}
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Мои заведения</h1>
                    <p className="text-slate-600 mt-1">Manage your venues and staff</p>
                </div>
                {activeTab === 'venues' ? (
                    <button className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                        <Plus className="w-5 h-5 mr-2" />
                        Добавить заведение
                    </button>
                ) : (
                    <button className="inline-flex items-center px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                        <Plus className="w-5 h-5 mr-2" />
                        Добавить администратора
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 inline-flex">
                <button
                    onClick={() => setActiveTab('venues')}
                    className={`
                        inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
                        ${activeTab === 'venues'
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-50'
                        }
                    `}
                >
                    <Building2 className="w-4 h-4 mr-2" />
                    Заведения
                    <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs ${activeTab === 'venues' ? 'bg-orange-600' : 'bg-slate-200'}`}>
                        {venues.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('staff')}
                    className={`
                        inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
                        ${activeTab === 'staff'
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-50'
                        }
                    `}
                >
                    <Users className="w-4 h-4 mr-2" />
                    Персонал
                    <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs ${activeTab === 'staff' ? 'bg-orange-600' : 'bg-slate-200'}`}>
                        {admins.length}
                    </span>
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${activeTab === 'venues' ? 'venues' : 'staff'}...`}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
            </div>

            {/* Content */}
            {(venuesLoading || adminsLoading) ? (
                <div className="py-16 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    <p className="text-slate-600 font-medium mt-4">Loading...</p>
                </div>
            ) : activeTab === 'venues' ? (
                <>
                    {/* Venues Grid */}
                    {filteredVenues.length === 0 ? (
                        <div className="py-16 text-center">
                            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-600 font-medium">No venues found</p>
                            <p className="text-slate-500 text-sm mt-1">Try adjusting your search</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedVenues.map((venue) => (
                                    <div
                                        key={venue.id}
                                        className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                                    >
                                        {/* Card Header with Image */}
                                        <div className="relative">
                                            <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                                                {venue.imageUrl ? (
                                                    <img
                                                        src={venue.imageUrl}
                                                        alt={venue.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ImageIcon className="w-16 h-16 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Status Badge */}
                                            <div className="absolute top-3 left-3">
                                                {getStatusBadge(venue.status)}
                                            </div>

                                            {/* Context Menu */}
                                            <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm">
                                                <MoreVertical className="w-4 h-4 text-slate-600" />
                                            </button>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5 space-y-4">
                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-slate-900 line-clamp-1" title={venue.name}>
                                                {venue.name}
                                            </h3>

                                            {/* Location */}
                                            <div className="flex items-start gap-2 text-slate-600">
                                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-500" />
                                                <p className="text-sm line-clamp-2">{venue.address}</p>
                                            </div>

                                            {/* Manager */}
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Users className="w-4 h-4 flex-shrink-0 text-orange-500" />
                                                <p className="text-sm">{venue.adminName}</p>
                                            </div>

                                            {/* Divider */}
                                            <div className="border-t border-slate-200" />

                                            {/* Bottom Info */}
                                            <div className="flex items-center justify-between">
                                                {/* Average Price */}
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-0.5">Средний чек:</p>
                                                    <p className="text-sm font-bold text-slate-900">
                                                        {venue.averagePrice && venue.averagePrice > 0
                                                            ? `${venue.averagePrice} сом`
                                                            : '—'}
                                                    </p>
                                                </div>

                                                {/* Rating */}
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 mb-0.5">Рейтинг:</p>
                                                    <StarRating rating={venue.rating} />
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 pt-2">
                                                <button
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4 mr-1.5" />
                                                    Изменить
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4 text-slate-600" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Pagination */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalVenuesPages}
                                totalItems={filteredVenues.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Сотрудник
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                                        Заведение
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Роль
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Статус
                                    </th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {paginatedStaff.map((staffMember) => (
                                    <tr key={staffMember.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                                    <span className="text-sm font-bold text-orange-600">
                                                        {staffMember.fullName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-900">{staffMember.fullName}</p>
                                                    <p className="text-sm text-slate-600">{staffMember.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-sm text-slate-700">{staffMember.venueName || 'Not assigned'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                                                Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(staffMember.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4 text-orange-600" />
                                                </button>
                                                <button 
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
                                                    title="Delete"
                                                    onClick={() => handleDeleteAdmin(staffMember.id)}
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
                        <div className="py-16 text-center">
                            <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-600 font-medium">No staff found</p>
                            <p className="text-slate-500 text-sm mt-1">Try adjusting your search</p>
                        </div>
                    )}

                    {/* Pagination */}
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
    );
};

export default Venues;
