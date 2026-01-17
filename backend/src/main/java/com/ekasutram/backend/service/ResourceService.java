package com.ekasutram.backend.service;

import com.ekasutram.backend.config.SupabaseConfig;
import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.UUID;

@Service
public class ResourceService {

    private final ResourceRepository repository;
    private final SupabaseConfig supabase;

    public ResourceService(ResourceRepository repository, SupabaseConfig supabase) {
        this.repository = repository;
        this.supabase = supabase;
    }

    // =========================
    // GET ALL RESOURCES
    // =========================
    public List<Resource> getAllResources() {
        return repository.findAll();
    }

    // =========================
    // GET BY SUBJECT
    // =========================
    public List<Resource> getResourcesBySubject(String subject) {
        return repository.findBySubject(subject);
    }

    // =========================
    // UPLOAD PDF → SUPABASE
    // =========================
    public Resource saveResource(String subject, String chapter, MultipartFile file)
            throws IOException, InterruptedException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // folder structure: subject/uuid-filename.pdf
        String fileName =
                subject + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

        String uploadUrl =
                supabase.getSupabaseUrl() +
                        "/storage/v1/object/" +
                        supabase.getBucket() + "/" +
                        fileName;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl))
                .header("Authorization", "Bearer " + supabase.getServiceRoleKey())
                .header("Content-Type", file.getContentType())
                .PUT(HttpRequest.BodyPublishers.ofByteArray(file.getBytes()))
                .build();

        HttpResponse<String> response =
                HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200 && response.statusCode() != 201) {
            throw new RuntimeException("Supabase upload failed: " + response.body());
        }

        // PUBLIC FILE URL
        String publicUrl =
                supabase.getSupabaseUrl() +
                        "/storage/v1/object/public/" +
                        supabase.getBucket() + "/" +
                        fileName;

        Resource resource = new Resource();
        resource.setSubject(subject);
        resource.setChapterName(chapter);
        resource.setPdfUrl(publicUrl);

        return repository.save(resource);
    }

    // =========================
// DELETE RESOURCE (DB + SUPABASE)
// =========================
    public void deleteResource(Long id) throws IOException, InterruptedException {

        Resource resource = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        // Extract file path from public URL
        // Example:
        // https://xxx.supabase.co/storage/v1/object/public/resources/Maths/file.pdf
        String publicUrl = resource.getPdfUrl();

        String filePath = publicUrl.substring(
                publicUrl.indexOf(supabase.getBucket()) + supabase.getBucket().length() + 1
        );

        String deleteUrl =
                supabase.getSupabaseUrl() +
                        "/storage/v1/object/" +
                        supabase.getBucket() + "/" +
                        filePath;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(deleteUrl))
                .header("Authorization", "Bearer " + supabase.getServiceRoleKey())
                .DELETE()
                .build();

        HttpResponse<String> response =
                HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200 && response.statusCode() != 204) {
            throw new RuntimeException("Failed to delete file from Supabase");
        }

        // Delete DB record
        repository.deleteById(id);
    }
}
