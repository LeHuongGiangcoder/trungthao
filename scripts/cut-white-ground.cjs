/* Asset pipeline, final step: turn the pieces that were photographed on a white
   ground into real cut-outs.

   piece-4 (the hanging beaded frames) is not a cut-out at all — 99% of its
   pixels are opaque white, the window openings included. Laid on a cream
   section it can be hidden with `mix-blend-mode: multiply`, but that trick
   inverts on a dark ground: white would blend away and the white frames with
   it. So the ground has to actually be removed.

   A plain luminance key is no good here, because the frames themselves are
   white. Instead the white is flooded from the borders inwards: the outer
   ground is reachable from the edge, the window openings are enclosed by the
   beading and so are never reached. Edge pixels are feathered by alpha rather
   than cut hard, which keeps the lace from looking stamped out. */
const sharp = require('sharp');
const fs = require('fs');

const PIECES = [4];

/** Pure white is 255; the ground sits within this of it on every channel. */
const TOLERANCE = 10;
/** Pixels this far from white keep partial alpha, so the lace edge stays soft. */
const FEATHER = 34;

async function cut(n) {
  const file = `public/img/piece-${n}.webp`;
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  const dist = (i) => 255 - Math.min(data[i], data[i + 1], data[i + 2]);

  // Flood the ground from every border pixel. An explicit stack, not recursion:
  // this runs over a million pixels and would blow the call stack.
  const seen = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x += 1) {
    stack.push(x, (H - 1) * W + x);
  }
  for (let y = 0; y < H; y += 1) {
    stack.push(y * W, y * W + W - 1);
  }

  let cleared = 0;
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;

    const i = p * 4;
    const d = dist(i);
    if (d > FEATHER) continue;

    // Within tolerance it is ground; between tolerance and feather it is the
    // lace's anti-aliased edge, which keeps a proportional amount of alpha.
    data[i + 3] = d <= TOLERANCE ? 0 : Math.round(((d - TOLERANCE) / (FEATHER - TOLERANCE)) * 255);
    cleared += 1;

    const x = p % W;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (p >= W) stack.push(p - W);
    if (p < W * (H - 1)) stack.push(p + W);
  }

  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 86, alphaQuality: 92 })
    .toFile(file);

  const pct = ((cleared / (W * H)) * 100).toFixed(1);
  console.log(`piece-${n}`, `${W}x${H}`, `ground removed: ${pct}%`, (fs.statSync(file).size / 1024).toFixed(0) + 'kb');
}

Promise.all(PIECES.map(cut)).catch((e) => {
  console.error(e);
  process.exit(1);
});
