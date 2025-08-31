/*
Netrunner Trail Cursor Effect
Based on cursor-effects by Tim Holman
https://github.com/tholman/cursor-effects
Modified for a cyberpunk/netrunner theme with a main trail that creates branching, crack-like lightning.
*/

(function netrunnerCursor() {
  // --- Configuration ---
  const TRAIL_LIFESPAN = 40; // How long a trail segment lives, in frames.
  const SPARK_LIFESPAN = 30; // How long a spark segment lives, in frames.
  const SPARK_SPAWN_CHANCE = 0.02; // Chance to spawn a root spark per trail segment per frame (1 - 0.98).
  const SPARK_BRANCH_CHANCE = 0.04; // Chance for a spark to branch per frame (1 - 0.96).
  const MAX_SPARK_GENERATIONS = 3; // How many times a spark can branch.
  const THEME_COLORS = ['#39FF14', '#00FFF7', '#FF00CC'];

  // --- Runtime State ---
  let canvas, context;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let trail = [];
  let sparks = [];
  let colorIndex = 0;

  /**
   * A data-shard fracturing off the main trace.
   */
  class Spark {
    /**
     * @param {number} x The starting x-coordinate.
     * @param {number} y The starting y-coordinate.
     * @param {string} color The color of the spark.
     * @param {number} angle The angle of the spark in radians.
     * @param {number} length The length of the spark segment.
     * @param {number} generation The branching generation of the spark.
     */
    constructor(x, y, color, angle, length, generation = 1) {
      this.position = { x, y };
      this.color = color;
      this.angle = angle;
      this.length = length;
      this.generation = generation;
      this.life = SPARK_LIFESPAN;

      this.endPosition = {
        x: this.position.x + Math.cos(this.angle) * this.length,
        y: this.position.y + Math.sin(this.angle) * this.length
      };
    }

    /**
     * Degrades the shard's integrity and handles splintering into sub-shards.
     */
    update() {
      this.life--;

      // Branching logic: splinter into a new generation of shards.
      const canBranch = this.generation < MAX_SPARK_GENERATIONS && this.life > 10 && Math.random() > (1 - SPARK_BRANCH_CHANCE);
      if (canBranch) {
        const newAngle = this.angle + (Math.random() - 0.5) * (Math.PI / 2.5);
        const newLength = this.length * 0.7;
        sparks.push(new Spark(this.endPosition.x, this.endPosition.y, this.color, newAngle, newLength, this.generation + 1));
      }
    }

    /**
     * Renders the shard's visual signature on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     */
    draw(ctx) {
      if (this.life <= 0) return;

      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.endPosition.x, this.endPosition.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = Math.max(0.1, 1.5 * (this.life / SPARK_LIFESPAN));
      ctx.globalAlpha = this.life / SPARK_LIFESPAN; // Fade out over time.
      ctx.stroke();
    }
  }

  /**
   * Injects the visual overlay and hooks into the system's I/O.
   */
  function init() {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');

    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.position = 'fixed';
    canvas.style.zIndex = '9999';

    document.body.appendChild(canvas);
    resizeCanvas();
    bindEvents();
    loop();
  }

  /**
   * Establishes I/O hooks for cursor movement and viewport changes.
   */
  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resizeCanvas);
  }

  /**
   * Re-calibrates the overlay to the viewport dimensions.
   */
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  /**
   * Logs cursor I/O to generate the primary data trail.
   * @param {MouseEvent} e The mouse event.
   */
  function onMouseMove(e) {
    trail.push({
      x: e.clientX,
      y: e.clientY,
      life: TRAIL_LIFESPAN,
      color: THEME_COLORS[colorIndex]
    });

    colorIndex = (colorIndex + 1) % THEME_COLORS.length;
  }

  /**
   * The main render cycle, painting the digital chaos every frame.
   */
  function updateAndDraw() {
    context.clearRect(0, 0, width, height);

    // --- Render and decay the primary data trail ---
    for (let i = 0; i < trail.length - 1; i++) {
      const p1 = trail[i];
      const p2 = trail[i + 1];

      // Render the trail segment itself.
      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.strokeStyle = p1.color;
      context.lineWidth = Math.max(1, (p1.life / TRAIL_LIFESPAN) * 3);
      context.lineCap = 'round';
      context.stroke();

      // --- Fracture the trail, spawning a new data-shard ---
      if (Math.random() > (1 - SPARK_SPAWN_CHANCE)) {
        const segmentVec = { x: p2.x - p1.x, y: p2.y - p1.y };
        let perpVec = { x: -segmentVec.y, y: segmentVec.x };
        const mag = Math.sqrt(perpVec.x ** 2 + perpVec.y ** 2);
        if (mag > 0) { perpVec.x /= mag; perpVec.y /= mag; }

        let angle = Math.atan2(perpVec.y, perpVec.x);
        if (Math.random() < 0.5) angle += Math.PI; // Randomly flip to the other side
        angle += (Math.random() - 0.5) * (Math.PI / 4); // Deviate slightly

        const length = Math.random() * 15 + 10;
        sparks.push(new Spark(p1.x, p1.y, p1.color, angle, length));
      }
    }

    // --- Purge decayed trail data ---
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].life--;
      if (trail[i].life <= 0) trail.splice(i, 1);
    }

    // --- Update, render, and purge splintered shards ---
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.update();
      s.draw(context);
      if (s.life <= 0) sparks.splice(i, 1);
    }

    // Restore canvas integrity after rendering volatile shards.
    context.globalAlpha = 1.0;
  }

  /**
   * The core animation cycle, synced to the system's refresh rate.
   */
  function loop() {
    updateAndDraw();
    requestAnimationFrame(loop);
  }

  // Execute.
  init();
})();