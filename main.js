// =========================================================================
// 1. DATA STORE & DEVICE DETECTION
// =========================================================================
const MAIN_MENU_VIDEO = "videos/mainmenu.mp4";
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

const projects = [
  { 
    id: 0, 
    title: "A GAME OF DICE", 
    video: "videos/proj1.mp4",
    description: "A prototype of a roguelike 'dice battler' game. Players roll dice and load these as attacks in the chamber to deal damage to the enemy. I primarily worked on the UI/UX, 3D models such as the dice and background, as well as the implementation of the dice rolls, chamber system, and damage calculations in Unity. The challenge here was being able to create a prototype from scratch in a day, focussing on the development of thecore gameplay loop and its mechanics",
    skills: ["Unity", "C#", "3D Modeling", "Game Design & Prototyping"],
    links: [
      { label: "> PLAY ON ITCH.IO", url: "https://mykacruz.itch.io/a-game-of-dice" }
    ]
  },
  { 
    id: 1, 
    title: "THE FROG PRINCE", 
    video: "videos/proj2.mp4",
    description: "A 3D animated short film created in Blender for a video game idea I had in mind (spoilers for the next project). During this team-based project, I focussed on modelling the protagonist, rigging the characters, and animating the different characters, as well as the camera work. It was here where I learned most about proper rigging including the implementation of IK and FK systems while dealing with the challenges of character animation.",
    skills: ["Blender", "3D Animation", "Rigging", "Character Design", "Camera Work"],
    links: [
      { label: "> YOUTUBE", url: "https://youtu.be/mY_v70U0KAA" }
    ]
  },
  { 
    id: 2, 
    title: "PROJECT VOODOO", 
    video: "videos/proj-voodoo.mp4",
    description: "Implementation of the 3D character model I created mentioned in my previous project. A private project to test out how far I can push my game development skills as a solo dev. I focussed on apply animations to the imported rigged 3D character, experimented with have a 2nd player, as well as designed and tested out some combat mechanics according to the game concept I had in mind. I documented my process in Miro, feel free to explore via the external link below!",
    skills: ["Unity", "Solo Game Dev", "3D Character Animation", "Documentation", "Game Design and Prototyping"],
    links: [
      { label: "> Miro BOARD", url: "https://miro.com/app/board/uXjVH9SuHxM=/?share_link_id=234021596503" }
    ]
  },
  { 
    id: 3, 
    title: "3D Character Design", 
    video: "videos/proj3.mp4",
    description: "Characters I created during a mentorship course in university. I focused on understanding and modelling accurate character anatomy, proper materials via Substance Painter and rigging for expressive posing. 3D Design is something I have an affinity for, and I enjoy the process of creating characters from scratch and bringing them to life through rigging and animation. Check out one of my earlier Blender works as well, including documentation of my process in the external link below!",
    skills: ["Blender 3D", "Substance Painter", "Rigging", "Character Design"],
    links: [
      { label: "> NO GODS, NO KINGS - DOCUMENTATION", url: "https://www.youtube.com/watch?v=SqvUDdCcXXs" }
    ]
  },
  { 
    id: 4, 
    title: "LUMEN FLOW", 
    video: "videos/proj5.mp4",
    description: "Interactive visual website experimenting with capturing user hand gestures via webcam to allow drawing on the website with their fingers. Having little to no experience in web development, I took on the challenge with basic know-how and an AI-assisted approach. Combining Javascript, Google's MediaPipe Hand Tracking and a built-in AI chatbot, I created a unique interactive experience that allows users to draw and interact with the website in a creative way.",
    skills: ["Creative Coding", "Javascript", "HTML/CSS", "Interactive Design"],
    links: [
      { label: "> DEMO VIDEO", url: "https://youtube.com" }
    ]
  },
  { 
    id: 5, 
    title: "MIKA'S PORTFOLIO", 
    video: MAIN_MENU_VIDEO,
    description: "The interactive retro arcade workstation portfolio you are browsing right now! Built from scratch with the 3D-scene made in Blender and rendered with Three.js, GSAP, and custom GLSL screen shaders.",
    skills: ["Three.js", "GLSL", "Blender", "JavaScript", "GSAP"],
    links: [
      { label: "> GITHUB SOURCE", url: "https://github.com" }
    ]
  }
];

const socials = [
  { label: "> INSTAGRAM", url: "https://instagram.com" },
  { label: "> LINKEDIN", url: "https://www.linkedin.com/in/mikaeljed-cruz/" },
  { label: "> EMAIL", url: "mailto:mikaeljed.cruz@outlook.com" }
];

// =========================================================================
// 2. OVERLAY CONTAINERS (DOM INJECTION)
// =========================================================================

// A. Project Detail Overlay
const projectDetailContainer = document.createElement('div');
projectDetailContainer.id = 'project-detail-view';
projectDetailContainer.className = 'fullscreen-detail-view';
projectDetailContainer.innerHTML = `
  <div class="project-modal-grid">
    <div class="project-left-col">
      <div class="project-card">
        <h1 id="proj-title" class="project-card-title"></h1>
      </div>
      <div class="project-card">
        <p id="proj-desc" class="project-card-desc"></p>
      </div>
      <div class="project-card">
        <div class="project-card-tags-header">[ SKILLS & TECH ]</div>
        <div id="proj-tags" class="project-tags-list"></div>
      </div>
      <div id="proj-links-card" class="project-card">
        <div class="project-card-links-header">[ EXTERNAL LINKS ]</div>
        <div id="proj-links" class="project-links-list"></div>
      </div>
    </div>
    <div class="project-right-col">
      <video id="proj-detail-video" class="project-video-element" loop muted playsinline webkit-playsinline></video>
    </div>
  </div>
`;
document.body.appendChild(projectDetailContainer);

const projectModalGrid = projectDetailContainer.querySelector('.project-modal-grid');
const projTitleElem = document.getElementById('proj-title');
const projDescElem = document.getElementById('proj-desc');
const projTagsElem = document.getElementById('proj-tags');
const projLinksElem = document.getElementById('proj-links');
const projLinksCard = document.getElementById('proj-links-card');
const projDetailVideo = document.getElementById('proj-detail-video');

// B. Socials Fullscreen Overlay
const socialsDetailContainer = document.createElement('div');
socialsDetailContainer.id = 'socials-detail-view';
socialsDetailContainer.className = 'fullscreen-detail-view';
socialsDetailContainer.innerHTML = `
  <div class="detail-content">
    <h1 class="detail-header">[ SOCIALS_OS ]</h1>
    <div class="detail-body">
      ${socials.map(s => `<a href="${s.url}" target="_blank" class="social-link-item">${s.label}</a>`).join('')}
    </div>
  </div>
`;
document.body.appendChild(socialsDetailContainer);
const socialsContentWrapper = socialsDetailContainer.querySelector('.detail-content');

// C. About Me Fullscreen Overlay
const aboutDetailContainer = document.createElement('div');
aboutDetailContainer.id = 'about-detail-view';
aboutDetailContainer.className = 'fullscreen-detail-view';
aboutDetailContainer.innerHTML = `
  <div class="detail-content">
    <h1 class="detail-header">[ ABOUT ME ]</h1>
    <div class="detail-body">
     An aspiring game developer, 3D artist and interactive designer with a passion for creating immersive experiences. I enjoy exploring the intersection of art and technology, and I'm always looking for new challenges to push my skills further. My goal is to craft engaging and memorable experiences that resonate with players and users alike, by all means necessary. Because if there is a skill I cannot do, its a skill I can learn.
    </div>
  </div>
`;
document.body.appendChild(aboutDetailContainer);
const aboutContentWrapper = aboutDetailContainer.querySelector('.detail-content');

// D. Top-Right Clean HUD for Mika's Portfolio Showcase
const showcaseHud = document.createElement('div');
showcaseHud.id = 'showcase-hud';
showcaseHud.innerHTML = `
  <div id="showcase-hud-title" class="showcase-hud-title"></div>
  <div id="showcase-hud-desc" class="showcase-hud-desc"></div>
  <div id="showcase-hud-tags" class="showcase-hud-tags"></div>
`;
document.body.appendChild(showcaseHud);

const showcaseHudTitle = document.getElementById('showcase-hud-title');
const showcaseHudDesc = document.getElementById('showcase-hud-desc');
const showcaseHudTags = document.getElementById('showcase-hud-tags');

// =========================================================================
// 3. SCENE, CAMERA & RESPONSIVE RENDERING SETUP
// =========================================================================
const canvas = document.getElementById('webgl-canvas');
canvas.style.opacity = 1;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.imageRendering = 'pixelated';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x110822);

const BASE_ASPECT = 16 / 9;
const baseCameraPos = new THREE.Vector3(-3.25, 2.7, 13.5);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });

// Mobile GPU Throttle Prevention
const PIXEL_FACTOR = isTouchDevice ? 0.38 : 0.5;
renderer.setSize(window.innerWidth / PIXEL_FACTOR, window.innerHeight / PIXEL_FACTOR, false);
renderer.setPixelRatio(1);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

function updateResponsiveCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.aspect = aspect;

  if (aspect < BASE_ASPECT) {
    const scaleFactor = BASE_ASPECT / aspect;
    // Keep desk & cassette stack in frustum on portrait viewports
    const xShift = aspect < 0.8 ? -4.2 : baseCameraPos.x * (aspect < 1 ? 0.6 : 1);
    camera.position.set(
      xShift,
      baseCameraPos.y * Math.min(scaleFactor * 0.85, 1.6),
      baseCameraPos.z * Math.min(scaleFactor * 1.15, 2.3)
    );
  } else {
    camera.position.copy(baseCameraPos);
  }
  camera.updateProjectionMatrix();
}
updateResponsiveCamera();

// --- Shadow Map Setup ---
renderer.shadowMap.enabled = !isTouchDevice;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const floorGeo = new THREE.PlaneGeometry(30, 30);
const floorMat = new THREE.ShadowMaterial({ opacity: 0.45 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor);

// =========================================================================
// 4. VIDEO & DYNAMIC TEXTURE HANDLING
// =========================================================================

function createVideoElement(id, defaultSrc) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('video');
    el.id = id;
    el.loop = true;
    el.muted = true;
    el.setAttribute('muted', '');
    el.playsInline = true;
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
    el.crossOrigin = 'anonymous';
    el.autoplay = true;
    el.style.display = 'none';
    document.body.appendChild(el);
  }
  el.src = defaultSrc;
  return el;
}

const videoElement = createVideoElement('tv-video', MAIN_MENU_VIDEO);
const videoTexture = new THREE.VideoTexture(videoElement);
videoTexture.minFilter = THREE.NearestFilter;
videoTexture.magFilter = THREE.NearestFilter;
videoTexture.format = THREE.RGBAFormat;
videoTexture.flipY = false;
videoTexture.center.set(0.5, 0.5);
videoElement.play().catch(() => {});

const socialsVideoElement = createVideoElement('socials-video', "videos/socials.mp4");
const socialsVideoTexture = new THREE.VideoTexture(socialsVideoElement);
socialsVideoTexture.minFilter = THREE.NearestFilter;
socialsVideoTexture.magFilter = THREE.NearestFilter;
socialsVideoTexture.format = THREE.RGBAFormat;
socialsVideoTexture.flipY = false;
socialsVideoTexture.wrapS = THREE.RepeatWrapping;
socialsVideoTexture.wrapT = THREE.RepeatWrapping;
socialsVideoTexture.repeat.x = -1;
socialsVideoTexture.center.set(0.5, 0.5);
socialsVideoElement.play().catch(() => {});

const aboutVideoElement = createVideoElement('about-video', "videos/aboutme.mp4");
const aboutVideoTexture = new THREE.VideoTexture(aboutVideoElement);
aboutVideoTexture.minFilter = THREE.NearestFilter;
aboutVideoTexture.magFilter = THREE.NearestFilter;
aboutVideoTexture.format = THREE.RGBAFormat;
aboutVideoTexture.flipY = false;
aboutVideoTexture.center.set(0.5, 0.5);
aboutVideoElement.play().catch(() => {});

// Unlock mobile video autoplay on first interaction
window.addEventListener('pointerdown', () => {
  if (videoElement.paused) videoElement.play().catch(() => {});
  if (socialsVideoElement.paused) socialsVideoElement.play().catch(() => {});
  if (aboutVideoElement.paused) aboutVideoElement.play().catch(() => {});
}, { once: true });

// Attempt native screen orientation lock to landscape on Android / supported devices
window.addEventListener('pointerdown', () => {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {
      // Browsers will safely reject this if not in fullscreen or on iOS Safari,
      // where the CSS orientation-blocker takes over instead.
    });
  }
}, { once: true });

function switchVideoPreview(targetSrc) {
  if (!targetSrc) return;
  if (!videoElement.src.endsWith(targetSrc)) {
    videoElement.src = targetSrc;
    videoElement.load();
    videoElement.play().catch(() => {});
  }
}

// =========================================================================
// 5. STUDIO LIGHTING
// =========================================================================
const ambientLight = new THREE.AmbientLight(0xffaadd, 1.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xfff0dd, 2.0);
keyLight.position.set(-4, 9, 6);
keyLight.castShadow = !isTouchDevice;
scene.add(keyLight);

const fillLight = new THREE.PointLight(0x00ffff, 1.6, 20);
fillLight.position.set(6, 4, 5);
scene.add(fillLight);

const screenGlowLight = new THREE.PointLight(0xff00ff, 1.5, 6);
screenGlowLight.position.set(0, 1.2, 1.5);
scene.add(screenGlowLight);

// =========================================================================
// 6. SHADER MASKS & HITBOX CALIBRATION
// =========================================================================
const DEBUG_TOP_HITBOX_POS = new THREE.Vector3(-5.95, 5.70, 1.0);
const DEBUG_TOP_HITBOX_SIZE = { width: 2.2, height: 2.2, depth: 1.4 };

const DEBUG_ABOUT_HITBOX_POS = new THREE.Vector3(0.0, 1.50, 1.5); 
const DEBUG_ABOUT_HITBOX_SIZE = { width: 2.2, height: 2.2, depth: 1.4 };

const ABOUT_X_THRESHOLD = -1.35;

function createScreenMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: videoTexture },
      tSocials: { value: socialsVideoTexture },
      tAbout: { value: aboutVideoTexture },
      uTopGlitchForce: { value: 0.0 },
      uMainGlitchForce: { value: 0.0 },
      uAboutGlitchForce: { value: 0.0 },
      uAboutXThreshold: { value: ABOUT_X_THRESHOLD },
      uMainBlackout: { value: 0.0 },
      uTopBlackout: { value: 0.0 },
      uAboutBlackout: { value: 0.0 },
      uPreviewCryptic: { value: 0.0 },
      uIsSpecialPreview: { value: 0.0 },
      time: { value: 0.0 },
      uHitPoint: { value: new THREE.Vector3(9999.0, 9999.0, 9999.0) },
      uHoverIntensity: { value: 0.0 },
      uWorldRadius: { value: 1.35 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform sampler2D tSocials;
      uniform sampler2D tAbout;
      
      uniform float uTopGlitchForce;
      uniform float uMainGlitchForce;
      uniform float uAboutGlitchForce;
      uniform float uAboutXThreshold;
      uniform float uMainBlackout;
      uniform float uTopBlackout;
      uniform float uAboutBlackout;
      uniform float uPreviewCryptic;
      uniform float uIsSpecialPreview;

      uniform float time;
      uniform vec3 uHitPoint;
      uniform float uHoverIntensity;
      uniform float uWorldRadius;

      varying vec2 vUv;
      varying vec3 vWorldPosition;

      float random(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        float worldDist = distance(vWorldPosition, uHitPoint);
        float falloff = smoothstep(uWorldRadius, 0.0, worldDist) * uHoverIntensity;

        float localGlitchForce = 0.0;
        float localBlackout = 0.0;

        if (vWorldPosition.y > 4.8) {
          localGlitchForce = uTopGlitchForce;
          localBlackout = uTopBlackout;
        } else if (vWorldPosition.x > uAboutXThreshold) {
          localGlitchForce = uAboutGlitchForce;
          localBlackout = uAboutBlackout;
        } else {
          localGlitchForce = uMainGlitchForce;
          localBlackout = uMainBlackout;
        }

        vec2 warpedUv = vUv;
        float vertWave = sin(vUv.x * 12.0 + time * 8.0) * 0.015 * falloff;
        float lineJitter = (random(vec2(floor(vUv.y * 40.0), floor(time * 25.0))) - 0.5) * 0.03 * falloff;

        float heavyJitterX = (random(vec2(floor(vUv.y * 20.0), floor(time * 30.0))) - 0.5) * 0.6 * localGlitchForce;
        float heavyJitterY = (random(vec2(floor(vUv.x * 15.0), floor(time * 45.0))) - 0.5) * 0.2 * localGlitchForce;

        warpedUv.y += vertWave + lineJitter + heavyJitterY;
        warpedUv.x += heavyJitterX;

        vec2 rOffset = vec2(0.04 * localGlitchForce, 0.0);
        vec2 bOffset = vec2(-0.04 * localGlitchForce, 0.0);

        vec4 baseColor;

        if (vWorldPosition.y > 4.8) {
          vec2 videoUv = warpedUv - vec2(0.0, 0.03);
          float r = texture2D(tSocials, videoUv + rOffset).r;
          float g = texture2D(tSocials, videoUv).g;
          float b = texture2D(tSocials, videoUv + bOffset).b;
          baseColor = vec4(r, g, b, 1.0);
        } else if (vWorldPosition.x > uAboutXThreshold) {
          float r = texture2D(tAbout, warpedUv + rOffset).r;
          float g = texture2D(tAbout, warpedUv).g;
          float b = texture2D(tAbout, warpedUv + bOffset).b;
          baseColor = vec4(r, g, b, 1.0);
        } else {
          vec2 menuScale = vec2(1.06, 1.85);
          vec2 menuOffset = vec2(0.0, 0.035);

          vec2 previewScale = vec2(0.98, 0.98);
          vec2 previewOffset = vec2(0.0, 0.0);

          float rescaleWeight = uPreviewCryptic * (1.0 - uIsSpecialPreview);
          vec2 mainScale = mix(menuScale, previewScale, rescaleWeight);
          vec2 mainOffset = mix(menuOffset, previewOffset, rescaleWeight);

          vec2 mainUv = (warpedUv - 0.5) * mainScale + 0.5 + mainOffset;

          if (uPreviewCryptic > 0.01) {
            float scanWobble = sin(mainUv.y * 100.0 + time * 18.0) * 0.003 * uPreviewCryptic;
            mainUv.x += scanWobble;

            vec2 crypticR = vec2(0.01 * uPreviewCryptic, 0.0);
            vec2 crypticB = vec2(-0.01 * uPreviewCryptic, 0.0);

            float r = texture2D(tDiffuse, mainUv + rOffset + crypticR).r;
            float g = texture2D(tDiffuse, mainUv).g;
            float b = texture2D(tDiffuse, mainUv + bOffset + crypticB).b;
            baseColor = vec4(r, g, b, 1.0);

            float gray = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
            baseColor.rgb = mix(baseColor.rgb, vec3(gray), 0.2 * uPreviewCryptic);

            float crypticGrain = (random(mainUv * 6.0 + fract(time * 30.0)) - 0.5) * 0.28 * uPreviewCryptic;
            baseColor.rgb += crypticGrain;

            baseColor.rgb = pow(baseColor.rgb, vec3(1.1 * uPreviewCryptic));
          } else {
            float r = texture2D(tDiffuse, mainUv + rOffset).r;
            float g = texture2D(tDiffuse, mainUv).g;
            float b = texture2D(tDiffuse, mainUv + bOffset).b;
            baseColor = vec4(r, g, b, 1.0);
          }
        }

        baseColor.rgb = mix(baseColor.rgb, vec3(0.0), localBlackout);

        float noise = (random(vUv * 4.0 + fract(time * 30.0)) - 0.5) * 2.0;
        float scanDisrupt = sin((vUv.y + time * 6.0) * 220.0) * 0.22 * falloff;
        baseColor.rgb += (noise * 0.72 + scanDisrupt) * falloff;
        baseColor.rgb += (random(vUv + time * 2.0) * 0.6) * localGlitchForce;

        gl_FragColor = baseColor;
      }
    `,
    side: THREE.DoubleSide
  });
}

// --- 7. Hand-Drawn Scribble Text Generation ---
function drawScribbleFrame(ctx, text, isHovered, frameSeed) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);

  let s = frameSeed;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return (s / 233280) * 2 - 1;
  };

  ctx.fillStyle = isHovered ? '#ff00ff' : '#f0ece1';
  ctx.beginPath();
  const padX = 16;
  const padY = 20;
  ctx.moveTo(padX + rnd() * 2, padY + rnd() * 2);
  ctx.lineTo(w - padX + rnd() * 2, padY + rnd() * 2);
  ctx.lineTo(w - padX + rnd() * 2, h - padY + rnd() * 2);
  ctx.lineTo(padX + rnd() * 2, h - padY + rnd() * 2);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#111111';
  ctx.lineWidth = isHovered ? 5 : 3;
  ctx.beginPath();
  ctx.moveTo(padX + rnd() * 3, padY + rnd() * 2);
  ctx.lineTo(w - padX + rnd() * 3, padY + rnd() * 2);
  ctx.lineTo(w - padX + rnd() * 3, h - padY + rnd() * 2);
  ctx.lineTo(padX + rnd() * 3, h - padY + rnd() * 2);
  ctx.closePath();
  ctx.stroke();

  ctx.font = 'bold 44px "Permanent Marker", "Comic Sans MS", cursive, sans-serif';
  ctx.fillStyle = '#0a0a0a';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const jX = rnd() * 1.5;
  const jY = rnd() * 1.5;
  ctx.fillText(text, w / 2 + jX, h / 2 + jY);

  ctx.lineWidth = 3;
  ctx.beginPath();
  const underlineY = h / 2 + 28 + rnd() * 2;
  ctx.moveTo(w * 0.12 + rnd() * 4, underlineY);
  ctx.quadraticCurveTo(w * 0.5, underlineY + rnd() * 3, w * 0.88 + rnd() * 4, underlineY);
  ctx.stroke();
}

// Expand cassette hit geometry on touch devices
const labelGeo = new THREE.PlaneGeometry(isTouchDevice ? 2.5 : 2.1, isTouchDevice ? 0.65 : 0.52);

function createScribbleMesh(text, id) {
  const canvasElem = document.createElement('canvas');
  canvasElem.width = 512;
  canvasElem.height = 140;
  const ctx = canvasElem.getContext('2d');

  drawScribbleFrame(ctx, text, false, Math.floor(Math.random() * 1000));

  const texture = new THREE.CanvasTexture(canvasElem);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const mat = new THREE.MeshBasicMaterial({ 
    map: texture, 
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(labelGeo, mat);
  mesh.renderOrder = 9999;

  mesh.userData = {
    canvas: canvasElem,
    ctx: ctx,
    texture: texture,
    projectId: id,
    title: text,
    isHovered: false,
    seed: Math.floor(Math.random() * 500)
  };

  return mesh;
}

// =========================================================================
// 8. MODEL LOADING & HITBOX SETUP
// =========================================================================
let tvGroup = new THREE.Group();
let tvScreenMesh = null;
const allScreenMeshes = [];
const interactableCassettes = [];
const textMeshes = [];

const topHitboxGeo = new THREE.BoxGeometry(DEBUG_TOP_HITBOX_SIZE.width, DEBUG_TOP_HITBOX_SIZE.height, DEBUG_TOP_HITBOX_SIZE.depth);
const invisibleMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0, depthWrite: false });
const topMonitorHitbox = new THREE.Mesh(topHitboxGeo, invisibleMat);
topMonitorHitbox.position.copy(DEBUG_TOP_HITBOX_POS);

const aboutHitboxGeo = new THREE.BoxGeometry(DEBUG_ABOUT_HITBOX_SIZE.width, DEBUG_ABOUT_HITBOX_SIZE.height, DEBUG_ABOUT_HITBOX_SIZE.depth);
const aboutMonitorHitbox = new THREE.Mesh(aboutHitboxGeo, invisibleMat);
aboutMonitorHitbox.position.copy(DEBUG_ABOUT_HITBOX_POS);

const defaultTapeCoordinates = [
  new THREE.Vector3(-8.35, 2.10, 1.8),
  new THREE.Vector3(-8.35, 1.55, 1.8),
  new THREE.Vector3(-8.35, 1.00, 1.8),
  new THREE.Vector3(-8.35, 0.45, 1.8),
  new THREE.Vector3(-8.35, -0.10, 1.8),
  new THREE.Vector3(-8.35, -0.65, 1.8)
];

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load(
  'models/retro_tv-scene.glb',
  (gltf) => {
    tvGroup = gltf.scene;
    tvGroup.position.set(0, 0, 0);
    tvGroup.rotation.set(0, 0.3, 0);
    tvGroup.scale.set(1, 1, 1);
    scene.add(tvGroup);

    tvGroup.add(topMonitorHitbox);
    tvGroup.add(aboutMonitorHitbox);
    tvGroup.updateMatrixWorld(true);

    const unifiedMaterial = createScreenMaterial();

    tvGroup.traverse((child) => {
      if (child.isMesh && child !== topMonitorHitbox && child !== aboutMonitorHitbox) {
        const name = (child.name || '').toLowerCase();
        const matName = (child.material?.name || '').toLowerCase();

        if (
          child.name === 'Cube007' || 
          name.includes('screen') || 
          matName.includes('screen') || 
          name.includes('display') || 
          name.includes('monitor')
        ) {
          child.material = unifiedMaterial;
          child.castShadow = false;
          child.receiveShadow = false;

          child.userData.isScreen = true;
          child.userData.targetIntensity = 0.0;
          allScreenMeshes.push(child);

          if (!tvScreenMesh) tvScreenMesh = child;
        } else {
          child.castShadow = !isTouchDevice;
          child.receiveShadow = !isTouchDevice;

          if (child.material && child.material.isMeshStandardMaterial) {
            child.material.roughness = THREE.MathUtils.clamp(child.material.roughness, 0.45, 0.75);
            child.material.metalness = Math.min(child.material.metalness, 0.25);
            child.material.needsUpdate = true;
          }
        }
      }
    });

    document.fonts.ready.then(() => {
      const skewDegrees = 0.8;

      projects.forEach((proj, idx) => {
        const mesh = createScribbleMesh(proj.title, proj.id);
        const initialPos = defaultTapeCoordinates[idx].clone();

        mesh.position.copy(initialPos);
        mesh.rotation.y = 0.3;
        mesh.rotation.z = THREE.MathUtils.degToRad(skewDegrees);

        mesh.userData.baseY = initialPos.y;

        scene.add(mesh);
        textMeshes.push(mesh);
        interactableCassettes.push(mesh);

        drawScribbleFrame(mesh.userData.ctx, mesh.userData.title, false, mesh.userData.seed);
        mesh.userData.texture.needsUpdate = true;
      });
    });
  },
  undefined,
  (error) => console.error('GLTF Load Error:', error)
);

// =========================================================================
// 9. RAYCASTING, HOVER & TWO-TAP TOUCH TRANSITIONS
// =========================================================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredProjectId = -1;
let selectedMobileProjectId = -1;
let currentZoomMode = 'NONE';
let showcaseTween = null;

const backBtn = document.getElementById('back-btn');

function getObjectCenter(object) {
  const center = new THREE.Vector3();
  if (object) {
    object.updateMatrixWorld(true);
    new THREE.Box3().setFromObject(object).getCenter(center);
  }
  return center;
}

function getResponsiveZoomDistance(baseZoom) {
  const aspect = window.innerWidth / window.innerHeight;
  let dist = baseZoom;

  if (aspect < 1.0) {
    dist = (dist / aspect) * 0.72;
  } else if (aspect < 1.6) {
    dist = dist * (1.6 / aspect);
  }
  return dist;
}

// 1. MAIN MONITOR ZOOM
function triggerZoomMain(projectId = 0) {
  if (currentZoomMode === 'MAIN' || !tvGroup) return;
  currentZoomMode = 'MAIN';
  backBtn.style.display = 'block';

  if (isTouchDevice) {
    socialsVideoElement.pause();
    aboutVideoElement.pause();
  }

  const selectedProj = projects.find(p => p.id === projectId) || projects[0];
  projTitleElem.textContent = selectedProj.title;
  projDescElem.textContent = selectedProj.description;

  projTagsElem.innerHTML = (selectedProj.skills || [])
    .map(skill => `<span class="project-tag">${skill}</span>`)
    .join('');

  if (selectedProj.links && selectedProj.links.length > 0) {
    projLinksCard.style.display = 'block';
    projLinksElem.innerHTML = selectedProj.links
      .map(link => `<a href="${link.url}" target="_blank" class="project-ext-link">${link.label}</a>`)
      .join('');
  } else {
    projLinksCard.style.display = 'none';
  }

  projDetailVideo.src = selectedProj.video;
  projDetailVideo.currentTime = 0;
  projDetailVideo.play().catch(() => {});

  textMeshes.forEach(m => gsap.to(m.material, { opacity: 0, duration: 0.35 }));
  allScreenMeshes.forEach(s => { s.userData.targetIntensity = 0.0; });

  const activeMaterial = allScreenMeshes[0]?.material;

  if (activeMaterial && activeMaterial.uniforms) {
    gsap.to(activeMaterial.uniforms.uMainGlitchForce, {
      value: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut"
    });
    gsap.to(activeMaterial.uniforms.uMainBlackout, {
      value: 1.0, duration: 0.45, ease: "power2.in"
    });
  }

  const screenCenter = getObjectCenter(tvScreenMesh || tvGroup);
  const baseZoomDistance = 4.0;
  const aspect = window.innerWidth / window.innerHeight;
  const offsetX = aspect < 1.0 ? 0.0 : -1.5;
  const offsetY = -0.7;

  const zoomDistance = getResponsiveZoomDistance(baseZoomDistance);
  const rotY = tvGroup.rotation.y;

  const targetCamX = screenCenter.x + Math.sin(rotY) * zoomDistance + offsetX;
  const targetCamY = screenCenter.y + offsetY;
  const targetCamZ = screenCenter.z + Math.cos(rotY) * zoomDistance;

  gsap.to(camera.position, {
    x: targetCamX,
    y: targetCamY,
    z: targetCamZ,
    duration: 1.2,
    ease: 'power3.inOut',
    onComplete: () => {
      projectDetailContainer.classList.add('active');
      projectModalGrid.style.opacity = 0;

      gsap.fromTo(projectDetailContainer, 
        { clipPath: 'circle(0% at 50% 50%)' },
        { 
          clipPath: 'circle(150% at 50% 50%)',
          duration: 0.65,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(projectModalGrid, { opacity: 1, duration: 0.25 });
          }
        }
      );
    }
  });

  gsap.to(camera.rotation, {
    x: 0,
    y: rotY,
    z: 0,
    duration: 1.2,
    ease: 'power3.inOut'
  });
}

// 2. MIKA'S PORTFOLIO SHOWCASE
function triggerShowcaseOverview() {
  if (currentZoomMode === 'SHOWCASE' || !tvGroup) return;
  currentZoomMode = 'SHOWCASE';
  backBtn.style.display = 'block';

  const mikaProj = projects.find(p => p.id === 5);
  if (mikaProj) {
    showcaseHudTitle.textContent = mikaProj.title;
    showcaseHudDesc.textContent = mikaProj.description;
    showcaseHudTags.textContent = (mikaProj.skills || []).map(s => `#${s}`).join('  ');
  }

  showcaseHud.classList.add('active');
  gsap.to(showcaseHud, { opacity: 1, duration: 0.6, ease: 'power2.out' });

  textMeshes.forEach(m => gsap.to(m.material, { opacity: 0, duration: 0.35 }));
  allScreenMeshes.forEach(s => { s.userData.targetIntensity = 0.0; });

  const targetCenter = getObjectCenter(tvGroup);
  const aspect = window.innerWidth / window.innerHeight;
  const distMult = aspect < 1.0 ? 1.35 : 1.0;

  const startPos = {
    x: targetCenter.x - (7.5 * distMult),
    y: targetCenter.y + 2.4,
    z: targetCenter.z + (16.5 * distMult)
  };

  const endPos = {
    x: targetCenter.x + (4.5 * distMult),
    y: targetCenter.y + 2.8,
    z: targetCenter.z + (15.5 * distMult)
  };

  if (showcaseTween) showcaseTween.kill();

  gsap.to(camera.position, {
    x: startPos.x,
    y: startPos.y,
    z: startPos.z,
    duration: 1.4,
    ease: 'power2.inOut',
    onUpdate: () => camera.lookAt(targetCenter),
    onComplete: () => {
      showcaseTween = gsap.to(camera.position, {
        x: endPos.x,
        y: endPos.y,
        z: endPos.z,
        duration: 9.0,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        onUpdate: () => camera.lookAt(targetCenter)
      });
    }
  });
}

// 3. TOP MONITOR ZOOM
function triggerZoomTopMonitor() {
  if (currentZoomMode === 'TOP' || !topMonitorHitbox) return;
  currentZoomMode = 'TOP';
  backBtn.style.display = 'block';

  if (isTouchDevice) aboutVideoElement.pause();

  textMeshes.forEach(m => gsap.to(m.material, { opacity: 0, duration: 0.35 }));
  allScreenMeshes.forEach(s => { s.userData.targetIntensity = 0.0; });

  const activeMaterial = allScreenMeshes[0]?.material;

  if (activeMaterial && activeMaterial.uniforms) {
    gsap.to(activeMaterial.uniforms.uTopGlitchForce, {
      value: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut"
    });
    gsap.to(activeMaterial.uniforms.uTopBlackout, {
      value: 1.0, duration: 0.45, ease: "power2.in"
    });
  }

  const topWorldCenter = new THREE.Vector3();
  topMonitorHitbox.getWorldPosition(topWorldCenter);

  const baseZoomDistance = 3.5;
  const offsetX = 0.0;
  const offsetY = -0.3;
  const rotY = tvGroup.rotation.y;

  const zoomDistance = getResponsiveZoomDistance(baseZoomDistance);

  const targetCamX = topWorldCenter.x + Math.sin(rotY) * zoomDistance + offsetX;
  const targetCamY = topWorldCenter.y + offsetY;
  const targetCamZ = topWorldCenter.z + Math.cos(rotY) * zoomDistance;

  gsap.to(camera.position, {
    x: targetCamX,
    y: targetCamY,
    z: targetCamZ,
    duration: 1.2,
    ease: 'power3.inOut',
    onComplete: () => {
      socialsDetailContainer.classList.add('active');
      socialsContentWrapper.style.opacity = 0;

      gsap.fromTo(socialsDetailContainer, 
        { clipPath: 'circle(0% at 50% 50%)' },
        { 
          clipPath: 'circle(150% at 50% 50%)',
          duration: 0.65,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(socialsContentWrapper, { opacity: 1, duration: 0.25 });
          }
        }
      );
    }
  });

  gsap.to(camera.rotation, {
    x: 0,
    y: rotY,
    z: 0,
    duration: 1.2,
    ease: 'power3.inOut'
  });
}

// 4. ABOUT MONITOR ZOOM
function triggerZoomAboutMonitor() {
  if (currentZoomMode === 'ABOUT' || !aboutMonitorHitbox) return;
  currentZoomMode = 'ABOUT';
  backBtn.style.display = 'block';

  if (isTouchDevice) socialsVideoElement.pause();

  textMeshes.forEach(m => gsap.to(m.material, { opacity: 0, duration: 0.35 }));
  allScreenMeshes.forEach(s => { s.userData.targetIntensity = 0.0; });

  const activeMaterial = allScreenMeshes[0]?.material;

  if (activeMaterial && activeMaterial.uniforms) {
    gsap.to(activeMaterial.uniforms.uAboutGlitchForce, {
      value: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut"
    });
    gsap.to(activeMaterial.uniforms.uAboutBlackout, {
      value: 1.0, duration: 0.45, ease: "power2.in"
    });
  }

  const aboutWorldCenter = new THREE.Vector3();
  aboutMonitorHitbox.getWorldPosition(aboutWorldCenter);

  const baseZoomDistance = 5.0;
  const offsetX = 0.0;
  const offsetY = 0.1;
  const rotY = tvGroup.rotation.y + -0.5;

  const zoomDistance = getResponsiveZoomDistance(baseZoomDistance);

  const targetCamX = aboutWorldCenter.x + Math.sin(rotY) * zoomDistance + offsetX;
  const targetCamY = aboutWorldCenter.y + offsetY;
  const targetCamZ = aboutWorldCenter.z + Math.cos(rotY) * zoomDistance;

  gsap.to(camera.position, {
    x: targetCamX,
    y: targetCamY,
    z: targetCamZ,
    duration: 1.2,
    ease: 'power3.inOut',
    onComplete: () => {
      aboutDetailContainer.classList.add('active');
      aboutContentWrapper.style.opacity = 0;

      gsap.fromTo(aboutDetailContainer, 
        { clipPath: 'circle(0% at 50% 50%)' },
        { 
          clipPath: 'circle(150% at 50% 50%)',
          duration: 0.65,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(aboutContentWrapper, { opacity: 1, duration: 0.25 });
          }
        }
      );
    }
  });

  gsap.to(camera.rotation, {
    x: 0,
    y: rotY,
    z: 0,
    duration: 1.2,
    ease: 'power3.inOut'
  });
}

function handlePreviewSwitch(pId) {
  hoveredProjectId = pId;
  const proj = projects.find(p => p.id === pId);
  if (proj) switchVideoPreview(proj.video);

  const activeMaterial = allScreenMeshes[0]?.material;
  if (activeMaterial && activeMaterial.uniforms) {
    if (activeMaterial.uniforms.uIsSpecialPreview) {
      activeMaterial.uniforms.uIsSpecialPreview.value = (pId === 5) ? 1.0 : 0.0;
    }
    if (activeMaterial.uniforms.uPreviewCryptic) {
      gsap.to(activeMaterial.uniforms.uPreviewCryptic, {
        value: 1.0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }

  textMeshes.forEach((mesh) => {
    const isHover = (mesh.userData.projectId === pId);
    mesh.userData.isHovered = isHover;
    gsap.to(mesh.scale, { x: isHover ? 1.15 : 1.0, y: isHover ? 1.15 : 1.0, duration: 0.25 });
  });
}

function resetPreview() {
  hoveredProjectId = -1;
  selectedMobileProjectId = -1;
  switchVideoPreview(MAIN_MENU_VIDEO);

  const activeMaterial = allScreenMeshes[0]?.material;
  if (activeMaterial && activeMaterial.uniforms) {
    if (activeMaterial.uniforms.uIsSpecialPreview) {
      activeMaterial.uniforms.uIsSpecialPreview.value = 0.0;
    }
    if (activeMaterial.uniforms.uPreviewCryptic) {
      gsap.to(activeMaterial.uniforms.uPreviewCryptic, {
        value: 0.0,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  }

  textMeshes.forEach((mesh) => {
    mesh.userData.isHovered = false;
    gsap.to(mesh.scale, { x: 1.0, y: 1.0, duration: 0.25 });
  });
}

// Pointer Move: Desktop Hover Only
if (!isTouchDevice) {
  window.addEventListener('pointermove', (e) => {
    if (currentZoomMode !== 'NONE') return;

    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    let isHoveringInteractive = false;

    const tapeIntersects = raycaster.intersectObjects(interactableCassettes, true);
    if (tapeIntersects.length > 0) {
      let target = tapeIntersects[0].object;
      while (target && target.userData?.projectId === undefined && target.parent) target = target.parent;
      const pId = target?.userData?.projectId;
      if (pId !== undefined) {
        isHoveringInteractive = true;
        if (pId !== hoveredProjectId) handlePreviewSwitch(pId);
      }
    } else if (hoveredProjectId !== -1) {
      resetPreview();
    }

    const topIntersects = raycaster.intersectObject(topMonitorHitbox, true);
    const aboutIntersects = raycaster.intersectObject(aboutMonitorHitbox, true);
    if (topIntersects.length > 0 || aboutIntersects.length > 0) isHoveringInteractive = true;

    document.body.style.cursor = isHoveringInteractive ? 'pointer' : 'default';

    const screenTargets = [...allScreenMeshes, topMonitorHitbox, aboutMonitorHitbox];
    const screenIntersects = raycaster.intersectObjects(screenTargets, true);
    let hitPoint = null;
    if (screenIntersects.length > 0) hitPoint = screenIntersects[0].point;

    allScreenMeshes.forEach((screen) => {
      if (screen.material && screen.material.uniforms) {
        if (hitPoint) {
          screen.material.uniforms.uHitPoint.value.copy(hitPoint);
          screen.userData.targetIntensity = 1.0;
        } else {
          screen.userData.targetIntensity = 0.0;
        }
      }
    });
  });
}

// Click & Tap Interaction Handler (Two-tap logic for Mobile)
window.addEventListener('pointerup', (e) => {
  if (currentZoomMode !== 'NONE') return;

  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const topIntersects = raycaster.intersectObject(topMonitorHitbox, true);
  if (topIntersects.length > 0) return triggerZoomTopMonitor();

  const aboutIntersects = raycaster.intersectObject(aboutMonitorHitbox, true);
  if (aboutIntersects.length > 0) return triggerZoomAboutMonitor();

  const cassetteIntersects = raycaster.intersectObjects(interactableCassettes, true);
  if (cassetteIntersects.length > 0) {
    let target = cassetteIntersects[0].object;
    while (target && target.userData?.projectId === undefined && target.parent) target = target.parent;
    const pId = target?.userData?.projectId ?? 0;

    if (isTouchDevice) {
      if (selectedMobileProjectId !== pId) {
        selectedMobileProjectId = pId;
        handlePreviewSwitch(pId);
        return;
      }
    }

    if (pId === 5) return triggerShowcaseOverview();
    return triggerZoomMain(pId);
  } else if (isTouchDevice && selectedMobileProjectId !== -1) {
    resetPreview();
  }
});

// Reusable Exit / Collapse Transition
function handleReturn() {
  if (currentZoomMode === 'NONE') return;

  const previousMode = currentZoomMode;
  currentZoomMode = 'NONE';
  backBtn.style.display = 'none';
  document.body.style.cursor = 'default';

  if (showcaseTween) {
    showcaseTween.kill();
    showcaseTween = null;
  }

  if (isTouchDevice) {
    if (socialsVideoElement.paused) socialsVideoElement.play().catch(() => {});
    if (aboutVideoElement.paused) aboutVideoElement.play().catch(() => {});
  }

  const activeMaterial = allScreenMeshes[0]?.material;

  if (previousMode === 'MAIN') {
    gsap.to(projectModalGrid, { opacity: 0, duration: 0.15 });
    gsap.to(projectDetailContainer, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => { 
        projectDetailContainer.classList.remove('active');
        projDetailVideo.pause();
      }
    });
    if (activeMaterial && activeMaterial.uniforms) {
      gsap.to(activeMaterial.uniforms.uMainBlackout, { value: 0.0, duration: 0.6, ease: "power2.out" });
      gsap.to(activeMaterial.uniforms.uMainGlitchForce, { value: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" });
      gsap.to(activeMaterial.uniforms.uPreviewCryptic, { value: 0.0, duration: 0.35, ease: "power2.out" });
      gsap.to(activeMaterial.uniforms.uIsSpecialPreview, { value: 0.0, duration: 0.35, ease: "power2.out" });
    }
    switchVideoPreview(MAIN_MENU_VIDEO);
  } else if (previousMode === 'SHOWCASE') {
    gsap.to(showcaseHud, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => showcaseHud.classList.remove('active')
    });
    if (activeMaterial && activeMaterial.uniforms) {
      gsap.to(activeMaterial.uniforms.uPreviewCryptic, { value: 0.0, duration: 0.35, ease: "power2.out" });
      gsap.to(activeMaterial.uniforms.uIsSpecialPreview, { value: 0.0, duration: 0.35, ease: "power2.out" });
    }
    switchVideoPreview(MAIN_MENU_VIDEO);
  } else if (previousMode === 'TOP') {
    gsap.to(socialsContentWrapper, { opacity: 0, duration: 0.15 });
    gsap.to(socialsDetailContainer, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => { socialsDetailContainer.classList.remove('active'); }
    });
    if (activeMaterial && activeMaterial.uniforms) {
      gsap.to(activeMaterial.uniforms.uTopBlackout, { value: 0.0, duration: 0.6, ease: "power2.out" });
      gsap.to(activeMaterial.uniforms.uTopGlitchForce, { value: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" });
    }
  } else if (previousMode === 'ABOUT') {
    gsap.to(aboutContentWrapper, { opacity: 0, duration: 0.15 });
    gsap.to(aboutDetailContainer, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.45,
      ease: 'power3.in',
      onComplete: () => { aboutDetailContainer.classList.remove('active'); }
    });
    if (activeMaterial && activeMaterial.uniforms) {
      gsap.to(activeMaterial.uniforms.uAboutBlackout, { value: 0.0, duration: 0.6, ease: "power2.out" });
      gsap.to(activeMaterial.uniforms.uAboutGlitchForce, { value: 1.0, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" });
    }
  }

  textMeshes.forEach(m => gsap.to(m.material, { opacity: 1, duration: 0.5 }));
  resetPreview();

  updateResponsiveCamera();
  const targetX = camera.position.x;
  const targetY = camera.position.y;
  const targetZ = camera.position.z;

  gsap.to(camera.position, {
    x: targetX,
    y: targetY,
    z: targetZ,
    duration: 1.2,
    ease: 'power3.inOut'
  });

  gsap.to(camera.rotation, {
    x: 0,
    y: 0,
    z: 0,
    duration: 1.2,
    ease: 'power3.inOut'
  });
}

backBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  handleReturn();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') handleReturn();
});

// =========================================================================
// 10. RESIZE & RENDER LOOP
// =========================================================================
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth / PIXEL_FACTOR, window.innerHeight / PIXEL_FACTOR, false);
  if (currentZoomMode === 'NONE') {
    updateResponsiveCamera();
  } else {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
});

// Pause loops on backgrounding
document.addEventListener('visibilitychange', () => {
  const isHidden = document.visibilityState === 'hidden';
  if (isHidden) {
    videoElement.pause();
    socialsVideoElement.pause();
    aboutVideoElement.pause();
  } else if (currentZoomMode === 'NONE') {
    videoElement.play().catch(() => {});
    socialsVideoElement.play().catch(() => {});
    aboutVideoElement.play().catch(() => {});
  }
});

const clock = new THREE.Clock();
let boilTimer = 0;

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsedTime = clock.getElapsedTime();

  boilTimer += delta;
  const shouldRedraw = boilTimer > 0.125;
  if (shouldRedraw) boilTimer = 0;

  if (currentZoomMode === 'NONE') {
    textMeshes.forEach((mesh) => {
      if (shouldRedraw) {
        mesh.userData.seed += 13;
        drawScribbleFrame(mesh.userData.ctx, mesh.userData.title, mesh.userData.isHovered, mesh.userData.seed);
        mesh.userData.texture.needsUpdate = true;
      }
    });
  }

  allScreenMeshes.forEach((screen) => {
    if (screen.material && screen.material.uniforms) {
      screen.material.uniforms.time.value = elapsedTime;
      const target = currentZoomMode !== 'NONE' ? 0.0 : (screen.userData.targetIntensity || 0.0);
      screen.material.uniforms.uHoverIntensity.value = THREE.MathUtils.lerp(
        screen.material.uniforms.uHoverIntensity.value, target, 0.18
      );
    }
  });

  if (!videoElement.paused && videoElement.readyState >= videoElement.HAVE_CURRENT_DATA) videoTexture.needsUpdate = true;
  if (!socialsVideoElement.paused && socialsVideoElement.readyState >= socialsVideoElement.HAVE_CURRENT_DATA) socialsVideoTexture.needsUpdate = true;
  if (!aboutVideoElement.paused && aboutVideoElement.readyState >= aboutVideoElement.HAVE_CURRENT_DATA) aboutVideoTexture.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();