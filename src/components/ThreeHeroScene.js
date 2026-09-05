import * as THREE from 'three';

/**
 * Interactive 3D WebGL Hero Scene for Niljyoti Travels
 * Features an endless streaming highway, interactive metallic vehicle with glowing LED headlights,
 * high-speed light particles, and mouse-driven parallax steer physics.
 */
export function initThreeHeroScene(container) {
  if (!container) return null;

  // Check WebGL availability
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) return null;
  } catch (e) {
    return null;
  }

  // Canvas setup
  const canvas = document.createElement('canvas');
  canvas.className = 'three-hero-canvas';
  container.prepend(canvas);

  // 3D HUD Telemetry Overlay
  const hudOverlay = document.createElement('div');
  hudOverlay.className = 'three-hero-hud-overlay';
  hudOverlay.innerHTML = `
    <div class="hero-hud-top-bar">
      <div class="hero-hud-pill">
        <span class="live-pulse"></span>
        <span>LIVE 3D SIMULATION • NILJYOTI EXPRESS ROUTE</span>
      </div>
      <div class="hero-hud-pill">
        <span>🎮 MOVE MOUSE / TOUCH TO STEER</span>
      </div>
    </div>
    <div class="hero-hud-bottom-bar">
      <div class="hud-telemetry-text">
        <span>📍 TRIPURA HIGHWAY CORRIDOR • NH-8</span>
      </div>
      <div class="hud-telemetry-text">
        <span>24/7 IXA AIRPORT DISPATCH ACTIVE</span>
      </div>
    </div>
  `;
  container.appendChild(hudOverlay);

  const scene = new THREE.Scene();
  // Soft atmospheric fog matching the clean modern light aesthetic
  scene.fog = new THREE.FogExp2(0xF8FAFC, 0.018);

  const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 3.2, 8.5);
  camera.lookAt(0, 1.0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x189cf4, 1.5);
  dirLight.position.set(8, 15, 8);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const sunAccent = new THREE.PointLight(0x6cc4ff, 2.5, 50);
  sunAccent.position.set(-6, 8, -10);
  scene.add(sunAccent);

  // 1. ENDLESS 3D HIGHWAY
  const roadWidth = 8;
  const roadLength = 120;
  const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength, 16, 64);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    roughness: 0.65,
    metalness: 0.3
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -25);
  road.receiveShadow = true;
  scene.add(road);

  // Road Shoulders & Glowing Edge Ribbons
  const edgeGeo = new THREE.BoxGeometry(0.3, 0.1, roadLength);
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x189cf4 });
  const leftEdge = new THREE.Mesh(edgeGeo, edgeMat);
  leftEdge.position.set(-roadWidth / 2 - 0.15, 0.05, -25);
  scene.add(leftEdge);

  const rightEdge = new THREE.Mesh(edgeGeo, edgeMat);
  rightEdge.position.set(roadWidth / 2 + 0.15, 0.05, -25);
  scene.add(rightEdge);

  // Road Lane Center Markings (Dashed segments)
  const laneDashGroup = new THREE.Group();
  const dashCount = 28;
  const dashGeo = new THREE.BoxGeometry(0.22, 0.04, 2.4);
  const dashMat = new THREE.MeshBasicMaterial({ color: 0x6cc4ff });

  const dashes = [];
  for (let i = 0; i < dashCount; i++) {
    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.position.set(0, 0.03, -roadLength / 2 + (i * (roadLength / dashCount)) + 15);
    laneDashGroup.add(dash);
    dashes.push(dash);
  }
  scene.add(laneDashGroup);

  // 2. STREAMING SPEED PARTICLES (High-speed light streaks)
  const particleCount = 180;
  const pGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(particleCount * 3);
  const pSpeeds = [];

  for (let i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 22;
    pPositions[i * 3 + 1] = Math.random() * 8 + 0.5;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * roadLength - 10;
    pSpeeds.push(Math.random() * 0.4 + 0.3);
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x189cf4,
    size: 0.14,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // 3. STYLIZED 3D VEHICLE CHASSIS
  const carGroup = new THREE.Group();
  carGroup.position.set(0, 0.6, 2.5);

  // Vehicle Lower Body (Aerodynamic wedge)
  const bodyGeo = new THREE.BoxGeometry(2.1, 0.65, 4.4);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    metalness: 0.85,
    roughness: 0.2,
    envMapIntensity: 1.0
  });
  const carBody = new THREE.Mesh(bodyGeo, bodyMat);
  carBody.position.y = 0.4;
  carBody.castShadow = true;
  carGroup.add(carBody);

  // Vehicle Cabin Roof (Glass Tint)
  const cabinGeo = new THREE.BoxGeometry(1.7, 0.55, 2.2);
  const cabinMat = new THREE.MeshStandardMaterial({
    color: 0x064E3B,
    metalness: 0.95,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85
  });
  const cabin = new THREE.Mesh(cabinGeo, cabinMat);
  cabin.position.set(0, 0.95, -0.2);
  cabin.castShadow = true;
  carGroup.add(cabin);

  // Modern LED Headlight Strip (Front)
  const lightBarGeo = new THREE.BoxGeometry(1.85, 0.08, 0.1);
  const lightBarMat = new THREE.MeshBasicMaterial({ color: 0x6EE7B7 });
  const frontLight = new THREE.Mesh(lightBarGeo, lightBarMat);
  frontLight.position.set(0, 0.45, -2.22);
  carGroup.add(frontLight);

  // Dynamic Spotlights projecting on the road from headlights
  const headSpotL = new THREE.SpotLight(0x6EE7B7, 4, 35, Math.PI / 6, 0.4, 1.2);
  headSpotL.position.set(-0.7, 0.5, -2.2);
  headSpotL.target.position.set(-0.7, 0, -18);
  scene.add(headSpotL);
  scene.add(headSpotL.target);

  const headSpotR = new THREE.SpotLight(0x6EE7B7, 4, 35, Math.PI / 6, 0.4, 1.2);
  headSpotR.position.set(0.7, 0.5, -2.2);
  headSpotR.target.position.set(0.7, 0, -18);
  scene.add(headSpotR);
  scene.add(headSpotR.target);

  // Neon Taillights (Rear)
  const tailGeo = new THREE.BoxGeometry(1.85, 0.08, 0.1);
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
  const rearLight = new THREE.Mesh(tailGeo, tailMat);
  rearLight.position.set(0, 0.5, 2.22);
  carGroup.add(rearLight);

  // 4 Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 20);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.7 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x10B981, metalness: 0.9, roughness: 0.2 });

  const wheels = [];
  const wheelPositions = [
    [-1.05, 0.15, -1.3],
    [1.05, 0.15, -1.3],
    [-1.05, 0.15, 1.3],
    [1.05, 0.15, 1.3]
  ];

  wheelPositions.forEach(pos => {
    const wGroup = new THREE.Group();
    wGroup.position.set(...pos);

    const tire = new THREE.Mesh(wheelGeo, wheelMat);
    tire.rotation.z = Math.PI / 2;
    wGroup.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 12), rimMat);
    rim.rotation.z = Math.PI / 2;
    wGroup.add(rim);

    carGroup.add(wGroup);
    wheels.push(wGroup);
  });

  // Soft contact shadow under car
  const shadowGeo = new THREE.PlaneGeometry(2.6, 4.8);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.35
  });
  const carShadow = new THREE.Mesh(shadowGeo, shadowMat);
  carShadow.rotation.x = -Math.PI / 2;
  carShadow.position.y = -0.18;
  carGroup.add(carShadow);

  scene.add(carGroup);

  // 4. FLOATING 3D WAYPOINT RINGS (Tripura & Northeast Hubs)
  const waypointData = [
    { name: 'IXA Airport', color: 0x189cf4, z: -15, x: -3.8 },
    { name: 'Neermahal', color: 0x02b3e4, z: -35, x: 3.8 },
    { name: 'Unakoti', color: 0xD97706, z: -55, x: -3.6 },
    { name: 'Darjeeling', color: 0x8B5CF6, z: -75, x: 3.6 }
  ];

  const waypointMeshes = [];
  waypointData.forEach(wp => {
    const ringGeo = new THREE.TorusGeometry(0.75, 0.05, 12, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: wp.color });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(wp.x, 1.5, wp.z);
    ring.rotation.x = Math.PI / 4;
    scene.add(ring);
    waypointMeshes.push(ring);
  });

  // Mouse Parallax & Physics State
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.targetX = nx;
    mouse.targetY = ny;
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Touch support for mobile devices
  const onTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const rect = container.getBoundingClientRect();
      const nx = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;
    }
  };
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  // Resize handler
  const onResize = () => {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  window.addEventListener('resize', onResize);

  // Animation Loop
  let isRunning = true;
  let roadSpeed = 0.55;
  let clock = new THREE.Clock();

  function animate() {
    if (!isRunning) return;
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Damped mouse steer (lerp)
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Move Road Lane Dashes (Streaming illusion)
    dashes.forEach(dash => {
      dash.position.z += roadSpeed;
      if (dash.position.z > 12) {
        dash.position.z -= roadLength;
      }
    });

    // Move Particles
    const pos = pGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 2] += roadSpeed * 1.5;
      if (pos[i * 3 + 2] > 10) {
        pos[i * 3 + 2] = -roadLength + Math.random() * 5;
        pos[i * 3] = (Math.random() - 0.5) * 22;
      }
    }
    pGeo.attributes.position.needsUpdate = true;

    // Rotate Wheels with speed
    wheels.forEach(w => {
      w.children[0].rotation.x += roadSpeed * 1.5;
      w.children[1].rotation.x += roadSpeed * 1.5;
    });

    // Car Steering Reaction
    const steerLimitX = 2.4;
    carGroup.position.x = mouse.x * steerLimitX;
    // Car roll & yaw into turn
    carGroup.rotation.y = -mouse.x * 0.22;
    carGroup.rotation.z = -mouse.x * 0.08;
    // Subtle engine idle bobbing
    carGroup.position.y = 0.45 + Math.sin(clock.getElapsedTime() * 8) * 0.02;

    // Headlight target tracking
    headSpotL.target.position.x = carGroup.position.x - 0.7;
    headSpotR.target.position.x = carGroup.position.x + 0.7;

    // Waypoint rings rotation
    waypointMeshes.forEach((mesh, idx) => {
      mesh.rotation.z += 0.015 * (idx % 2 === 0 ? 1 : -1);
      mesh.position.y = 1.4 + Math.sin(clock.getElapsedTime() * 2 + idx) * 0.15;
    });

    // Camera dynamic follow
    camera.position.x = mouse.x * 0.8;
    camera.position.y = 3.0 + mouse.y * 0.4;
    camera.lookAt(carGroup.position.x * 0.3, 0.8, -6);

    renderer.render(scene, camera);
  }

  animate();

  return {
    destroy: () => {
      isRunning = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      if (hudOverlay.parentNode) {
        hudOverlay.parentNode.removeChild(hudOverlay);
      }
    }
  };
}
