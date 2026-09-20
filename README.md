# NASA-Space-Apps-Challenge
# 🌌 Relics of the Solar System

> An interactive digital exhibition exploring the spacecraft, missions, and scientific ideas that have expanded humanity's view of the Solar System and beyond.

Built for the **NASA Space Apps Challenge**.

[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA%20Space%20Apps-Challenge-E85D3F?style=flat-square)](https://www.spaceappschallenge.org/)
[![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org/)

---

## 🚀 What is this?

**Relics of the Solar System** is a browser-based interactive space exhibition.

Instead of presenting missions as a static list of text and images, the project turns the information into an experience: visitors move through a cinematic landing sequence, inspect spacecraft in 3D, follow a continuously updating mathematical estimate of Voyager 1's distance, test their knowledge with a space-science quiz, and enter an interactive Solar System simulation.

The project is designed to make space technology and scientific ideas easier to explore for students, educators, and space enthusiasts.

---

## ✨ Highlights

### 🎬 Cinematic Exhibition Landing

The landing experience uses a scroll-linked presentation with a stylized Saturn rendered in **Three.js**.

As the user scrolls, the scene changes progressively and introduces the exhibition content before the main archive becomes available.

### 🛰️ Interactive Hardware Archive

The archive currently features four mission hardware entries:

- **Curiosity Rover**
- **Voyager 1**
- **Ingenuity**
- **James Webb Space Telescope**

Mission cards are generated dynamically from structured data in `js/app.js`.

Each entry includes mission metadata, scientific information, an audience-friendly fact, mission status, and an interactive 3D model.

### 🧊 Interactive 3D Models

The spacecraft models use Google's **`<model-viewer>`** Web Component and local `.glb` assets.

Supported interactions in the current implementation include:

- Camera controls
- Rotation
- Auto-rotation
- Browser-based 3D rendering

The model assets live in:

```text
assets/models/
├── curiosity.glb
├── ingenuity.glb
├── jwst.glb
└── voyager.glb
```

### 📡 Voyager 1 Distance Estimate

The archive includes a continuously updating Voyager 1 distance counter.

**This is not a live NASA telemetry feed.** The current implementation uses a fixed baseline distance and date, then extrapolates the distance forward using an assumed velocity of approximately **17 km/s**:

```text
D(t) = D₀ + v × Δt
```

This provides an easy-to-understand visualization of the scale of Voyager 1's journey.

### 🧠 Space Explorer Quiz

A four-question interactive quiz tests knowledge of topics such as:

- Infrared astronomy
- Gravitational assists
- The heliopause
- Voyager's Golden Record

The quiz tracks the score in the browser and awards a **Mission Specialist** badge when the passing threshold is reached. The earned badge state is stored using browser `localStorage`.

### 🪐 Interactive Solar System

The project includes a separate Solar System experience inside:

```text
solar-system/
```

The main page opens it in an exhibition-style modal containing:

```text
solar-system/index.html
```

The Solar System module provides controls for viewing, zoom, and scale settings for planetary motion.

---

## 🛰️ Mission Archive

| Mission | Destination / Region | Type | Year | 3D Asset |
|---|---|---|---:|---|
| **Curiosity Rover** | Mars — Gale Crater | Mobile Laboratory | 2011 | `curiosity.glb` |
| **Voyager 1** | Interstellar Space | Deep Space Probe | 1977 | `voyager.glb` |
| **Ingenuity** | Mars — Jezero Crater | Aerial Scout | 2020 | `ingenuity.glb` |
| **James Webb Space Telescope** | L2 | Infrared Observatory | 2021 | `jwst.glb` |

---

## 🧠 Science & Learning

The website also contains a dedicated **Science Unlocked** section covering concepts connected to robotic exploration and astronomy, including:

- Gravitational-assist maneuvers
- Subsurface ocean worlds
- Heliospheric boundary dynamics

The goal is to connect the hardware a visitor sees with the scientific ideas that make those missions meaningful.

---

## 🏗️ Project Structure

The current repository is intentionally lightweight and does not use a traditional frontend build framework.

```text
NASA-Space-Apps-Challenge/
│
├── assets/
│   └── models/
│       ├── curiosity.glb
│       ├── ingenuity.glb
│       ├── jwst.glb
│       └── voyager.glb
│
├── js/
│   └── app.js
│
├── solar-system/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── LICENSE.txt
│   └── README.md
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

### Key files

| File / Directory | Purpose |
|---|---|
| `index.html` | Main exhibition page, layout, styling, hero scene, quiz/archive sections and Solar System modal |
| `js/app.js` | Mission data, dynamic hardware cards, 3D model injection, Voyager distance calculation and quiz logic |
| `assets/models/` | Local GLB spacecraft models |
| `solar-system/` | Embedded Solar System sub-module |
| `package.json` | npm dependency metadata |
| `package-lock.json` | Locked npm dependency tree |

---

## ⚙️ Run It Locally

The project is a static web application, but serving it through a local HTTP server is recommended because the browser loads local 3D assets.

### 1. Clone the repository

```bash
git clone https://github.com/Holow-AD/NASA-Space-Apps-Challenge.git
cd NASA-Space-Apps-Challenge
```

### 2. Start a local server

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### VS Code alternative

Open the repository in VS Code and launch `index.html` with the **Live Server** extension.

No frontend build step is currently required.

---

## 🌐 Deployment

Because the project is a static website, it can be served by static hosting providers.

### GitHub Pages

For a GitHub Pages deployment:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`.
5. Save the configuration.

When deployed from the organization repository, the project URL follows the usual GitHub Pages repository format:

```text
https://<organization>.github.io/NASA-Space-Apps-Challenge/
```

---

## 🧪 Technical Architecture

### Main application

The main exhibition is implemented with:

- Semantic HTML structure
- Tailwind CSS loaded through the browser
- Custom CSS for the exhibition visual system
- JavaScript for interaction and state
- Three.js for the cinematic Saturn scene
- `<model-viewer>` for local spacecraft models

### Mission data flow

`js/app.js` contains the current mission dataset and builds the hardware cards dynamically:

```text
Mission Data
     │
     ▼
js/app.js
     │
     ├── Mission metadata
     ├── Scientific description
     ├── Educational fact
     ├── Model path
     └── Mission status
     │
     ▼
#hardware-grid
     │
     ▼
<model-viewer>
     │
     ▼
Local .glb model
```

### Voyager estimate

```text
Fixed baseline distance
        +
Elapsed time
        ×
Assumed velocity (~17 km/s)
        │
        ▼
Estimated current distance
        │
        ▼
Browser display
```

### Quiz state

```text
Question
   │
   ▼
User answer
   │
   ▼
Answer validation
   │
   ▼
Score update
   │
   ├── Continue
   │
   └── Final result
          │
          └── Mission Specialist badge
```

---

## 🎮 Visitor Journey

```text
Cinematic Landing
        ↓
Hardware Archive
        ↓
Inspect Mission Hardware in 3D
        ↓
Follow Voyager 1's Estimated Distance
        ↓
Take the Space Explorer Quiz
        ↓
Explore the Interactive Solar System
```

The experience is intended to feel closer to a **digital scientific exhibition** than a conventional information website.

---

## 🔬 Why It Matters

The project focuses on a simple idea:

> Space science becomes easier to understand when people can interact with it.

The website combines:

- Visual storytelling
- Mission context
- 3D hardware
- Mathematical visualization
- Educational questions
- Interactive planetary exploration

This creates several different entry points for learning without requiring visitors to read a long technical document first.

---

## 🏆 NASA Space Apps Challenge

This project was created as a submission for the **NASA Space Apps Challenge**, an international hackathon centered on space science, Earth science, open data, creativity, and technology.

The project is an **independent hackathon submission** and is not officially operated, endorsed, or sponsored by NASA.

---

## 👥 Team

### Anuraag Moharana
**UI / UX & Frontend Experience**

- UI/UX design
- HTML structure
- Tailwind CSS and custom styling
- Exhibition visual system
- Frontend layout and presentation
- UI-focused interactions

### Dhruv
**Application & Interactive Systems**

- Application logic in `js/app.js`
- Mission data
- Dynamic hardware archive
- Voyager distance calculation
- Space quiz logic
- 3D hardware integration

---

## 📸 Screenshots

Screenshots can be added here as the project documentation is expanded.

Recommended captures:

```text
docs/screenshots/
├── hero.png
├── hardware-archive.png
├── voyager-ticker.png
├── space-quiz.png
└── solar-system.png
```

These files are documentation targets and are not currently included in the repository.

---

## 🔗 Links

- **Repository:** https://github.com/Holow-AD/NASA-Space-Apps-Challenge
- **NASA Space Apps Challenge:** https://www.spaceappschallenge.org/
- **Model Viewer:** https://modelviewer.dev/
- **Julian Garnier — 3D CSS Solar System:** https://github.com/juliangarnier/3D-CSS-Solar-System

---

## 📚 Credits & Attribution

### 3D CSS Solar System

The Solar System module in `solar-system/` is based on **Julian Garnier's 3D CSS Solar System** project:

https://github.com/juliangarnier/3D-CSS-Solar-System

The accompanying `solar-system/LICENSE.txt` preserves the original **MIT License** and attribution requirements.

### Model Viewer

The main application uses Google's **`<model-viewer>`** Web Component to display the local GLB spacecraft models:

https://modelviewer.dev/

### External runtime resources

The main page also loads browser-side libraries/resources including:

- Tailwind CSS
- Three.js
- Google Fonts
- Google Model Viewer

See `index.html` for the current CDN references.

---

## 📄 Licensing

The repository currently contains the original MIT license for the Julian Garnier Solar System module at:

```text
solar-system/LICENSE.txt
```

A separate root-level license for the original project code is not currently included in the repository.

Third-party components remain subject to their respective licenses and attribution requirements.

---

## 🔮 Future Directions

Potential future improvements include:

- [ ] Replace the Voyager mathematical estimate with verified external telemetry or ephemeris data.
- [ ] Expand the hardware archive with additional missions and spacecraft.
- [ ] Add more interactive educational modules.
- [ ] Improve accessibility and keyboard navigation across all interactive components.
- [ ] Add a dedicated screenshot/demo gallery.
- [ ] Explore mobile AR capabilities for supported 3D models.

---

## 🤝 Contributing

For team development, use feature branches rather than pushing directly to `main`.

```bash
git checkout main
git pull origin main
git checkout -b feature/my-feature
```

After making changes:

```bash
git add .
git commit -m "Describe the change"
git push -u origin feature/my-feature
```

Then open a Pull Request targeting `main`.

---

## ⭐ Built for exploration

**Relics of the Solar System** is a small interactive archive built around a big idea:

**make space technology something people can explore, not just read about.**

🌌 🛰️ 🪐
