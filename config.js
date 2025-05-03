const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Ayik Kiya",
    ownerNumber: process.env.OWNER_NUMBER || "6285161714488",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Indonesia",
    botName: process.env.BOT_NAME || "Wasbot AI",
    exifPack: process.env.EXIF_PACK || "Wasbot AI",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 Ayik Kiya",
    timeZone: process.env.TIME_ZONE || "Asia/Jakarta",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "AYIK-KIYA_SNQ8DajV",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Wasbot AI config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
