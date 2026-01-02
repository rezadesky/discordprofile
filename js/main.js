document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  if (!music) return;

  music.volume = 0.3;
  music.preload = "none";

  let hasPlayed = false;

  const tryPlay = () => {
    if (hasPlayed) return;

    music.play()
      .then(() => {
        hasPlayed = true;
        removeUserEvents();
      })
      .catch(() => {
        // autoplay diblokir → tunggu interaksi user
      });
  };

  const removeUserEvents = () => {
    document.removeEventListener("click", tryPlay);
    document.removeEventListener("touchstart", tryPlay);
  };

  /* coba autoplay sekali */
  tryPlay();

  /* fallback untuk desktop & mobile */
  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("touchstart", tryPlay, { once: true });

  /* pause saat tab tidak aktif (hemat baterai mobile) */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      music.pause();
    } else if (hasPlayed) {
      music.play().catch(() => {});
    }
  });
});
