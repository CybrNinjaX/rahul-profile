import { useEffect, useState } from "react";

function TextType({ text, active, typingSpeed = 50, initialDelay = 20, onComplete, className = "" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedText(text);
      onComplete?.();
      return undefined;
    }

    let index = 0;
    let typingTimer;
    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        index += 1;
        setDisplayedText(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(typingTimer);
          onComplete?.();
        }
      }, typingSpeed);
    }, initialDelay);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(typingTimer);
    };
  }, [active, initialDelay, onComplete, text, typingSpeed]);

  return (
    <span className={`text-type ${className}`} aria-label={text}>
      <span aria-hidden="true">{displayedText}</span>
      {active && <span className="text-type-cursor" aria-hidden="true">|</span>}
    </span>
  );
}

export default TextType;
