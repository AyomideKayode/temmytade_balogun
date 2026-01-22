"use client";

import React, { useEffect } from "react";
import { initScript } from "@/lib/legacy/script";
import GalleryGrid from "../components/GalleryGrid";

export default function EventPhotography() {
  useEffect(() => {
    return initScript();
  }, []);

  return (
    <main>
      <section className="section gallery">
        <div className="container">
           <GalleryGrid category="event-photography" />
        </div>
      </section>
    </main>
  );
}
