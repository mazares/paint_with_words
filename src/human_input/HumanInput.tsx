"use client";

import { useState, useEffect, useRef } from "react";

import "./HumanInput.css";

function HumanInput() {
  const languageOptions = {
    "en-US": "English",
    "es-ES": "Spanish",
    "fr-FR": "French",
    "de-DE": "German",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "ko-KR": "Korean",
    "pt-BR": "Portuguese",
    "ru-RU": "Russian",
    "zh-CN": "Chinese",
    "ar-SA": "Arabic",
    "hi-IN": "Hindi",
    "tr-TR": "Turkish",
    "nl-NL": "Dutch",
    "pl-PL": "Polish",
    "sv-SE": "Swedish",
    "da-DK": "Danish",
    "fi-FI": "Finnish",
    "nb-NO": "Norwegian",
    "cs-CZ": "Czech",
    "el-GR": "Greek",
    "hu-HU": "Hungarian",
    "ro-RO": "Romanian",
    "uk-UA": "Ukrainian",
    "id-ID": "Indonesian",
    "ms-MY": "Malay",
    "th-TH": "Thai",
    "vi-VN": "Vietnamese",
    "bg-BG": "Bulgarian",
    "hr-HR": "Croatian",
    "sk-SK": "Slovak",
    "sq-AL": "Albanian",
    "et-EE": "Estonian",
    "he-IL": "Hebrew",
    "fa-IR": "Persian",
    "af-ZA": "Afrikaans",
    "is-IS": "Icelandic",
    "sw-KE": "Swahili",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "ml-IN": "Malayalam",
    "kn-IN": "Kannada",
    "mr-IN": "Marathi",
    "gu-IN": "Gujarati",
    "pa-IN": "Punjabi",
    "bn-IN": "Bengali",
    "as-IN": "Assamese",
    "ur-PK": "Urdu",
    "or-IN": "Oriya",
    "ne-NP": "Nepali",
    "si-LK": "Sinhala",
    "my-MM": "Burmese",
    "km-KH": "Khmer",
    "lo-LA": "Lao",
    "tl-PH": "Filipino",
    "jv-ID": "Javanese",
    "su-ID": "Sundanese",
    "eu-ES": "Basque",
    "ca-ES": "Catalan",
    "gl-ES": "Galician",
    "cy-GB": "Welsh",
    "gd-GB": "Scots Gaelic",
    "ga-IE": "Irish",
    "st-ZA": "Southern Sotho",
    "tn-ZA": "Tswana",
    "ts-ZA": "Tsonga",
    "ve-ZA": "Venda",
    "xh-ZA": "Xhosa",
    "zu-ZA": "Zulu",
    "ny-MW": "Chichewa",
    "am-ET": "Amharic",
    "ti-ET": "Tigrinya",
    "om-ET": "Oromo",
    "so-SO": "Somali",
    "rn-BI": "Kirundi",
    "rw-RW": "Kinyarwanda",
    "lg-UG": "Ganda",
    "lu-CD": "Luba-Katanga",
    "mg-MG": "Malagasy",
    "sn-ZW": "Shona",
    "nd-ZW": "Northern Ndebele",
    "ch-GU": "Chamorro",
    "haw-US": "Hawaiian"
  };

  const recognitionRef = useRef<SpeechRecognition>(null);

  const [text, setText] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const isSpeechDetected: boolean = false;
  const [language, setlanguage] = useState<string>("en-US");

  const handleOnRecord = () => {
    if (isActive) {
      recognitionRef.current?.stop();
      setIsActive(false);
      return;
    }

    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new speechRecognition();
    recognitionRef.current = recognition;

    recognition.onstart = function () {
      setIsActive(true);
    };
    recognition.onend = function () {
      setIsActive(false);
    };

    recognition.lang = language;

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);

      console.log(transcript);
    };

    recognition.onend = () => {
      console.log("recording stopped");
    };

    recognition.start();
  };

  // const speak = (text: string) => {
  //   let utterance = new SpeechSynthesisUtterance(text);

  //   window.speechSynthesis.speak(utterance);
  // };

  // const handleOnSubmit = (event: any) => {
  //   event.preventDefault();
  //   setText(inputRef.current?.value || "");
  // };

  return (
    <div className="human_input">
      <p>human input</p>
      <p>i say: {text}</p>

      <button onClick={handleOnRecord}>record</button>
      <select
        name="select"
        id="select"
        onChange={(event) =>
          setlanguage((event.target as HTMLSelectElement).value)
        }
      >
        {Object.entries(languageOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HumanInput;
