import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="section-padding pt-32 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>

      {/* 🔥 Changed max width + column ratio */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10 px-6">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-semibold mb-4">
            🚀 AI Powered Business Tool
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Scan Business Cards
            <br />
            <span className="gradient-text">
              Instantly With AI
            </span>
          </h1>

          <p className="mt-6 text-muted text-lg max-w-md">
            Upload any business card and extract name, email, phone,
            company details in seconds using intelligent OCR technology.
            Save time and grow your network faster.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#scan">
              <button className="btn-primary flex items-center gap-2">
                Start Scanning <ArrowRight size={18} />
              </button>
            </a>

            <button className="btn-secondary">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* RIGHT PREVIEW CARD */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
        >
          {/* 🔥 Slightly bigger card */}
          <div className="glass rounded-3xl p-8 w-[360px] float-animation shadow-xl">

            <h3 className="font-semibold text-lg mb-4">
              Extracted Details
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Name</span>
                <span className="font-medium">Rahul Sharma</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Email</span>
                <span className="font-medium">rahul@email.com</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Phone</span>
                <span className="font-medium">+91 98765 43210</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Company</span>
                <span className="font-medium">Tech Solutions</span>
              </div>
            </div>

            <button className="mt-6 btn-primary w-full text-sm">
              Save Contact
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;