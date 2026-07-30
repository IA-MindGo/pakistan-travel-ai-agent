import { motion } from "framer-motion";
import {
  ArrowRight,
  Backpack,
  CalendarDays,
  CloudSun,
  Compass,
  Facebook,
  Gem,
  Heart,
  Instagram,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Star,
  Twitter,
  Users,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { ChatKitPanel } from "./ChatKitPanel";
import heroImg from "../assets/hero.jpg";
import hunza from "../assets/hunza.jpg";
import skardu from "../assets/skardu.jpg";
import fairy from "../assets/fairy.jpg";
import lahore from "../assets/lahore.jpg";
import swat from "../assets/swat.jpg";
import gwadar from "../assets/gwadar.jpg";

const destinations = [
  { name: "Hunza", img: hunza, desc: "Fairytale valley of apricot blossoms & Karakoram peaks", rating: 4.9, season: "Apr – Oct" },
  { name: "Skardu", img: skardu, desc: "Turquoise lakes cradled between towering giants", rating: 4.9, season: "May – Sep" },
  { name: "Fairy Meadows", img: fairy, desc: "Alpine meadow beneath the mighty Nanga Parbat", rating: 4.8, season: "Jun – Sep" },
  { name: "Swat", img: swat, desc: "The Switzerland of the East, in full bloom", rating: 4.7, season: "Mar – Oct" },
  { name: "Lahore", img: lahore, desc: "Mughal grandeur, poetry, and unforgettable food", rating: 4.8, season: "Oct – Mar" },
  { name: "Gwadar", img: gwadar, desc: "Golden cliffs meeting the Arabian Sea", rating: 4.6, season: "Nov – Feb" },
];

const features = [
  { icon: Compass, title: "Personalized Itineraries", desc: "Day-by-day plans tuned to your pace and taste." },
  { icon: Wallet, title: "Budget Planning", desc: "Transparent costs across every leg of your trip." },
  { icon: Backpack, title: "Packing Checklist", desc: "Smart lists tailored to season and altitude." },
  { icon: CloudSun, title: "Weather Insights", desc: "Live forecasts for every valley and peak." },
  { icon: Users, title: "Family Trips", desc: "Kid-friendly routes with rest and wonder in balance." },
  { icon: Mountain, title: "Adventure Tours", desc: "Trekking, rafting, climbing — expertly sequenced." },
  { icon: Heart, title: "Honeymoon Planning", desc: "Intimate stays in the world's most romantic valleys." },
  { icon: UtensilsCrossed, title: "Local Food Guide", desc: "From Lahori nihari to Chitrali chapshuro." },
  { icon: ShieldCheck, title: "Safety Tips", desc: "Real-time advice from trusted local sources." },
  { icon: Gem, title: "Hidden Gems", desc: "Off-the-map villages only locals know." },
];

const provinces = [
  { name: "Gilgit-Baltistan", tag: "Karakoram wonders", top: "Hunza, Skardu, Fairy Meadows" },
  { name: "Khyber Pakhtunkhwa", tag: "Green valleys", top: "Swat, Chitral, Kalash" },
  { name: "Punjab", tag: "Culture & heritage", top: "Lahore, Multan, Murree" },
  { name: "Sindh", tag: "Sufi soul", top: "Karachi, Mohenjo-daro, Thar" },
  { name: "Balochistan", tag: "Coast & desert", top: "Gwadar, Hingol, Ziarat" },
  { name: "AJK", tag: "Kashmir dreams", top: "Neelum, Ratti Gali, Arang Kel" },
];

export function TravelLanding() {
  return (
    <main className="relative overflow-x-hidden bg-[linear-gradient(180deg,oklch(0.99_0.01_140)_0%,oklch(0.97_0.03_150)_100%)] text-foreground">
      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3 shadow-[var(--shadow-card)] mx-3 sm:mx-auto">
          <a href="#" className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Mountain className="h-4 w-4" />
            </span>
            <span className="hidden sm:inline">Pakistan Travel AI</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/80">
            <a href="#chat" className="hover:text-primary">AI Guide</a>
            <a href="#destinations" className="hover:text-primary">Destinations</a>
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#map" className="hover:text-primary">Explore</a>
          </nav>
          <a href="#chat" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-secondary">
            Start Planning
          </a>
        </div>
      </header>

      <section className="relative min-h-[100svh] pt-32 pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={heroImg} alt="" className="h-full w-full object-cover animate-float-slow" style={{ animationDuration: "20s" }} />
          <div className="absolute inset-0 animate-gradient-shift bg-[linear-gradient(120deg,color-mix(in_oklab,var(--primary)_18%,transparent),transparent,color-mix(in_oklab,var(--secondary)_18%,transparent))] bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-background" />
        </div>

        <div className="mx-auto max-w-6xl px-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
              AI-powered · Made in Pakistan 🇵🇰
            </div>
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
              Explore Pakistan with your <br className="hidden md:block" />
              <span className="text-gradient">personal AI travel guide</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Plan unforgettable journeys with personalized itineraries, hidden gems, travel tips, budget planning, weather insights, and local recommendations — all powered by AI.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#chat" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.02] hover:bg-secondary">
                Start Planning
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#destinations" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-primary hover:shadow-[var(--shadow-card)]">
                Explore Destinations
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-4 mx-auto max-w-2xl">
              {[
                { k: "50K+", v: "Trips Planned" },
                { k: "120+", v: "Destinations" },
                { k: "4.9★", v: "Traveler Rating" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-4 py-4">
                  <div className="font-display text-2xl font-semibold text-primary sm:text-3xl">{s.k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="chat" className="relative py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              AI TRAVEL AGENT
            </div>
            <h2 className="font-display text-3xl font-semibold sm:text-5xl">
              Chat with your <span className="text-gradient">Pakistan expert</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Ask anything — the AI plans, budgets, and books your dream Pakistan trip in seconds.
            </p>
          </div>
          <ChatKitPanel />
        </div>
      </section>

      <section id="destinations" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                FEATURED
              </div>
              <h2 className="font-display text-3xl font-semibold sm:text-5xl">
                Iconic <span className="text-gradient">destinations</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Hand-picked by locals, planned by AI. From Karakoram giants to Arabian shores.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d, i) => (
              <motion.article key={d.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary shadow">
                    <Star className="h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" />
                    {d.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-xs opacity-90">
                      <MapPin className="h-3 w-3" /> Pakistan
                    </div>
                    <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground">{d.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-secondary" />
                      {d.season}
                    </div>
                    <a href="#chat" className="text-sm font-semibold text-primary">Plan now →</a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              WHY IT WORKS
            </div>
            <h2 className="font-display text-3xl font-semibold sm:text-5xl">
              Built for <span className="text-gradient">beautiful travel planning</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.04 }} className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[var(--shadow-card)] backdrop-blur">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="map" className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  PROVINCES
                </div>
                <h2 className="font-display text-3xl font-semibold sm:text-5xl">
                  Explore every corner of <span className="text-gradient">Pakistan</span>
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                From the northern peaks to the southern coast, your AI guide knows the route, the vibe, and the best timing.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {provinces.map((province) => (
                <div key={province.name} className="rounded-2xl border border-border/80 bg-background/80 p-5">
                  <div className="text-sm font-semibold text-primary">{province.tag}</div>
                  <div className="mt-3 font-display text-xl font-semibold">{province.name}</div>
                  <div className="mt-2 text-sm text-muted-foreground">Top picks: {province.top}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/70 bg-white/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Mountain className="h-4 w-4" /> Pakistan Travel AI
          </div>
          <div className="flex items-center gap-4">
            <a href="#chat" className="hover:text-primary">Plan a trip</a>
            <a href="#destinations" className="hover:text-primary">Destinations</a>
            <a href="#features" className="hover:text-primary">Features</a>
          </div>
          <div className="flex items-center gap-3">
            <Twitter className="h-4 w-4" />
            <Instagram className="h-4 w-4" />
            <Facebook className="h-4 w-4" />
          </div>
        </div>
      </footer>
    </main>
  );
}
