import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    feedback:
      "This AI card scanner saved me hours of manual data entry. The accuracy is impressive and the UI feels premium.",
  },
  {
    name: "Priya Sharma",
    role: "Sales Manager",
    feedback:
      "Sharing contacts via WhatsApp instantly has improved my follow-ups massively. Super useful tool!",
  },
  {
    name: "Amit Verma",
    role: "Business Consultant",
    feedback:
      "Clean interface, fast processing, and very reliable extraction. Highly recommended for professionals.",
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

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            What Our
            <span className="gradient-text"> Users Say</span>
          </h2>

          <p className="mt-6 text-muted text-lg">
            Professionals trust our AI to manage their business contacts efficiently.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="glass p-8 rounded-3xl transition-all duration-300 hover:-translate-y-3 hover:shadow-glow"
            >
              {/* Stars */}
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-muted leading-relaxed mb-6">
                "{item.feedback}"
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;