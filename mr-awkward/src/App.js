// App.js
import React, { useState } from 'react';
import ConversationStarter from './ConversationStarter';
import './App.css'; 

const App = () => {
  const [generatedStarter, setGeneratedStarter] = useState(null);

  const generateConversationStarter = async () => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: 'Generate a random ice breaker conversation starter. Make them funny and engaging, and not predictable',
          max_tokens: 50, 
        }),
      });

      const data = await response.json();
      setGeneratedStarter(data.choices[0]?.text.trim());
    } catch (error) {
      console.error('Error generating conversation starter:', error);
    }
  };

  return (
    <div className="app">
      <h1>Mr. Awkward</h1>
      <h3>Are you an awarkard person who doens't know how to spark a conversation?</h3>

      <button className="generate-button" onClick={generateConversationStarter}>
  Spark a Conversation
</button>


      {generatedStarter && (
        <div className="generated-starter">
          <ConversationStarter text={generatedStarter} />
        </div>
      )}


<div className="footer">
      <p className="copyright">
        Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.
        Created by <a href="https://www.matthewlynewatt.com/" target="_blank" rel="noopener noreferrer">Matthew Lyne-Watt</a>
      </p>
    </div>
    </div>
  );
};

export default App;