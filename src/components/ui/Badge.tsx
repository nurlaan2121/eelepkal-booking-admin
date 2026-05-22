import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
    size?: 'sm' | 'md';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}) => {
    const variants = {
        success: 'bg-green-50 text-green-700 border-green-200',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        error: 'bg-red-50 text-red-700 border-red-200',
        info: 'bg-blue-50 text-blue-700 border-blue-200',
        default: 'bg-slate-50 text-slate-700 border-slate-200',
    };

    const icons = {
        success: <CheckCircle className="w-3 h-3" />,
        warning: <AlertCircle className="w-3 h-3" />,
        error: <XCircle className="w-3 h-3" />,
        info: <Clock className="w-3 h-3" />,
        default: null,
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
    };

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 font-medium rounded-full border
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
        >
            {icons[variant]}
            {children}
        </span>
    );
};
