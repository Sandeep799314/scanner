import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";
import ScanResult from "./ScanResult";
import { scanCard } from "../../services/api";
import WhatsAppShareModal from "../whatsapp/WhatsAppShareModal";

const CardScanner = ({ onResultChange }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasResults = results.length > 0;

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (files) => {
    if (!files?.length) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (!validFiles.length) {
      setError("Please upload valid image files.");
      return;
    }

    setError("");
    setResults([]);
    setCurrentIndex(0);
    onResultChange?.(0);

    setImages(validFiles);
    setPreviews(validFiles.map((file) => URL.createObjectURL(file)));
  };

  /* ================= SCAN ================= */
  const handleScan = async () => {
    if (!images.length) {
      setError("Please upload business card images.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      images.forEach((image) => formData.append("cards", image));

      const response = await scanCard(formData);
      const data = response?.data || [];
      const finalResults = Array.isArray(data) ? data : [data];

      setResults(finalResults);
      setCurrentIndex(0);
      onResultChange?.(finalResults.length);
    } catch {
      setError("Something went wrong while scanning.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= NAVIGATION ================= */
  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /* ================= COPY ================= */
  const handleCopy = (data) => {
    const text = `
Name: ${data?.name || ""}
Email: ${data?.email || ""}
Phone: ${data?.phone || ""}
Company: ${data?.company || ""}
    `;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8">

      {/* ================= BEFORE SCAN ================= */}
      {!hasResults && (
        <div className="flex flex-col items-center">

          <div className="w-full max-w-xl border-2 border-dashed border-orange-300 rounded-2xl p-8 bg-white text-center shadow-sm">

            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              id="fileUpload"
              onChange={(e) => handleFileChange(e.target.files)}
            />

            <label htmlFor="fileUpload" className="cursor-pointer block">

              {!previews.length ? (
                <p className="text-gray-400">
                  Click or drag images here
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      className="h-32 w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              )}

            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          <button
            onClick={handleScan}
            disabled={loading}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full shadow-md"
          >
            {loading ? "Processing..." : "Scan Card"}
          </button>

          {loading && <Loader />}
        </div>
      )}

      {/* ================= AFTER SCAN ================= */}
      {hasResults && (
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2">

            <h2 className="text-xl font-bold mb-5">
              Smart Business Card Scanner
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-32 w-full rounded-xl object-cover cursor-pointer
                    ${currentIndex === index ? "ring-2 ring-orange-500" : ""}
                  `}
                />
              ))}
            </div>

            {/* ✅ WhatsApp Modal Component */}
     <WhatsAppShareModal
  currentData={results[currentIndex]}
  allResults={results}
/>

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 flex justify-center">

            <div className="w-full max-w-md">

              {/* Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                >
                  Prev
                </button>

                <p className="text-sm text-gray-500">
                  Result {currentIndex + 1} of {results.length}
                </p>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === results.length - 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              {/* Copy Button */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={() => handleCopy(results[currentIndex])}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1 rounded-full"
                >
                  Copy
                </button>
              </div>

              {/* Animated Result */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <ScanResult data={results[currentIndex]} />
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CardScanner;