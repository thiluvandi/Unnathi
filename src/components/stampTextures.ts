import * as THREE from 'three'

// Dark rosewood body with fine ivory carving, matching real block-print stamps.
const WOOD_A = '#4a2c19'
const WOOD_B = '#2b160c'
const CARVE = '#ece3d0'

type Kind = 'paisley' | 'floral' | 'mandala' | 'border' | 'leaf'

function drawWood(ctx: CanvasRenderingContext2D, s: number) {
  const g = ctx.createRadialGradient(s * 0.4, s * 0.35, s * 0.1, s * 0.5, s * 0.5, s * 0.8)
  g.addColorStop(0, WOOD_A)
  g.addColorStop(1, WOOD_B)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  // fine grain
  ctx.strokeStyle = 'rgba(20,10,4,0.3)'
  ctx.lineWidth = s * 0.0015
  for (let i = 0; i < 40; i++) {
    const y = Math.random() * s
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.bezierCurveTo(s * 0.3, y + 5, s * 0.6, y - 5, s, y + 2)
    ctx.stroke()
  }
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

/** small multi-petal flower */
function floret(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, petals = 6) {
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -r * 0.62, r * 0.3, r * 0.62, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
  dot(ctx, cx, cy, r * 0.22)
}

/** an outward-pointing petal (teardrop) at angle a, distance rad from centre */
function petal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  a: number,
  rad: number,
  rx: number,
  ry: number,
) {
  ctx.save()
  ctx.translate(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad)
  ctx.rotate(a + Math.PI / 2)
  ctx.beginPath()
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

/** points around a teardrop outline (t: 0..1) centred at cx,cy, height 2s */
function teardrop(cx: number, cy: number, s: number, t: number) {
  // build from two mirrored cubic beziers; sample by param
  const cubic = (p0: number[], p1: number[], p2: number[], p3: number[], u: number) => {
    const m = 1 - u
    const x = m * m * m * p0[0] + 3 * m * m * u * p1[0] + 3 * m * u * u * p2[0] + u * u * u * p3[0]
    const y = m * m * m * p0[1] + 3 * m * m * u * p1[1] + 3 * m * u * u * p2[1] + u * u * u * p3[1]
    return [x, y]
  }
  const tip = [cx, cy - s]
  const bulb = [cx, cy + s]
  const right = [[cx + s * 0.95, cy - s * 0.1], [cx + s * 0.55, cy + s]]
  const left = [[cx - s * 0.7, cy + s * 0.55], [cx - s * 0.55, cy - s * 0.55]]
  let p
  if (t < 0.5) p = cubic(tip, right[0], right[1], bulb, t * 2)
  else p = cubic(bulb, left[0], left[1], tip, (t - 0.5) * 2)
  return p
}

export function makeStampTexture(kind: Kind, size = 1024) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  drawWood(ctx, size)

  ctx.strokeStyle = CARVE
  ctx.fillStyle = CARVE
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  const m = size / 2
  const thin = size * 0.006
  const fine = size * 0.004

  const strokeTeardrop = (cx: number, cy: number, s: number) => {
    ctx.beginPath()
    for (let i = 0; i <= 96; i++) {
      const [x, y] = teardrop(cx, cy, s, i / 96)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
  }

  if (kind === 'paisley') {
    // bold outer outline
    ctx.lineWidth = thin * 1.5
    strokeTeardrop(m, m, size * 0.46)
    // beaded ring hugging just inside the outline
    for (let i = 0; i < 88; i++) {
      const [x, y] = teardrop(m, m, size * 0.415, i / 88)
      dot(ctx, x, y, fine * 0.95)
    }
    // second fine outline framing the inner field
    ctx.lineWidth = fine
    strokeTeardrop(m, m, size * 0.36)
    // curling floral vine running down the paisley
    ctx.beginPath()
    ctx.moveTo(m + size * 0.01, m - size * 0.24)
    ctx.bezierCurveTo(
      m + size * 0.16, m - size * 0.05,
      m - size * 0.12, m + size * 0.06,
      m + size * 0.03, m + size * 0.26,
    )
    ctx.stroke()
    // florets along the vine + seed dots
    floret(ctx, m + size * 0.05, m - size * 0.13, size * 0.055)
    floret(ctx, m - size * 0.04, m + size * 0.03, size * 0.065)
    floret(ctx, m + size * 0.04, m + size * 0.19, size * 0.05)
    for (let i = 0; i < 5; i++) {
      const [x, y] = teardrop(m, m, size * 0.24, i / 5 + 0.05)
      dot(ctx, x, y, fine * 0.8)
    }
  } else if (kind === 'floral') {
    const petals = 12
    ctx.lineWidth = thin
    for (let i = 0; i < petals; i++) {
      const a = (i / petals) * Math.PI * 2
      ctx.save()
      ctx.translate(m, m)
      ctx.rotate(a)
      ctx.beginPath()
      ctx.ellipse(0, -size * 0.28, size * 0.055, size * 0.19, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }
    for (const r of [0.15, 0.11]) {
      ctx.beginPath()
      ctx.arc(m, m, size * r, 0, Math.PI * 2)
      ctx.stroke()
    }
    dot(ctx, m, m, size * 0.035)
    ctx.lineWidth = fine
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2
      dot(ctx, m + Math.cos(a) * size * 0.46, m + Math.sin(a) * size * 0.46, fine)
    }
  } else if (kind === 'mandala') {
    const TAU = Math.PI * 2
    // beaded outer border
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * TAU
      dot(ctx, m + Math.cos(a) * size * 0.46, m + Math.sin(a) * size * 0.46, fine * 0.9)
    }
    // framing rings
    ctx.lineWidth = thin
    for (const r of [0.42, 0.3, 0.15]) {
      ctx.beginPath()
      ctx.arc(m, m, size * r, 0, TAU)
      ctx.stroke()
    }
    // outer ring of 8 outward-pointing petals
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU
      petal(ctx, m, m, a, size * 0.33, size * 0.05, size * 0.12)
    }
    // interlaced inner ring, rotated a half-step, forming a woven star
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU + TAU / 16
      petal(ctx, m, m, a, size * 0.21, size * 0.042, size * 0.1)
    }
    // fine spokes with terminal beads
    ctx.lineWidth = fine
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * TAU
      dot(ctx, m + Math.cos(a) * size * 0.45, m + Math.sin(a) * size * 0.45, fine)
    }
    // central floret
    floret(ctx, m, m, size * 0.08, 8)
  } else if (kind === 'leaf') {
    ctx.lineWidth = thin
    ctx.beginPath()
    ctx.moveTo(m, size * 0.1)
    ctx.lineTo(m, size * 0.9)
    ctx.stroke()
    for (let i = 0; i < 9; i++) {
      const y = size * (0.16 + i * 0.08)
      const len = size * 0.24 * (1 - i * 0.07)
      ctx.lineWidth = fine
      for (const dir of [1, -1]) {
        ctx.beginPath()
        ctx.moveTo(m, y)
        ctx.quadraticCurveTo(m + dir * len, y - len * 0.35, m + dir * len * 1.05, y - len)
        ctx.stroke()
      }
    }
  } else {
    // border band of fine florets
    for (let i = 0; i < 3; i++) {
      const cx = size * (0.22 + i * 0.28)
      ctx.lineWidth = thin
      for (let p = 0; p < 8; p++) {
        const a = (p / 8) * Math.PI * 2
        ctx.save()
        ctx.translate(cx, m)
        ctx.rotate(a)
        ctx.beginPath()
        ctx.ellipse(0, -size * 0.09, size * 0.02, size * 0.06, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
      dot(ctx, cx, m, size * 0.02)
    }
    ctx.lineWidth = fine
    ctx.strokeRect(size * 0.06, size * 0.26, size * 0.88, size * 0.48)
    ctx.strokeRect(size * 0.09, size * 0.3, size * 0.82, size * 0.4)
  }

  const tex = new THREE.CanvasTexture(c)
  tex.anisotropy = 8
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
