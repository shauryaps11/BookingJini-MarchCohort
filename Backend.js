const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/generate_post", async (req, res) => {
    try {
        const { occasion, hotel_name } = req.body;
        const prompt_text = `Generate a short and engaging social media caption for a hotel named ${hotel_name} celebrating ${occasion}.`;
        
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an expert social media marketer." },
                { role: "user", content: prompt_text }
            ]
        }, {
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        
        const caption = response.data.choices[0].message.content.trim();
        res.json({ caption });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
