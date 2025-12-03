"use client";

import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#f5f5f5",
          padding: "20px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="/admin" style={{ display: "block", padding: "10px 0" }}>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/media"
                style={{ display: "block", padding: "10px 0" }}
              >
                Media
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                style={{ display: "block", padding: "10px 0" }}
              >
                Users
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", background: "#fff" }}>
        {children}
      </main>
    </div>
  );
}
