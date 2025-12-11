import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Add your Supabase URL and Anon Key from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database tables
export interface StyleProfile {
  id: string;
  name: string;
  script_1?: string;
  script_2?: string;
  script_3?: string;
  script_4?: string;
  script_5?: string;
  script_6?: string;
  script_7?: string;
  script_8?: string;
  script_9?: string;
  script_10?: string;
  created_at: string;
  // AI-generated style summary fields
  tone?: string;
  hook_style?: string;
  structure?: string;
  common_phrases?: string[];
  writing_rules?: string[];
}

export interface BoostHistory {
  id: string;
  style_id: string;
  idea?: string;
  script?: string;
  cta?: string;
  generated_at: string;
  styles?: { name: string };
}

// Webhook URL for boost generation
export const BOOST_WEBHOOK_URL = 'https://n8n.devjagdish.tech/webhook/5f0f3b23-8224-4cc1-b92d-dc95da0ab5d3';

// Database helper functions
export const db = {
  // Style Profiles
  styles: {
    async getAll() {
      const { data, error } = await supabase
        .from('styles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as StyleProfile[];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('styles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as StyleProfile;
    },

    async create(style: Omit<StyleProfile, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('styles')
        .insert(style)
        .select()
        .single();
      
      if (error) throw error;
      return data as StyleProfile;
    },

    async update(id: string, style: Partial<StyleProfile>) {
      const { data, error } = await supabase
        .from('styles')
        .update(style)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as StyleProfile;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('styles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },

    async count() {
      const { count, error } = await supabase
        .from('styles')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  },

  // Boost History
  boostHistory: {
    async getAll() {
      const { data, error } = await supabase
        .from('boost_history')
        .select('*, styles(name)')
        .order('generated_at', { ascending: false });
      
      if (error) throw error;
      return data as BoostHistory[];
    },

    async getRecent(limit: number = 10) {
      const { data, error } = await supabase
        .from('boost_history')
        .select('*, styles(name)')
        .order('generated_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as BoostHistory[];
    },

    async create(boost: Omit<BoostHistory, 'id' | 'generated_at' | 'styles'>) {
      const { data, error } = await supabase
        .from('boost_history')
        .insert(boost)
        .select()
        .single();
      
      if (error) throw error;
      return data as BoostHistory;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('boost_history')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },

    async getLastBoost() {
      const { data, error } = await supabase
        .from('boost_history')
        .select('generated_at')
        .order('generated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      return data;
    },

    async getBoostsThisWeek() {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { count, error } = await supabase
        .from('boost_history')
        .select('*', { count: 'exact', head: true })
        .gte('generated_at', oneWeekAgo.toISOString());
      
      if (error) throw error;
      return count || 0;
    }
  }
};

// Generate boost via webhook
export async function generateBoost(style: StyleProfile, userIdea: string, timeoutMs: number = 60000): Promise<{ idea: string; script: string; cta: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Build the payload with user idea, style info, and AI summary
    const payload = {
      user_idea: userIdea,
      style_id: style.id,
      style_name: style.name,
      // AI-Generated Style Summary
      ai_summary: {
        tone: style.tone || null,
        hook_style: style.hook_style || null,
        structure: style.structure || null,
        common_phrases: style.common_phrases || [],
        writing_rules: style.writing_rules || [],
      },
    };

    const response = await fetch(BOOST_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle the response format: array with nested content object
    // Expected format: [{ "content": { "script": "...", "cta": "..." } }]
    let script = '';
    let cta = '';

    if (Array.isArray(data) && data.length > 0 && data[0].content) {
      // New format: array with content object
      const content = data[0].content;
      script = content.script || content.Script || '';
      cta = content.cta || content.CTA || '';
    } else if (data.content) {
      // Single object with content
      script = data.content.script || data.content.Script || '';
      cta = data.content.cta || data.content.CTA || '';
    } else {
      // Fallback to direct properties
      script = data.script || data.Script || '';
      cta = data.cta || data.CTA || '';
    }

    return {
      idea: '', // The idea comes from user input, not the response
      script,
      cta,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('The webhook is taking too long to respond. The boost may be saved to history automatically.');
    }
    
    throw error;
  }
}
