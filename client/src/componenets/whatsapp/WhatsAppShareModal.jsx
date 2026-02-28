import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppShareModal = ({ currentData, allResults }) => {
  const [showModal, setShowModal] = useState(false);
  const [waNumber, setWaNumber] = useState("");
  const [sendType, setSendType] = useState("all");
  const [customMessage, setCustomMessage] = useState("");

  const handleSend = () => {
    if (!waNumber.trim()) {
      alert("Please enter WhatsApp number");
      return;
    }

    const cleanedNumber = waNumber.replace(/\D/g, "");

    if (!cleanedNumber) {
      alert("Invalid number");
      return;
    }

    let message = "";

    // ================= SEND ALL CARDS =================
    if (sendType === "all") {
      if (!allResults || allResults.length === 0) {
        alert("No card data available");
        return;
      }

      message = `Hello 👋

🌟 *Scanned Business Card Details* 🌟
`;

      allResults.forEach((card, index) => {
        message += `

━━━━━━━━━━━━━━━━━━
📇 *Card ${index + 1}*
━━━━━━━━━━━━━━━━━━
👤 *Name*     : ${card?.name || "-"}
📧 *Email*    : ${card?.email || "-"}
📞 *Phone*    : ${card?.phone || "-"}
🏢 *Company*  : ${card?.company || "-"}
`;
      });

      message += `

Thank you 🙂
`;
    }

    // ================= CUSTOM MESSAGE =================
    else {
      if (!customMessage.trim()) {
        alert("Please enter custom message");
        return;
      }

      message = customMessage;
    }

    const whatsappURL = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");

    // Reset Modal State
    setShowModal(false);
    setWaNumber("");
    setCustomMessage("");
    setSendType("all");
  };

  return (
    <>
      {/* Share Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto bg-green-500 hover:bg-green-600 
          text-white px-6 py-3 rounded-xl shadow-md 
          transition-all duration-200 hover:scale-105"
        >
          🟢 Share on WhatsApp
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Send via WhatsApp
              </h2>

              {/* Number Input */}
              <input
                type="text"
                placeholder="Enter number with country code"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              {/* Options */}
              <div className="flex gap-4 mb-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={sendType === "all"}
                    onChange={() => setSendType("all")}
                  />
                  Send All Data
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={sendType === "custom"}
                    onChange={() => setSendType("custom")}
                  />
                  Custom Message
                </label>
              </div>

              {/* Custom Message Box */}
              {sendType === "custom" && (
                <textarea
                  rows="4"
                  placeholder="Paste or write message..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              )}

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSend}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                  Send 🚀
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppShareModal;