import visionService from "./visionOAuthService.js"

const normalizeText = text =>
  text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()

const extractEmail = text =>
  text.match(/\S+@\S+\.\S+/)?.[0] || ""

const extractPhone = text =>
  text.match(/(\+?\d[\d\s-]{8,15}\d)/)?.[0]?.replace(/\s+/g, "") || ""

const extractWebsite = text =>
  text.match(/\b((https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/)?.[0] || ""

const extractName = text => {
  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 2)

  for (let line of lines) {
    if (
      !line.includes("@") &&
      !line.toLowerCase().includes("road") &&
      !line.match(/\d{3,}/) &&
      /^[A-Za-z\s.]+$/.test(line) &&
      line.split(" ").length <= 4
    ) {
      return line
    }
  }

  return lines[0] || ""
}

const extractCompany = text => {
  const keywords = [
    "ltd",
    "pvt",
    "llp",
    "inc",
    "solutions",
    "technologies",
    "private",
    "limited",
    "paint",
    "cement"
  ]

  const lines = text.split("\n")

  for (let line of lines) {
    const lower = line.toLowerCase()
    if (keywords.some(k => lower.includes(k))) {
      return line.trim()
    }
  }

  return ""
}

const ocrService = async imagePath => {
  const rawText = await visionService(imagePath)
  const cleanText = normalizeText(rawText)

  return {
    name: extractName(cleanText),
    email: extractEmail(cleanText),
    phone: extractPhone(cleanText),
    website: extractWebsite(cleanText),
    company: extractCompany(cleanText),
    rawText: cleanText
  }
}

export default ocrService