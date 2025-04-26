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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRURSUHdxSmwwVnFxTHBWbFBTVzBJNTBEczZ1Q0dHaFhlbGVpY2NlSktGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHNXTXdnR2tqQ1RWSkMvcldhNVZjdVE2WTJwWm5tejJWSU1TUUR3VTZEcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhR1RocVVYQ0hIRG8zWjBseXNScEZyL0JtQ1Q5ZXBrMnUrUE5ZdlBhSzA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIRnJ5Tjk1Y3FMOTIxd0xVTEs3eGEwcUEwVnVpd1ZDY2w5eGROQXFNaVIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNNdVE3QVZieFdETDBBZG1TK2p4U29KeDVCU0dNR3JJRXNtR1lUODB5SFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxpaWg2MGZSbTh2L3JqTzA5NTg1SG92MXduUjZnMDlETmE1a3VWUjF3V0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOExOVFRHaEQ0NlZ0ZC82VDhuVFlEK2dNY25CbFFEejZOMlZoV3lvUmFVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWTJEUlVMczc2TElXUitKQUtDUlpPOTNTMCtEVThKSE0wMWVQRWdMMFR3az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpWaFJMUTFRK0NUbmZzVFZHcXcxMFdSK0lnVkFrdVlQcytFUEtkLysxcVJWc29aR2NiTzJpdmFGTk11VGhTbFJ3YjI4bGRENExoQXhkVnZuNkVmcEF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ5LCJhZHZTZWNyZXRLZXkiOiJ5V3hNZDNoS21IWXg0eFQ0RmVhZXduNXNzNUFvRUNibmNDWGlDL081c1pVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjYyODUxNjE3MTQ0ODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTMxQkZERDdDMTdBM0RDMEQ4MkY4RjQzQTgyRDdCOTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTY3MTY3NX0seyJrZXkiOnsicmVtb3RlSmlkIjoiNjI4NTE2MTcxNDQ4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1QjlBNTAwRTYxMUM0MDExNUJFNjI1OEY5MDVEOURFMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1NjcxNjc1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJDNjQ2SkQyWiIsIm1lIjp7ImlkIjoiNjI4NTE2MTcxNDQ4ODo4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkIyQi1PbmxpbmUiLCJsaWQiOiIxNTc2MjExMzkwNzUzMjM6OEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ015Znh0VUZFT3lyczhBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImhjY0pyYnNsUXhHYTVISW16cTc5aHJmVWc0RXZsYWJpM2Z1NXNFNi9sRTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ilg0ZEQzWllUTytpa3dxalRmb0hNdzllbnFSWXlxbUtIc1k2RmNyQjZRRVBFQmt5VmZIdGJ1d01TZC9ZaGlqZVd1MXJmQmIyeTl4RkNKRitiaTBuaEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJTNlZnd2FuVGZacENuaEZPOUFmWjVuMEtqb3JoNG0vTnFKL1ZWZVI3T2U0bzFrMFo5UUJ1K2xZUitoNDdWRkFLTGRwZUNHVEs1SU1hVldPTGcrdmREUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjYyODUxNjE3MTQ0ODg6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZWEhDYTI3SlVNUm11UnlKczZ1L1lhMzFJT0JMNVdtNHQzN3ViQk92NVJOIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2NzE2NzQsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSnlMIn0=",
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
