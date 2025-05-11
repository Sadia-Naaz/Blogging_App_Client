import { Lightbulb, PenLine, Users } from "lucide-react";

const features = [
  { icon: <Lightbulb className="w-6 h-6" />, title: "Inspire", description: "Write articles that motivate and enlighten." },
  { icon: <PenLine className="w-6 h-6" />, title: "Create", description: "Easily draft and publish rich blog posts." },
  { icon: <Users className="w-6 h-6" />, title: "Connect", description: "Engage with a like-minded community." }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">Why Choose BlogVerse?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {features.map((f, i) => (
          <div key={i} className="bg-slate-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="text-primary mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-600 mt-2">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
