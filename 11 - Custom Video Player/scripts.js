const video = document.querySelector('video');
const play = document.querySelector('button.player__button');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('input[type="range"]');
const progress = document.querySelector('div.progress');
const progressBar = document.querySelector('div.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');
let mousedown = false;

function handleBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handlePlay() {
  const method = video.paused ? 'play' : 'pause';
  handleToggle(method);
  video[method]();
}

function handleToggle(method) {
  if (method === 'pause') {
    toggle.textContent = '►';
  } else if (method === 'play') {
    toggle.textContent = '❚ ❚';
  } else {
    console.error('Handle toggle error');
  }
}

function handleRange() {
  video[this.name] = this.value;
}

function handleScrub(e) {
  const percent = e.offsetX / progress.offsetWidth;
  const scrubTime = percent * video.duration;

  video.currentTime = scrubTime;
}

function handleSkip() {
  video.currentTime += parseInt(this.dataset.skip);
}

play.addEventListener('click', handlePlay);
video.addEventListener('click', handlePlay);
video.addEventListener('timeupdate', handleBar);

progress.addEventListener('click', handleScrub);
progress.addEventListener('mousemove', () => {
  mousedown && handleScrub
});
progress.addEventListener('mousedown', () => {
  mousedown = true
});
progress.addEventListener('mouseup', () => {
  mousedown = false
});

ranges.forEach(range => {
  range.addEventListener('click', handleRange);
  range.addEventListener('mousemove', handleRange);
});

skipButtons.forEach(skipButton => {
  skipButton.addEventListener('click', handleSkip);
});
