import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import "./chatbot.css";

// Questions specific to each role with multilingual support
const QUESTIONS = {
    teacher: {
        en: [
            "My Classes",
            "Mark Attendance",
            "Add Assignment",
            "Post Notice",
            "Show Reports",
            "Show Alerts",
        ],
        hi: [
            "मेरी कक्षाएं",
            "उपस्थिति चिह्नित करें",
            "असाइनमेंट जोड़ें",
            "नोटिस पोस्ट करें",
            "रिपोर्ट दिखाएं",
            "अलर्ट दिखाएं",
        ],
        pa: [
            "ਮੇਰੀਆਂ ਕਲਾਸਾਂ",
            "ਹਾਜ਼ਰੀ ਲਗਾਓ",
            "ਅਸਾਈਨਮੈਂਟ ਜੋੜੋ",
            "ਨੋਟਿਸ ਪੋਸਟ ਕਰੋ",
            "ਰਿਪੋਰਟਾਂ ਦਿਖਾਓ",
            "ਅਲਰਟ ਦਿਖਾਓ",
        ],
        mr: [
            "माझे वर्ग",
            "उपस्थिती चिन्हांकित करा",
            "असाइनमेंट जोडा",
            "नोटीस पोस्ट करा",
            "अहवाल दाखवा",
            "अलर्ट दाखवा",
        ],
    },
    student: {
        en: [
            "My Classes",
            "My Attendance",
            "My Assignments",
            "My Grades",
            "Important Notices",
            "View Alerts",
        ],
        hi: [
            "मेरी कक्षाएं",
            "मेरी उपस्थिति",
            "मेरे असाइनमेंट",
            "मेरे ग्रेड",
            "महत्वपूर्ण नोटिस",
            "अलर्ट देखें",
        ],
        pa: [
            "ਮੇਰੀਆਂ ਕਲਾਸਾਂ",
            "ਮੇਰੀ ਹਾਜ਼ਰੀ",
            "ਮੇਰੇ ਅਸਾਈਨਮੈਂਟ",
            "ਮੇਰੇ ਗ੍ਰੇਡ",
            "ਮਹੱਤਵਪੂਰਨ ਨੋਟਿਸ",
            "ਅਲਰਟ ਦੇਖੋ",
        ],
        mr: [
            "माझे वर्ग",
            "माझी उपस्थिती",
            "माझी असाइनमेंट",
            "माझे ग्रेड",
            "महत्त्वाच्या सूचना",
            "अलर्ट पहा",
        ],
    },
    admin: {
        en: [
            "Progress Report",
            "Add Teacher",
            "Add Student",
            "School Reports",
            "Alerts",
            "Settings",
        ],
        hi: [
            "प्रगति रिपोर्ट",
            "शिक्षक जोड़ें",
            "छात्र जोड़ें",
            "स्कूल रिपोर्ट",
            "अलर्ट",
            "सेटिंग्स",
        ],
        pa: [
            "ਤਰੱਕੀ ਰਿਪੋਰਟ",
            "ਅਧਿਆਪਕ ਜੋੜੋ",
            "ਵਿਦਿਆਰਥੀ ਜੋੜੋ",
            "ਸਕੂਲ ਰਿਪੋਰਟਾਂ",
            "ਅਲਰਟ",
            "ਸੈਟਿੰਗਜ਼",
        ],
        mr: [
            "प्रगती अहवाल",
            "शिक्षक जोडा",
            "विद्यार्थी जोडा",
            "शाळा अहवाल",
            "अलर्ट",
            "सेटिंग्ज",
        ],
    },
    government: {
        en: [
            "All Schools Report",
            "District Attendance",
            "Export Reports",
            "High Priority Alerts",
            "Mid Day Meal",
        ],
        hi: [
            "सभी स्कूलों की रिपोर्ट",
            "जिला उपस्थिति",
            "रिपोर्ट निर्यात करें",
            "उच्च प्राथमिकता अलर्ट",
            "मध्याह्न भोजन",
        ],
        pa: [
            "ਸਾਰੇ ਸਕੂਲਾਂ ਦੀ ਰਿਪੋਰਟ",
            "ਜ਼ਿਲ੍ਹਾ ਹਾਜ਼ਰੀ",
            "ਰਿਪੋਰਟਾਂ ਐਕਸਪੋਰਟ ਕਰੋ",
            "ਉੱਚ ਤਰਜੀਹੀ ਅਲਰਟ",
            "ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ",
        ],
        mr: [
            "सर्व शाळांचा अहवाल",
            "जिल्हा उपस्थिती",
            "अहवाल निर्यात करा",
            "उच्च प्राधान्य अलर्ट",
            "मध्यान्ह जेवण",
        ],
    },
};

const RoleChatbot = ({ role = "student" }) => {
    const [messages, setMessages] = useState([]);
    const [loadingQuestion, setLoadingQuestion] = useState("");
    const [language, setLanguage] = useState("en");
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    // Language codes for speech recognition and synthesis
    const languageCodes = {
        en: 'en-US',
        hi: 'hi-IN',
        pa: 'pa-IN',
        mr: 'mr-IN'
    };

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = languageCodes[language];

            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                handleVoiceInput(transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            synthRef.current.cancel();
        };
    }, []);

    // Update speech recognition language when language changes
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = languageCodes[language];
        }
    }, [language]);

    // Handle voice input
    const handleVoiceInput = (transcript) => {
        console.log('Voice Input Received:', transcript, 'Language:', language);

        const currentQuestions = QUESTIONS[role][language] || QUESTIONS[role]['en'];

        // Normalize text for better matching
        const normalizedTranscript = transcript.toLowerCase().trim();

        // Try exact match first
        let matchedQuestion = currentQuestions.find(q =>
            q.toLowerCase() === normalizedTranscript
        );

        // If no exact match, try partial match
        if (!matchedQuestion) {
            matchedQuestion = currentQuestions.find(q => {
                const normalizedQuestion = q.toLowerCase();
                return normalizedTranscript.includes(normalizedQuestion) ||
                    normalizedQuestion.includes(normalizedTranscript) ||
                    // Check if transcript contains significant words from question
                    normalizedQuestion.split(' ').some(word =>
                        word.length > 2 && normalizedTranscript.includes(word)
                    );
            });
        }

        if (matchedQuestion) {
            console.log('Matched Question:', matchedQuestion);
            sendQuestion(matchedQuestion);
        } else {
            console.log('No match found, showing available options');
            // If no match, send the transcript as is
            sendCustomQuestion(transcript);
        }
    };

    // Send custom voice question
    const sendCustomQuestion = (question) => {
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                from: "user",
                text: question,
            },
        ]);

        const responseTexts = {
            en: "I heard your question. Please select from the available options or try asking about: ",
            hi: "मैंने आपका सवाल सुना। कृपया उपलब्ध विकल्पों में से चुनें या इसके बारे में पूछें: ",
            pa: "ਮੈਂ ਤੁਹਾਡਾ ਸਵਾਲ ਸੁਣਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਉਪਲਬਧ ਵਿਕਲਪਾਂ ਵਿੱਚੋਂ ਚੁਣੋ ਜਾਂ ਇਸ ਬਾਰੇ ਪੁੱਛੋ: ",
            mr: "मी तुमचा प्रश्न ऐकला. कृपया उपलब्ध पर्यायांमधून निवडा किंवा याबद्दल विचारा: "
        };

        setTimeout(() => {
            const currentQuestions = QUESTIONS[role][language] || QUESTIONS[role]['en'];
            const reply = responseTexts[language] + currentQuestions.join(", ");

            const botMessage = {
                id: crypto.randomUUID(),
                from: "bot",
                text: reply,
            };

            setMessages((prev) => [...prev, botMessage]);

            if (voiceEnabled) {
                speakText(reply);
            }
        }, 500);
    };

    // Text-to-Speech function with language support
    const speakText = (text) => {
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Set language code - browser will use native voice if available
        utterance.lang = languageCodes[language];

        console.log('Speaking text in', language, 'with lang code:', utterance.lang);
        console.log('Text:', text.substring(0, 50) + '...');

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsSpeaking(false);
        };

        synthRef.current.speak(utterance);
    };

    // Toggle voice recognition
    const toggleVoiceRecognition = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    // Stop speaking
    const stopSpeaking = () => {
        synthRef.current.cancel();
        setIsSpeaking(false);
    };

    const sendQuestion = async (question) => {
        setLoadingQuestion(question);

        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                from: "user",
                text: `${role.toUpperCase()}: ${question}`,
            },
        ]);

        // Simulate AI response
        setTimeout(() => {
            const responses = {
                teacher: {
                    en: {
                        "My Classes": "You have 5 classes assigned: Math 10A, Science 9B, Physics 11C, Chemistry 12A, and Biology 10B.",
                        "Mark Attendance": "To mark attendance, go to the Attendance tab and select your class. You can mark students present, absent, or late.",
                        "Add Assignment": "Navigate to Assignments tab and click 'Create New Assignment'. Fill in the details and attach any files needed.",
                        "Post Notice": "Go to Notices tab and click 'Post New Notice'. Write your message and select target audience.",
                        "Show Reports": "View comprehensive reports in the Reports tab including student performance, attendance trends, and class analytics.",
                        "Show Alerts": "Check the Alerts tab for important notifications about student performance, attendance issues, and system updates.",
                    },
                    hi: {
                        "मेरी कक्षाएं": "आपको 5 कक्षाएं सौंपी गई हैं: गणित 10A, विज्ञान 9B, भौतिकी 11C, रसायन विज्ञान 12A, और जीव विज्ञान 10B।",
                        "उपस्थिति चिह्नित करें": "उपस्थिति चिह्नित करने के लिए, उपस्थिति टैब पर जाएं और अपनी कक्षा चुनें। आप छात्रों को उपस्थित, अनुपस्थित या देर से चिह्नित कर सकते हैं।",
                        "असाइनमेंट जोड़ें": "असाइनमेंट टैब पर जाएं और 'नया असाइनमेंट बनाएं' पर क्लिक करें। विवरण भरें और आवश्यक फ़ाइलें संलग्न करें।",
                        "नोटिस पोस्ट करें": "नोटिस टैब पर जाएं और 'नया नोटिस पोस्ट करें' पर क्लिक करें। अपना संदेश लिखें और लक्षित दर्शक चुनें।",
                        "रिपोर्ट दिखाएं": "रिपोर्ट टैब में व्यापक रिपोर्ट देखें जिसमें छात्र प्रदर्शन, उपस्थिति रुझान और कक्षा विश्लेषण शामिल हैं।",
                        "अलर्ट दिखाएं": "छात्र प्रदर्शन, उपस्थिति मुद्दों और सिस्टम अपडेट के बारे में महत्वपूर्ण सूचनाओं के लिए अलर्ट टैब देखें।",
                    },
                    pa: {
                        "ਮੇਰੀਆਂ ਕਲਾਸਾਂ": "ਤੁਹਾਨੂੰ 5 ਕਲਾਸਾਂ ਸੌਂਪੀਆਂ ਗਈਆਂ ਹਨ: ਗਣਿਤ 10A, ਵਿਗਿਆਨ 9B, ਭੌਤਿਕ ਵਿਗਿਆਨ 11C, ਰਸਾਇਣ ਵਿਗਿਆਨ 12A, ਅਤੇ ਜੀਵ ਵਿਗਿਆਨ 10B।",
                        "ਹਾਜ਼ਰੀ ਲਗਾਓ": "ਹਾਜ਼ਰੀ ਲਗਾਉਣ ਲਈ, ਹਾਜ਼ਰੀ ਟੈਬ 'ਤੇ ਜਾਓ ਅਤੇ ਆਪਣੀ ਕਲਾਸ ਚੁਣੋ। ਤੁਸੀਂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਹਾਜ਼ਰ, ਗੈਰਹਾਜ਼ਰ ਜਾਂ ਦੇਰ ਨਾਲ ਚਿੰਨ੍ਹਿਤ ਕਰ ਸਕਦੇ ਹੋ।",
                        "ਅਸਾਈਨਮੈਂਟ ਜੋੜੋ": "ਅਸਾਈਨਮੈਂਟ ਟੈਬ 'ਤੇ ਜਾਓ ਅਤੇ 'ਨਵਾਂ ਅਸਾਈਨਮੈਂਟ ਬਣਾਓ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ। ਵੇਰਵੇ ਭਰੋ ਅਤੇ ਲੋੜੀਂਦੀਆਂ ਫਾਈਲਾਂ ਜੋੜੋ।",
                        "ਨੋਟਿਸ ਪੋਸਟ ਕਰੋ": "ਨੋਟਿਸ ਟੈਬ 'ਤੇ ਜਾਓ ਅਤੇ 'ਨਵਾਂ ਨੋਟਿਸ ਪੋਸਟ ਕਰੋ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ। ਆਪਣਾ ਸੰਦੇਸ਼ ਲਿਖੋ ਅਤੇ ਨਿਸ਼ਾਨਾ ਦਰਸ਼ਕ ਚੁਣੋ।",
                        "ਰਿਪੋਰਟਾਂ ਦਿਖਾਓ": "ਰਿਪੋਰਟ ਟੈਬ ਵਿੱਚ ਵਿਆਪਕ ਰਿਪੋਰਟਾਂ ਦੇਖੋ ਜਿਸ ਵਿੱਚ ਵਿਦਿਆਰਥੀ ਪ੍ਰਦਰਸ਼ਨ, ਹਾਜ਼ਰੀ ਰੁਝਾਨ ਅਤੇ ਕਲਾਸ ਵਿਸ਼ਲੇਸ਼ਣ ਸ਼ਾਮਲ ਹਨ।",
                        "ਅਲਰਟ ਦਿਖਾਓ": "ਵਿਦਿਆਰਥੀ ਪ੍ਰਦਰਸ਼ਨ, ਹਾਜ਼ਰੀ ਮੁੱਦਿਆਂ ਅਤੇ ਸਿਸਟਮ ਅੱਪਡੇਟਾਂ ਬਾਰੇ ਮਹੱਤਵਪੂਰਨ ਸੂਚਨਾਵਾਂ ਲਈ ਅਲਰਟ ਟੈਬ ਦੇਖੋ।",
                    },
                },
                student: {
                    en: {
                        "My Classes": "You are enrolled in: Mathematics, Science, English, History, and Physical Education.",
                        "My Attendance": "Your current attendance is 92%. You have 42 present days, 3 absent days, and 1 late entry.",
                        "My Assignments": "You have 4 pending assignments. Check the Assignments tab for due dates and submission details.",
                        "My Grades": "Your current GPA is 3.8 with an overall grade of A-. Great work!",
                        "Important Notices": "Latest notices: Sports Day on Friday, Parent-Teacher Meeting next week, and Holiday announcement.",
                        "View Alerts": "No new alerts. Your performance and attendance are satisfactory.",
                    },
                    hi: {
                        "मेरी कक्षाएं": "आप नामांकित हैं: गणित, विज्ञान, अंग्रेजी, इतिहास और शारीरिक शिक्षा में।",
                        "मेरी उपस्थिति": "आपकी वर्तमान उपस्थिति 92% है। आपके 42 उपस्थित दिन, 3 अनुपस्थित दिन और 1 देर से प्रवेश है।",
                        "मेरे असाइनमेंट": "आपके पास 4 लंबित असाइनमेंट हैं। नियत तिथि और सबमिशन विवरण के लिए असाइनमेंट टैब देखें।",
                        "मेरे ग्रेड": "आपका वर्तमान GPA 3.8 है जिसमें A- का समग्र ग्रेड है। बढ़िया काम!",
                        "महत्वपूर्ण नोटिस": "नवीनतम नोटिस: शुक्रवार को खेल दिवस, अगले सप्ताह अभिभावक-शिक्षक बैठक और छुट्टी की घोषणा।",
                        "अलर्ट देखें": "कोई नया अलर्ट नहीं। आपका प्रदर्शन और उपस्थिति संतोषजनक है।",
                    },
                    pa: {
                        "ਮੇਰੀਆਂ ਕਲਾਸਾਂ": "ਤੁਸੀਂ ਦਾਖਲ ਹੋ: ਗਣਿਤ, ਵਿਗਿਆਨ, ਅੰਗਰੇਜ਼ੀ, ਇਤਿਹਾਸ ਅਤੇ ਸਰੀਰਕ ਸਿੱਖਿਆ ਵਿੱਚ।",
                        "ਮੇਰੀ ਹਾਜ਼ਰੀ": "ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਹਾਜ਼ਰੀ 92% ਹੈ। ਤੁਹਾਡੇ 42 ਹਾਜ਼ਰ ਦਿਨ, 3 ਗੈਰਹਾਜ਼ਰ ਦਿਨ ਅਤੇ 1 ਦੇਰ ਨਾਲ ਦਾਖਲਾ ਹੈ।",
                        "ਮੇਰੇ ਅਸਾਈਨਮੈਂਟ": "ਤੁਹਾਡੇ ਕੋਲ 4 ਲੰਬਿਤ ਅਸਾਈਨਮੈਂਟ ਹਨ। ਨਿਯਤ ਮਿਤੀ ਅਤੇ ਸਬਮਿਸ਼ਨ ਵੇਰਵਿਆਂ ਲਈ ਅਸਾਈਨਮੈਂਟ ਟੈਬ ਦੇਖੋ।",
                        "ਮੇਰੇ ਗ੍ਰੇਡ": "ਤੁਹਾਡਾ ਮੌਜੂਦਾ GPA 3.8 ਹੈ ਜਿਸ ਵਿੱਚ A- ਦਾ ਸਮੁੱਚਾ ਗ੍ਰੇਡ ਹੈ। ਸ਼ਾਨਦਾਰ ਕੰਮ!",
                        "ਮਹੱਤਵਪੂਰਨ ਨੋਟਿਸ": "ਨਵੀਨਤਮ ਨੋਟਿਸ: ਸ਼ੁੱਕਰਵਾਰ ਨੂੰ ਖੇਡ ਦਿਵਸ, ਅਗਲੇ ਹਫ਼ਤੇ ਮਾਪੇ-ਅਧਿਆਪਕ ਮੀਟਿੰਗ ਅਤੇ ਛੁੱਟੀ ਦੀ ਘੋਸ਼ਣਾ।",
                        "ਅਲਰਟ ਦੇਖੋ": "ਕੋਈ ਨਵਾਂ ਅਲਰਟ ਨਹੀਂ। ਤੁਹਾਡਾ ਪ੍ਰਦਰਸ਼ਨ ਅਤੇ ਹਾਜ਼ਰੀ ਸੰਤੋਸ਼ਜਨਕ ਹੈ।",
                    },
                },
                admin: {
                    en: {
                        "Progress Report": "School-wide attendance: 94%, Student performance: 87%, Teacher engagement: 96%",
                        "Add Teacher": "Go to Staff Management and click 'Add New Teacher'. Fill in personal details, qualifications, and assign subjects.",
                        "Add Student": "Navigate to Student Management and select 'Enroll New Student'. Complete the registration form.",
                        "School Reports": "Access comprehensive school analytics, performance metrics, and financial reports in the Reports section.",
                        "Alerts": "5 new alerts: 2 low attendance warnings, 1 maintenance reminder, 2 performance notifications.",
                        "Settings": "Manage school settings, user permissions, and system configurations in the Settings panel.",
                    },
                    hi: {
                        "प्रगति रिपोर्ट": "स्कूल-व्यापी उपस्थिति: 94%, छात्र प्रदर्शन: 87%, शिक्षक जुड़ाव: 96%",
                        "शिक्षक जोड़ें": "स्टाफ प्रबंधन पर जाएं और 'नया शिक्षक जोड़ें' पर क्लिक करें। व्यक्तिगत विवरण, योग्यता भरें और विषय असाइन करें।",
                        "छात्र जोड़ें": "छात्र प्रबंधन पर जाएं और 'नया छात्र नामांकित करें' चुनें। पंजीकरण फॉर्म पूरा करें।",
                        "स्कूल रिपोर्ट": "रिपोर्ट अनुभाग में व्यापक स्कूल विश्लेषण, प्रदर्शन मेट्रिक्स और वित्तीय रिपोर्ट एक्सेस करें।",
                        "अलर्ट": "5 नए अलर्ट: 2 कम उपस्थिति चेतावनियां, 1 रखरखाव अनुस्मारक, 2 प्रदर्शन सूचनाएं।",
                        "सेटिंग्स": "सेटिंग्स पैनल में स्कूल सेटिंग्स, उपयोगकर्ता अनुमतियां और सिस्टम कॉन्फ़िगरेशन प्रबंधित करें।",
                    },
                    pa: {
                        "ਤਰੱਕੀ ਰਿਪੋਰਟ": "ਸਕੂਲ-ਵਿਆਪੀ ਹਾਜ਼ਰੀ: 94%, ਵਿਦਿਆਰਥੀ ਪ੍ਰਦਰਸ਼ਨ: 87%, ਅਧਿਆਪਕ ਸ਼ਮੂਲੀਅਤ: 96%",
                        "ਅਧਿਆਪਕ ਜੋੜੋ": "ਸਟਾਫ ਪ੍ਰਬੰਧਨ 'ਤੇ ਜਾਓ ਅਤੇ 'ਨਵਾਂ ਅਧਿਆਪਕ ਜੋੜੋ' 'ਤੇ ਕਲਿੱਕ ਕਰੋ। ਨਿੱਜੀ ਵੇਰਵੇ, ਯੋਗਤਾਵਾਂ ਭਰੋ ਅਤੇ ਵਿਸ਼ੇ ਸੌਂਪੋ।",
                        "ਵਿਦਿਆਰਥੀ ਜੋੜੋ": "ਵਿਦਿਆਰਥੀ ਪ੍ਰਬੰਧਨ 'ਤੇ ਜਾਓ ਅਤੇ 'ਨਵਾਂ ਵਿਦਿਆਰਥੀ ਦਾਖਲ ਕਰੋ' ਚੁਣੋ। ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਫਾਰਮ ਪੂਰਾ ਕਰੋ।",
                        "ਸਕੂਲ ਰਿਪੋਰਟਾਂ": "ਰਿਪੋਰਟ ਸੈਕਸ਼ਨ ਵਿੱਚ ਵਿਆਪਕ ਸਕੂਲ ਵਿਸ਼ਲੇਸ਼ਣ, ਪ੍ਰਦਰਸ਼ਨ ਮੈਟ੍ਰਿਕਸ ਅਤੇ ਵਿੱਤੀ ਰਿਪੋਰਟਾਂ ਤੱਕ ਪਹੁੰਚ ਕਰੋ।",
                        "ਅਲਰਟ": "5 ਨਵੇਂ ਅਲਰਟ: 2 ਘੱਟ ਹਾਜ਼ਰੀ ਚੇਤਾਵਨੀਆਂ, 1 ਰੱਖ-ਰਖਾਅ ਯਾਦ ਦਿਹਾਨੀ, 2 ਪ੍ਰਦਰਸ਼ਨ ਸੂਚਨਾਵਾਂ।",
                        "ਸੈਟਿੰਗਜ਼": "ਸੈਟਿੰਗਜ਼ ਪੈਨਲ ਵਿੱਚ ਸਕੂਲ ਸੈਟਿੰਗਜ਼, ਉਪਭੋਗਤਾ ਅਨੁਮਤੀਆਂ ਅਤੇ ਸਿਸਟਮ ਸੰਰਚਨਾਵਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ।",
                    },
                },
                government: {
                    en: {
                        "All Schools Report": "District has 45 schools with average attendance of 91% and performance rating of 85%.",
                        "District Attendance": "Overall district attendance: 91.5%. Top performing school: 96.2%, Needs attention: 2 schools below 85%.",
                        "Export Reports": "You can export reports in PDF, Excel, or CSV format. Select date range and metrics from the Reports section.",
                        "High Priority Alerts": "3 urgent alerts: 1 school infrastructure issue, 1 teacher shortage, 1 low performance warning.",
                        "Mid Day Meal": "Mid-day meal program serving 10,500 students daily. Current inventory sufficient for 15 days.",
                    },
                    hi: {
                        "सभी स्कूलों की रिपोर्ट": "जिले में 45 स्कूल हैं जिनकी औसत उपस्थिति 91% और प्रदर्शन रेटिंग 85% है।",
                        "जिला उपस्थिति": "समग्र जिला उपस्थिति: 91.5%। शीर्ष प्रदर्शन करने वाला स्कूल: 96.2%, ध्यान देने की आवश्यकता: 85% से नीचे 2 स्कूल।",
                        "रिपोर्ट निर्यात करें": "आप PDF, Excel या CSV प्रारूप में रिपोर्ट निर्यात कर सकते हैं। रिपोर्ट अनुभाग से तारीख सीमा और मेट्रिक्स चुनें।",
                        "उच्च प्राथमिकता अलर्ट": "3 तत्काल अलर्ट: 1 स्कूल बुनियादी ढांचे की समस्या, 1 शिक्षक की कमी, 1 कम प्रदर्शन चेतावनी।",
                        "मध्याह्न भोजन": "मध्याह्न भोजन कार्यक्रम दैनिक 10,500 छात्रों की सेवा कर रहा है। वर्तमान इन्वेंटरी 15 दिनों के लिए पर्याप्त है।",
                    },
                    pa: {
                        "ਸਾਰੇ ਸਕੂਲਾਂ ਦੀ ਰਿਪੋਰਟ": "ਜ਼ਿਲ੍ਹੇ ਵਿੱਚ 45 ਸਕੂਲ ਹਨ ਜਿਨ੍ਹਾਂ ਦੀ ਔਸਤ ਹਾਜ਼ਰੀ 91% ਅਤੇ ਪ੍ਰਦਰਸ਼ਨ ਰੇਟਿੰਗ 85% ਹੈ।",
                        "ਜ਼ਿਲ੍ਹਾ ਹਾਜ਼ਰੀ": "ਸਮੁੱਚੀ ਜ਼ਿਲ੍ਹਾ ਹਾਜ਼ਰੀ: 91.5%। ਚੋਟੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕਰਨ ਵਾਲਾ ਸਕੂਲ: 96.2%, ਧਿਆਨ ਦੀ ਲੋੜ: 85% ਤੋਂ ਹੇਠਾਂ 2 ਸਕੂਲ।",
                        "ਰਿਪੋਰਟਾਂ ਐਕਸਪੋਰਟ ਕਰੋ": "ਤੁਸੀਂ PDF, Excel ਜਾਂ CSV ਫਾਰਮੈਟ ਵਿੱਚ ਰਿਪੋਰਟਾਂ ਐਕਸਪੋਰਟ ਕਰ ਸਕਦੇ ਹੋ। ਰਿਪੋਰਟ ਸੈਕਸ਼ਨ ਤੋਂ ਮਿਤੀ ਰੇਂਜ ਅਤੇ ਮੈਟ੍ਰਿਕਸ ਚੁਣੋ।",
                        "ਉੱਚ ਤਰਜੀਹੀ ਅਲਰਟ": "3 ਤੁਰੰਤ ਅਲਰਟ: 1 ਸਕੂਲ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਦੀ ਸਮੱਸਿਆ, 1 ਅਧਿਆਪਕ ਦੀ ਕਮੀ, 1 ਘੱਟ ਪ੍ਰਦਰਸ਼ਨ ਚੇਤਾਵਨੀ।",
                        "ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ": "ਦੁਪਹਿਰ ਦੇ ਖਾਣੇ ਦਾ ਪ੍ਰੋਗਰਾਮ ਰੋਜ਼ਾਨਾ 10,500 ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਸੇਵਾ ਕਰ ਰਿਹਾ ਹੈ। ਮੌਜੂਦਾ ਭੰਡਾਰ 15 ਦਿਨਾਂ ਲਈ ਕਾਫੀ ਹੈ।",
                    },
                },
            };

            const reply = responses[role][language]?.[question] ||
                responses[role]['en']?.[question] ||
                (language === 'hi' ? "मैं आपके प्रश्नों में मदद के लिए यहां हूं। कृपया उपलब्ध विकल्पों में से एक प्रश्न चुनें।" :
                    language === 'pa' ? "ਮੈਂ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਵਿੱਚ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਉਪਲਬਧ ਵਿਕਲਪਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਵਾਲ ਚੁਣੋ।" :
                        "I'm here to help with your queries. Please select a question from the available options.");

            const botMessage = {
                id: crypto.randomUUID(),
                from: "bot",
                text: reply,
            };

            setMessages((prev) => [...prev, botMessage]);
            setLoadingQuestion("");

            // Speak the response if voice is enabled
            if (voiceEnabled) {
                speakText(reply);
            }
        }, 1000);
    };

    const currentQuestions = QUESTIONS[role]?.[language] || QUESTIONS[role]?.['en'] || [];

    return (
        <div className="bubble-root">
            {/* LEFT PANEL */}
            <div className="bubble-left">
                <div className="role-display" style={{ marginBottom: "1rem", padding: "0.75rem", background: "linear-gradient(135deg, #1d4ed8, #6366f1)", borderRadius: "0.75rem", color: "white", textAlign: "center" }}>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: "600", textTransform: "capitalize" }}>{role} Dashboard</h3>
                </div>

                {/* Language Selector */}
                <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "#475569",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                    }}>
                        Select Language / भाषा चुनें / ਭਾਸ਼ਾ ਚੁਣੋ / भाषा निवडा
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: "2px solid #cbd5e1",
                            width: "100%",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                            cursor: "pointer",
                            transition: "all 0.3s",
                        }}
                    >
                        <option value="en">🇬🇧 English</option>
                        <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                        <option value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
                        <option value="mr">🇮🇳 मराठी (Marathi)</option>
                    </select>
                </div>

                {/* Questions */}
                <div className="question-grid">
                    {currentQuestions.map((q) => (
                        <button
                            key={q}
                            type="button"
                            className="question-bubble"
                            disabled={loadingQuestion === q}
                            onClick={() => sendQuestion(q)}
                        >
                            {loadingQuestion === q ? "..." : q}
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT CHAT */}
            <div className="bubble-right">
                <div className="bubble-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2>AttendSmart Assistant</h2>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            style={{
                                padding: "8px 12px",
                                borderRadius: "8px",
                                border: "none",
                                background: voiceEnabled ? "linear-gradient(135deg, #10b981, #059669)" : "#94a3b8",
                                color: "white",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                transition: "all 0.3s",
                            }}
                            title={voiceEnabled ? "Voice Enabled" : "Voice Disabled"}
                        >
                            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            {voiceEnabled ? "Voice On" : "Voice Off"}
                        </button>
                        <button
                            onClick={isListening ? stopSpeaking : toggleVoiceRecognition}
                            style={{
                                padding: "8px 12px",
                                borderRadius: "8px",
                                border: "none",
                                background: isListening
                                    ? "linear-gradient(135deg, #ef4444, #dc2626)"
                                    : "linear-gradient(135deg, #3b82f6, #2563eb)",
                                color: "white",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                transition: "all 0.3s",
                                animation: isListening ? "pulse 1.5s infinite" : "none",
                            }}
                            title={isListening ? "Stop Listening" : "Start Voice Input"}
                        >
                            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                            {isListening ? "Listening..." : "Speak"}
                        </button>
                    </div>
                </div>

                <div className="bubble-chat-window">
                    {messages.length === 0 && (
                        <div className="bubble-empty">
                            {language === 'hi'
                                ? "स्वागत है! आरंभ करने के लिए एक प्रश्न चुनें।"
                                : language === 'pa'
                                    ? "ਸੁਆਗਤ ਹੈ! ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਇੱਕ ਸਵਾਲ ਚੁਣੋ।"
                                    : language === 'mr'
                                        ? "स्वागत आहे! सुरू करण्यासाठी एक प्रश्न निवडा।"
                                        : "Welcome! Select a question to get started."}
                        </div>
                    )}

                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={m.from === "user" ? "bubble-msg user" : "bubble-msg bot"}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <span style={{ flex: 1 }}>{m.text}</span>
                            {m.from === "bot" && voiceEnabled && (
                                <button
                                    onClick={() => speakText(m.text)}
                                    style={{
                                        padding: "6px",
                                        borderRadius: "6px",
                                        border: "none",
                                        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                                        color: "white",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        transition: "all 0.2s",
                                    }}
                                    title="Speak this message"
                                >
                                    <Volume2 size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleChatbot;
