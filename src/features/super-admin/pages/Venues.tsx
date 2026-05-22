import React, { useState, useEffect } from 'react';
import { Building2, Users, Search, Plus, Edit2, Trash2, Eye, MapPin, Phone, Star, CheckCircle, XCircle } from 'lucide-react';
import { superAdminVenueApi } from '../../../api/services/superAdminVenueService';
import { superAdminApi } from '../../../api/services/superAdminService';
import type { GetAllVenuesResponse } from '../../../api/dto/superAdminVenueDto';
import type { AdminInfoResponse } from '../../../api/dto/superAdminDto';

interface Venue {
    id: number;
    name: string;
    address: string;
    phone: string;
    rating: number;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
    image?: string;
}

interface Staff extends AdminInfoResponse {}

const Venues: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'venues' | 'staff'>('venues');
    const [searchQuery, setSearchQuery] = useState('');
    const [venues, setVenues] = useState<GetAllVenuesResponse[]>([]);
    const [staff, setStaff] = useState<AdminInfoResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [venuesResponse, staffResponse] = await Promise.all([
                    superAdminVenueApi.getAllVenues(),
                    superAdminApi.getMyPersonal(),
                ]);
                setVenues(venuesResponse.data);
                setStaff(staffResponse.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const filteredVenues = venues.filter((venue) =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredStaff = staff.filter((staffMember) =>
        staffMember.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffMember.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (staffMember.venueName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Управление</h1>
                    <p className="text-slate-600 mt-1">Manage venues and staff</p>
                </div>
                {activeTab === 'staff' && (
                    <button className="inline-flex items-center px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary/30">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить администратора
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 inline-flex">
                <button
                    onClick={() => setActiveTab('venues')}
                    className={`
                        inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${activeTab === 'venues'
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-50'
                        }
                    `}
                >
                    <Building2 className="w-4 h-4 mr-2" />
                    Заведения
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'venues' ? 'bg-primary-600' : 'bg-slate-200'}`}>
                        {venues.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('staff')}
                    className={`
                        inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${activeTab === 'staff'
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-50'
                        }
                    `}
                >
                    <Users className="w-4 h-4 mr-2" />
                    Персонал
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === 'staff' ? 'bg-primary-600' : 'bg-slate-200'}`}>
                        {staff.length}
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
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                />
            </div>

            {/* Content */}
            {loading ? (
                <div className="py-16 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    <p className="text-slate-600 font-medium mt-4">Loading...</p>
                </div>
            ) : activeTab === 'venues' ? (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* Table Header */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Заведение
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell">
                                        Адрес
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">
                                        Телефон
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                        Рейтинг
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
                                {filteredVenues.map((venue) => (
                                    <tr key={venue.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                                    <Building2 className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <span className="font-semibold text-slate-900">{venue.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center text-slate-600">
                                                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                                <span className="text-sm">{venue.address}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <div className="flex items-center text-slate-600">
                                                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                                                <span className="text-sm">Not provided</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-500 mr-1.5" />
                                                <span className="font-semibold text-slate-900">{venue.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(venue.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="View">
                                                    <Eye className="w-4 h-4 text-slate-600" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4 text-slate-600" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
                    {filteredVenues.length === 0 && (
                        <div className="py-16 text-center">
                            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-600 font-medium">No venues found</p>
                            <p className="text-slate-500 text-sm mt-1">Try adjusting your search</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredVenues.length > 0 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing <span className="font-semibold">{filteredVenues.length}</span> of{' '}
                                <span className="font-semibold">{venues.length}</span> venues
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium disabled:opacity-50" disabled>
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
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
                                {filteredStaff.map((staff) => (
                                    <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                                    <span className="text-sm font-bold text-accent-600">
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
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-700">
                                                Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(staffMember.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4 text-slate-600" />
                                                </button>
                                                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Block">
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
                    {filteredStaff.length > 0 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing <span className="font-semibold">{filteredStaff.length}</span> of{' '}
                                <span className="font-semibold">{staff.length}</span> staff members
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium disabled:opacity-50" disabled>
                                    Previous
                                </button>
                                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium">
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Venues;
