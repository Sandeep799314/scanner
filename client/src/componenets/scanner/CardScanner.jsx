import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud } from "lucide-react";
import Loader from "./Loader";
import ScanResult from "./ScanResult";
import { scanCard } from "../../services/api";

const CardScanner = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ===============================
     HANDLE FILE CHANGE
  =============================== */
  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
    setImage(file);
  };

  /* ===============================
     DRAG DROP
  =============================== */
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  /* ===============================
     HANDLE SCAN
  =============================== */
  const handleScan = async () => {
    if (!image) {
      setError("Please upload a business card image.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await scanCard(image);

      // Handle different backend structures safely
      const extractedData =
        response?.data ||
        response?.card ||
        response;

      setResult(extractedData);
    } catch (err) {
      setError(
        err?.message ||
        "Something went wrong while scanning."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="w-full">

      {/* Drag & Drop Area */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-primary/30 rounded-3xl p-6 text-center cursor-pointer transition-all bg-white/40 backdrop-blur-md"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="fileUpload"
          onChange={(e) =>
            handleFileChange(e.target.files[0])
          }
        />

        <label htmlFor="fileUpload" className="cursor-pointer">

          {!preview ? (
            <div className="flex flex-col items-center gap-4">
              <UploadCloud
                size={40}
                className="text-primary"
              />
              <p className="text-muted">
                Drag & Drop your card image here <br />
                or{" "}
                <span className="text-primary font-medium">
                  Click to Upload
                </span>
              </p>
            </div>
          ) : (
            <motion.img
              key={preview}
              src={preview}
              alt="Preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl max-h-56 mx-auto object-contain"
            />
          )}

        </label>
      </motion.div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">
          {error}
        </p>
      )}

      {/* Scan Button */}
      <button
        onClick={handleScan}
        disabled={loading}
        className="btn-primary w-full mt-6"
      >
        {loading ? "Processing..." : "Scan Card"}
      </button>

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && <ScanResult data={result} />}
      </AnimatePresence>

    </div>
  );
};

export default CardScanner;