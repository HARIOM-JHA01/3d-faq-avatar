import { useState, useEffect, useCallback } from "react";
import type { SpeechRecognitionResult } from "../types";

export function useSpeechRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");

    const startListening = useCallback(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const result = event.results[0][0];
                setTranscript(result.transcript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
            setIsListening(true);
        } else {
            alert("Speech recognition is not supported in this browser.");
        }
    }, []);

    return { isListening, transcript, startListening };
}
