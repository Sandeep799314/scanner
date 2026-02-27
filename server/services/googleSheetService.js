import { google } from "googleapis"
import fs from "fs"

const appendToSheet = async (cardData) => {
  try {

    const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID

    if (!GOOGLE_SHEET_ID) {
      console.log("❌ No Sheet ID")
      return
    }

    if (!fs.existsSync("credentials.json")) {
      console.log("❌ credentials.json missing")
      return
    }

    if (!fs.existsSync("token.json")) {
      console.log("❌ token.json missing")
      return
    }

    const credentials = JSON.parse(
      fs.readFileSync("credentials.json")
    )

    const token = JSON.parse(
      fs.readFileSync("token.json")
    )

    const { client_id, client_secret, redirect_uris } =
      credentials.installed

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    )

    oAuth2Client.setCredentials(token)

    const sheets = google.sheets({
      version: "v4",
      auth: oAuth2Client
    })

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Sheet1!A:H",   // 🔥 UPDATED (A:H)
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          cardData.name || "",
          cardData.email || "",
          cardData.phone || "",
          cardData.company || "",
          cardData.designation || "",
          cardData.website || "",
          cardData.whatsappLink || "",  // 🔥 NEW COLUMN
          new Date().toISOString()
        ]]
      }
    })

    console.log("✅ SHEET SUCCESS:", result.data.updates.updatedRange)

  } catch (error) {
    console.log("❌ SHEET ERROR:", error.message)
  }
}

export default appendToSheet