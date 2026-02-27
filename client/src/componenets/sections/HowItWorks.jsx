import { motion } from "framer-motion";
import { UploadCloud, Cpu, Download } from "lucide-react";

const steps = [
  {
    icon: <UploadCloud size={26} />,
    title: "Upload Card Image",
    description:
      "Simply upload a clear image of the business card from your device.",
  },
  {
    icon: <Cpu size={26} />,
    title: "AI Processes Data",
    description:
      "Our intelligent OCR engine extracts all relevant contact information instantly.",
  },
  {
    icon: <Download size={26} />,
    title: "Save & Share",
    description:
      "Download the contact or generate a WhatsApp message with one click.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="section-padding relative overflow-hidden"
    >
      {/* Soft Background Glow */}
      <div className="absolute right-0 top-20 w-80 h-80 bg-primary/10 blur-3xl rounded-full"></div>

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
            How It <span className="gradient-text">Works</span>
          </h2>

          <p className="mt-6 text-muted text-lg">
            Just three simple steps to transform physical cards into
            digital contacts.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-20">

          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-[2px] bg-primary/20"></div>

          <div className="grid md:grid-cols-3 gap-12 relative">

            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl text-center relative hover:-translate-y-3 transition-all duration-300 hover:shadow-glow"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-button-gradient text-white font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 mt-6">
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  {step.title}
                </h3>

                <p className="text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;