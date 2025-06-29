const express = require("express");
const axios = require("axios");
const app = express();

const KEYAUTH_CONFIG = {
  ownerid: "c3ctpOZt7u",
  name: "Marketada",
  version: "1.0"
};

app.get("/verificar", async (req, res) => {
  const key = req.query.key;

  if (!key) {
    return res.status(400).json({ success: false, message: "Key não enviada" });
  }

  const payload = {
    type: "login",
    key: key,
    name: KEYAUTH_CONFIG.name,
    ownerid: KEYAUTH_CONFIG.ownerid,
    version: KEYAUTH_CONFIG.version
  };

  console.log("📦 Payload enviado:", payload);

  try {
    const response = await axios.post("https://keyauth.win/api/1.3/", payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return res.json(response.data);
  } catch (err) {
    console.error("❌ Erro:", err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Erro ao verificar key" });
  }
});

app.get("/", (req, res) => {
  res.send("🟢 API KeyAuth está online");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Servidor rodando");
});