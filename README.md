# SleepOS

SleepOS is a cinematic mattress landing page built with Next.js, React, GSAP,
ScrollTrigger, and Lenis. It includes scroll-driven product storytelling,
layer animations, horizontal catalogue navigation, and an animated Shree Ram
brand mark.

## Student setup instructions

1. Install the **LTS version of Node.js** from [nodejs.org](https://nodejs.org/).
   npm is installed automatically with Node.js.

2. Open a terminal inside the `SleepOS` folder.

3. Install the project packages:

   ```bash
   npm install
   ```

4. Start the website:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

To stop the website, press `Ctrl + C` in the terminal.

If the packages are already installed, students only need to run
`npm run dev` the next time.

## Project structure

```text
app/                 Next.js App Router layout, page, and client runtime
css/                 Global and responsive styles
js/                  GSAP, Lenis, and interaction modules
public/assets/       Videos and optimized WebP images
index.html           Source markup rendered by the Next.js page
next.config.mjs      Next.js configuration
```

## Assets and performance

- Outfit is bundled through `@fontsource-variable/outfit` with weights 100–900.
- All PNG and JPEG assets have been converted to WebP.
- The 96 logo-animation frames are stored in
  `public/assets/logo-animated/logo/`.
- Logo frames use a real alpha channel and retain CSS `screen` blending.
- Logo frames are 320 pixels wide, providing high-density rendering at their
  displayed navbar-like size without shipping the original 950-pixel frames.
- Static assets are served from Next.js `public/assets` URLs.
- Mobile-specific H.264 video crops reduce hero and feature-section decode cost.
- The empty `/layers` and `/collections` routes are ready for future content.

The global heading color can be changed from the
`--title-gold-gradient` variable at the top of `css/style.css`.

## Animation runtime

`app/sleep-os-runtime.jsx` initializes Lenis and the GSAP animation modules on
the client. `js/animationRuntime.js` registers ScrollTrigger and provides the
shared package imports used throughout the animation modules.

The page content remains in `index.html` and is included by `app/page.jsx` at
build time. Animation libraries are bundled through npm.
