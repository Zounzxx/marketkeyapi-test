const express = require("express");
const axios = require("axios");
const app = express();

const config = {
  ownerid: "c3ctpOZt7u",       // <-- SEU OwnerID
  appname: "Marketada",        // <-- Nome da aplicação no KeyAuth
  version: "1.0"               // <-- Versão da aplicação
};

app.get("/verificar", async (req, res) => {
  const key = req.query.key;
  if (!key) {
    return res.status(400).json({ success: false, message: "Key não enviada" });
  }

  const data = {
    type: "key",               // <-- ESSENCIAL: tipo correto para key-only
    key: key,
    name: config.appname,
    ownerid: config.ownerid,
    version: config.version
  };

  try {
    const response = await axios.post("https://keyauth.win/api/1.3/", data, {
      headers: { "Content-Type": "application/json" }
    });

    return res.json(response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Erro ao verificar key" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ API KeyAuth Online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Servidor rodando na porta " + PORT);
});

