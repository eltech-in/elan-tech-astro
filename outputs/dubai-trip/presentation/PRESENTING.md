# eLan presentations: Dubai and BNI Raipur

Each presentation comes as a video and as an interactive file. Neither depends on the elan-tech.net website.

The two have different looks. Dubai is a night skyline where every service and product is a tower. Raipur is a bento board: bright saffron, magenta and violet tiles that move, resize and change content from scene to scene.

| File | For | When |
|---|---|---|
| `../elan-dubai-presentation.mp4` | Dubai: play on a phone or tablet, send on WhatsApp | 7 Dec noon to 12 Dec noon |
| `../elan-dubai-presentation.html` | Dubai: present live from a laptop | same |
| `../elan-bni-raipur-presentation.mp4` | BNI Conclave, Raipur | 21 Nov |
| `../elan-bni-raipur-presentation.html` | BNI Conclave, live | 21 Nov |

The videos are about 95 seconds, 1920x1080, silent. The HTML file has its fonts, logo and QR code inside it and runs offline in Chrome, Safari or Edge. Copy both to the laptop, a phone and a USB stick.

## Share link (Raipur)

`https://elan-tech.net/bni-raipur/` is a noindex page on the website (not in the sitemap) with the video, a button to the interactive presentation (`/bni-raipur/presentation/`), a "Save our contact" card, WhatsApp and a Share button. It goes live with the next site deploy. Its files are in `public/bni-raipur/` and the page is `src/pages/bni-raipur.astro`.

After changing the Raipur deck, refresh the website copy and video:

```bash
node outputs/dubai-trip/presentation/build.mjs bni-raipur --site
node outputs/dubai-trip/presentation/record.mjs bni-raipur
ffmpeg -y -i outputs/dubai-trip/elan-bni-raipur-presentation.mp4 -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -an public/bni-raipur/elan-bni-raipur-presentation.mp4
```

## How to present (HTML file)

| Key | Does |
|---|---|
| `→` `Space` `PageDown` | Next step (also works with a clicker) |
| `←` `PageUp` | Back |
| `F` | Full screen |
| `A` | Auto-play (about 95 seconds, loops, hands-free) |
| `P` | Presenter mode (about 10 minutes) |
| `C` | Compliance cut, Dubai only (5 minutes: confidentiality and data) |
| `Home` / `End` | First / last scene |

- Raipur shows a control bar at the bottom (back, next, auto-play, full screen). Clicking the board also moves to the next step.
- Click any tower in presenter mode to jump to it (Dubai).
- In auto-play, click or tap once to pause.
- On a phone: swipe left and right, or use the arrows at the bottom.
- Add `?mode=loop` to the address to start in auto-play, for example for a tablet on the stand.

## What the scenes are

**Raipur (bento board, about 100 seconds on auto-play):** Welcome (Hindi line) · Who we are (2002, 24+, 500+, 1,500+, where clients are) · What we do (11 services, then three spotlights) · Products (8 products, one at a time with its screen, technology and live demo) · Technology · Who we help · How to refer us · Contact and QR.

**Dubai:**

1. Welcome (Arabic line for Dubai, Hindi line for Raipur)
2. Who we are: 2002, 24+ years, 500+ clients, 1,500+ projects
3. The journey: five stages, the skyline lights up as you go
4. Five stage scenes: every service and product (tower) with its confirmed technology. Digital Biz ID (digital business card) sits in "Get found".
5. eLan Central CMS: the publish flow, with a mock editor
6. Technology: press a technology and the towers that use it light up
7. Dubai: working with a UAE business, three ways to work together, confidentiality (compliance cut), contact and QR

## Things to check before you use it

- **Arabic line** (Dubai): `نبني الأنظمة الرقمية التي تعتمد عليها أعمالكم` and `يسعدنا لقاؤكم في دبي`. Have a native Arabic speaker read both.
- **Hindi line** (Raipur): `हम आपके व्यवसाय की डिजिटल नींव बनाते हैं` and `आपसे मिलकर खुशी होगी`. Please read both.
- **Demos** are set at the top of the script (`DEMOS`). Real Estate, Medical Conference, Insurance and Digital Biz ID open their live sites. Resort stays "Demo on request" until its demo stops showing a client's name.
- **Mock screens** (Project Management, Central CMS, Digital Biz ID) use invented sample data and say "Sample data". Replace the PMS and CMS ones with redesigned screenshots when you have them.
- **No prices** appear. Everything says "Quoted per project".
- **Internet**: the HTML file needs none. The "Open the live demo" buttons do.

## QR codes

Both QR codes save a contact card (vCard) to the phone: Nishant Barde, eLan Technology, WhatsApp number, both emails, website, and a note of where you met. They need no website and no internet. Test one on your own phone before travelling.

## Making the video again

```bash
node outputs/dubai-trip/presentation/record.mjs dubai
node outputs/dubai-trip/presentation/record.mjs bni-raipur
node outputs/dubai-trip/presentation/record.mjs dubai 8   # 8-second test only
```

It needs Google Chrome and ffmpeg. It steps the deck frame by frame, so it is smooth. Takes about 5 minutes. Do not run two renders of the same deck at once.

## Changing the deck

The Dubai source is `deck.template.html`; the Raipur source is `raipur.template.html`. Both use `visuals.js` and `visuals.css` for the product screens and service visuals, and Raipur also borrows the screen styles from the Dubai template at build time. Do not edit the generated files.

```bash
node outputs/dubai-trip/presentation/build.mjs dubai
node outputs/dubai-trip/presentation/build.mjs bni-raipur
```

Copy, products, services, technology groups and contact details are near the top of each script (`EDIT HERE`). Add `?still` to the address to see every scene in its finished state, for screenshots. Rebuild, then re-record the videos after any change.
