"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CareerSuggestionResult from "./CareerSuggestionResult";

const questions = [
  {
    question: "Kamu lebih suka ngerjain?",
    options: [
      { text: "Frontend / UI Design", value: "frontend" },
      { text: "Backend / Logic", value: "backend" },
    ],
  },
  {
    question: "Lebih suka kerjaan yang...",
    options: [
      { text: "Visual & kreatif", value: "frontend" },
      { text: "Analytical & problem solving", value: "backend" },
    ],
  },
  {
    question: "Lebih nyaman kerja di...",
    options: [
      { text: "Tim besar & kolaborasi", value: "frontend" },
      { text: "Individu / Tim kecil", value: "backend" },
    ],
  },
  {
    question: "Lebih senang ngulik...",
    options: [
      { text: "Animasi & Interaksi", value: "frontend" },
      { text: "Database & Performance", value: "backend" },
    ],
  },
];

export default function CareerSuggestionForm() {
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleOptionClick = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const frontendPoints = answers.filter((ans) => ans === "frontend").length;
    const backendPoints = answers.filter((ans) => ans === "backend").length;
    let suggestion = "";

    if (frontendPoints > backendPoints) {
      suggestion = "Kamu cocok menjadi Frontend Developer! 🎨✨";
    } else if (backendPoints > frontendPoints) {
      suggestion = "Kamu cocok menjadi Backend Developer! ⚙️💻";
    } else {
      suggestion = "Kamu cocok menjadi Fullstack Developer! 🚀🔥";
    }

    setResult(suggestion);
    setShowResult(true);
  };

  if (showResult) {
    return <CareerSuggestionResult result={result} />;
  }

  return (
    <motion.div
      className="p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto my-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-800 dark:text-white">
        Temukan Jalur Karirmu 🚀
      </h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            {q.question}
          </p>
          <div className="flex gap-3 flex-wrap">
            {q.options.map((option, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border font-medium text-sm sm:text-base transition-colors duration-300
                ${
                  answers[index] === option.value
                    ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-300/40 dark:shadow-blue-400/30"
                    : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
                onClick={() => handleOptionClick(option.value, index)}
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="mt-6 sm:mt-8 w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg sm:text-xl shadow-xl shadow-green-400/30 dark:shadow-green-400/20 transition-all"
        onClick={handleSubmit}
        disabled={answers.length < questions.length}
      >
        Lihat Hasil 🎯
      </motion.button>
    </motion.div>
  );
}
