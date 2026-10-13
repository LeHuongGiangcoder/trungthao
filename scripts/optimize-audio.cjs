/* The invitation's music. art/audio.mp4 -> public/audio.m4a.

   The source is a 20.8s *video* file — h264 alongside the AAC — of which the
   page plays only the sound, so nearly all of its 1.7MB is a picture no one
   ever sees. This drops the video stream and takes the first 15 seconds.

   The clip loops, so the seam matters more than the ends: it fades up over
   the first moment and down over the last, which turns what would be an
   audible click into a breath.
   Part of `npm run assets`. */
const { execFileSync } = require('child_process');
const fs = require('fs');

const SRC = 'art/audio.mp4';
const OUT = 'public/audio.m4a';

const SECONDS = 15;
const FADE_IN = 0.4;
const FADE_OUT = 1.2;

function run() {
  if (!fs.existsSync(SRC)) throw new Error(`${SRC} is missing`);

  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-i', SRC,
      '-t', String(SECONDS),
      '-vn', // the video stream is the point of this script
      '-af', `afade=t=in:st=0:d=${FADE_IN},afade=t=out:st=${SECONDS - FADE_OUT}:d=${FADE_OUT}`,
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      OUT,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );

  const probe = execFileSync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-show_entries', 'stream=codec_type',
    '-of', 'default=nw=1:nk=1',
    OUT,
  ]).toString().trim().split('\n');

  console.log(
    'audio'.padEnd(20),
    probe.filter((l) => !/^[\d.]+$/.test(l)).join('+') || 'audio',
    probe.find((l) => /^[\d.]+$/.test(l)) + 's',
    (fs.statSync(OUT).size / 1024).toFixed(0) + 'kb',
  );
}

try {
  run();
} catch (e) {
  console.error(e.stderr ? e.stderr.toString() : e);
  process.exit(1);
}
