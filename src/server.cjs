const PORT=8000||process.env.PORT
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
app.use(express.json())
app.use(cors())


const LANGUAGE_MODEL_API_KEY = process.env.LANGUAGE_MODEL_API_KEY
const LANGUAGE_MODEL_API_URL =  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${LANGUAGE_MODEL_API_KEY}`


const genAI = new GoogleGenerativeAI(process.env.LANGUAGE_MODEL_API_KEY);

app.get("/prompt/:text", async (req, res) => {
    const { text } = req.params
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt =text

  const result = await model.generateContent(prompt);
  const response = await result.response;


   // Add the promptText to the response
   const modifiedResponse = {
    promptText: prompt,
    responseText: response.text(),
    // ... (other fields from the response)
};


    console.log(modifiedResponse);
  const text1 = response.text();
  console.log(text1);
  res.send(modifiedResponse)


  

    
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))




