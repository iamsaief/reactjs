import { GoogleGenAI } from "@google/genai";

/**
 * A curated collection of fallback quotes categorized by age group.
 * Each quote includes the text and the original author.
 */
const AGE_CATEGORIZED_QUOTES = {
  childhood: [
    // Ages 0-12
    {
      text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go",
      author: "Dr. Seuss",
    },
    { text: "Why fit in when you were born to stand out?", author: "Dr. Seuss" },
    {
      text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose",
      author: "Dr. Seuss",
    },
  ],
  teen: [
    // Ages 13-19
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  ],
  young_adult: [
    // Ages 20-39
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  ],
  midlife: [
    // Ages 40-59
    { text: "It's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
  ],
  wisdom: [
    // Ages 60+
    { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
    {
      text: "The great thing about getting older is that you don't lose all the other ages you've been.",
      author: "Madeleine L'Engle",
    },
    { text: "Age is an issue of mind over matter. If you don't mind, it doesn't matter.", author: "Mark Twain" },
  ],
};

/**
 * Selects an age-appropriate fallback quote.
 * @param ageInYears The user's age.
 * @returns A QuoteData object with text and author.
 */
const getFallbackQuote = (ageInYears) => {
  let category;
  if (ageInYears <= 12) category = "childhood";
  else if (ageInYears <= 19) category = "teen";
  else if (ageInYears <= 39) category = "young_adult";
  else if (ageInYears <= 59) category = "midlife";
  else category = "wisdom";

  const quotes = AGE_CATEGORIZED_QUOTES[category];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Attempt to get the API key from environment variables.
// const apiKey = process.env.API_KEY;
const apiKey = import.meta.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

if (!apiKey) {
  console.warn("Gemini API_KEY not found. Using age-categorized fallback quotes.");
}

/**
 * Fetches an age-appropriate quote.
 * If an API key is available, it queries the Gemini API.
 * Otherwise, it returns a quote from the age-categorized fallback list.
 * @param ageInYears The user's age in years.
 * @returns A promise that resolves to a QuoteData object.
 */
export const fetchAgeQuote = async (ageInYears) => {
  // If the AI client wasn't initialized (no API key), return a fallback quote immediately.
  if (!ai) {
    return getFallbackQuote(ageInYears);
  }

  const prompt = `Generate a short, one-sentence, inspiring or witty quote suitable for someone who is ${ageInYears} years old. Do not include any introductory text like "Here is a quote:". Just provide the quote itself.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 1,
        maxOutputTokens: 60,
        // When using maxOutputTokens with gemini-2.5-flash, thinkingBudget must be set
        // to prevent the response from being empty.
        thinkingConfig: { thinkingBudget: 30 },
      },
    });

    const text = response.text?.trim();
    if (text) {
      // On success, attribute the quote to Gemini AI.
      return { text, author: "Gemini AI" };
    }

    console.warn("Gemini API returned an empty response, using fallback.", response);
    // Fallback if the API response is valid but the text content is empty.
    return getFallbackQuote(ageInYears);
  } catch (error) {
    console.error("Error fetching quote from Gemini API:", error);
    // Fallback for any API errors (e.g., network issues, invalid key).
    return getFallbackQuote(ageInYears);
  }
};
