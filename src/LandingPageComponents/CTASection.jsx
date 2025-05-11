import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center px-6">
      <h2 className="text-3xl font-bold mb-4">Ready to Share Your Voice?</h2>
      <p className="mb-6 text-gray-300">Join now and start publishing your first blog in minutes!</p>
      <Link to="/register"><Button size="lg" className="bg-white text-black hover:bg-gray-100">Create Account</Button></Link>
    </section>
  );
}
