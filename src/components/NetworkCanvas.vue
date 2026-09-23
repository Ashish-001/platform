<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Blockchain-style particle network: drifting nodes linked by lines,
// with extra connections drawn toward the cursor on hover.
const canvasRef = ref(null)

let ctx = null
let raf = 0
let particles = []
let width = 0
let height = 0
let dpr = 1
const mouse = { x: -9999, y: -9999 }
const MOUSE_RADIUS = 180
const LINK_DIST = 150

let onMove, onLeave, resizeObserver, reducedMotion

function isDark() {
  return document.documentElement.classList.contains('dark')
}

// Linking every pair each frame is O(n²), so the budget stays modest on small
// screens — where the canvas is mostly masked behind hero text anyway.
function particleBudget() {
  if (width < 768) return 0
  return width < 1280 ? 90 : 150
}

function initParticles() {
  const count = Math.min(particleBudget(), Math.floor((width * height) / 5200))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 1.2 + Math.random() * 1.8,
  }))
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  if (!particles.length) return

  const dark = isDark()
  const node = dark ? '129,140,248' : '79,70,229'
  const link = dark ? '129,140,248' : '99,102,241'

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    // Gentle pull toward the cursor
    const dxm = mouse.x - p.x
    const dym = mouse.y - p.y
    const dm = Math.hypot(dxm, dym)
    if (dm < MOUSE_RADIUS && dm > 0.001) {
      p.x += (dxm / dm) * 0.12
      p.y += (dym / dm) * 0.12
    }
  }

  // Links between nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]
      const b = particles[j]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (d < LINK_DIST) {
        ctx.strokeStyle = `rgba(${link},${(1 - d / LINK_DIST) * (dark ? 0.22 : 0.28)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  // Brighter links from the cursor to nearby nodes
  for (const p of particles) {
    const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
    if (d < MOUSE_RADIUS) {
      ctx.strokeStyle = `rgba(${link},${(1 - d / MOUSE_RADIUS) * 0.5})`
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(mouse.x, mouse.y)
      ctx.stroke()
    }
  }

  // Nodes
  for (const p of particles) {
    const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
    const glow = d < MOUSE_RADIUS ? 0.85 : dark ? 0.5 : 0.55
    ctx.fillStyle = `rgba(${node},${glow})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, d < MOUSE_RADIUS ? p.r + 0.8 : p.r, 0, Math.PI * 2)
    ctx.fill()
  }

  if (!reducedMotion) raf = requestAnimationFrame(draw)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.parentElement.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = rect.width
  height = rect.height
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initParticles()

  cancelAnimationFrame(raf)
  if (reducedMotion || !particles.length) draw()
  else raf = requestAnimationFrame(draw)
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resize()
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas.parentElement)

  // Cursor interaction is pointless on touch devices, and the listener costs work.
  if (window.matchMedia('(pointer: fine)').matches) {
    // The canvas is pointer-events-none, so track the mouse on the window
    onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseout', onLeave)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
    aria-hidden="true"
  ></canvas>
</template>
