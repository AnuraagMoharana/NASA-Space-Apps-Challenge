// js/app.js

// --- 1. The Data Engine ---
const missions = [
  {
    id: "curiosity-rover",
    name: "Curiosity Rover",
    destination: "Mars (Gale Crater)",
    year: 2011,
    status: "Active Mission",
    type: "Mobile Laboratory",
    modelUrl: "assets/models/curiosity.glb",
    scienceUnlocked: "Discovered ancient freshwater lakebeds, clay minerals, and organic carbon compounds proving ancient Mars could support microbial life.",
    kidsFact: "Curiosity shoots a laser at rocks to vaporize them and analyze the vapor to see what Mars is made of!"
  },
  {
    id: "voyager-1",
    name: "Voyager 1",
    destination: "Interstellar Space",
    year: 1977,
    status: "Transmitting Telemetry",
    type: "Deep Space Probe",
    modelUrl: "assets/models/voyager.glb",
    scienceUnlocked: "First probe to cross the heliopause into interstellar space, measuring cosmic ray densities outside the Sun's magnetic bubble.",
    kidsFact: "It carries the Golden Record with Earth sounds, Chuck Berry music, and whale songs in case aliens discover it!"
  },
  {
    id: "ingenuity-helicopter",
    name: "Ingenuity Helicopter",
    destination: "Mars (Jezero Crater)",
    year: 2020,
    status: "Mission Complete",
    type: "Aerial Scout",
    modelUrl: "assets/models/ingenuity.glb",
    scienceUnlocked: "Proved that powered, controlled flight is possible in Mars' extremely thin atmosphere using counter-rotating carbon-fiber blades.",
    kidsFact: "It is the very first aircraft to ever fly on another planet!"
  },
  {
    id: "jwst-telescope",
    name: "James Webb Telescope",
    destination: "Lagrange Point 2",
    year: 2021,
    status: "Active Observation",
    type: "Infrared Observatory",
    modelUrl: "assets/models/jwst.glb",
    scienceUnlocked: "Captures heavily redshifted infrared photons to observe the formation of the universe's first galaxies.",
    kidsFact: "Because light takes so long to travel, looking through this golden telescope lets us see what space looked like billions of years ago."
  }
];

// --- 2. The UI Bridge ---
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('hardware-grid');
  
  if (grid) {
    grid.innerHTML = ''; 

    missions.forEach(mission => {
      const card = document.createElement('article');
      card.className = 'group cursor-pointer flex flex-col h-full';
      
      card.innerHTML = `
        <div class="mb-4">
          <span class="catalog-number text-coral-500">${mission.destination}</span>
          <h3 class="card-title mt-2 group-hover:text-coral-500 transition-colors">${mission.name}</h3>
          <span class="metadata text-paper-400">LAUNCH: ${mission.year} // ${mission.type}</span>
        </div>
        
        <!-- NEW 3D VIEWER BLOCK -->
        <div class="w-full h-56 bg-[#EEECE5] border border-paper-100/15 relative overflow-hidden mb-6 flex-shrink-0">
          <model-viewer 
            src="${mission.modelUrl}" 
            alt="3D model of ${mission.name}" 
            auto-rotate 
            camera-controls 
            rotation-per-second="30deg"
            interaction-prompt="hover"
            class="w-full h-full outline-none cursor-grab active:cursor-grabbing">
          </model-viewer>
        </div>

        <div class="space-y-4 mb-6 flex-grow">
          <p class="description border-l-2 border-coral-500/30 pl-3">
            <strong class="font-mono text-[10px] uppercase block mb-1 text-paper-600">The Science:</strong>
            ${mission.scienceUnlocked}
          </p>
          <p class="description text-sm text-paper-500">
            ${mission.kidsFact}
          </p>
        </div>

        <div class="mt-auto pt-4 border-t border-paper-100/10">
          <span class="status-pill inline-block">${mission.status}</span>
        </div>
      `;
      
      grid.appendChild(card);
    });
  }
});

// --- 3. Voyager 1 Live Distance Ticker ---
(function () {
  const INITIAL_DISTANCE_KM = 24310000000; 
  const VELOCITY_KM_PER_SEC = 17.0;
  const BASELINE_DATE = new Date("2026-01-01T00:00:00Z");
  const tickerEl = document.getElementById("voyager-distance-value");

  function calculateCurrentDistanceKm() {
    const now = new Date();
    const elapsedSeconds = (now.getTime() - BASELINE_DATE.getTime()) / 1000;
    return INITIAL_DISTANCE_KM + VELOCITY_KM_PER_SEC * elapsedSeconds;
  }

  function formatWithCommas(number) {
    return Math.round(number).toLocaleString("en-US");
  }

  function renderLoop() {
    if (tickerEl) {
      const distanceKm = calculateCurrentDistanceKm();
      tickerEl.textContent = formatWithCommas(distanceKm);
    }
    requestAnimationFrame(renderLoop);
  }

  if (tickerEl) {
    requestAnimationFrame(renderLoop);
  }
})();
// --- Space Explorer Quiz ---

(function () {
  const QUESTIONS = [
    {
      question: "The James Webb Space Telescope observes primarily in infrared. Why does this help it see the earliest galaxies?",
      options: [
        "Infrared light travels faster than visible light",
        "Light from very distant galaxies is redshifted into infrared by cosmic expansion",
        "Infrared sensors are cheaper to manufacture at large sizes",
        "Early galaxies only emitted infrared light, never visible light"
      ],
      correctIndex: 1
    },
    {
      question: "What is the main principle behind a gravitational assist (slingshot) maneuver?",
      options: [
        "A spacecraft ignites extra fuel while passing a planet",
        "A planet's magnetic field pushes the spacecraft forward",
        "A spacecraft borrows a small amount of a planet's orbital momentum to change its speed and trajectory",
        "Solar wind pressure builds up near large planets and accelerates nearby objects"
      ],
      correctIndex: 2
    },
    {
      question: "What is the heliopause?",
      options: [
        "The point in Earth's atmosphere where sunlight is fully absorbed",
        "The boundary where the Sun's solar wind is overtaken by interstellar medium pressure",
        "The closest point in Mercury's orbit to the Sun",
        "A pause in solar activity during periods of low sunspot count"
      ],
      correctIndex: 1
    },
    {
      question: "Voyager 1's Golden Record was included on the spacecraft primarily to:",
      options: [
        "Store backup navigation data for mission control",
        "Provide a time capsule of sounds and images representing life on Earth",
        "Power onboard instruments using its reflective surface",
        "Calibrate the spacecraft's cameras during flight"
      ],
      correctIndex: 1
    }
  ];

  const BADGE_STORAGE_KEY = "missionSpecialistBadge";
  const PASSING_SCORE = 3;

  let currentQuestionIndex = 0;
  let score = 0;

  const activeView = document.getElementById("quiz-active");
  const resultsView = document.getElementById("quiz-results");
  const progressEl = document.getElementById("quiz-progress");
  const scoreLiveEl = document.getElementById("quiz-score-live");
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const feedbackEl = document.getElementById("quiz-feedback");
  const finalScoreEl = document.getElementById("quiz-final-score");
  const badgeMsgEl = document.getElementById("quiz-badge-msg");
  const restartBtn = document.getElementById("quiz-restart");

  function renderQuestion() {
    feedbackEl.textContent = "";
    const q = QUESTIONS[currentQuestionIndex];

    progressEl.textContent = `Question ${currentQuestionIndex + 1} / ${QUESTIONS.length}`;
    scoreLiveEl.textContent = `Score: ${score}`;
    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";
    q.options.forEach((optionText, index) => {
      const btn = document.createElement("button");
      btn.className =
        "text-left font-mono text-sm px-4 py-3 border border-[#151515]/20 bg-white/60 " +
        "hover:border-[#FF5A3C] hover:text-[#FF5A3C] transition-colors";
      btn.textContent = optionText;
      btn.addEventListener("click", () => handleAnswer(index, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, selectedBtn) {
    const q = QUESTIONS[currentQuestionIndex];
    const isCorrect = selectedIndex === q.correctIndex;

    // Disable all option buttons after answering
    Array.from(optionsEl.children).forEach((btn) => (btn.disabled = true));

    if (isCorrect) {
      score += 1;
      selectedBtn.classList.add("border-[#FF5A3C]", "text-[#FF5A3C]");
      feedbackEl.textContent = "Correct.";
      feedbackEl.classList.add("text-[#FF5A3C]");
    } else {
      selectedBtn.classList.add("border-neutral-400", "line-through", "text-neutral-400");
      feedbackEl.textContent = `Incorrect — correct answer: ${q.options[q.correctIndex]}`;
      feedbackEl.classList.add("text-neutral-500");
    }

    scoreLiveEl.textContent = `Score: ${score}`;

    setTimeout(() => {
      currentQuestionIndex += 1;
      feedbackEl.classList.remove("text-[#FF5A3C]", "text-neutral-500");
      if (currentQuestionIndex < QUESTIONS.length) {
        renderQuestion();
      } else {
        showResults();
      }
    }, 1200);
  }

  function showResults() {
    activeView.classList.add("hidden");
    resultsView.classList.remove("hidden");
    finalScoreEl.textContent = score;

    if (score >= PASSING_SCORE) {
      localStorage.setItem(BADGE_STORAGE_KEY, "true");
      badgeMsgEl.innerHTML =
        '<span class="text-[#FF5A3C]">Mission Specialist Badge earned.</span> Saved to this browser.';
    } else {
      badgeMsgEl.textContent = `Score ${PASSING_SCORE}/4 or higher to earn the Mission Specialist Badge.`;
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultsView.classList.add("hidden");
    activeView.classList.remove("hidden");
    renderQuestion();
  }

  if (activeView && resultsView) {
    restartBtn.addEventListener("click", restartQuiz);
    renderQuestion();

    // Optional: reflect already-earned badge on page load
    if (localStorage.getItem(BADGE_STORAGE_KEY) === "true") {
      scoreLiveEl.title = "Mission Specialist Badge already earned on this browser";
    }
  }
})();