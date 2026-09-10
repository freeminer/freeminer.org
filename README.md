https://freeminer.org/ website.

```
sudo apt install -y python3-flask python3-cssmin
```

Homepage media is configured in `media.json`. Restart the Flask process after
editing it. No YouTube API key is needed.

- `videos`: ordered objects with a YouTube `id` (the 11-character value after
  `watch?v=`) and a `title`. The initial selection comes from
  https://www.youtube.com/@freeminer7878. Add or remove entries to curate the
  gallery. “Random video” chooses from this list, excluding the current video;
  it does not automatically fetch new channel uploads. An empty list leaves the
  channel link available.
- `images`: ordered objects with `src`, descriptive `alt`, and `caption`.
  Store screenshots under `static/img/screenshots/`, for example:

  ```json
  {"src": "/static/img/screenshots/mountains.webp", "alt": "Snowy voxel mountains above a forest", "caption": "A view from the mountaintop"}
  ```

  Leave `images` empty to show the designed placeholder. The notebook screen and
  the image beside Unique features each pick a random library image on every
  page request. An empty library keeps the original artwork in both places.
  In the gallery, one image is shown
  without controls; multiple images enable Previous/Next with wraparound.
  Images do not rotate automatically. With JavaScript disabled all images remain
  visible and videos link directly to YouTube. Thumbnails load lazily; YouTube
  players are created only after selection and request muted autoplay with the
  playback controls hidden. YouTube may still show temporary interaction overlays.
  Keyboard controls remain enabled (K for play/pause, M for mute/unmute), and the
  Watch on YouTube link provides access to the full player.
