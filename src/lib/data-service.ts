import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags?: string[];
  order: number;
  createdAt: number;
}

export interface Testimonial {
  id: string;
  client: string;
  business: string;
  quote: string;
  createdAt: number;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  description?: string;
  features?: string[];
  order: number;
}

export interface SiteSettings {
  aboutBio: string;
}

export function useAppData() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({ aboutBio: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubPortfolio = onSnapshot(query(collection(db, "portfolio"), orderBy("order")), (snap) => {
      setPortfolio(snap.docs.map(d => ({ id: d.id, ...d.data() } as PortfolioItem)));
    });

    const unsubTestimonials = onSnapshot(query(collection(db, "testimonials"), orderBy("createdAt", "desc")), (snap) => {
      setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial)));
    });

    const unsubPackages = onSnapshot(query(collection(db, "packages"), orderBy("order")), (snap) => {
      setPackages(snap.docs.map(d => ({ id: d.id, ...d.data() } as Package)));
    });

    const unsubSettings = onSnapshot(doc(db, "settings", "global"), (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as SiteSettings);
      } else {
        setSettings({ aboutBio: "" });
      }
      setLoading(false);
    });

    return () => {
      unsubPortfolio();
      unsubTestimonials();
      unsubPackages();
      unsubSettings();
    };
  }, []);

  return { portfolio, testimonials, packages, settings, loading };
}
