import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useNewsletter() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const subscribe = async (email: string, source: string = 'unknown') => {
        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const { error: subError } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email, source }]);

            if (subError) {
                // Check for unique constraint violation (already subscribed)
                if (subError.code === '23505') {
                    return { success: true, message: 'You are already subscribed!' };
                }
                throw subError;
            }

            setSuccess(true);
            return { success: true, message: 'Subscribed successfully!' };
        } catch (err: any) {
            console.error('Error subscribing to newsletter:', err);
            const message = err.message || 'Subscription failed.';
            setError(message);
            return { success: false, message };
        } finally {
            setSubmitting(false);
        }
    };

    return {
        subscribe,
        submitting,
        error,
        success
    };
}
