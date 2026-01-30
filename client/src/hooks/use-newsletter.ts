import { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useNewsletter() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const subscribeMutation = useMutation(api.newsletter.subscribe);

    const subscribe = async (email: string, source: string = 'unknown') => {
        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await subscribeMutation({ email, source });

            // The mutation returns a message even if already subscribed (idempotent-ish UX)
            setSuccess(true);
            return result;
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
