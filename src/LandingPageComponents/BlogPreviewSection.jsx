import { FetchBlogs } from "@/redux/blogSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const sampleBlogs = [
  {
    title: "How to Learn React",
    textBody: "Start with components, hooks, and then build projects.",
    userID: { username: "Alexa" }
  },
  {
    title: "Node.js Best Practices",
    textBody: "Use async/await, handle errors, and structure your code well.",
    userID: { username: "Shradha" }
  },
  {
    title: "Styling with Tailwind",
    textBody: "Utility-first classes make it fast to build responsive UIs.",
    userID: { username: "Harry" }
  }
];



export default function BlogPreviewSection() {

  return (
    <section className="py-16 bg-slate-100">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Popular Blogs</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {sampleBlogs.map((blog, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{blog.textBody}</p>
            <span className="text-gray-400 text-xs">By {blog.userID.username}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
