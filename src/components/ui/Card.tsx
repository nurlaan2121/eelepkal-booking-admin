import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    return (
        <div
            className={`
                bg-white rounded-2xl border border-slate-200 shadow-sm
                ${hover ? 'card-hover' : ''}
                ${className}
            `}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-5 border-b border-slate-100 ${className}`}>
        {children}
    </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
        {children}
    </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <p className={`text-sm text-slate-600 mt-1 ${className}`}>
        {children}
    </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-5 ${className}`}>
        {children}
    </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`px-6 py-4 border-t border-slate-100 bg-slate-50/50 ${className}`}>
        {children}
    </div>
);
