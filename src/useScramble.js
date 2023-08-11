  import { useState, useEffect } from 'react';

  const randomChar = () => String.fromCharCode(Math.random() * (126 - 33) + 33);

  const useScramble = (text, trigger, scrambleTime = 200, intervalTime = 50) => {
    const [scrambledText, setScrambledText] = useState(text);
    useEffect(() => {
      let i = 0;
      const scrambleInterval = setInterval(() => {
        setScrambledText(text.substr(0, i) + randomChar() + text.substr(i + 1));
        i = (i + 1) % text.length;
      }, intervalTime);
      const timeoutId = setTimeout(() => {
        clearInterval(scrambleInterval);
        setScrambledText(text);
      }, scrambleTime);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(scrambleInterval);
      };
    }, [trigger, text, scrambleTime, intervalTime]);
    return scrambledText;
  };

  export default useScramble;
