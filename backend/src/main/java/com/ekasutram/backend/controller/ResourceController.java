package com.ekasutram.backend.controller;

import com.ekasutram.backend.model.Resource;
import com.ekasutram.backend.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    // ✅ GET all / filter by subject
    @GetMapping
    public List<Resource> getResources(
            @RequestParam(required = false) String subject) {

        if (subject != null) {
            return resourceService.getResourcesBySubject(subject);
        }
        return resourceService.getAllResources();
    }

    @PostMapping(
            value = "/upload",
            consumes = "multipart/form-data"
    )
    public Resource uploadResource(
            @RequestParam String subject,
            @RequestParam String chapterName,
            @RequestParam MultipartFile file
    ) throws IOException, InterruptedException {

        return resourceService.saveResource(subject, chapterName, file);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id)
            throws IOException, InterruptedException {

        resourceService.deleteResource(id);
        return ResponseEntity.ok().build();
    }

}
