let session;

window.onload = function () {
    if (typeof QiSession === 'undefined') {
        console.log("Local testing mode.");
        // Simulate Pepper speech appearing
        setTimeout(() => displaySpeech("It is now my distinct honor to introduce our guest speaker."), 1000);
        setTimeout(() => displaySpeech("A renowned expert in the field of Software Engineering."), 4000);
        setTimeout(() => displaySpeech("Please join me in welcoming, Doctor Engineer Marcel Daccache."), 7500);
    } else {
        QiSession(onConnected, onDisconnected);
    }
};

function onConnected(s) {
    session = s;
    console.log("Connected — Introducing Guest");

    session.service("ALMemory").then(function (memory) {
        // Show Pepper's live speech as subtitles
        memory.subscriber("App/PepperSpeech").then(function (sub) {
            sub.signal.connect(displaySpeech);
        });
    });
}

function onDisconnected() {
    console.log("Disconnected from Pepper");
}

function displaySpeech(text) {
    const el = document.getElementById("pepper-speech");
    if (!el) return;
    el.style.opacity = "0";
    setTimeout(() => {
        el.innerText = text || "";
        el.style.opacity = "1";
    }, 200);
}

function goToNext() {
    if (session) {
        session.service("ALMemory").then(function (memory) {
            memory.raiseEvent("onNextSegment", 1);
        });
    } else {
        alert("(Local test) Next segment triggered.");
    }
}
