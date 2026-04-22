let session;
let activeQuestion = "none";

const questionMap = {
    "ceremony": "Are you here for the graduation ceremony?",
    "seating": "Do you need help finding your seat?",
    "role": "Are you a staff member or a guest?",
    "time": "Would you like to know when the ceremony starts?",
    "none": "Pepper is ready..."
};

const mockResponses = {
    "ceremony_yes": "Wonderful!",
    "ceremony_no": "No worries! Have a wonderful day.",
    "seating_yes": "Of course!",
    "seating_no": "No problem at all!",
    "role_staff": "Staff seating is reserved in the VIP section at the front center.",
    "role_guest": "The White Section is reserved for general seating.",
    "time_yes": "The ceremony begins in twenty minutes. Enjoy!",
    "time_no": "Enjoy the ceremony, and congratulations to your graduate!"
};

// --- Initialization ---

window.onload = function() {
    console.log("Arrival JS Loaded and DOM Ready.");
    
    if (typeof QiSession === 'undefined') {
        console.log("Local Testing Mode: Initializing UI...");
        setupLocalTesting();
    } else {
        QiSession(onConnected, onDisconnected);
    }
};

function onConnected(s) {
    session = s;
    console.log("Connected to Pepper's Session (Arrival)");

    session.service("ALMemory").then(function (memory) {
        memory.subscriber("App/CurrentQuestion").then(function (sub) {
            sub.signal.connect(updateQuestionState);
        });
        memory.subscriber("App/PepperSpeech").then(function (sub) {
            sub.signal.connect(displaySpeech);
        });
    });
}

function onDisconnected() {
    console.log("Disconnected from Pepper");
}

/**
 * Display Pepper's response as a subtitle
 */
function displaySpeech(text) {
    const speechEl = document.getElementById("pepper-speech");
    const mapEl = document.getElementById("map-display");
    if (!speechEl) return;

    if (!text) {
        speechEl.style.display = "none";
        return;
    }

    console.log("Pepper says: " + text);
    speechEl.innerText = text;
    speechEl.style.display = "block";

    // Show map if response is seating-related
    if (text.toLowerCase().includes("section") || text.toLowerCase().includes("reserved") || text.toLowerCase().includes("seating")) {
        if (mapEl) mapEl.style.display = "block";
    }
}

/**
 * Switch button groups and update text based on dialogue state
 */
function updateQuestionState(questionType) {
    console.log("Dialogue state changed: " + questionType);
    activeQuestion = questionType;
    
    const questionText = document.getElementById("question-text");
    const speechEl = document.getElementById("pepper-speech");
    const mapEl = document.getElementById("map-display");
    const groupYesNo = document.getElementById("group-yes-no");
    const groupRole = document.getElementById("group-role");

    if (!questionText || !groupYesNo || !groupRole) {
        console.error("Critical UI elements missing!");
        return;
    }

    // Reset UI
    if (speechEl) speechEl.style.display = "none";
    if (mapEl) mapEl.style.display = "none";
    groupYesNo.style.display = "none";
    groupRole.style.display = "none";
    
    questionText.innerText = questionMap[questionType] || "";

    if (!questionType || questionType === "none") {
        return;
    }

    // Activate specific group
    if (["ceremony", "seating", "time"].includes(questionType)) {
        groupYesNo.style.display = "flex";
    } else if (questionType === "role") {
        groupRole.style.display = "flex";
    }
}

/**
 * Send choice back to Pepper
 */
function handleChoice(value) {
    console.log("User chose: " + value + " for " + activeQuestion);
    
    const groupYesNo = document.getElementById("group-yes-no");
    const groupRole = document.getElementById("group-role");

    // Visual feedback
    [groupYesNo, groupRole].forEach(g => {
        if (g) {
            g.style.opacity = "0.2";
            g.style.pointerEvents = "none";
        }
    });

    if (session) {
        session.service("ALMemory").then(function (memory) {
            memory.raiseEvent("Arrival/Choice", value);
        });
    } else {
        const responseKey = activeQuestion + "_" + value;
        const responseText = mockResponses[responseKey] || "Okay!";
        
        displaySpeech(responseText);

        // Show map if answering the role question
        const mapEl = document.getElementById("map-display");
        if (activeQuestion === "role" && mapEl) {
            mapEl.style.display = "block";
        }

        setTimeout(() => {
            // Restore buttons
            [groupYesNo, groupRole].forEach(g => {
                if (g) {
                    g.style.opacity = "1";
                    g.style.pointerEvents = "auto";
                }
            });

            // Handle Transitions
            if (activeQuestion === "ceremony" && value === "no") {
                advanceMockState("none");
            } else if (activeQuestion === "seating" && value === "no") {
                advanceMockState("time");
            } else if (activeQuestion === "time") {
                advanceMockState("none");
            } else {
                advanceMockState(); // Normal next step
            }
        }, 3000);
    }
}

// --- Local Testing Helpers ---

let currentMockIndex = 0;
const mockStates = ["ceremony", "seating", "role", "time", "none"];

function advanceMockState(targetState) {
    if (targetState) {
        currentMockIndex = mockStates.indexOf(targetState);
    } else {
        currentMockIndex = (currentMockIndex + 1) % mockStates.length;
    }
    
    const nextState = mockStates[currentMockIndex];
    console.log("Mock advancing to index " + currentMockIndex + ": " + nextState);
    updateQuestionState(nextState);

    // If we land on 'none', schedule a loop back to 'ceremony'
    if (nextState === "none") {
        console.log("Auto-loop sequence engaged (3s delay)");
        setTimeout(() => {
            if (activeQuestion === "none") {
                advanceMockState("ceremony");
            }
        }, 3000);
    }
}

function setupLocalTesting() {
    advanceMockState("none");
}
