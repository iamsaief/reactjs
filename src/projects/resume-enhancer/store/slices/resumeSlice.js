import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  originalResume: "",
  enhancedResume: "",
  isLoading: false,
  error: null,
  apiKey: "",
  selectedProvider: "claude",
};

export const enhanceResume = createAsyncThunk("resume/enhance", async (_, { getState }) => {
  const state = getState();
  const { originalResume, selectedProvider } = state.resume;

  // Get API key from localStorage for the selected provider
  const apiKey = localStorage.getItem(`resumeApiKey_${selectedProvider}`) || "";

  if (!apiKey) {
    throw new Error(
      "API key is required. Please enter your API key above. You can get free API keys from the providers listed."
    );
  }

  if (!originalResume.trim()) {
    throw new Error("Please provide resume content to enhance.");
  }

  if (originalResume.length < 50) {
    throw new Error("Resume content seems too short. Please provide more detailed information.");
  }

  const prompt = `Transform this resume into a perfect, ATS-optimized, professional resume that will significantly increase hiring chances. 

Instructions:
- Enhance content clarity and impact using strong action verbs
- Optimize for ATS systems with relevant industry keywords
- Improve formatting and structure for maximum readability
- Strengthen achievement statements with quantifiable results where possible
- Ensure professional tone and compelling narrative flow
- Preserve all personal information exactly as provided
- Format with clean, consistent styling using markdown
- Focus on highlighting unique value propositions
- Use proper section headers and bullet points
- Ensure the resume is compelling and stands out

Please provide the enhanced resume in a clean, professional markdown format with proper sections and bullet points.

Original Resume:
${originalResume}`;

  let apiUrl = "";
  let headers = {};
  let body = {};

  try {
    switch (selectedProvider) {
      case "claude":
        apiUrl = "https://api.anthropic.com/v1/messages";
        headers = {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        };
        body = {
          model: "claude-3-haiku-20240307", // Free model
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        };
        break;
      case "openai":
        apiUrl = "https://api.openai.com/v1/chat/completions";
        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        };
        body = {
          model: "gpt-3.5-turbo", // Free model
          messages: [{ role: "user", content: prompt }],
          max_tokens: 4000,
        };
        break;
      case "gemini":
        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        headers = {
          "Content-Type": "application/json",
        };
        body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 4000,
          },
        };
        break;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          `Invalid API key for ${selectedProvider}. Please check your API key or get a free one from the link above.`
        );
      } else if (response.status === 429) {
        throw new Error(
          `Rate limit exceeded for ${selectedProvider}. Please try again in a few minutes or check your usage limits.`
        );
      } else if (response.status === 403) {
        throw new Error(
          `Access forbidden. Your ${selectedProvider} API key may not have the required permissions or credits.`
        );
      } else if (response.status >= 500) {
        throw new Error(
          `${selectedProvider} service is temporarily unavailable. Please try again later or switch to a different provider.`
        );
      } else {
        const errorData = await response.text();
        throw new Error(`API request failed (${response.status}): Please check your API key and try again.`);
      }
    }

    const data = await response.json();

    let enhancedText = "";
    switch (selectedProvider) {
      case "claude":
        if (!data.content || !data.content[0] || !data.content[0].text) {
          throw new Error("Invalid response from Claude API. Please try again.");
        }
        enhancedText = data.content[0].text;
        break;
      case "openai":
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error("Invalid response from OpenAI API. Please try again.");
        }
        enhancedText = data.choices[0].message.content;
        break;
      case "gemini":
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
          throw new Error("Invalid response from Gemini API. Please try again.");
        }
        enhancedText = data.candidates[0].content.parts[0].text;
        break;
    }

    if (!enhancedText.trim()) {
      throw new Error("AI generated empty response. Please try again with more detailed resume content.");
    }

    return enhancedText;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your internet connection and try again.");
  }
});

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setOriginalResume: (state, action) => {
      state.originalResume = action.payload;
      if (state.enhancedResume) {
        state.enhancedResume = "";
      }
      state.error = null;
    },
    setApiKey: (state, action) => {
      state.apiKey = action.payload;
      state.error = null;
    },
    setProvider: (state, action) => {
      state.selectedProvider = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearResumes: (state) => {
      state.originalResume = "";
      state.enhancedResume = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enhanceResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enhanceResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enhancedResume = action.payload;
      })
      .addCase(enhanceResume.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to enhance resume. Please try again.";
      });
  },
});

export const { setOriginalResume, setApiKey, setProvider, clearError, clearResumes } = resumeSlice.actions;
export default resumeSlice.reducer;
