import { useState, useEffect, FormEvent } from "react";
import { auth, db } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAppData } from "../lib/data-service";
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { portfolioItems as defaultPortfolio, testimonials as defaultTestimonials, packages as defaultPackages } from "../data";

export function Admin() {
  const [user, setUser] = useState(auth.currentUser);
  const { portfolio, testimonials, packages, settings, loading } = useAppData();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return unsub;
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSeedData = async () => {
    if (!confirm("This will add default data. Are you sure?")) return;
    try {
      for (const t of defaultTestimonials) {
        await addDoc(collection(db, "testimonials"), {
          client: t.client,
          business: t.business,
          quote: t.quote,
          createdAt: Date.now()
        });
      }
      for (let i = 0; i < defaultPackages.length; i++) {
        const p = defaultPackages[i];
        await addDoc(collection(db, "packages"), {
          name: p.name,
          price: p.price,
          description: p.description,
          features: p.features,
          order: i
        });
      }
      for (let i = 0; i < defaultPortfolio.length; i++) {
        const p = defaultPortfolio[i];
        await addDoc(collection(db, "portfolio"), {
          title: p.title,
          description: p.description,
          link: p.link || "",
          tags: p.tags || [],
          order: i,
          createdAt: Date.now()
        });
      }
      alert("Data seeded successfully!");
    } catch (e) {
      console.error(e);
      alert("Error seeding data");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-bg text-brand-dark flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-bg text-brand-dark flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">Admin Access</h1>
        <button onClick={handleLogin} className="px-8 py-4 bg-brand-blue text-white font-mono text-sm tracking-widest uppercase hover:bg-opacity-90">
          Sign in with Google
        </button>
      </div>
    );
  }

  if (user.email !== 'nnyakunuwa@gmail.com') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-brand-bg text-brand-dark flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Access Denied</h1>
        <p className="mb-8">You are not authorized to view this page.</p>
        <button onClick={handleLogout} className="px-8 py-4 border border-brand-dark font-mono text-sm tracking-widest uppercase">
          Sign out
        </button>
      </div>
    );
  }

  // Admin form handlers
  const saveBio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await setDoc(doc(db, "settings", "global"), {
      aboutBio: fd.get("bio")
    });
    alert("Bio saved!");
  };

  const addTestimonial = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await addDoc(collection(db, "testimonials"), {
      client: fd.get("client"),
      business: fd.get("business"),
      quote: fd.get("quote"),
      createdAt: Date.now()
    });
    (e.target as HTMLFormElement).reset();
  };

  const deleteTestimonial = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await deleteDoc(doc(db, "testimonials", id));
    }
  };

  const addPackage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const features = fd.get("features")?.toString().split("\n").filter(f => f.trim()) || [];
    await addDoc(collection(db, "packages"), {
      name: fd.get("name"),
      price: fd.get("price"),
      description: fd.get("description"),
      features,
      order: packages.length
    });
    (e.target as HTMLFormElement).reset();
  };

  const deletePackage = async (id: string) => {
    if (confirm("Delete package?")) {
      await deleteDoc(doc(db, "packages", id));
    }
  };

  const addPortfolio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const tags = fd.get("tags")?.toString().split(",").map(t => t.trim()).filter(Boolean) || [];
    await addDoc(collection(db, "portfolio"), {
      title: fd.get("title"),
      description: fd.get("description"),
      link: fd.get("link"),
      tags,
      order: portfolio.length,
      createdAt: Date.now()
    });
    (e.target as HTMLFormElement).reset();
  };

  const deletePortfolio = async (id: string) => {
    if (confirm("Delete project?")) {
      await deleteDoc(doc(db, "portfolio", id));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-brand-bg text-brand-dark">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-brand-dark/10 pb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button onClick={handleSeedData} className="font-mono text-sm tracking-widest uppercase hover:text-brand-blue">Seed Data</button>
            <button onClick={handleLogout} className="font-mono text-sm tracking-widest uppercase hover:text-brand-blue">Sign Out</button>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">About Bio</h2>
          <form onSubmit={saveBio} className="space-y-4">
            <textarea name="bio" defaultValue={settings.aboutBio} rows={6} className="w-full border border-brand-dark/20 p-4 font-medium bg-white" placeholder="About bio..."></textarea>
            <button type="submit" className="px-6 py-2 bg-brand-dark text-white font-mono text-sm uppercase">Save Bio</button>
          </form>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
          <div className="grid gap-4 mb-8">
            {testimonials.map(t => (
              <div key={t.id} className="p-4 bg-white border border-brand-dark/10 flex justify-between items-start">
                <div>
                  <p className="font-bold">{t.client} - {t.business}</p>
                  <p className="text-sm opacity-80 mt-1">"{t.quote}"</p>
                </div>
                <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 font-mono text-xs">Delete</button>
              </div>
            ))}
          </div>
          <form onSubmit={addTestimonial} className="bg-white p-6 border border-brand-dark/10 space-y-4">
            <h3 className="font-bold">Add Testimonial</h3>
            <input name="client" placeholder="Client Name" required className="w-full border border-brand-dark/20 p-3" />
            <input name="business" placeholder="Business Name" required className="w-full border border-brand-dark/20 p-3" />
            <textarea name="quote" placeholder="Quote" required className="w-full border border-brand-dark/20 p-3" />
            <button type="submit" className="px-6 py-2 bg-brand-blue text-white font-mono text-sm uppercase">Add Testimonial</button>
          </form>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Services / Packages</h2>
          <div className="grid gap-4 mb-8">
            {packages.map(p => (
              <div key={p.id} className="p-4 bg-white border border-brand-dark/10 flex justify-between items-start">
                <div>
                  <p className="font-bold">{p.name} - {p.price}</p>
                  <p className="text-sm opacity-80">{p.description}</p>
                </div>
                <button onClick={() => deletePackage(p.id)} className="text-red-500 font-mono text-xs">Delete</button>
              </div>
            ))}
          </div>
          <form onSubmit={addPackage} className="bg-white p-6 border border-brand-dark/10 space-y-4">
            <h3 className="font-bold">Add Package</h3>
            <div className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Package Name" required className="w-full border border-brand-dark/20 p-3" />
              <input name="price" placeholder="Price (e.g. £550)" required className="w-full border border-brand-dark/20 p-3" />
            </div>
            <input name="description" placeholder="Description" required className="w-full border border-brand-dark/20 p-3" />
            <textarea name="features" placeholder="Features (one per line)" rows={4} className="w-full border border-brand-dark/20 p-3" />
            <button type="submit" className="px-6 py-2 bg-brand-blue text-white font-mono text-sm uppercase">Add Package</button>
          </form>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Portfolio Projects</h2>
          <div className="grid gap-4 mb-8">
            {portfolio.map(p => (
              <div key={p.id} className="p-4 bg-white border border-brand-dark/10 flex justify-between items-start">
                <div>
                  <p className="font-bold">{p.title}</p>
                  <p className="text-sm opacity-80 mt-1">{p.description}</p>
                </div>
                <button onClick={() => deletePortfolio(p.id)} className="text-red-500 font-mono text-xs">Delete</button>
              </div>
            ))}
          </div>
          <form onSubmit={addPortfolio} className="bg-white p-6 border border-brand-dark/10 space-y-4">
            <h3 className="font-bold">Add Project</h3>
            <input name="title" placeholder="Project Title" required className="w-full border border-brand-dark/20 p-3" />
            <input name="link" placeholder="URL (optional)" className="w-full border border-brand-dark/20 p-3" />
            <input name="tags" placeholder="Tags (comma separated)" className="w-full border border-brand-dark/20 p-3" />
            <textarea name="description" placeholder="Description" required className="w-full border border-brand-dark/20 p-3" />
            <button type="submit" className="px-6 py-2 bg-brand-blue text-white font-mono text-sm uppercase">Add Project</button>
          </form>
        </section>

      </div>
    </div>
  );
}
