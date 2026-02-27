import { motion } from "framer-motion";
import { ScanLine, Brain, Share2 } from "lucide-react";

const features = [
  {
    icon: <ScanLine size={28} />,
    title: "Instant Card Scanning",
    description:
      "Upload any business card image and extract all contact details within seconds using powerful OCR.",
  },
  {
    icon: <Brain size={28} />,
    title: "AI Powered Extraction",
    description:
      "Smart AI detects names, emails, phone numbers and company details with high accuracy.",
  },
  {
    icon: <Share2 size={28} />,
    title: "One Click WhatsApp Share",
    description:
      "Generate WhatsApp-ready contact messages instantly and connect faster with new leads.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Powerful Features For
            <span className="gradient-text"> Smart Networking</span>
          </h2>

          <p className="mt-6 text-muted text-lg">
            Everything you need to digitize, store, and share business
            contacts effortlessly.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass p-8 rounded-3xl transition-all duration-300 hover:-translate-y-3 hover:shadow-glow"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;