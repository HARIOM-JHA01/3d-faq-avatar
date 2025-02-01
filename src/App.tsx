import React, { useState, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Scene } from './components/Scene';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { faqs } from './data/faq';

function App() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { isListening, transcript, startListening } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  const findAnswer = useCallback((question: string) => {
    const matchedFaq = faqs.find(faq => 
      faq.question.toLowerCase().includes(question.toLowerCase()) ||
      question.toLowerCase().includes(faq.question.toLowerCase())
    );
    return matchedFaq?.answer || "I'm sorry, I couldn't find an answer to that question.";
  }, []);

  const handleSpeak = useCallback(async () => {
    if (transcript) {
      const answer = findAnswer(transcript);
      setIsSpeaking(true);
      await speak(answer);
      setIsSpeaking(false);
    }
  }, [transcript, findAnswer, speak]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[600px] rounded-lg overflow-hidden bg-gray-800">
            <Scene isSpeaking={isSpeaking} />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">Interactive FAQ Assistant</h1>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Ask me anything</h2>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  {isListening ? 'Listening...' : 'Start Speaking'}
                </button>
                {transcript && (
                  <button
                    onClick={handleSpeak}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    Get Answer
                  </button>
                )}
              </div>
              {transcript && (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium">You said:</p>
                  <p className="text-gray-300">{transcript}</p>
                </div>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Available Questions</h2>
              <ul className="space-y-2">
                {faqs.map((faq, index) => (
                  <li key={index} className="text-gray-300 hover:text-white cursor-pointer">
                    {faq.question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;