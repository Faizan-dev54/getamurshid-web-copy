import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] pt-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-14 text-gray-700">
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-[#F87060] to-[#BA81FF] bg-clip-text text-transparent">
            GetAMurshid
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 w-64">
            A powerful hub connecting fans, mentors, scholars, coaches, and experts through meaningful, guided conversations.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md border cursor-pointer transition"><FiInstagram /></div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md border cursor-pointer transition"><FiTwitter /></div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md border cursor-pointer transition"><FiFacebook /></div>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow hover:shadow-md border cursor-pointer transition"><FiLinkedin /></div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg text-gray-900 mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-indigo-600 cursor-pointer transition">Home</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Features</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Experts</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Book a Call</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg text-gray-900 mb-4">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-indigo-600 cursor-pointer transition">Help Center</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Policies</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">FAQs</li>
            <li className="hover:text-indigo-600 cursor-pointer transition">Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg text-gray-900 mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-600 mb-4">Subscribe for updates, new features, and expert announcements.</p>
          <div className="flex items-center bg-white rounded-xl shadow-sm border overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-sm outline-none"
            />
            <button className="px-5 py-3 bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 shadow-[0_-12px_40px_rgba(0,0,0,0.06)]" />

      <div className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GetAMurshid — Crafted with passion for authentic connections.
      </div>
    </footer>
  );
}