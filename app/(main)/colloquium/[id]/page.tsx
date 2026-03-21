"use client";

import React from "react";
import { useParams } from "next/navigation";
import colloquia from "../../../../data/colloquium.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function ColloquiumDetail() {
  const params = useParams();
  const id = params?.id as string;

  const c = colloquia.find((x) => String(x.id) === id);
  if (!c) return notFound();

  return (
    <div>
      <h1>{c.name}</h1>
      <div className="small-muted">
        {c.date} • {c.location || "Location TBA"}
      </div>

      {c.speaker && (
        <div style={{ marginTop: 4, fontStyle: "italic" }}>
          Speaker: {c.speaker}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <h3>Abstract</h3>
        <p>{c.abstract}</p>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Video</h3>
        {c.video ? (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={c.video}
              title={c.name}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 8,
              }}
              allowFullScreen
            />
          </div>
        ) : (
          <div className="small-muted">No video available</div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Materials</h3>
        {c.materials && c.materials.length > 0 ? (
          <ul>
            {c.materials.map((m, idx) => (
              <li key={idx}>
                <a href={m} target="_blank" rel="noreferrer">
                  {m}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="small-muted">No materials linked</div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <Link
          href="/colloquium"
          style={{ textDecoration: "none", color: "#0070f3" }}
        >
          ← Back to Colloquium List
        </Link>
      </div>
    </div>
  );
}