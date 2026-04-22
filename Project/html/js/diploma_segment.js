let session;

window.onload = function () {
    if (typeof QiSession === 'undefined') {
        console.log("Local testing mode.");

        // Simulate Pepper speech subtitles
        setTimeout(() => displaySpeech("We now celebrate our Computer Engineering graduates."), 1000);
        setTimeout(() => displaySpeech("Now passing the microphone to the list reader."), 4500);
        setTimeout(() => displaySpeech(""), 8000);

        // Simulate a few graduate names being called (for local preview)
        // setTimeout(() => displayGraduate("Lara Khoury"), 5500);
        // setTimeout(() => displayGraduate("Omar Nassar", "With Distinction"), 8500);
        // setTimeout(() => displayGraduate("Maya Hayek"), 11500);
    } else {
        QiSession(onConnected, onDisconnected);
    }
};

function onConnected(s) {
    session = s;
    console.log("Connected — Diploma Segment");

    session.service("ALMemory").then(function (memory) {

        // Show Pepper's live speech as subtitles
        memory.subscriber("App/PepperSpeech").then(function (sub) {
            sub.signal.connect(displaySpeech);
        });

        // Display the currently called graduate name
        // Expected payload: "Firstname Lastname" or "Firstname Lastname|With Distinction"
        memory.subscriber("App/GraduateName").then(function (sub) {
            sub.signal.connect(function (payload) {
                if (!payload) return;
                const parts = payload.split("|");
                displayGraduate(parts[0].trim(), parts[1] ? parts[1].trim() : "");
            });
        });

    });
}

function onDisconnected() {
    console.log("Disconnected from Pepper");
}

/* ── Update the Pepper speech subtitle ────────────────── */
function displaySpeech(text) {
    const el = document.getElementById("pepper-speech");
    if (!el) return;
    el.style.opacity = "0";
    setTimeout(() => {
        el.innerText = text || "";
        el.style.opacity = "1";
    }, 200);
}

/* ── Flash a graduate's name onto the spotlight ─────── */
function displayGraduate(name, honors) {
    const nameEl   = document.getElementById("graduate-name");
    const honorsEl = document.getElementById("graduate-honors");
    if (!nameEl || !honorsEl) return;

    // Remove old flash class so animation can retrigger
    nameEl.classList.remove("flash");
    honorsEl.classList.remove("flash");

    // Small reflow gap so the animation restarts cleanly
    void nameEl.offsetWidth;

    nameEl.innerText   = name   || "";
    honorsEl.innerText = honors || "";

    nameEl.classList.add("flash");
    honorsEl.classList.add("flash");
}

/* ── Operator: advance to next ceremony segment ─────── */
function goToNext() {
    if (session) {
        session.service("ALMemory").then(function (memory) {
            memory.raiseEvent("onNextSegment", 1);
        });
    } else {
        alert("(Local test) Next segment triggered.");
    }
}
