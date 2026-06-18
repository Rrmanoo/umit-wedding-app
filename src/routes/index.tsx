import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import brideAsset from "@/assets/bride-umit.png.asset.json";
import paperAsset from "@/assets/wedding-paper-bg.png.asset.json";
import calligraphyAsset from "@/assets/calligraphic-section-bg.png.asset.json";
import gisAsset from "@/assets/2gis-icon-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Үміт — Қыз ұзату тойына шақыру" },
      {
        name: "description",
        content:
          "Үміттің қыз ұзату тойына шақырамыз — 31 шілде 2026, «Бәйтерек» мейрамханасы, Орал",
      },
    ],
  }),
  component: Invitation,
});

const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzSJxCMpkaWod_2m3EZ9UeeEVDhBY18TmjdTljJiVVv12Oxz7sghEJSF5QR_caowN1A/exec";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=%D2%AE%D0%BC%D1%96%D1%82%20%E2%80%94%20%D2%9A%D1%8B%D0%B7%20%D2%B1%D0%B7%D0%B0%D1%82%D1%83&dates=20260731T140000Z%2F20260731T190000Z&details=%C2%AB%D0%91%D3%99%D0%B9%D1%82%D0%B5%D1%80%D0%B5%D0%BA%C2%BB%20%D0%BC%D0%B5%D0%B9%D1%80%D0%B0%D0%BC%D1%85%D0%B0%D0%BD%D0%B0%D1%81%D1%8B%2C%20%D0%9E%D1%80%D0%B0%D0%BB&location=%C2%AB%D0%91%D3%99%D0%B9%D1%82%D0%B5%D1%80%D0%B5%D0%BA%C2%BB%20%D0%BC%D0%B5%D0%B9%D1%80%D0%B0%D0%BC%D1%85%D0%B0%D0%BD%D0%B0%D1%81%D1%8B%2C%20%D0%9E%D1%80%D0%B0%D0%BB";

const WEDDING_DATE = new Date("2026-07-31T19:00:00+05:00");

/* ------------------------------------------------------------------ */

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        left: `${(i * 7 + 4) % 100}%`,
        size: 8 + ((i * 5) % 14),
        delay: `${(i * 1.7) % 16}s`,
        duration: `${16 + ((i * 3) % 12)}s`,
        opacity: 0.25 + ((i % 4) * 0.12),
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary"
          style={{
            left: p.left,
            bottom: "-5vh",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            animation: `float-up ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="my-6 flex justify-center items-center">
      <div className="h-[1px] w-24 bg-primary/20" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-ayaokko font-medium text-center text-xs tracking-widest text-primary/80 uppercase">{children}</p>
  );
}

/* ------------------------------------------------------------------ */

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const autoPlayTriggered = useRef(false);

  useEffect(() => {
    const startAudio = () => {
      if (autoPlayTriggered.current) return;
      const a = audioRef.current;
      if (a) {
        autoPlayTriggered.current = true;
        a.play()
          .then(() => {
            setPlaying(true);
            cleanListeners();
          })
          .catch((err) => {
            console.log("Autoplay blocked:", err);
            cleanListeners();
          });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        startAudio();
      }
    };

    const cleanListeners = () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", startAudio);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", startAudio);

    return () => cleanListeners();
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    autoPlayTriggered.current = true; // prevent scroll trigger if manually toggled
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Музыканы өшіру" : "Музыканы қосу"}
        className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-card text-primary transition-transform active:scale-90"
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" /></svg>
        )}
      </button>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Countdown() {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
      const s = Math.floor(diff / 1000);
      setLeft({
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: left.d, l: "күн" },
    { v: left.h, l: "сағат" },
    { v: left.m, l: "минут" },
    { v: left.s, l: "секунд" },
  ];
  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
      {items.map((it) => (
        <div
          key={it.l}
          className="bg-primary/5 border border-primary/10 flex flex-col items-center rounded-2xl px-2 py-3 shadow-sm"
        >
          <span className="font-ayaok font-medium text-2xl text-primary">
            {String(it.v).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[0.62rem] uppercase tracking-wider text-muted-foreground font-ayaokko font-extralight">
            {it.l}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function CalendarCard() {
  const weeks: (number | null)[][] = [];
  // June 2026 starts on Monday. 1 June 2026 = Monday.
  const startOffset = 2; // no empty leading cells
  let day = 1;
  const total = 31;
  let week: (number | null)[] = Array(startOffset).fill(null);
  while (day <= total) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    day++;
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  const labels = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"];

  return (
    <div className="mx-auto max-w-sm rounded-3xl bg-primary px-5 py-6 text-primary-foreground shadow-xl">
      <p className="text-center font-ayaokko font-medium text-2xl">Шілде 2026</p>
      <p className="mt-1 text-center text-sm text-primary-foreground/90 font-ayaokko font-extralight">💍 31 шілде • Жұма</p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-ayaokko font-extralight">
        {labels.map((l) => (
          <span key={l} className="py-1 font-semibold text-primary-foreground/75">
            {l}
          </span>
        ))}
        {weeks.flat().map((d, i) => (
          <span
            key={i}
            className={[
              "relative flex h-8 w-8 items-center justify-center rounded-full text-sm",
              d === 31
                ? "font-bold text-primary"
                : d
                  ? "text-primary-foreground/95"
                  : "",
            ].join(" ")}
          >
            {d === 31 ? (
              <>
                <svg
                  className="absolute inset-0 h-full w-full fill-primary-foreground stroke-none"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="relative z-10 text-primary text-xs font-bold leading-none">{d}</span>
              </>
            ) : (
              d ?? ""
            )}
          </span>
        ))}
      </div>
      <p className="mt-4 text-center text-xs font-medium text-primary-foreground/90">
        Той сағат 19:00-де басталады
      </p>
      <p className="text-center text-xs text-primary-foreground/75">«Бәйтерек» • Орал</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Rsvp() {
  const [name, setName] = useState("");
  const [choice, setChoice] = useState("yes");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const options = [
    { id: "yes", label: "Иә, бұйырса келемін" },
    { id: "couple", label: "Жұбайыммен келемін" },
    { id: "no", label: "Жоқ, келе алмаймын" },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    const label = options.find((o) => o.id === choice)?.label ?? "";
    try {
      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ name: name.trim(), answer: label }),
      });
    } catch {
      /* no-cors response is opaque */
    }
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-md py-6 text-center">
        <p className="font-display text-3xl text-primary">Рахмет!</p>
        <p className="mt-3 text-ink-soft">Сіздің жауабыңыз қабылданды</p>
        <p className="mt-1 text-ink-soft">Сізді 31 шілдеде күтеміз!</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Жауапты өзгерту
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-md py-2"
    >
      <label className="mb-1 block text-sm font-medium text-ink-soft">
        Аты-жөніңіз
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Аты-жөніңіз"
        className="w-full rounded-xl border border-input bg-card px-4 py-3 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
      <div className="mt-4 space-y-2">
        {options.map((o) => (
          <button
            type="button"
            key={o.id}
            onClick={() => setChoice(o.id)}
            className={[
              "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
              choice === o.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-ink-soft",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-4 w-4 items-center justify-center rounded-full border",
                choice === o.id ? "border-primary" : "border-muted-foreground/50",
              ].join(" ")}
            >
              {choice === o.id && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </span>
            {o.label}
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="mt-5 w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "..." : "Жауапты сақтау"}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function KazakhOrnament() {
  return (
    <div className="flex justify-center items-center my-2 opacity-95">
      <svg
        className="w-20 h-10 text-primary fill-none stroke-current"
        viewBox="0 0 100 50"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Left horn */}
        <path d="M 50,40 C 45,40 40,35 40,30 C 40,20 30,10 20,15 C 10,20 10,35 25,35 C 32,35 35,30 35,25 C 35,18 28,15 25,18" />
        {/* Right horn */}
        <path d="M 50,40 C 55,40 60,35 60,30 C 60,20 70,10 80,15 C 90,20 90,35 75,35 C 68,35 65,30 65,25 C 65,18 72,15 75,18" />
      </svg>
    </div>
  );
}

function Invitation() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Fixed Background Image for mobile/desktop support */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${calligraphyAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Petals />
      <MusicToggle />

      <div className="relative z-10 mx-auto flex max-w-md flex-col gap-5 px-4 py-8">
        {/* HERO SECTION */}
        <section className="relative -mx-4 w-[calc(100%+2rem)] overflow-hidden flex flex-col items-center animate-fade-rise">
          {/* Portrait Photo */}
          <div className="relative w-full">
            <img
              src={brideAsset.url}
              alt="Үміт"
              className="w-full h-auto object-cover object-top max-h-[550px]"
            />
            {/* Overlay Name - Positioned at the bottom of the photo */}
            <div className="absolute bottom-0 left-0 right-0 text-center py-6 bg-gradient-to-t from-[#fdfaf7] via-[#fdfaf7]/70 to-transparent">
              <h1 className="font-ayaok font-extrabold text-6xl sm:text-7xl text-primary tracking-wide drop-shadow-sm">
                Үміт
              </h1>
            </div>
          </div>

          <div className="w-full text-center py-6 space-y-4">
            <p className="font-ayaok font-extrabold text-4xl sm:text-5xl text-primary">
              Қыз ұзату
            </p>
            <SectionDivider />
          </div>
        </section>

        <div className="flex flex-col items-center justify-center -mt-2 animate-bounce text-sm text-foreground/80">
          <span className="font-ayaok font-black text-lg sm:text-xl text-primary">Төмен түсіріңіз</span>
          <svg className="w-5 h-5 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* COMMON BACKGROUND BLOCK */}
        <div className="bg-white/15 backdrop-blur-[2px] border-y border-white/20 -mx-4 w-[calc(100%+2rem)] p-4 sm:p-5 space-y-5 shadow-sm">
          {/* INVITATION DETAILS */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-5">
            <KazakhOrnament />
            <h2 className="font-ayaok font-extrabold text-3xl sm:text-4xl text-primary">
              Құрметті қонақтар!
            </h2>
            <p className="font-ayaok font-black text-xl sm:text-2xl leading-relaxed text-[#020403]">
              Ағайын-туыс, бауырлар, нағашы-жиен, құда-жекжат, дос-жаран, құрдастар, көршілер, ұжымдастар!
              <br />
              Сіздерді аяулы қызымыз
            </p>
            <p className="font-ayaok font-extrabold text-4xl sm:text-5xl text-primary my-3">
              Үмітті
            </p>
            <p className="font-ayaok font-black text-xl sm:text-2xl leading-relaxed text-[#020403]">
              ыстық ұясынан құтты босағасына ұзату тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!
            </p>
            <KazakhOrnament />
          </section>

          {/* TIME & DATE */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-4">
            <h3 className="font-ayaokko font-medium text-xl tracking-wider text-ink">
              Басталу уақыты:
            </h3>
            <p className="font-ayaok font-extrabold text-2xl sm:text-3xl text-primary">
              2026 жылы 31 шілде
            </p>
            <p className="font-ayaok font-black text-xl text-primary">
              сағат 19:00-де
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href={GOOGLE_CALENDAR_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors py-3 text-sm font-medium text-primary shadow-sm"
              >
                <CalIcon small /> Google Calendar
              </a>
              <a
                href={GOOGLE_CALENDAR_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors py-3 text-sm font-medium text-primary shadow-sm"
              >
                <AppleIcon /> Apple Calendar
              </a>
            </div>
          </section>

          {/* LOCATION */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-5">
            <h3 className="font-ayaokko font-medium text-xl tracking-wider text-ink">
              Мекен-жайымыз:
            </h3>
            <p className="font-ayaok font-extrabold text-2xl sm:text-3xl text-primary leading-relaxed">
              Орал-Желаево тас жолы, 3,
              <br />
              “Бәйтерек” мейрамханасы.
            </p>
            <p className="text-xs font-ayaokko font-extralight text-ink-soft leading-relaxed tracking-wide">
              Жету ыңғайлы болу үшін төмендегі 2гис сілтемесін қолданыңыз
            </p>

            <a
              href="https://2gis.kz/uralsk/firm/70000001028714972?m=51.45041%2C51.247611%2F16%2Fp%2F12.28%2Fr%2F-6.57"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-semibold transition-all shadow-sm"
            >
              <img src={gisAsset.url} alt="" className="h-5 w-5" />
              2GIS арқылы ашу
            </a>

            <div className="overflow-hidden rounded-2xl border border-primary/20 shadow-sm mt-2">
              <iframe
                title="Бәйтерек мейрамханасының картасы"
                className="h-56 w-full border-0"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=51.435%2C51.240%2C51.465%2C51.255&layer=mapnik&marker=51.2477%2C51.4504"
              />
            </div>
          </section>

          {/* HOSTS */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-3">
            <h3 className="font-ayaokko font-medium text-xl tracking-wider text-ink">
              Той иелері:
            </h3>
            <p className="font-ayaok font-extrabold text-3xl text-primary">
              Нұркен & Кенжегүл
            </p>
          </section>

          {/* COUNTDOWN */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-4">
            <h3 className="font-ayaokko font-medium text-xl tracking-wider text-ink">
              Тойға дейінгі уақыт:
            </h3>
            <Countdown />
          </section>

          {/* CALENDAR */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-4">
            <h3 className="font-ayaokko font-medium text-xl tracking-wider text-ink">
              Той күні
            </h3>
            <CalendarCard />
          </section>

          {/* PROGRAM */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
            <Eyebrow>Бағдарлама</Eyebrow>
            <h2 className="text-center font-ayaok font-extrabold text-3xl text-primary">
              Той жоспары
            </h2>
            <div className="mx-auto max-w-sm space-y-3">
              {[
                { t: "19:00", n: "Тойдың басталуы" },
              ].map((row) => (
                <div
                  key={row.t}
                  className="bg-primary/5 border border-primary/10 flex items-center gap-4 rounded-2xl px-5 py-4 shadow-sm"
                >
                  <span className="font-ayaok font-medium text-2xl text-primary">{row.t}</span>
                  <span className="text-ink-soft font-ayaokko font-extralight text-sm">{row.n}</span>
                </div>
              ))}
            </div>
          </section>

          {/* RSVP */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
            <Eyebrow>RSVP</Eyebrow>
            <h2 className="text-center font-ayaok font-extrabold text-3xl text-primary">
              Қатысуыңызды растаңыз
            </h2>
            <p className="mx-auto max-w-md text-center text-sm font-ayaokko font-extralight text-ink-soft">
              Қонақтар санын алдын ала білу үшін аты-жөніңізді жазып, жауабыңызды
              қалдырыңыз.
            </p>
            <Rsvp />
          </section>

          {/* FOOTER */}
          <section className="glass-card rounded-3xl p-6 sm:p-7 text-center space-y-3">
            <div className="space-y-2">
              <p className="font-ayaok font-extrabold text-3xl text-primary">Сізді күтеміз</p>
              <p className="font-ayaok font-black text-2xl text-primary">Нұркен &amp; Кенжегүл</p>
              <p className="text-sm font-ayaokko font-extralight text-muted-foreground">
                31 Шілде 2026 • Орал
              </p>
            </div>
          </section>
        </div>
      </div>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Жоғарыға"
          className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-90"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>
      )}
    </main>
  );
}

/* --- small inline icons --- */
function CalIcon({ small }: { small?: boolean }) {
  const s = small ? 16 : 24;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  );
}
function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
  );
}
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" /></svg>
  );
}
