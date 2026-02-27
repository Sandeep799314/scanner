// client/src/utils/generateWhatsappLink.js

/**
 * IMPORTANT:
 * Backend already generates full WhatsApp message.
 * Frontend should NOT rebuild the message.
 * Just use backend whatsappLink.
 */

const generateWhatsappLink = (card = {}) => {
  // Use backend generated link
  if (card?.whatsappLink) {
    return card.whatsappLink;
  }

  // Fallback (rare case)
  if (card?.phone) {
    const cleanedPhone = card.phone.replace(/\D/g, "");
    return `https://wa.me/${cleanedPhone}`;
  }

  return "#";
};

export default generateWhatsappLink;