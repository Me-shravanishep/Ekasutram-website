import React, { useState, useEffect } from 'react';

const EngineeringQuiz: React.FC = () => {
    const challenges = [
        { q: "Convert 5 HP to Watts (approx)", a: "3730" },
        { q: "Value of Acceleration due to Gravity (m/s²)", a: "9.81" },
        { q: "Convert 1 Bar to Pascals (10^5 Pa)", a: "1" },
        { q: "Standard Atmospheric Pressure (psi)", a: "14.7" },
        { q: "Freezing point of water in Kelvin", a: "273" },
        { q: "Density of Water (kg/m³)", a: "1000" },
        { q: "Speed of Light in vacuum (x10^8 m/s)", a: "3" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [feedback, setFeedback] = useState('');

    const startGame = () => {
        setScore(0);
        setIsActive(true);
        setFeedback('');
        setCurrentIndex(Math.floor(Math.random() * challenges.length));
    };

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (userAnswer.trim() === challenges[currentIndex].a) {
            setScore(s => s + 1);
            setFeedback('Correct! 🛠️');
            setUserAnswer('');
            setCurrentIndex(Math.floor(Math.random() * challenges.length));
        } else {
            setFeedback('Incorrect. Try again!');
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.gameCard}>
                <h1 style={styles.title}>Engineer's Quick-Ref Challenge</h1>

                {!isActive ? (
                    <div style={styles.startScreen}>
                        <p style={styles.description}>How well do you remember your constants and conversions?</p>
                        <button onClick={startGame} style={styles.mainBtn}>Start Challenge</button>
                    </div>
                ) : (
                    <div style={styles.quizArea}>
                        <div style={styles.stats}>Score: {score}</div>
                        <div style={styles.questionBox}>
                            <p style={styles.label}>Question:</p>
                            <h2 style={styles.questionText}>{challenges[currentIndex].q}</h2>
                        </div>

                        <form onSubmit={checkAnswer} style={styles.form}>
                            <input
                                autoFocus
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Enter value..."
                                style={styles.input}
                            />
                            <button type="submit" style={styles.submitBtn}>Check</button>
                        </form>
                        <p style={styles.feedback}>{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    pageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh', // Ensures it doesn't hug the header/footer
        padding: '20px'
    },
    gameCard: {
        background: '#1e1e1e', // Dark theme to match your screenshot
        color: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
        border: '1px solid #333'
    },
    title: { fontSize: '1.8rem', marginBottom: '20px', color: '#4dabf7' },
    description: { color: '#adb5bd', marginBottom: '30px' },
    stats: { fontSize: '1.1rem', marginBottom: '20px', color: '#ffd43b' },
    questionBox: { marginBottom: '30px' },
    label: { fontSize: '0.9rem', color: '#868e96', textTransform: 'uppercase' },
    questionText: { fontSize: '1.5rem', margin: '10px 0' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: {
        background: '#2c2c2c',
        border: '1px solid #444',
        padding: '15px',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '1.2rem',
        textAlign: 'center'
    },
    mainBtn: {
        padding: '15px 40px',
        background: '#4dabf7',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: '0.2s'
    },
    submitBtn: {
        padding: '12px',
        background: '#37b24d',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        cursor: 'pointer'
    },
    feedback: { marginTop: '15px', height: '20px', color: '#fab005' }
};

export default EngineeringQuiz;