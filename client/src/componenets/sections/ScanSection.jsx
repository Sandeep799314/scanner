import { motion } from "framer-motion";
import CardScanner from "../scanner/CardScanner";

const ScanSection = () => {
  return (
    <section
      id="scan"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute left-10 top-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>
      <div className="absolute right-10 bottom-10 w-72 h-72 bg-pink-300/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Ready to Digitize
            <br />
            <span className="gradient-text">
              Your Business Cards?
            </span>
          </h2>

          <p className="mt-6 text-muted text-lg max-w-lg">
            Upload your card image and let our AI extract the details
            instantly. Save time, reduce manual entry, and grow your
            professional network effortlessly.
          </p>

          <ul className="mt-8 space-y-4 text-muted">
            <li>✔ High accuracy OCR extraction</li>
            <li>✔ Secure image processing</li>
            <li>✔ WhatsApp ready contact sharing</li>
            <li>✔ Fast and reliable results</li>
          </ul>
        </motion.div>

        {/* RIGHT SCANNER CARD */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="glass rounded-3xl p-8 w-full max-w-md shadow-premium">
            <CardScanner />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ScanSection;