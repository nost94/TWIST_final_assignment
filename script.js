let discoTimer = null; // Dedicated timer for the 1970s game

const eraData = {

'home': { 
    n: "Welcome to Chronos", 
    d: "Experience the history of humankind through an interactive timeline. Choose your favourite era from the menu above to begin your journey.", 
    g: "Time Traveler Status", 
    h: `
        <div style='font-size:60px; margin: 20px;'>⏳</div>
        <p><b>Choose your favourite era from the menu.</b></p>
        
        <div id="random-container" style="margin-top: 25px; padding: 10px;">
            <button class="random-btn" onclick="jumpToRandomEra()" style="cursor: pointer !important; pointer-events: auto !important;">
                ✨ TAKE A RANDOM LEAP
            </button>
        </div>
    ` 
},

'stone-age': { 
    n: "The Stone Age", 
    d: "Mankind's first steps into art and tool-making.", 
    g: "Cave Painting", 
    h: `
        <div id="stone-age-layout" onmouseover="initCaveCanvas()" style="text-align: center;">
            <p style="color: white; font-weight: bold; text-shadow: 2px 2px 4px #000; margin-bottom: 10px;">
                Move your mouse here and drag to paint...
            </p>
            
            <div style="position: relative; display: inline-block;">
                <canvas id="cave-wall" width="350" height="250" 
                        style="background: #2b1d1a; border: 10px solid #3e2723; border-radius: 10px; cursor: crosshair;"></canvas>
                
                <div id="cave-fact" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 85%; background: #fffdfa; color: #2b1d1a; padding: 20px; border: 4px solid #8d6e63; border-radius: 8px; box-shadow: 0 0 50px #000; z-index: 100;">
                    <h3 style="margin-top:0; color: #3e2723; border-bottom: 2px solid #8d6e63;">🦣 Ancient Discovery!</h3>
                    <p><b>Did you know?</b> Stone Age artists often used their hands as "stencils" by blowing powdered minerals over them!</p>
                    
                    <button class="game-btn" onclick="resetCave()" style="background: #3e2723; color: white; padding: 10px 20px; font-weight: bold;">RESTART PAINTING 🧹</button>
                </div>
            </div>
            <p id="paint-status" style="color: #a1887f; font-size: 0.9rem; margin-top: 10px;">Progress: 0%</p>
        </div>
    ` 
},
   
'mesopotamia': { 
    n: "Mesopotamia & Babylon", 
    d: "The Cradle of Civilization. Home of the first laws and the first writing.", 
    g: "The Royal Scribe's Tablet", 
    h: `
        <div id="scribe-game-container" style="text-align: center; color: #5d4037;">
            <p><b>Task:</b> Tap the clay tablet to carve the Royal Decree!</p>
            
            <div id="clay-tablet" onclick="addWedge()" style="width: 280px; height: 180px; background: #bcaaa4; margin: 20px auto; border-radius: 12px; border: 6px solid #8d6e63; box-shadow: inset 4px 4px 10px rgba(0,0,0,0.4), 6px 6px 0px #5d4037; display: flex; align-items: center; justify-content: center; padding: 15px; position: relative; cursor: crosshair; user-select: none;">
                <div id="tablet-text" style="font-size: 2rem; color: #4e342e; letter-spacing: 5px; word-break: break-all;">
                    </div>
            </div>

            <p id="scribe-status">Symbols Carved: 0 / 10</p>
            
            <button class="game-btn" onclick="resetClay()" style="background: #8d6e63; font-size: 0.8rem;">Erase Tablet (Warning!)</button>

            <div id="hanging-gardens" style="display: none; margin-top: 20px; font-size: 45px; animation: grow 1.5s ease-out;">
                🌿🌻🌴🏛️🌊
                <p style="font-size: 0.9rem; color: #2e7d32; font-weight: bold;">The Gardens are flourishing!</p>
            </div>
        </div>
    ` 
},

'roman-empire': { 
    n: "The Roman Empire", 
    d: "All roads lead to Rome. The center of civilization and the birthplace of the Aqueduct.", 
    g: "Lift the Portcullis", 
    h: `
        <div class="game-instructions">
            <p>You have encountered a barred city gate! The mechanism is massive and heavy. Lift it before the time runs out by clicking the lever repeatedly!</p>
        </div>

        <div id="gate-lifting-container" style="text-align: center; margin-top: 20px;">
            
            <div id="visual-gate-wrapper">
                <div class="stone-arch"></div>
                <div id="moving-portcullis" class="gate-grid"></div>
            </div>

            <p id="lift-status" style="margin-top: 10px;">Gate Status: CLOSED (0%)</p>
            
            <div style="width: 100%; background: #444; height: 15px; border-radius: 10px; margin-bottom: 20px; overflow: hidden; border: 2px solid #a1887f;">
                <div id='gate-progress' style="width: 0%; height: 100%; background: #a1887f; transition: width 0.1s;"></div>
            </div>

            <button class='game-btn' onclick='liftRomanGate()'>CRANK THE LEVER 🏗️</button>
            
            <div id="trojan-horse-visual" style="display: none; position: fixed; left: -200px; bottom: 50px; font-size: 80px; z-index: 1000; filter: drop-shadow(0 0 10px rgba(0,0,0,0.5)); transition: left 1s ease-out;">
                🐴
            </div>
        </div>
    ` 
},

'byzantian': { 
    n: "Byzantian Europe", 
    d: "The Golden Mosaic. A bridge between the ancient and the medieval worlds, where art served the empire.", 
    g: "The Imperial Mosaic", 
    h: `
        <p id="mosaic-msg">Match all tiles to <b>Gold</b> to complete the icon!</p>
        <div id='m' style='display:grid; grid-template-columns:repeat(3,50px); gap:8px; justify-content:center; margin: 20px 0;'></div>
        <div id="mosaic-status" style="font-weight:bold; color:gold;"></div>
    ` 
},
'middle-ages': { 
    n: "The Middle Ages", 
    d: "Knights, Castles, and the age of Chivalry. The hearth of the forge never cools.", 
    g: "The Master Smith", 
    h: `
        <div id="forge-area" style="font-size: 60px; margin: 20px; transition: all 0.3s;">🗡️</div>
        <p id="forge-msg">The steel is cold. Strike the anvil to heat it!</p>
        <div style="width: 100%; background: #444; height: 10px; border-radius: 5px; margin: 10px 0;">
            <div id="heat-bar" style="width: 0%; height: 100%; background: orange; transition: width 0.2s;"></div>
        </div>
        <button class="game-btn" onclick="strikeAnvil()">🔨 Strike Anvil</button>
    ` 
},
    'belle-epoque': { 
        n: "La Belle Époque", 
        d: "The beautiful era of Paris. Art, optimism, and the Eiffel Tower.", 
        g: "Postcard Decorator", 
        h: "<div id='canvas-1900' style='width:300px; height:150px; border:2px solid #880e4f; margin:auto; position:relative; background:#fff; overflow:hidden'>🗼</div><button class='game-btn' onclick='addFlower()'>Add Flower 🌸</button>" 
    },
'early-20th': { 
    n: "The First Years of the 20th Century", 
    d: "The Industrial Surge and the birth of modern machinery. Information now travels at the speed of electricity.", 
    g: "Morse Code Messenger", 
    h: `
        <p>Type your message below to hear the telegraph:</p>
        <input id='telegraph-input' placeholder='Type SOS...' onkeydown='playTelegraphBeep()' 
               style='padding:12px; border-radius:5px; border:2px solid #3e2723; width:80%; font-family: "Courier Prime", monospace;'>
        <br>
        <button class='game-btn' onclick='sendTelegram()'>Transmit</button>
        
        <div id="cinema-fact" style="display:none; margin-top:20px; padding:15px; background:rgba(0,0,0,0.1); border:1px dashed #3e2723; font-style:italic; font-size:0.9rem;">
            🎬 <b>Cinema Fact:</b> While you were sending messages, the world was falling in love with "Silent Films." 
            Since there was no recorded sound, a live pianist or organist would sit in the theater and play music 
            to match the mood of the film on screen!
        </div>
    ` 
},
'roaring-20s': { 
    n: "The Roaring 1920s", 
    d: "Jazz, Glamour, and Art Deco. The party of the century.", 
    g: "Speakeasy Piano", 
    h: `<div style='display:flex; justify-content:center; gap:5px;'>
            <div class='key' id='k-A' onmousedown="playNote('A')">A</div>
            <div class='key' id='k-S' onmousedown="playNote('S')">S</div>
            <div class='key' id='k-D' onmousedown="playNote('D')">D</div>
            <div class='key' id='k-F' onmousedown="playNote('F')">F</div>
        </div>
        <p id='jazz-msg'>Press A, S, D, F or Click the keys!</p>` 
},

'the-1970': { 
    n: "The 1970s", 
    d: "", 
    g: "", 
    h: `
        <div class="disco-container">
            <h2 class="disco-headline">THE 1970s</h2>
            <p class="disco-subtext">Bell-bottoms, disco balls, and the rise of the synthesizer. The decade of self-expression.</p>

            <div id="disco-intro">
                <p>Welcome to the 70s! Ready to test your rhythm on the light-up floor?</p>
                <button class="game-btn" onclick="showDiscoGame()">ENTER THE DANCE FLOOR 🕺</button>
            </div>

            <div id="disco-game-wrap" style="display: none;">
                <div id="disco-ball-container"><div class="disco-ball"></div></div>
                <p id="disco-msg">Watch the floor and repeat the pattern!</p>
                
                <div id="disco-floor">
                    <div class="tile" id="tile-0" onclick="playerClick(0)" style="background: #ff1744;"></div>
                    <div class="tile" id="tile-1" onclick="playerClick(1)" style="background: #00e676;"></div>
                    <div class="tile" id="tile-2" onclick="playerClick(2)" style="background: #2979ff;"></div>
                    <div class="tile" id="tile-3" onclick="playerClick(3)" style="background: #ffea00;"></div>
                </div>

                <div class="button-row">
                    <button class="game-btn" onclick="startDiscoGame()">START PARTY</button>
                    <button class="game-btn exit-btn" onclick="stopDiscoGame()">EXIT 🛑</button>
                </div>
                <p id="disco-score">Score: 0</p>
            </div>
        </div>
    ` 
},

'the-1990': { 
    n: "The 1990s", 
    d: "The Digital Dawn. Welcome to the World Wide Web, AOL, and the sound of the future.", 
    g: "Dial-Up Race", 
    h: `
        <div class="audio-warning">
            ⚠️ <b>Sound Notice:</b> This era includes high-pitched modem "dial-up" noises. 
            If sudden electronic sounds cause you stress or resemble sirens, please lower your volume or mute your device before connecting.
        </div>
        <div id="modem-container" style="text-align: center;">
            <div style="font-size: 50px; margin-bottom: 20px;">📟</div>
            <p id='modem-status'>Status: Disconnected</p>
            
            <div style="width: 100%; background: #444; height: 20px; border: 2px inset #fff; margin-bottom: 20px;">
                <div id='dial-progress' style="width: 0%; height: 100%; background: #000080; transition: width 0.1s;"></div>
            </div>

            <button id="modem-btn" class='game-btn' onclick='start90sDialUp()'>CONNECT TO THE WEB</button>
            
            <audio id="dialup-sound" preload="auto">
                <source src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Dial_up_modem_noises.ogg" type="audio/ogg">
            </audio>
            
            <audio id="mail-sound" preload="auto">
                <source src="https://archive.org/download/you-ve-got-mail-sound/You%27ve%20Got%20Mail%20Sound.mp3" type="audio/mpeg">
            </audio>
        </div>
    ` 
},

    'year-2026': { 
        n: "Year 2026", 
        d: "The Present. Hyper-connected, AI-integrated, and fast.", 
        g: "Notification Clean-up", 
        h: "<div id='phone-screen' style='height:150px; overflow:hidden; background:#000; border-radius:10px;'><div id='notif-layer'></div></div><p>Tap to dismiss alerts!</p>" 
    },
    'future': { 
        n: "The Future of Humankind", 
        d: "Beyond the Stars. Humanity's next great leap.", 
        g: "Mars Settlement Sim", 
        h: "<div>💨 O2: <b id='o2'>0</b>% | 💧 H2O: <b id='h2o'>0</b>%</div><div id='mars-base' style='font-size:40px; margin:10px;'>🏗️</div><button class='game-btn' onclick='buildMars(\"o2\")'>Extract O2</button><button class='game-btn' onclick='buildMars(\"h2o\")'>Melt Ice</button>" 
    },
    'about-creator': { 
        n: "About the Creator", 
        d: "Anastasiya Ostapenko, Digital Media student at TAU.", 
        g: "This website was built using HTML, CSS, and JavaScript. It features custom interactive games for each era, designed to be simple yet engaging. The goal was to create a fun and educational experience that brings history to life through play.", 
        h: "<p>This is my TWIST course project.</p><button class='game-btn' onclick='alert(\"Storytelling, Unity, RenPy, C#, JS\")'>Some of the things I've learned</button>" 
    }
};


let score = 0;
let marsStats = { o2: 0, h2o: 0 };
let currentTimer = null; 

const nav = document.getElementById('timeline');
Object.keys(eraData).forEach(key => {
    let b = document.createElement('button');
    b.innerText = eraData[key].n;
    b.onclick = () => loadEra(key);
    nav.appendChild(b);
});


function loadEra(id) {
    strokeCounter = 0; 
    isCanvasInit = false;
  
    if(currentTimer) {
        clearInterval(currentTimer);
        currentTimer = null;
    }
    
    score = 0;
    marsStats = { o2: 0, h2o: 0 };

    const era = eraData[id];
    document.body.className = id;
    
    const viewport = document.getElementById('content');
    viewport.innerHTML = `
        <h1>${era.n}</h1>
        <p>${era.d}</p>
        <div class="game-area">
            <h3>Interactive: ${era.g}</h3>
            ${era.h}
        </div>
    `;

    if(id === 'stone-age') initStoneGame();
    if(id === 'byzantian') initMosaic();
    if(id === 'year-2026') currentTimer = setInterval(spawnNotif, 2000);
}


function playNote(key) {
    const el = document.getElementById(`k-${key.toUpperCase()}`);
    if(el) {
        el.classList.add('active-key');
        
        // --- JAZZ PIANO AUDIO LOGIC ---
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            // Map keys to musical frequencies (C4, D4, E4, F4)
            const frequencies = { 'A': 261.63, 'S': 293.66, 'D': 329.63, 'F': 349.23 };
            
            // 'triangle' sounds warmer and more like a vintage upright piano
            osc.type = 'triangle'; 
            osc.frequency.setValueAtTime(frequencies[key.toUpperCase()] || 261.63, audioCtx.currentTime);
            
            // Volume Envelope: Start at 0.2 volume and fade to almost 0
            gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        } catch(e) {
            console.log("Audio block: user must interact with the page first.");
        }
        // ------------------------------

        const msg = document.getElementById('jazz-msg');
        if(msg) msg.innerText = "🎶 Stay Groovy! 🎶";
        setTimeout(() => el.classList.remove('active-key'), 150);
    }
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if(document.getElementById(`k-${key}`)) {
        playNote(key);
    }
});
let strokeCount = 0;
let factDiscovered = false;

function initStoneGame() {
    const canvas = document.getElementById('c');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Reset
    if (!factDiscovered) {
        strokeCount++;
        
        // After about 100 "segments" of drawing
        if (strokeCount > 100) {
            showCaveFact();
        }
    }
    canvas.onmousemove = (e) => { 
        if(e.buttons == 1) { 
            ctx.fillStyle = "#3e2723"; 
            ctx.beginPath(); 
            ctx.arc(e.offsetX, e.offsetY, 4, 0, Math.PI * 2); 
            ctx.fill(); 
        } 
    };
}


let discoveryMade = false;

function initCaveCanvas() {
    const canvas = document.getElementById('cave-wall');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;

    // Reset game state for the new load
    strokeCounter = 0;
    discoveryMade = false;

    canvas.onmousedown = () => { drawing = true; ctx.beginPath(); };
    canvas.onmouseup = () => { drawing = false; };
    
    canvas.onmousemove = (e) => {
        if (!drawing) return;

        // Painting logic
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#8d6e63'; // Ochre Red color
        ctx.lineTo(x, y);
        ctx.stroke();

        // Count segments to trigger the fact
        if (!discoveryMade) {
            strokeCounter++;
            const status = document.getElementById('paint-status');
            if (status) status.innerText = `Progress: ${Math.min(100, strokeCounter)}%`;
            
            if (strokeCounter >= 100) {
                showCaveFact();
            }
        }
    };
}

function showCaveFact() {
    discoveryMade = true;
    const factBox = document.getElementById('cave-fact');
    if (factBox) factBox.style.display = 'block';
}

function closeCaveFact() {
    document.getElementById('cave-fact').style.display = 'none';
}

function playStoneSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
}

function initMosaic() {
    const m = document.getElementById('m');
    const status = document.getElementById('mosaic-status');
    if(!m) return;
    
    m.innerHTML = ''; // Clear existing tiles
    const colors = ['#0d47a1', '#1a237e', '#4a148c']; // Shades of Byzantine Blue

    for(let i=0; i<9; i++) {
        let d = document.createElement('div');
        // Start with a random blue shade
        d.style.background = colors[Math.floor(Math.random() * colors.length)];
        d.style.width = '50px';
        d.style.height = '50px';
        d.style.cursor = 'pointer';
        d.style.border = '1px solid rgba(255,255,255,0.2)';
        d.style.transition = 'all 0.3s ease';
        d.className = 'mosaic-tile';

        d.onclick = () => {
            // Cycle color to Gold
            if (d.style.background !== 'gold') {
                d.style.background = 'gold';
                d.style.boxShadow = '0 0 10px gold';
            } else {
                d.style.background = colors[0];
                d.style.boxShadow = 'none';
            }
            checkMosaicWin();
        };
        m.appendChild(d);
    }
}

function checkMosaicWin() {
    const tiles = document.querySelectorAll('.mosaic-tile');
    const allGold = Array.from(tiles).every(tile => tile.style.background === 'gold');
    const status = document.getElementById('mosaic-status');

    if (allGold) {
        status.innerText = "✨ The Icon of the Emperor is Complete! ✨";
        // Play a small "victory" chime
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } else {
        status.innerText = "";
    }
}

function updateScore() {
    score++;
    const s = document.getElementById('s');
    if(s) s.innerText = `Tablets Completed: ${score}`;
}

function liftGate() {
    score++;
    const g = document.getElementById('gate-status');
    if(score > 10) {
        g.innerText = "🏛️ Gate Open! Welcome to the Forum.";
        g.style.color = "gold";
    } else {
        g.innerText = `Lifting... ${score * 10}%`;
    }
}

function addFlower() {
    const canvas = document.getElementById('canvas-1900');
    if(!canvas) return;
    const f = document.createElement('span');
    f.innerText = "🌸";
    f.style.position = "absolute";
    f.style.left = Math.random() * 80 + "%";
    f.style.top = Math.random() * 80 + "%";
    canvas.appendChild(f);
}

function startDialUp() {
    let p = document.getElementById('dial-progress');
    let s = document.getElementById('modem-status');
    let val = 0;
    if(currentTimer) clearInterval(currentTimer);
    
    currentTimer = setInterval(() => {
        val += 2;
        if(p) p.value = val;
        if(val >= 30 && s) s.innerText = "Status: Handshaking...";
        if(val >= 70 && s) s.innerText = "Status: Verifying...";
        if(val >= 100) {
            clearInterval(currentTimer);
            if(s) s.innerText = "Status: ONLINE";
            alert("Welcome to the World Wide Web!");
        }
    }, 100);
}

function spawnNotif() {
    const layer = document.getElementById('notif-layer');
    if(!layer) return;
    const n = document.createElement('div');
    n.innerText = "🔔 System Update Available";
    n.style = "background:#fff; color:#000; margin:5px; border-radius:8px; cursor:pointer; font-size:11px; padding:8px; border-left: 4px solid #764ba2;";
    n.onclick = () => n.remove();
    layer.prepend(n);
    // Auto-remove after 5 seconds
    setTimeout(() => { if(n) n.remove(); }, 5000);
}

function carveTablet() {
    // Increment the global score variable
    score++;
    
    const display = document.getElementById('tablet-count');
    if (display) {
        display.innerText = `Tablets Completed: ${score}`;
        
        // Visual feedback: brief highlight
        display.style.color = "var(--gold)";
        setTimeout(() => {
            display.style.color = "inherit";
        }, 100);
    }
}

function buildMars(type) {
    if(marsStats[type] < 100) {
        marsStats[type] += 10;
        document.getElementById(type).innerText = marsStats[type];
    }
    if(marsStats.o2 >= 100 && marsStats.h2o >= 100) {
        document.getElementById('mars-base').innerText = "🚀🏙️";
    }
}

let forgeHeat = 0;

function strikeAnvil() {
    // 1. Play "Clang" Sound
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime); // High metal "ping"
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);

    // 2. Update Progress
    forgeHeat += 10;
    const bar = document.getElementById('heat-bar');
    const sword = document.getElementById('forge-area');
    const msg = document.getElementById('forge-msg');

    if (bar) bar.style.width = forgeHeat + "%";

    // 3. Visual Heat Stages
    if (forgeHeat < 100) {
        sword.style.filter = `drop-shadow(0 0 ${forgeHeat / 5}px red) brightness(${1 + forgeHeat/100})`;
        msg.innerText = "The steel is glowing...";
    } else {
        sword.innerText = "⚔️"; // Changes to crossed swords when done
        sword.style.filter = "drop-shadow(0 0 15px gold)";
        msg.innerText = "Legendary Blade Forged!";
        forgeHeat = 0; // Reset for fun
    }
}

function playTelegraphBeep() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine'; 
        osc.frequency.setValueAtTime(600, audioCtx.currentTime); // Classic telegraph pitch
        
        // Very fast "attack" and "decay" for a mechanical clicking sound
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {
        console.log("Audio waiting for user interaction.");
    }
}

function sendTelegram() {
    // 1. Show the jumping alert window
    alert("📡 Message transmitted via Atlantic Cable.");

    // 2. Show the cinema fun fact
    const factBox = document.getElementById('cinema-fact');
    if (factBox) {
        factBox.style.display = 'block';
        // Add a slight fade-in effect via JS
        factBox.style.opacity = '0';
        let opacity = 0;
        let timer = setInterval(() => {
            if (opacity >= 1) clearInterval(timer);
            factBox.style.opacity = opacity;
            opacity += 0.1;
        }, 50);
    }
}

let discoSequence = [];
let playerSequence = [];
let discoLevel = 0;

function startDiscoGame() {
    discoSequence = [];
    playerSequence = [];
    discoLevel = 0;
    document.getElementById('disco-score').innerText = "Score: 0";
    nextDiscoStep();
}

function nextDiscoStep() {
    playerSequence = [];
    discoLevel++;
    document.getElementById('disco-msg').innerText = "Watch carefully...";
    discoSequence.push(Math.floor(Math.random() * 4));
    playDiscoSequence();
}

function playDiscoSequence() {
    let i = 0;
    // Store the interval in our dedicated variable
    discoTimer = setInterval(() => {
        flashTile(discoSequence[i]);
        i++;
        if (i >= discoSequence.length) {
            clearInterval(discoTimer);
            discoTimer = null; // Clear it when finished
            document.getElementById('disco-msg').innerText = "Your turn! Repeat the pattern.";
        }
    }, 600);
}

function flashTile(id) {
    const tile = document.getElementById(`tile-${id}`);
    const originalColor = tile.style.background;
    
    // Visual Flash
    tile.style.background = "white";
    tile.style.boxShadow = "0 0 20px white";
    
    // Audio Beep (Synth style)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(200 + (id * 100), audioCtx.currentTime);
    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);

    setTimeout(() => {
        tile.style.background = originalColor;
        tile.style.boxShadow = "none";
    }, 300);
}

function playerClick(id) {
    flashTile(id);
    playerSequence.push(id);
    
    // Check if the click matches the sequence
    if (playerSequence[playerSequence.length - 1] !== discoSequence[playerSequence.length - 1]) {
        document.getElementById('disco-msg').innerText = "Wrong move! Try again.";
        discoSequence = [];
        return;
    }

    if (playerSequence.length === discoSequence.length) {
        document.getElementById('disco-score').innerText = `Score: ${discoLevel}`;
        setTimeout(nextDiscoStep, 1000);
    }
}

function stopDiscoGame() {
    // 1. Force stop the flashing light sequence
    if (discoTimer) {
        clearInterval(discoTimer);
        discoTimer = null;
    }

    // 2. Reset the internal game data
    discoSequence = [];
    playerSequence = [];
    discoLevel = 0;

    // 3. Reset the UI elements (only if they exist on the current page)
    const msg = document.getElementById('disco-msg');
    const scoreDisp = document.getElementById('disco-score');
    
    if (msg) msg.innerText = "Game Stopped. Ready to boogie?";
    if (scoreDisp) scoreDisp.innerText = "Score: 0";
    
    // 4. Turn off all lights
    for(let i=0; i<4; i++) {
        const tile = document.getElementById(`tile-${i}`);
        if(tile) {
            tile.style.boxShadow = "none";
            tile.style.background = getOriginalTileColor(i);
        }
    }
}

// Helper function to return colors to normal
function getOriginalTileColor(id) {
    const colors = ["#ff1744", "#00e676", "#2979ff", "#ffea00"];
    return colors[id];
}

function showDiscoGame() {
    const intro = document.getElementById('disco-intro');
    const game = document.getElementById('disco-game-wrap');
    if(intro) intro.style.display = 'none';
    if(game) game.style.display = 'block';
}

function stopDiscoGame() {
    // Reset Game Logic
    if(discoTimer) clearInterval(discoTimer);
    discoSequence = [];
    playerSequence = [];
    discoLevel = 0;

    const intro = document.getElementById('disco-intro');
    const game = document.getElementById('disco-game-wrap');
    if(intro) intro.style.display = 'block';
    if(game) game.style.display = 'none';
}

function start90sDialUp() {
    const pBar = document.getElementById('dial-progress');
    const status = document.getElementById('modem-status');
    const btn = document.getElementById('modem-btn');
    let progress = 0;

    // --- NEW SYNTHESIZED MODEM SOUND ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create Noise (The Static)
    const bufferSize = 2 * audioCtx.sampleRate,
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
    output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Create Beep (The Dialing/Handshake)
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);

    // Connect and Start
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.05, audioCtx.currentTime); // Low volume
    
    whiteNoise.connect(masterGain);
    osc.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    whiteNoise.start();
    osc.start();
    // ------------------------------------

    if (currentTimer) clearInterval(currentTimer);

    currentTimer = setInterval(() => {
        progress += 1;
        if (pBar) pBar.style.width = progress + "%";

        // Change frequency to simulate "handshaking"
        osc.frequency.setValueAtTime(400 + (progress * 2), audioCtx.currentTime);

        if (progress < 30) status.innerText = "Status: Dialing...";
        else if (progress < 80) status.innerText = "Status: Handshaking... (Beee-Rrrr!)";
        else if (progress < 100) status.innerText = "Status: Authenticating...";
        
        if (progress >= 100) {
            clearInterval(currentTimer);
            
            // Stop the synth sounds
            whiteNoise.stop();
            osc.stop();

            // Play a final "Success" chime
            const success = audioCtx.createOscillator();
            success.connect(audioCtx.destination);
            success.start();
            success.stop(audioCtx.currentTime + 0.5);

            status.innerText = "Status: ONLINE. Welcome to AOL!";
            status.style.color = "lime";
            if (btn) {
                btn.innerText = "DISCONNECT 🛑";
                btn.onclick = () => {
                    audioCtx.close(); // Kills all sound
                    disconnectModem();
                };
            }
        }
    }, 100);
}

// New function to return to the initial state
function disconnectModem() {
    const status = document.getElementById('modem-status');
    const pBar = document.getElementById('dial-progress');
    const btn = document.getElementById('modem-btn');
    const sound = document.getElementById('dialup-sound');

    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    if (status) status.innerText = "Status: Disconnected";
    if (pBar) pBar.style.width = "0%";
    
    if (btn) {
        btn.innerText = "CONNECT TO THE WEB";
        btn.onclick = start90sDialUp; // Switch back to connect logic
    }
}

let romanGateProgress = 0; // Global variable to track the gate lift

function liftRomanGate() {
    const pBar = document.getElementById('gate-progress');
    const status = document.getElementById('lift-status');
    const visualGate = document.getElementById('moving-portcullis');
    const trojanHorse = document.getElementById('trojan-horse-visual');

    if (romanGateProgress >= 100) return; // Stop clicks if open

    // 1. Add progress (10% per click)
    romanGateProgress += 10;
    

    if (pBar) pBar.style.width = romanGateProgress + "%";
    if (status) status.innerText = `Gate Status: OPENING (${romanGateProgress}%)`;

    if (visualGate) {
        visualGate.style.transform = `translateY(-${romanGateProgress}%)`;
    }

    if (romanGateProgress >= 100) {
        status.innerText = "Status: GATE OPEN! VICTORY!";
        status.style.color = "lime";
        
        if (trojanHorse) {
            // Trigger the CSS animation
            trojanHorse.classList.add('trojan-run');
        }

        setTimeout(() => {
            alert("Veni, Vidi, Vici! (I came, I saw, I conquered!) 🏛️");
        }, 1600); // Trigger after the horse finishes running
    }
}

let scribeCount = 0; 

function addWedge() {

    const display = document.getElementById('tablet-text');
    const status = document.getElementById('scribe-status');
    const gardens = document.getElementById('hanging-gardens');
    
    if (!display || !status) return;
    if (scribeCount >= 10) return;
    const wedges = ["楔", "形", "文", "字", "𐎚", "𐎊", "𐎓", "𐎏"];
    
    // 1. Add a symbol
    
    scribeCount++;
    display.innerText += wedges[scribeCount % wedges.length];
    status.innerText = `Symbols Carved: ${scribeCount} / 10`;
    
    // 2. Play the "thud" sound
    playClaySound();
    console.log("Symbols carved:", scribeCount); // This helps you debug!

    // 4. Win Condition
    if (scribeCount >= 10) {
        status.innerText = "The Decree is Complete!";
        status.style.color = "#2e7d32";
        if (gardens) gardens.style.display = "block";
    }
}

function resetClay() {
    // Trigger Hammurabi's Law
    alert("⚖️ HAMMURABI'S LAW: 'An eye for an eye, a backspace for a backspace!' You dare to defy the King's word? The tablet remains!");
    // We don't actually let them reset because... Hammurabi.

    
}

let isCanvasInit = false;
let strokeCounter = 0;

function initCaveCanvas() {
    // Only run this if the canvas exists and hasn't been set up yet
    const canvas = document.getElementById('cave-wall');
    if (!canvas || isCanvasInit) return;

    const ctx = canvas.getContext('2d');
    let painting = false;
    isCanvasInit = true; // Mark as done

    // Mouse Events
    canvas.addEventListener('mousedown', (e) => { 
        painting = true; 
        draw(e); 
    });
    canvas.addEventListener('mouseup', () => { 
        painting = false; 
        ctx.beginPath(); 
    });
    canvas.addEventListener('mousemove', draw);

    function draw(e) {
        if (!painting) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#8d6e63'; // Earthy Ochre

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        // Update Progress
        strokeCounter++;
        const status = document.getElementById('paint-status');
        if (status) {
            let percent = Math.min(100, Math.floor(strokeCounter / 2));
            status.innerText = `Progress: ${percent}%`;
            
            if (percent >= 100) {
                document.getElementById('cave-fact').style.display = 'block';
            }
        }
    }
}

function closeCaveFact() {
    document.getElementById('cave-fact').style.display = 'none';
}

function resetCave() {
    const canvas = document.getElementById('cave-wall');
    const layout = document.getElementById('stone-age-layout');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    if (layout) {
        layout.classList.add('cave-shake');
        // Remove the class after 0.5s so it can shake again next time
        setTimeout(() => layout.classList.remove('cave-shake'), 500);
    }
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('cave-fact').style.display = 'none';
    strokeCounter = 0;
    
    const status = document.getElementById('paint-status');
    if (status) status.innerText = "Progress: 0%";
    
    playStoneSound(); 
}

function jumpToRandomEra() {
    // This grabs all keys in your eraData object
    const keys = Object.keys(eraData);
    
    // This filters out 'home' so you don't just "jump" back to the homepage
    const erasOnly = keys.filter(key => key !== 'home');
    
    // Pick one at random
    const randomKey = erasOnly[Math.floor(Math.random() * erasOnly.length)];
    
    // Call your existing load function
    if (typeof loadEra === "function") {
        loadEra(randomKey);
    } else {
        console.error("The function 'loadEra' was not found!");
    }
}

loadEra('home');