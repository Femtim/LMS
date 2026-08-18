import { useEffect, useRef, useState } from "react";
import { IconRocket, IconStory, IconCheck, IconGlobe, IconBulb, IconHeart } from "../../components/ui/iconrocket";
import Footer from "../../components/ui/Footer";
import Navbar from "../../components/ui/Navbar";
// ── Fonts ─────────────────────────────────────────────────────────────────
// Tailwind can't fetch remote font files on its own, so this <style> tag is
// the one piece of non-Tailwind markup left in the file.
const FontImport = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
);

// ── Scroll-reveal hook ───────────────────────────────────────────────────
// Replaces the old classList.add("visible") approach with React state,
// so the animation itself can be expressed as conditional Tailwind classes.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, isVisible };
}

// direction: "up" | "left" | "right"
function revealClasses(isVisible: boolean, direction: "up" | "left" | "right" = "up", delay = "") {
  const base = "transition-all duration-700 ease-out";
  const hidden =
    direction === "up"
      ? "opacity-0 translate-y-8"
      : direction === "left"
      ? "opacity-0 -translate-x-10"
      : "opacity-0 translate-x-10";
  const shown = "opacity-100 translate-x-0 translate-y-0";
  return [base, delay, isVisible ? shown : hidden].filter(Boolean).join(" ");
}

// ── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative flex min-h-[460px] items-end overflow-hidden rounded-b-[32px] bg-[#1a1a2e] md:min-h-[520px]">
      {/* decorative gradient */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(140deg,rgba(30,79,216,.55)_0%,rgba(26,26,46,0)_60%)]" />
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80"
        alt="Students collaborating"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="relative z-[2] max-w-[680px] px-6 pb-10 sm:px-10 md:pb-14 lg:px-20">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-[.12em] text-[#f4a118]">
          AI-Powered Education
        </p>
        <h1 className="mb-5 font-['Playfair_Display',serif] text-[clamp(2.4rem,5vw,3.6rem)] font-black leading-[1.12] tracking-[-.03em] text-white">
          Empowering Minds
          <br />
          with AI
        </h1>
        <p className="max-w-[480px] text-[17px] leading-[1.7] text-white/80">
          We're bridging the gap between technology and human potential through intelligent education.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button className="rounded-[10px] bg-[#1e4fd8] px-7 py-3.5 font-['DM_Sans',sans-serif] text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(30,79,216,.5)]">
            Start for free
          </button>
          <button className="rounded-[10px] border-[1.5px] border-white/25 bg-white/15 px-7 py-3.5 font-['DM_Sans',sans-serif] text-[15px] font-medium text-white backdrop-blur-[8px]">
            Watch demo
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Mission ──────────────────────────────────────────────────────────────
function Mission() {
  const left = useInView<HTMLDivElement>();
  const right = useInView<HTMLDivElement>();

  return (
    <section className="px-6 py-12 sm:px-10 md:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12">
        {/* left */}
        <div ref={left.ref} className={revealClasses(left.isVisible, "left")}>
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#1e4fd8]">
            <IconRocket /> Our Mission
          </div>
          <h2 className="mb-5 font-['Playfair_Display',serif] text-[clamp(1.8rem,3vw,2.5rem)] font-black leading-[1.15] tracking-[-.03em] text-[#1a1a2e]">
            Personalized Learning
            <br />
            for Everyone
          </h2>
          <p className="max-w-[440px] text-[15.5px] leading-[1.75] text-gray-500">
            At EduStream Pro, we believe that education should be as unique as the person receiving it. Our mission is to leverage cutting-edge AI to democratize high-quality, personalized education for learners worldwide, regardless of their background or location.
          </p>
        </div>

        {/* right card */}
        <div
          ref={right.ref}
          className={`rounded-[20px] bg-[#1a1a2e] px-9 py-8 shadow-[0_12px_48px_rgba(30,79,216,.16)] ${revealClasses(right.isVisible, "right")}`}
        >
          <p className="mb-6 text-[15px] font-bold text-[#f4a118]">AI-Powered Excellence</p>
          {[
            "Adaptive curriculum that evolves with you",
            "Real-time performance analytics",
            "24/7 AI tutor support across all subjects",
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-3 ${i < 2 ? "mb-5" : ""}`}>
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1e4fd8]/25">
                <IconCheck />
              </div>
              <p className="text-[15px] leading-[1.6] text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="mx-auto h-px max-w-[1100px] bg-[linear-gradient(90deg,transparent,#ede9df_30%,#ede9df_70%,transparent)]" />
  );
}

// ── Story ────────────────────────────────────────────────────────────────
function Story() {
  const left = useInView<HTMLDivElement>();
  const right = useInView<HTMLDivElement>();

  return (
    <section className="px-6 py-12 sm:px-10 md:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* image */}
        <div ref={left.ref} className={`relative order-1 ${revealClasses(left.isVisible, "left")}`}>
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Dashboard on screen"
            className="aspect-[4/3] w-full rounded-[20px] object-cover shadow-[0_12px_48px_rgba(30,79,216,.16)]"
          />
          {/* floating badge */}
          <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#1e4fd8] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_8px_28px_rgba(30,79,216,.4)]">
            Founded 2021 🎓
          </div>
        </div>

        {/* text */}
        <div ref={right.ref} className={`order-2 ${revealClasses(right.isVisible, "right")}`}>
          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#1e4fd8]">
            <IconStory /> Our Story
          </div>
          <h2 className="mb-6 font-['Playfair_Display',serif] text-[clamp(1.6rem,2.5vw,2.2rem)] font-black leading-[1.2] tracking-[-.03em] text-[#1a1a2e]">
            Born from a simple observation
          </h2>
          <p className="mb-4.5 text-[15.5px] leading-[1.8] text-gray-500">
            EduStream Pro started in a small university library where our founders noticed a recurring problem: students were struggling not because of a lack of effort, but because the "one-size-fits-all" approach to teaching didn't account for individual learning styles.
          </p>
          <p className="text-[15.5px] leading-[1.8] text-gray-500">
            In 2021, we set out to build a platform that listens. Using advanced machine learning, we developed an engine that understands when a student is stuck and provides the exact resource they need to break through. What started as a small pilot program has now grown into a global community of lifelong learners.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Why section ──────────────────────────────────────────────────────────
const pillars = [
  { icon: <IconGlobe />, title: "Global Access", desc: "Removing barriers to ensure every person on earth has access to world-class learning materials." },
  { icon: <IconBulb />, title: "Unlocking Potential", desc: "Helping individuals discover their hidden talents and pursue their passions with confidence." },
  { icon: <IconHeart />, title: "Social Impact", desc: "Investing our resources into educational initiatives that support underserved communities." },
];

function PillarCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: string }) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={revealClasses(isVisible, "up", delay)}>
      <div className="mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#1e4fd8,#4a78f5)] shadow-[0_8px_24px_rgba(30,79,216,.4)]">
        {icon}
      </div>
      <h3 className="mb-3 text-[17px] font-bold text-white">{title}</h3>
      <p className="mx-auto max-w-[220px] text-[14.5px] leading-[1.7] text-white/55">{desc}</p>
    </div>
  );
}

function Why() {
  const heading = useInView<HTMLHeadingElement>();
  const sub = useInView<HTMLParagraphElement>();

  return (
    <section className="mx-4 rounded-[28px] bg-[#1a1a2e] px-6 py-12 text-center sm:mx-6 sm:px-10 md:py-20 lg:px-16">
      <h2
        ref={heading.ref}
        className={`mb-4 font-['Playfair_Display',serif] text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-[-.03em] text-white ${revealClasses(heading.isVisible)}`}
      >
        Why We Do It
      </h2>
      <p
        ref={sub.ref}
        className={`mx-auto mb-14 max-w-[500px] text-base text-white/60 ${revealClasses(sub.isVisible)}`}
      >
        Our commitment to education stems from the belief that knowledge is the most powerful tool for positive change.
      </p>
      <div className="mx-auto grid max-w-[380px] grid-cols-1 gap-10 md:max-w-[900px] md:grid-cols-3 md:gap-8">
        {pillars.map((p, i) => (
          <PillarCard key={p.title} icon={p.icon} title={p.title} desc={p.desc} delay={i === 1 ? "delay-150" : i === 2 ? "delay-300" : ""} />
        ))}
      </div>
    </section>
  );
}

// ── App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontImport />
      <Navbar />
      <main className="pt-10 p-4">
        <Hero />
        <Mission />
        <Divider />
        <Story />
        <Why />
        <div className="h-16" />
      </main>

      <Footer />
    </>
  );
}