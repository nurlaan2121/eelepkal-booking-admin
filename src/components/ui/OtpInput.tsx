import React, { useRef, useState, useCallback, useEffect } from 'react';

interface OtpInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
    length = 6,
    value,
    onChange,
    disabled = false,
    error = false,
}) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Initialize refs array
    if (inputRefs.current.length !== length) {
        inputRefs.current = Array(length).fill(null);
    }

    const handleChange = useCallback(
        (index: number, char: string) => {
            if (!/^\d*$/.test(char)) return; // Only allow digits

            const newValue = value.split('');
            newValue[index] = char;
            const joinedValue = newValue.join('').slice(0, length);
            onChange(joinedValue);

            // Auto-focus next input
            if (char && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        },
        [value, onChange, length]
    );

    const handleKeyDown = useCallback(
        (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Backspace') {
                e.preventDefault();
                const newValue = value.split('');

                if (newValue[index]) {
                    newValue[index] = '';
                    onChange(newValue.join('').slice(0, length));
                } else if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                    newValue[index - 1] = '';
                    onChange(newValue.join('').slice(0, length));
                }
            } else if (e.key === 'ArrowLeft' && index > 0) {
                inputRefs.current[index - 1]?.focus();
            } else if (e.key === 'ArrowRight' && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        },
        [value, onChange, length]
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').slice(0, length);

            if (!/^\d+$/.test(pastedData)) return; // Only allow digits

            const newValue = pastedData.padEnd(length, '').slice(0, length);
            onChange(newValue);

            // Focus the appropriate input
            const focusIndex = Math.min(pastedData.length, length - 1);
            inputRefs.current[focusIndex]?.focus();
        },
        [onChange, length]
    );

    const handleFocus = useCallback((index: number) => {
        setFocusedIndex(index);
        // Select all text in the input
        setTimeout(() => {
            inputRefs.current[index]?.select();
        }, 0);
    }, []);

    const handleBlur = useCallback(() => {
        setFocusedIndex(null);
    }, []);

    // Auto-focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    return (
        <div className="flex gap-2 sm:gap-3 justify-center" role="group" aria-label="OTP input">
            {Array.from({ length }).map((_, index) => {
                const digit = value[index] || '';
                const isFocused = focusedIndex === index;

                return (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        disabled={disabled}
                        className={`
                            w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl
                            border-2 outline-none transition-all duration-200
                            ${
                                error
                                    ? 'border-red-300 bg-red-50 text-red-900'
                                    : isFocused
                                    ? 'border-purple-500 bg-white ring-4 ring-purple-100'
                                    : digit
                                    ? 'border-slate-300 bg-white text-slate-900'
                                    : 'border-slate-200 bg-slate-50 text-slate-900'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                            focus:caret-transparent
                        `}
                        aria-label={`Digit ${index + 1}`}
                    />
                );
            })}
        </div>
    );
};

export default OtpInput;
