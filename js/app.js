// js/app.js

// 1. The Data (Your "Brain")
const missions = [
  {
    id: "curiosity-rover",
    name: "Curiosity Rover",
    destination: "Mars (Gale Crater)",
    year: 2011,
    status: "Active Mission",
    type: "Mobile Laboratory",
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
    scienceUnlocked: "Captures heavily redshifted infrared photons to observe the formation of the universe's first galaxies.",
    kidsFact: "Because light takes so long to travel, looking through this golden telescope lets us see what space looked like billions of years ago."
  }
];

// 2. The Bridge (Pushing your data into his design)
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('hardware-grid');
  
  if (grid) {
    // Clear his "Loading" placeholder
    grid.innerHTML = ''; 

    // Loop through your data and build his cards
    missions.forEach(mission => {
      const card = document.createElement('article');
      card.className = 'group cursor-pointer';
      
      card.innerHTML = `
        <div class="mb-4">
          <span class="catalog-number text-coral-500">${mission.destination}</span>
          <h3 class="card-title mt-2 group-hover:text-coral-500 transition-colors">${mission.name}</h3>
          <span class="metadata text-paper-400">LAUNCH: ${mission.year} // ${mission.type}</span>
        </div>
        
        <div class="space-y-4 mb-6">
          <p class="description border-l-2 border-coral-500/30 pl-3">
            <strong class="font-mono text-[10px] uppercase block mb-1 text-paper-600">The Science:</strong>
            ${mission.scienceUnlocked}
          </p>
          <p class="description text-sm text-paper-500">
            ${mission.kidsFact}
          </p>
        </div>

        <div class="mt-auto">
          <span class="status-pill">${mission.status}</span>
        </div>
      `;
      
      grid.appendChild(card);
    });
  }
});