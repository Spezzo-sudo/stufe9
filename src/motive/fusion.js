// WebGL-Shader aus dem abgenommenen Gesamtprototyp; kein Three.js.
const VS = `
attribute vec4 a; attribute float k;
uniform float t, life, burst, stab, asp, px, f;
varying float al; varying float hot;
float h(float n){ return fract(sin(n*91.7)*43758.5); }
void main(){
  vec3 p; float size;
  if (k < .5) {
    float th = a.x + t*a.w;
    float ph = a.y + th*3. + t*.4;
    float rr = .33*sqrt(a.z)*(1. + (1.-stab)*.32*sin(4.*ph + t*5. + a.x*3.));
    float e = burst*(.2 + h(a.x+a.y)*1.6);
    rr += e;
    float kx = (1.-stab)*.13*sin(2.*th - t*2.5);
    float c = 1. + rr*cos(ph) + kx;
    p = vec3(c*cos(th), rr*sin(ph) + kx*.6*cos(th*3.), c*sin(th));
    al = life*(1.-burst*burst)*(1.-.6*a.z)*.17;
    hot = clamp(e*2.2 + (1.-stab)*a.z*.9, 0., 1.);
    size = 3. + 4.*(1.-a.z);
  } else {
    float c = 1. + .52*cos(a.y);
    p = vec3(c*cos(a.x), .52*sin(a.y), c*sin(a.x));
    al = .85; hot = -1.; size = 1.7;
  }
  float cy = cos(.62), sy = sin(.62);
  vec3 q = vec3(p.x, p.y*cy - p.z*sy, p.y*sy + p.z*cy);
  float d = 4.2 - q.z;
  gl_Position = vec4(q.x*f/asp, q.y*f - .02*d, 0., d);
  gl_PointSize = px*size*4.2/d;
}`;
const FS = `
precision mediump float; varying float al; varying float hot;
void main(){
  float s = smoothstep(.5, .05, length(gl_PointCoord - .5));
  vec3 c = hot < 0. ? vec3(.34,.50,.54) : mix(vec3(1.,.95,.88), vec3(1.,.33,.03), hot);
  gl_FragColor = vec4(c, al*s);
}`;



export function initFusion() {
  document.querySelectorAll('[data-fusion]').forEach((stage) => {
    const canvas = stage.querySelector('canvas');
    const toggle = stage.querySelector('[data-motion-toggle]');
    if (!canvas || !toggle) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let gl, program, frameId = 0, visible = false, paused = false, start = 0;
    const U = {};
    const stop = () => { cancelAnimationFrame(frameId); frameId = 0; };
    const fallback = () => { stop(); stage.classList.remove('webgl-ready'); toggle.hidden = true; };
    try {
      gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
      if (!gl) return;
      const compile = (type, source) => {
        const shader = gl.createShader(type);
        if (!shader) throw new Error('Shader fehlt');
        gl.shaderSource(shader, source); gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader konnte nicht kompiliert werden');
        return shader;
      };
      program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);
      const NP = matchMedia('(max-width: 600px)').matches ? 10000 : 30000;
      const coils = 18, per = 110, count = NP + coils * per, data = new Float32Array(count * 5);
      let offset = 0;
      for (let i = 0; i < NP; i++) { data[offset++] = Math.random() * 6.2832; data[offset++] = Math.random() * 6.2832; data[offset++] = Math.random(); data[offset++] = .5 + Math.random() * .6; data[offset++] = 0; }
      for (let c = 0; c < coils; c++) for (let j = 0; j < per; j++) { data[offset++] = c / coils * 6.2832; data[offset++] = j / per * 6.2832; data[offset++] = 0; data[offset++] = 0; data[offset++] = 1; }
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const la = gl.getAttribLocation(program, 'a'), lk = gl.getAttribLocation(program, 'k');
      gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 4, gl.FLOAT, false, 20, 0);
      gl.enableVertexAttribArray(lk); gl.vertexAttribPointer(lk, 1, gl.FLOAT, false, 20, 16);
      ['t', 'life', 'burst', 'stab', 'asp', 'px', 'f'].forEach((name) => U[name] = gl.getUniformLocation(program, name));
      gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE); gl.clearColor(.027, .051, .059, 1);
      const draw = (now) => {
        frameId = 0;
        if (!visible || paused || media.matches || document.hidden) return;
        if (!start) start = now;
        // Visualisierung erklärt Einschluss und Abbruch; Messwert bleibt als belegte Zahl im HTML.
        const maturity = Number(stage.dataset.stage);
        const limit = Number(stage.dataset.value) || 7;
        const period = Math.min(12, Math.max(3, limit));
        const elapsed = (now - start) / 1000 % (period + 3.5);
        const burst = maturity >= 7 || maturity <= 2 ? 0 : Math.max(0, Math.min(1, (elapsed - period) / .9));
        gl.uniform1f(U.t, now / 1000); gl.uniform1f(U.life, maturity <= 2 ? 0 : maturity >= 7 ? 1 : elapsed < period + .9 ? Math.min(1, elapsed / .2) : 0);
        gl.uniform1f(U.burst, burst); gl.uniform1f(U.stab, maturity >= 7 ? .98 : .9 - .55 * Math.pow(Math.min(1, elapsed / period), 2));
        gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.POINTS, 0, count);
        stage.classList.add('webgl-ready');
        frameId = requestAnimationFrame(draw);
      };
      const run = () => { stop(); if (visible && !paused && !media.matches && !document.hidden) frameId = requestAnimationFrame(draw); else if (media.matches) fallback(); };
      const resize = () => {
        const r = canvas.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
        if (!r.width || !r.height) return;
        canvas.width = r.width * d; canvas.height = r.height * d;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(U.asp, r.width / r.height); gl.uniform1f(U.f, Math.min(2.7, 2.35 * r.width / r.height)); gl.uniform1f(U.px, d * Math.max(.75, Math.min(1.25, r.width / 800)));
        run();
      };
      new ResizeObserver(resize).observe(canvas);
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; run(); }).observe(stage);
      toggle.hidden = media.matches;
      toggle.addEventListener('click', () => { paused = !paused; toggle.textContent = paused ? 'Animation fortsetzen' : 'Animation pausieren'; toggle.setAttribute('aria-pressed', String(paused)); run(); });
      media.addEventListener('change', () => { toggle.hidden = media.matches; run(); });
      document.addEventListener('visibilitychange', run);
      canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); fallback(); });
      addEventListener('pagehide', stop, { once: true });
      resize();
    } catch { fallback(); }
  });
}
