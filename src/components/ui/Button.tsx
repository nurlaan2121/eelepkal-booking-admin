import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
        primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 focus:ring-primary-500',
        secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 focus:ring-slate-500',
        outline: 'border-2 border-slate-200 hover:border-primary-500 hover:text-primary-600 text-slate-700 bg-transparent focus:ring-primary-500',
        ghost: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-500',
        destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red/20 focus:ring-red-500',
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {!loading && icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};
