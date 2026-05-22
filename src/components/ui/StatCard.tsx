import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    color?: 'primary' | 'success' | 'warning' | 'info';
    className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    color = 'primary',
    className = '',
}) => {
    const colors = {
        primary: 'from-primary-500 to-primary-600 shadow-primary/20',
        success: 'from-green-500 to-green-600 shadow-green/20',
        warning: 'from-yellow-500 to-yellow-600 shadow-yellow/20',
        info: 'from-blue-500 to-blue-600 shadow-blue/20',
    };

    return (
        <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
                    <p className="text-3xl font-bold text-slate-900 mb-3">{value}</p>
                    
                    {trend && (
                        <div className="flex items-center gap-1.5">
                            {trend.value > 0 ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={`text-sm font-semibold ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {trend.value > 0 ? '+' : ''}{trend.value}%
                            </span>
                            <span className="text-xs text-slate-500">{trend.label}</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
};
