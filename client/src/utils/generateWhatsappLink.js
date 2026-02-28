const generateWhatsappLink = (cards) => {
  // अगर सिंगल ऑब्जेक्ट है तो उसे एरे में बदलें
  const cardsArray = Array.isArray(cards) ? cards : [cards];
  
  let message = `Hello 👋\n\n📝 *Scanned Business Card Details*\n\n`;

  cardsArray.forEach((card, index) => {
    let cardInfo = "";

    // डेटा को चेक करने के लिए हेल्पर फंक्शन
    const isValid = (val) => {
      if (!val) return false;
      const cleanVal = val.toString().trim().toLowerCase();
      return cleanVal !== "" && cleanVal !== "-" && cleanVal !== "n/a" && cleanVal !== "null";
    };

    if (isValid(card.name)) cardInfo += `👤 *Name* : ${card.name}\n`;
    if (isValid(card.email)) cardInfo += `📧 *Email* : ${card.email}\n`;
    if (isValid(card.phone)) cardInfo += `📞 *Phone* : ${card.phone}\n`;
    if (isValid(card.company)) cardInfo += `🏢 *Company* : ${card.company}\n`;
    if (isValid(card.designation)) cardInfo += `💼 *Designation* : ${card.designation}\n`;
    if (isValid(card.website)) cardInfo += `🌐 *Website* : ${card.website}\n`;

    // अगर कार्ड में कुछ असली डेटा मिला है, तभी जोड़ें
    if (cardInfo !== "") {
      message += `━━━━━━━━━━━━━━━━━━\n`;
      message += `📇 *Card ${index + 1}*\n`;
      message += `━━━━━━━━━━━━━━━━━━\n`;
      message += cardInfo + `\n`;
    }
  });

  message += `Thank you! 😊`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};

export default generateWhatsappLink;