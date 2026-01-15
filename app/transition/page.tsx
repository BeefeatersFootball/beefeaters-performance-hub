import Link from "next/link";
import { client } from "../../sanity/lib/client";

type VideoResource = { _id: string; title: string; youtubeUrl: string };
type PdfResource = { _id: string; title: string; fileUrl: string };

function toYouTubeEmbedUrl(url: string) {
  try {
    if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split(/[?&]/)[0]}`;
    if (url.includes("watch?v=")) return `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`;
    if (url.includes("/embed/")) return url;
    return url;
  } catch { return url; }
}
function toYouTubeWatchUrl(url: string) {
  try {
    if (url.includes("youtu.be/") || url.includes("watch?v=")) return url;
    if (url.includes("/embed/")) return `https://www.youtube.com/watch?v=${url.split("/embed/")[1].split(/[?&]/)[0]}`;
    return url;
  } catch { return url; }
}

async function getTransitionContent() {
  const videosQuery = `*[_type == "videoResource" && category == "transition"] | order(_createdAt desc){ _id, title, youtubeUrl }`;
  const pdfsQuery = `*[_type == "pdfResource" && category == "transition"] | order(_createdAt desc){ _id, title, "fileUrl": file.asset->url }`;
  const [videos, pdfs] = await Promise.all([
    client.fetch<VideoResource[]>(videosQuery),
    client.fetch<PdfResource[]>(pdfsQuery),
  ]);
  return { videos, pdfs };
}

export default async function TransitionPage() {
  const { videos, pdfs } = await getTransitionContent();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1F4B] to-black text-white p-6">
      <Link href="/" className="text-sm text-gray-400 mb-6 inline-block">← Back</Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Transition Out of Sport</h1>
        <p className="text-gray-300 mt-2 max-w-md">
          Support for identity, purpose, and planning life beyond football.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">🎥 Videos</h2>
        {videos.length === 0 ? (
          <p className="text-gray-400">No videos yet. Add category <span className="text-white font-medium">transition</span> in Sanity.</p>
        ) : (
          <div className="grid gap-6">
            {videos.map((video) => (
              <div key={video._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="mb-3 font-medium">{video.title}</h3>
                <div className="aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    src={toYouTubeEmbedUrl(video.youtubeUrl)}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <a href={toYouTubeWatchUrl(video.youtubeUrl)} target="_blank" rel="noreferrer"
                  className="mt-3 inline-block text-sm text-[#C4161C] hover:underline">
                  Watch on YouTube →
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">📄 PDFs</h2>
        {pdfs.length === 0 ? (
          <p className="text-gray-400">No PDFs yet. Add category <span className="text-white font-medium">transition</span> in Sanity.</p>
        ) : (
          <div className="grid gap-4">
            {pdfs.map((pdf) => (
              <a key={pdf._id} href={pdf.fileUrl} target="_blank" rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-[#C4161C] transition">
                <h3 className="font-medium">{pdf.title}</h3>
                <p className="text-sm text-gray-400">Tap to open PDF in a new tab</p>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
