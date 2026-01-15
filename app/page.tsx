import Link from "next/link";

const sections = [
  { title: "Sleep & Recovery", href: "/sleep", icon: "😴" },
  { title: "Nutrition for Performance", href: "/nutrition", icon: "🥗" },
  { title: "Brain Performance & Concussion", href: "/brain", icon: "🧠" },
  { title: "Injury Prevention", href: "/injury", icon: "🦵" },
  { title: "Transition Out of Sport", href: "/transition", icon: "🔄" },
  { title: "Additional Supports", href: "/supports", icon: "🤝" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Beefeaters Player Resources
        </h1>
        <p className="text-gray-300 mt-2 max-w-md">
          Evidence-informed resources supporting performance, health, and life
          beyond football.
        </p>
      </header>

      <section className="grid gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#C4161C] hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
              {section.icon}
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-medium">{section.title}</h2>
              <p className="text-sm text-gray-400">Tap to explore resources</p>
            </div>

            <span className="text-[#C4161C] text-xl opacity-0 group-hover:opacity-100 transition">
              →
            </span>
          </Link>
        ))}
      </section>

      <footer className="mt-12 text-xs text-gray-400">
        Developed in collaboration with Occupational Therapy students.
      </footer>
    </main>
  );
}
