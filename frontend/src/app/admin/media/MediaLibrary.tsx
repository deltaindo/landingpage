"use client";

import { useState, useEffect } from "react";

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);

  async function fetchMedia() {
    try {
      // Your fetch logic here
      setMedia([]);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Media Library</h1>
      {media.length === 0 ? (
        <p>No media files</p>
      ) : (
        <div>{/* Display media */}</div>
      )}
    </div>
  );
}
