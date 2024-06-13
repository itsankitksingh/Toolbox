import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import './TextEditor.css'; // Assuming you have a CSS file for styling

export const TextEditor = () => {
    const [text, setText] = useState("");
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [replaceTerm, setReplaceTerm] = useState("");

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        updateText(newText);
        toast.success("Converted to Uppercase");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        updateText(newText);
        toast.success("Converted to Lowercase");
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const copyText = () => {
        navigator.clipboard.writeText(text);
        toast.success("Text copied to clipboard");
    }

    const textToSpeech = () => {
        const Speech = new SpeechSynthesisUtterance(text);
        Speech.lang = 'en';
        window.speechSynthesis.speak(Speech);
    }

    const clearText = () => {
        updateText("");
        toast.success("Text cleared");
    }

    const updateText = (newText) => {
        setHistory([...history, text]);
        setRedoStack([]);
        setText(newText);
    }

    const handleUndo = () => {
        if (history.length > 0) {
            const prevText = history.pop();
            setRedoStack([...redoStack, text]);
            setText(prevText);
        }
    }

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextText = redoStack.pop();
            setHistory([...history, text]);
            setText(nextText);
        }
    }

    const countVowels = (str) => {
        return str.match(/[aeiouAEIOU]/g)?.length || 0;
    }

    const countConsonants = (str) => {
        return str.match(/[^aeiouAEIOU\s\W\d]/g)?.length || 0;
    }

    const replaceWord = (oldWord, newWord) => {
        const newText = text.replace(new RegExp(`\\b${oldWord}\\b`, 'g'), newWord);
        updateText(newText);
        toast.success(`Replaced all occurrences of '${oldWord}' with '${newWord}'`);
    }

    const reverseText = () => {
        const newText = text.split('').reverse().join('');
        updateText(newText);
        toast.success("Text reversed");
    }

    const countSentences = (str) => {
        return str.split(/[.!?]/).filter(sentence => sentence.length > 0).length;
    }

    const charLimitWarning = () => {
        const charLimit = 500;
        if (text.length > charLimit) {
            toast.warning(`Character limit of ${charLimit} exceeded!`);
        }
    }

    const highlightWord = (word) => {
        const highlightedText = text.replace(new RegExp(`(${word})`, 'gi'), (match) => `<mark>${match}</mark>`);
        document.getElementById("myBox").innerHTML = highlightedText;
    }

    const countParagraphs = (str) => {
        return str.split(/\n+/).filter(paragraph => paragraph.length > 0).length;
    }

    const capitalizeText = () => {
        const newText = text.replace(/\b\w/g, char => char.toUpperCase());
        updateText(newText);
        toast.success("Text capitalized");
    }

    const sortWords = () => {
        const newText = text.split(' ').sort().join(' ');
        updateText(newText);
        toast.success("Words sorted alphabetically");
    }

    const removeExtraSpaces = () => {
        const newText = text.replace(/\s+/g, ' ').trim();
        updateText(newText);
        toast.success("Extra spaces removed");
    }

    const textEncryption = () => {
        const encryptedText = btoa(text);
        updateText(encryptedText);
        toast.success("Text encrypted");
    }

    const textDecryption = () => {
        try {
            const decryptedText = atob(text);
            updateText(decryptedText);
            toast.success("Text decrypted");
        } catch (e) {
            toast.error("Invalid encrypted text");
        }
    }

    const checkPalindrome = () => {
        const cleanedText = text.replace(/[\W_]/g, '').toLowerCase();
        const isPalindrome = cleanedText === cleanedText.split('').reverse().join('');
        toast.success(isPalindrome ? "Text is a palindrome" : "Text is not a palindrome");
    }

    const addDateTime = () => {
        const dateTime = new Date().toLocaleString();
        const newText = `${text}\n${dateTime}`;
        updateText(newText);
        toast.success("Date and time added");
    }

    const wordCountFrequency = (str) => {
        const words = str.split(/\s+/).filter(word => word.length > 0);
        const wordFrequency = words.reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {});
        return wordFrequency;
    }

    const toggleCase = () => {
        const newText = text.split('').map(char => {
            return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
        }).join('');
        updateText(newText);
        toast.success("Case toggled");
    }

    const findLongestWord = () => {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const longestWord = words.reduce((longest, currentWord) => currentWord.length > longest.length ? currentWord : longest, "");
        toast.success(`Longest word is '${longestWord}'`);
    }

    const removeDuplicates = () => {
        const words = text.split(/\s+/);
        const uniqueWords = [...new Set(words)];
        const newText = uniqueWords.join(' ');
        updateText(newText);
        toast.success("Duplicate words removed");
    }

    const alternateCase = () => {
        const newText = text.split('').map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');
        updateText(newText);
        toast.success("Text converted to alternate case");
    }

    const countWordsStartingWith = (letter) => {
        const words = text.split(/\s+/).filter(word => word.startsWith(letter));
        return words.length;
    }

    const countWordsEndingWith = (letter) => {
        const words = text.split(/\s+/).filter(word => word.endsWith(letter));
        return words.length;
    }

    return (
        <div className="text-editor-container">
            <h1 className="title">Text Editor</h1>
            <form className="text-area-form">
                <div className="textarea-container">
                    <textarea
                        value={text}
                        onChange={handleOnChange}
                        id="myBox"
                        rows="8"
                        placeholder='Enter your text here'
                        onBlur={charLimitWarning}
                        className="textarea"
                    ></textarea>
                </div>
            </form>
            <div className="btn-tool-container">
                <button onClick={handleUpClick} className="btn-tool">Convert to Uppercase</button>
                <button onClick={handleLoClick} className="btn-tool">Convert to Lowercase</button>
                <button onClick={copyText} className="btn-tool">Copy Text</button>
                <button onClick={textToSpeech} className="btn-tool">Text to Speech</button>
                <button onClick={clearText} className="btn-tool">Clear</button>
                <button onClick={handleUndo} className="btn-tool">Undo</button>
                <button onClick={handleRedo} className="btn-tool">Redo</button>
                <button onClick={() => replaceWord(searchTerm, replaceTerm)} className="btn-tool">Replace '{searchTerm}' with '{replaceTerm}'</button>
                <button onClick={reverseText} className="btn-tool">Reverse Text</button>
                <button onClick={capitalizeText} className="btn-tool">Capitalize Text</button>
                <button onClick={sortWords} className="btn-tool">Sort Words</button>
                <button onClick={removeExtraSpaces} className="btn-tool">Remove Extra Spaces</button>
                <button onClick={textEncryption} className="btn-tool">Encrypt Text</button>
                <button onClick={textDecryption} className="btn-tool">Decrypt Text</button>
                <button onClick={checkPalindrome} className="btn-tool">Check Palindrome</button>
                <button onClick={addDateTime} className="btn-tool">Add Date & Time</button>
                <button onClick={toggleCase} className="btn-tool">Toggle Case</button>
                <button onClick={findLongestWord} className="btn-tool">Find Longest Word</button>
                <button onClick={removeDuplicates} className="btn-tool">Remove Duplicates</button>
                <button onClick={alternateCase} className="btn-tool">Alternate Case</button>
            </div>
            <div className="text-info">
                <h2>About Your Text</h2>
                <p>{text.split(" ").filter(word => word.length > 0).length} Words and {text.length} Characters</p>
                <p>{0.008 * text.split(" ").filter(word => word.length > 0).length} Minutes to Read</p>
                <p>{countVowels(text)} Vowels and {countConsonants(text)} Consonants</p>
                <p>{countSentences(text)} Sentences</p>
                <p>{countParagraphs(text)} Paragraphs</p>
                <p>Word Frequency: {JSON.stringify(wordCountFrequency(text))}</p>
                <p>Words starting with 'a': {countWordsStartingWith('a')}</p>
                <p>Words ending with 'e': {countWordsEndingWith('e')}</p>
            </div>
        </div>
    )
}
