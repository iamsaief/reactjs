import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setApiKey, setProvider } from "../store/slices/resumeSlice";
import { ExternalLink, Eye, EyeOff, Key } from "lucide-react";

export const ApiKeyInput = () => {
  const dispatch = useAppDispatch();
  const { selectedProvider } = useAppSelector((state) => state.resume);
  const [showApiKey, setShowApiKey] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState("");

  const providers = [
    {
      id: "gemini",
      name: "Google - Gemini",
      placeholder: "AI...",
      freeInfo: "Free tier available at aistudio.google.com",
      signupUrl: "https://aistudio.google.com/apikey",
      model: "gemini-1.5-flash",
    },
    {
      id: "openai",
      name: "OpenAI - ChatGPT",
      placeholder: "sk-...",
      freeInfo: "Get $5 free credits at platform.openai.com",
      signupUrl: "https://platform.openai.com/api-keys",
      model: "gpt-3.5-turbo",
    },
    {
      id: "claude",
      name: "Anthropic - Claude",
      placeholder: "sk-ant-api...",
      freeInfo: "Get $5 free credits at console.anthropic.com",
      signupUrl: "https://console.anthropic.com/dashboard",
      model: "claude-3-haiku-20240307",
    },
  ];

  const currentProvider = providers.find((p) => p.id === selectedProvider);

  // Load API key from localStorage when provider changes
  useEffect(() => {
    const savedApiKey = localStorage.getItem(`resumeApiKey_${selectedProvider}`) || "";
    setCurrentApiKey(savedApiKey);
    dispatch(setApiKey(savedApiKey));
  }, [selectedProvider, dispatch]);

  const handleProviderChange = (providerId) => {
    dispatch(setProvider(providerId));
  };

  const handleApiKeyChange = (value) => {
    setCurrentApiKey(value);
    dispatch(setApiKey(value));
    // Save to localStorage with provider-specific key
    localStorage.setItem(`resumeApiKey_${selectedProvider}`, value);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center space-x-3 mb-4">
        <Key className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Provider Setup</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => handleProviderChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {currentProvider && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800">
                  <strong>API Key:</strong> {currentProvider.freeInfo}
                </p>
                {/* <p className="text-xs text-green-700 mt-1">Using free model: {currentProvider.model}</p> */}
              </div>
              <a
                href={currentProvider.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm font-medium"
              >
                <span>Get API Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={currentApiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder={currentProvider?.placeholder}
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Your API key is stored locally and never sent to our servers</p>
        </div>
      </div>
    </div>
  );
};
