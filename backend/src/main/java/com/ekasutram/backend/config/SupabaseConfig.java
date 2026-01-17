package com.ekasutram.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SupabaseConfig {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service-role-key}")
    private String serviceRoleKey;

    @Value("${supabase.bucket}")
    private String bucket;

    // ===== Getters =====

    public String getSupabaseUrl() {
        return supabaseUrl;
    }

    public String getServiceRoleKey() {
        return serviceRoleKey;
    }

    public String getBucket() {
        return bucket;
    }

    // ===== Setters (optional, but good practice) =====

    public void setSupabaseUrl(String supabaseUrl) {
        this.supabaseUrl = supabaseUrl;
    }

    public void setServiceRoleKey(String serviceRoleKey) {
        this.serviceRoleKey = serviceRoleKey;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }
}
