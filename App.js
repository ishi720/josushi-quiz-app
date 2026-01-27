import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';

// 助数詞データ
const quizData = [
  { item: "鉛筆", reading: "えんぴつ", answer: "本", choices: ["本", "枚", "個", "匹"] },
  { item: "猫", reading: "ねこ", answer: "匹", choices: ["匹", "頭", "羽", "人"] },
  { item: "紙", reading: "かみ", answer: "枚", choices: ["枚", "本", "冊", "個"] },
  { item: "本", reading: "ほん", answer: "冊", choices: ["冊", "枚", "本", "台"] },
  { item: "車", reading: "くるま", answer: "台", choices: ["台", "本", "個", "匹"] },
  { item: "珈琲", reading: "コーヒー", answer: "杯", choices: ["杯", "個", "本", "枚"] },
  { item: "林檎", reading: "りんご", answer: "個", choices: ["個", "本", "枚", "匹"] },
  { item: "学生", reading: "がくせい", answer: "人", choices: ["人", "匹", "頭", "本"] },
  { item: "象", reading: "ぞう", answer: "頭", choices: ["頭", "匹", "羽", "本"] },
  { item: "鳥", reading: "とり", answer: "羽", choices: ["羽", "匹", "頭", "枚"] },
  { item: "皿", reading: "さら", answer: "枚", choices: ["枚", "本", "着", "個"] },
  { item: "犬", reading: "いぬ", answer: "匹", choices: ["匹", "頭", "羽", "人"] },
  { item: "傘", reading: "かさ", answer: "本", choices: ["本", "枚", "個", "台"] },
  { item: "電話", reading: "でんわ", answer: "台", choices: ["台", "個", "本", "枚"] },
  { item: "魚", reading: "さかな", answer: "匹", choices: ["匹", "本", "羽", "頭"] },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    startNewGame();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startNewGame = () => {
    const shuffled = [...quizData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map(q => ({ ...q, choices: shuffleArray(q.choices) }));
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
    setStreak(0);
  };

  const animateTransition = (callback) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(callback, 150);
  };

  const handleAnswer = (choice) => {
    if (showResult) return;

    setSelectedAnswer(choice);
    setShowResult(true);

    const isCorrect = choice === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setGameOver(true);
    } else {
      animateTransition(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      });
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: "🎊", message: "完璧！天才です！" };
    if (percentage >= 80) return { emoji: "🎉", message: "すばらしい！" };
    if (percentage >= 60) return { emoji: "😊", message: "よくできました！" };
    if (percentage >= 40) return { emoji: "💪", message: "もう少し！" };
    return { emoji: "📚", message: "練習しましょう！" };
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>読み込み中...</Text>
      </SafeAreaView>
    );
  }

  if (gameOver) {
    const { emoji, message } = getScoreMessage();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>クイズ終了！</Text>
          <View style={styles.finalScoreContainer}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreDivider}>/</Text>
            <Text style={styles.scoreTotal}>{questions.length}</Text>
          </View>
          <Text style={styles.resultMessage}>{message}</Text>
          <View style={styles.scoreBarContainer}>
            <View
              style={[
                styles.scoreBarFill,
                { width: `${(score / questions.length) * 100}%` },
              ]}
            />
          </View>
          <TouchableOpacity style={styles.restartButton} onPress={startNewGame}>
            <Text style={styles.restartButtonText}>もう一度挑戦する</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const question = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestion + 1} / {questions.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
                ]}
              />
            </View>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>スコア</Text>
            <Text style={styles.scoreValue}>{score}</Text>
            {streak >= 2 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>連続 {streak}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 問題カード */}
        <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
          <View style={styles.questionLabelContainer}>
            <Text style={styles.questionLabel}>問題</Text>
          </View>
          <View style={styles.questionTextContainer}>
            <Text style={styles.furigana}>{question.reading}</Text>
            <Text style={styles.kanjiText}>{question.item}</Text>
          </View>
        </Animated.View>

        {/* 選択肢 */}
        <View style={styles.choicesContainer}>
          {question.choices.map((choice, index) => {
            let buttonStyle = [styles.choiceButton];
            let textStyle = [styles.choiceText];

            if (showResult) {
              if (choice === question.answer) {
                buttonStyle.push(styles.correctButton);
                textStyle.push(styles.correctText);
              } else if (choice === selectedAnswer) {
                buttonStyle.push(styles.wrongButton);
                textStyle.push(styles.wrongText);
              } else {
                buttonStyle.push(styles.disabledButton);
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswer(choice)}
                disabled={showResult}
                activeOpacity={0.7}
              >
                <Text style={textStyle}>{choice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 結果表示 */}
        {showResult && (
          <View style={styles.feedbackContainer}>
            <View
              style={[
                styles.feedbackBox,
                selectedAnswer === question.answer
                  ? styles.correctFeedback
                  : styles.wrongFeedback,
              ]}
            >
              <Text style={styles.feedbackEmoji}>
                {selectedAnswer === question.answer ? "⭕" : "❌"}
              </Text>
              <Text style={styles.feedbackText}>
                {selectedAnswer === question.answer
                  ? "正解！"
                  : `残念... 正解は「${question.answer}」`}
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestion + 1 >= questions.length
                  ? "結果を見る"
                  : "次の問題へ"}
              </Text>
              <Text style={styles.nextArrow}>→</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* フッター */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>助数詞クイズ</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  loading: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: '40%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  progressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e94560',
    borderRadius: 3,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  streakBadge: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  questionLabelContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    backgroundColor: '#e94560',
    color: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
    letterSpacing: 2,
  },
  questionTextContainer: {
    alignItems: 'center',
  },
  furigana: {
    fontSize: 18,
    color: '#636e72',
    marginBottom: 4,
  },
  kanjiText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  choiceButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  choiceText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  correctButton: {
    backgroundColor: '#00b894',
  },
  correctText: {
    color: '#fff',
  },
  wrongButton: {
    backgroundColor: '#e94560',
  },
  wrongText: {
    color: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  correctFeedback: {
    backgroundColor: 'rgba(0,184,148,0.2)',
  },
  wrongFeedback: {
    backgroundColor: 'rgba(233,69,96,0.2)',
  },
  feedbackEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: '#0f3460',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextArrow: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    letterSpacing: 4,
  },
  // 結果画面
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 40,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  resultEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 24,
  },
  finalScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: '#e94560',
  },
  scoreDivider: {
    fontSize: 32,
    color: '#b2bec3',
    marginHorizontal: 4,
  },
  scoreTotal: {
    fontSize: 32,
    fontWeight: '600',
    color: '#636e72',
  },
  resultMessage: {
    fontSize: 18,
    color: '#636e72',
    marginBottom: 24,
  },
  scoreBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#dfe6e9',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 32,
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: '#00b894',
    borderRadius: 6,
  },
  restartButton: {
    backgroundColor: '#e94560',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
