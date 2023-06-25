import { useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);
  const [quoteId, setQuoteId] = useState(null);
  const [typedQuote, setTypedQuote] = useState(null);

 

  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setQuoteId(data._id);
        setTypedQuote(null);
        startTyping(data.content);
      })
      .catch(error => console.error(error));
  };

  const startTyping = quoteText => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedQuote(quoteText.slice(0, index));
      index++;
      if (index > quoteText.length) {
        clearInterval(typingInterval);
      }
    }, 50);
  };

  const handleClick = () => {
    fetchQuote();
  };

  return (
    <main>
      <div className="container shadow d-flex p-3 flex-column dark-blue justify-content-center align-items-center rounded-4">
        <div className="container d-flex w-100 flex-column justify-content-evenly align-items-center">
          <a className="advice-number p-2" href="https://eneseken.com" target="_blank">
            {quoteId ? `ADVICE #${quoteId}` : 'Waiting...'}
          </a>
          <quote className="text-white p-2 mb-2">"{typedQuote || 'Waiting...'}"</quote>
        </div>
        <img className="divider" src="images/pattern-divider-desktop.svg" alt="image" />
        <button className="dice-btn rounded-5" onClick={handleClick}>
          <img className="dice" src="images/icon-dice.svg" alt="image" />
        </button>
      </div>
    </main>
  );
}

export default App;
