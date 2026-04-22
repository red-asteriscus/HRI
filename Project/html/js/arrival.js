var session = null;
var activeQuestion = "none";

var questionMap = {
    "ceremony": "Are you here for the graduation ceremony?",
    "seating": "Do you need help finding your seat?",
    "role": "Are you a staff member or a guest?",
    "time": "Would you like to know when the ceremony starts?",
    "none": "Pepper is ready..."
};

var mockResponses = {
    "ceremony_yes": "Wonderful!",
    "ceremony_no": "No worries! Have a wonderful day.",
    "seating_yes": "Of course!",
    "seating_no": "No problem at all!",
    "role_staff": "Staff seating is reserved in the VIP section at the front center.",
    "role_guest": "The White Section is reserved for general seating.",
    "time_yes": "The ceremony begins in twenty minutes. Enjoy!",
    "time_no": "Enjoy the ceremony, and congratulations to your graduate!"
};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(param, defaultVal){
    var urlParam = defaultVal;

    if (window.location.href.indexOf(param) > -1) {
        urlParam = getUrlVars()[param];
    }
    return urlParam;
}

function displayPageInformation() {
    let key = getUrlParam("key", "");
    document.getElementById("question-text").innerHTML = questionMap[key] || "hello";
}

/**
 * Display Pepper's response as a subtitle
 */
function displaySpeech(text) {
    var speechEl = document.getElementById("pepper-speech");
    var mapEl = document.getElementById("map-display");
    if (!speechEl) return;

    if (!text) {
        speechEl.style.display = "none";
        return;
    }

    console.log("Pepper says: " + text);
    speechEl.innerText = text;
    speechEl.style.display = "block";

    // Show map if response is seating-related
    if (text.toLowerCase().indexOf("section") !== -1 || text.toLowerCase().indexOf("reserved") !== -1 || text.toLowerCase().indexOf("seating") !== -1) {
        if (mapEl) mapEl.style.display = "block";
    }
}

/**
 * Switch button groups and update text based on dialogue state
 */
function updateQuestionState(questionType) {
    console.log("Dialogue state changed: " + questionType);
    activeQuestion = questionType;
    
    var questionText = document.getElementById("question-text");
    var speechEl = document.getElementById("pepper-speech");
    var mapEl = document.getElementById("map-display");
    var groupYesNo = document.getElementById("group-yes-no");
    var groupRole = document.getElementById("group-role");

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
    if (["ceremony", "seating", "time"].indexOf(questionType) !== -1) {
        groupYesNo.style.display = "flex";
    } else if (questionType === "role") {
        groupRole.style.display = "flex";
    }
}

/**
 * Send choice back to Pepper
 */
function handleChoice(eventName) {

    raiseEvent(eventName, 1);

}

// --- Local Testing Helpers ---

var currentMockIndex = 0;
var mockStates = ["ceremony", "seating", "role", "time", "none"];


function setupLocalTesting() {
    advanceMockState("none");
}

