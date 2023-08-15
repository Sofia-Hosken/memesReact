import { useState } from 'react'
import './App.css'

function App() {
  const [meme, setMeme] = useState(null);
  const [quote, setQuote] = useState('');

  const getMeme = async () => {
    try {
      const memeResponse = await fetch("https://api.imgflip.com/get_memes");
      const memeData = await memeResponse.json();
      const memes = memeData.data.memes;
      const randomIndex = Math.floor(Math.random() * memes.length);
      const selectedMeme = memes[randomIndex];

      const quoteResponse = await fetch("https://api.quotable.io/random");
      const quoteData = await quoteResponse.json();
      const selectedQuote = quoteData.content;

      setMeme(selectedMeme);
      setQuote(selectedQuote);
    } catch (error) {
      console.error("Erro ao obter o meme:", error);
    }
  };

  useEffect(() => {
    getMeme();
  }, []);

  return (
    <div className="App">
      <h1>Meme Generator</h1>
      <button onClick={getMeme}>Obter Meme</button>
      <div id="memeContainer">
        {meme && (
          <>
            <h2>{meme.name}</h2>
            <img src={meme.url} alt={meme.name} />
            <p>{quote}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
