import { useEffect } from "react";
import { useLocation } from "react-router";

const emojiToFavicon = (emoji) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

export const PageMeta = ({ title, favicon }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    if (favicon) {
      const href = favicon.startsWith("data:") || favicon.startsWith("/") ? favicon : emojiToFavicon(favicon);
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = href;
    }
  }, [location, title, favicon]);

  return null;
};
