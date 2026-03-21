"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import events from "../../../../data/events.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function EventDetail() {
  const params = useParams();
  const id = params?.id as string;

  const ev = events.find((e) => String(e.id) === id);
  if (!ev) return notFound();

  const [imgSrc, setImgSrc] = useState(ev.poster || "/placeholders/default.jpg");

  return (
    <div style={{ padding: "32px 24px", maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <div style={{ flex: "1 1 300px", minWidth: 280 }}>
          <img
            src={imgSrc}
            alt={ev.name}
            onError={() => setImgSrc("/placeholders/default.jpg")}
            style={{
              width: "100%",
              borderRadius: 12,
              objectFit: "cover",
              maxHeight: 400,
            }}
          />
        </div>

        <div style={{ flex: "2 1 400px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 4 }}>
            {ev.name}
          </h1>

          {ev.tagline && (
            <div style={{ fontSize: 16, fontWeight: 500}}>
              {ev.tagline}
            </div>
          )}

          <div style={{ marginTop: 8, fontSize: 15}}>
            {ev.date} • {ev.location}
          </div>

          {ev.organizer && (
            <div style={{ marginTop: 4, fontStyle: "italic"}}>
              Organized by: {ev.organizer}
            </div>
          )}

          <p style={{ marginTop: 16, lineHeight: 1.6 }}>{ev.description}</p>

          <div style={{ marginTop: 16 }}>
            <strong>Audience:</strong> {ev.audience}
          </div>
          <div style={{ marginTop: 4 }}>
            <strong>Duration:</strong> {ev.duration}
          </div>
          <div style={{ marginTop: 4 }}>
            <strong>Tags:</strong> {ev.tags.join(", ")}
          </div>

          {ev.rsvpLink && (
            <div style={{ marginTop: 20 }}>
              <a
                href={ev.rsvpLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  background: "#0070f3",
                  color: "#fff",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                RSVP / Register
              </a>
            </div>
          )}

          {ev.speakers?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3>Speakers</h3>
              <ul style={{ paddingLeft: 20 }}>
                {ev.speakers.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {ev.resources?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h3>Resources</h3>
              <ul style={{ paddingLeft: 20 }}>
                {ev.resources.map((r, idx) => (
                  <li key={idx}>
                    <a
                      href={r}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0070f3" }}
                    >
                      {r.split("/").pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ev.video && (
            <div style={{ marginTop: 24 }}>
              <h3>Event Video</h3>
              <iframe
                width="100%"
                height="315"
                src={ev.video}
                title="Event Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 8 }}
              ></iframe>
            </div>
          )}

          {ev.photos?.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h3>Photos</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {ev.photos.map((p, idx) => {
                  const [photoSrc, setPhotoSrc] = useState(p);
                  return (
                    <img
                      key={idx}
                      src={photoSrc}
                      alt={`photo-${idx}`}
                      onError={() => setPhotoSrc("/placeholders/default.jpg")}
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 32, textAlign: "center" }}>
        <Link href="/events" style={{ textDecoration: "none", color: "#0070f3" }}>
          ← Back to Events
        </Link>
      </div>
    </div>
  );
}