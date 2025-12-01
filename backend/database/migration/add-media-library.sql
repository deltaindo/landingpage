-- Media library for managing uploads
CREATE TABLE "mediaLibrary" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "fileUrl" VARCHAR(500) NOT NULL,
    "fileType" VARCHAR(50) NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" VARCHAR(100),
    alt TEXT,
    caption TEXT,
    "uploadedBy" UUID REFERENCES users(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_fileType ON "mediaLibrary"("fileType");
CREATE INDEX idx_media_uploadedBy ON "mediaLibrary"("uploadedBy");
