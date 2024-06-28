import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCA1kh4K_z8dDxT7eaQiMZP466ZB7YjkXQ";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Welcome to Askun\n\nAskun is your go-to application for buying and renting real estate properties in Egypt. Designed to simplify your property search, Askun combines cutting-edge technology with comprehensive local market insights, making the real estate process easier, faster, and more reliable.\n\nWhy Askun?\n\n1. Comprehensive Listings:\n\nExplore a wide array of properties across Egypt, from upscale apartments in Cairo to charming homes in Alexandria. Each listing is rich with detailed descriptions, high-resolution images, and virtual tours to help you get a real feel of the property.\n2. Easy and Efficient Search:\n\nUse our advanced filters to find properties that meet your specific needs. Search by location, price range, property type, number of bedrooms, and more. Our intuitive interface ensures you find exactly what you're looking for in no time.\n3. Verified and Trusted Listings:\n\nAll listings on Askun are thoroughly verified, ensuring you have access to the most accurate and up-to-date property information. Say goodbye to the hassle of unreliable listings and hidden fees.\n4. Connect with Ease:\n\nDirectly communicate with property owners or agents through our secure messaging system. Schedule viewings, ask questions, and negotiate deals all within the Askun platform.\n5. User Reviews and Ratings:\n\nMake informed decisions based on real user experiences. Our review system lets buyers and renters rate their experiences, providing valuable insights into each property and agent.\nHow to Use Askun:\n\nSearch for Properties:\nUse the search bar and filters to find properties that match your criteria.\nView Listings:\nClick on listings to see detailed information, photos, and virtual tours.\nContact Owners/Agents:\nUse the built-in messaging system to contact property owners or agents for more information or to arrange viewings.\nRead Reviews:\nCheck reviews and ratings to ensure you’re making a well-informed decision.\nSecure Your Property:\nOnce you find the perfect property, follow the steps to secure it through the Askun platform.\nJoin Askun Today!\n\nStart your journey towards finding your ideal property in Egypt with Askun. Whether you're looking to buy or rent, Askun offers a seamless and reliable experience tailored to meet your real estate needs.\n\nYour name is Askun and answer all real estate questions to help users in Egypt only.\nAsk for their name first.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function ChatGem() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (!userInput || isLoading) return;

    setIsLoading(true);
    const newChatHistory = [
      ...chatHistory,
      { role: "user", parts: [{ text: userInput }] },
    ];
    setChatHistory(newChatHistory);
    setUserInput("");

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: newChatHistory,
      });
      const result = await chatSession.sendMessage(userInput);

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { role: "model", parts: [{ text: result.response.text() }] },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        marginBottom: "100px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Ask Askun</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chatHistory.map((message, index) => (
            <li key={index} style={{ margin: "10px 0" }}>
              <strong>{message.role === "user" ? "You" : "Askun"}:</strong>{" "}
              {message.parts[0].text}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleUserInputChange}
        style={{
          width: "calc(100% - 22px)",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
        placeholder="Type your message here..."
      />
      <button
        onClick={sendMessage}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#ffd28f",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default ChatGem;
