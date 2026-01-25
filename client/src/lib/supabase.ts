import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock Client Implementation for Demo Mode
class MockSupabaseClient {
    from(table: string) {
        return {
            insert: async (data: any[]) => {
                console.log(`[Mock Supabase] Inserting into ${table}:`, data);

                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Save to localStorage for persistence verification
                const existing = JSON.parse(localStorage.getItem(`mock_db_${table}`) || "[]");
                const newData = data.map(item => ({ ...item, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() }));
                localStorage.setItem(`mock_db_${table}`, JSON.stringify([...existing, ...newData]));

                return { data: newData, error: null };
            },
            select: () => ({
                order: () => ({
                    limit: async () => {
                        return { data: [], error: null }
                    }
                })
            })
        };
    }
}

// Export real client if configured, otherwise mock
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : new MockSupabaseClient() as unknown as SupabaseClient;

export const isMockClient = !(supabaseUrl && supabaseAnonKey);
