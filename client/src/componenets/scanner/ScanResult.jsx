import { motion } from "framer-motion";
import { Mail, Phone, Building2, User, MessageCircle, Copy } from "lucide-react";
import generateWhatsappLink from "../../utils/generateWhatsappLink";

const ScanResult = ({ data }) => {
  if (!data) return null;

  // Directly use full backend data
  const whatsappLink = generateWhatsappLink(data);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 glass p-8 rounded-3xl shadow-premium"
    >
      <h3 className="text-xl font-semibold mb-6 text-center">
        Extracted Details
      </h3>

      <div className="space-y-5">

        {/* Name */}
        {data.name && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <User size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted">Name</p>
              <p className="font-medium">{data.name}</p>
            </div>
          </div>
        )}

        {/* Email */}
        {data.email && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Mail size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted">Email</p>
              <p className="font-medium break-all">{data.email}</p>
            </div>
            <button
              onClick={() => copyToClipboard(data.email)}
              className="text-primary hover:scale-110 transition"
            >
              <Copy size={18} />
            </button>
          </div>
        )}

        {/* Phone */}
        {data.phone && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Phone size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>
          </div>
        )}

        {/* Company */}
        {data.company && (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Building2 size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted">Company</p>
              <p className="font-medium">{data.company}</p>
            </div>
          </div>
        )}

      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-4">
        {data.phone && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Share on WhatsApp
            </button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ScanResult;