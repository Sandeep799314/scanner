import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center glass rounded-3xl p-12 md:p-20 relative z-10 shadow-premium"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Start Building Your
          <span className="gradient-text"> Digital Contact Network</span>
        </h2>

        <p className="mt-6 text-muted text-lg max-w-2xl mx-auto">
          Stop typing contacts manually. Let AI handle the work and
          focus on growing your professional connections faster.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <a href="#scan">
            <button className="btn-primary flex items-center gap-2">
              Scan Your First Card <ArrowRight size={18} />
            </button>
          </a>

          <button className="btn-secondary">
            Contact Us
          </button>
        </div>
      </motion.div>

    </section>
  );
};

export default CTASection;