import { useState } from 'react';
import { H1, Section } from './UI';
import { QuizButton } from './QuizButton';
import { StarField } from './StarField';
import { Check, X, Github } from 'lucide-react';
import { DownloadCertificate } from './DownloadCertificate';
import { SocialShare } from './SocialShare';

interface Question {
  question: string;
  answer: boolean;
}
export function Quiz() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "The largest asteroids are classified as dwarf planets",
      answer: true
    },
    {
      question: "Asteroids are mostly made of cheese",
      answer: false
    },
    {
      question: "In 2022 NASA successfully changed an asteroids orbit",
      answer: true
    },
  ];

  // Select 2 random questions when quiz starts
  const startQuiz = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 2));
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResult(false);
    setQuizComplete(false);

    // Delay to show first question with fade in
    setTimeout(() => {
      setQuestionVisible(true);
    }, 100);
  };

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    // Fade out current question
    setQuestionVisible(false);
    
    

    setTimeout(() => {
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeout(() => {
          setQuestionVisible(true);
        }, 100);
      } else {
        // Quiz complete
        setQuizComplete(true);
        setShowResult(true);
      }
    }, 500);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedQuestions([]);
    setUserAnswers([]);
    setShowResult(false);
    setQuestionVisible(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === selectedQuestions[index].answer ? 1 : 0);
    }, 0);
  };

  return (
    <Section bgColor="bg-blue-900" showDownNav={false}>
      <StarField />
      <div className="absolute bottom-0 py-2 text-white/30 flex gap-4">
        <a href="https://eoinmcgrath.com"
          target="_blank"
          className="hover:text-white hover:drop-shadow-glow transition-all duration-300">
          &copy; eoinmcg
        </a>
        <a href="https://github.com/eoinmcg/asteroid-day"
          target="_blank"
          className="hover:text-white hover:drop-shadow-glow transition-all duration-300">
          <Github />
        </a>
      </div>
      <div className="text-center opacity-5 translate-y-full intersect:opacity-100 intersect:translate-y-0 intersect-once delay-200 transition ease-out duration-500">
        {!showQuiz && (
          <>
            <div className="absolute top-0 left-0 border-2 border-white/10 rounded-full w-10 h-10"></div>
            <H1>Quiz</H1>
            <button 
              className="p-4 mt-8 text-2xl bg-white/20 hover:cursor-pointer hover:bg-black/20 transition ease-in duration-200 text-white rounded"
              onClick={startQuiz}
            >
              <span className="animate-pulse">
                Ready?
              </span>
            </button>
          </>
        )}

        {showQuiz && !quizComplete && (
          <div className="text-white">
            <p className="text-2xl mb-4 font-orbitron text-white/50">Question {currentQuestionIndex + 1} of {selectedQuestions.length}</p>

            <div className={`transition-opacity duration-500 ${questionVisible ? 'opacity-100' : 'opacity-0'}`}>
              {selectedQuestions[currentQuestionIndex] && (
                <div className="bg-black/0 p-6 mb-6">
                  <p className="text-3xl mb-6 text-shadow-lg">{selectedQuestions[currentQuestionIndex].question}.</p>
                  <div className="flex gap-8 justify-center">
                    <QuizButton icon={Check}
                      color={selectedQuestions[currentQuestionIndex].answer === true ? 'green' : 'red'}
                      onClick={() => handleAnswer(true)}
                    >True</QuizButton>
                    <QuizButton icon={X}
                      color={selectedQuestions[currentQuestionIndex].answer === false ? 'green' : 'red'}
                      onClick={() => handleAnswer(false)}
                    >False</QuizButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {showResult && (
          <div className={`text-white transition-opacity duration-500 ${showResult ? 'opacity-100' : 'opacity-0'}`}>

            <div className="bg-black/0 p-6 rounded-lg mb-6">
              <p className="text-2xl mb-4 font-orbitron text-white/30">You scored {calculateScore()} out of {selectedQuestions.length}</p>
              {calculateScore() === selectedQuestions.length 
                ? (
                  <>
                    <p className="text-4xl text-shadow-lg mb-4 font-orbitron">Perfect!</p>

                    <DownloadCertificate />

                    <SocialShare />
                  </>
                )
                : (
                  <>

                    <p className="text-lg">
                      {calculateScore() === 0 ? "Better luck next time! 🤔" :
                        "Not bad! 👍"}
                    </p>
                    <button
                      className="mt-4 px-6 py-3 text-xl bg-gray-200 hover:bg-green-700 hover:text-white hover-scale-110 text-black border-2 border-black/30 rounded-xl transition duration-200"
                      onClick={resetQuiz}
                    >
                      Try Again
                    </button>
                  </>
                )
              }
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}


