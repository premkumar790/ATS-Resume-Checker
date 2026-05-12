import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

console.log("🔥 test.js is running...");

async function test() {
  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "user", content: "Hello, Groq! Testing successful or not?" }
      ],
      model:"llama-3.1-8b-instant",
    });

    console.log("✔️ AI Response:");
    console.log(chatCompletion.choices[0].message.content);

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

test();