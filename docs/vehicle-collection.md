# Vehicle collection and model pages

## Central content and future additions

Edit `src/data/vehicleCollection.ts`: each model has a stable `id`, new URL `slug`, editable bilingual `name`, `imageAlt`, `headline`, `description`, and `shortDescription`. Both views read this same record. All 72 supplied copy fields were copied exactly. Keep IDs and slugs stable when correcting names. Original image mappings remain unchanged; campaign copy does not establish specifications or availability.

Add approved future content to the reusable template `src/pages/VehicleModel.tsx`, after its introductory article. Use ordinary components under `src/components/vehicles/` and extend the typed data as needed. No empty sections or speculative features are rendered.

To add a model, append a record with a unique ID and URL-safe slug to its brand's `models` array. Include all bilingual fields, an image path, and `isMock: false` for approved content. Keep at least one model per brand. Routes are generated from the data.

Public image paths begin with `/images/` (without `public`). Update `image` or the brand's `logo` after adding files. Null/empty or failed images use the local fallback. Images and logos preserve proportions with object-contain; no image artwork was modified.

## Navigation

`src/lib/vehicleNavigation.ts` resolves model URLs and builds links. Collection selection uses stable IDs in `?brand=...&model=...`, updating the current history entry through React Router. Opening a model creates a new history entry. Browser Back and the model page's return link restore selection; the return link also includes `#vehicle-collection`. The landing page waits for its preloader before scrolling to that anchor.

The collection's Explore [brand] link displays the selected make. JAECOO J7, J5, and all OMODA models open the JAECOO J8 page at `/models/jaecoo/j8`; other models open their own page. These destinations are defined in `explorePath`, while `modelPath` retains each model's individual URL. The model-page enquiry link uses the existing `/#contact` flow. No new submission or prefill mechanism was added. Locale remains in the existing provider/storage. Model pages have localized document titles, restored on departure.

## URLs

| Current display name | Path |
| --- | --- |
| JAECOO J8 | `/models/jaecoo/j8` |
| JAECOO J7 | `/models/jaecoo/j7` |
| JAECOO J5 | `/models/jaecoo/j5` |
| OMODA C7 | `/models/omoda/c7` |
| OMODA C5 | `/models/omoda/c5` |
| ICAUR V27 | `/models/icaur/v27` |
| ICAUR O3 | `/models/icaur/o3` |
| HONGQI SH5 | `/models/hongqi/sh5` |
| HONGQI SH6 | `/models/hongqi/sh6` |
| DONGFENG 007 | `/models/dongfeng/007` |
| DONGFENG AX7 Mach | `/models/dongfeng/ax7-mach` |
| DONGFENG SHINE | `/models/dongfeng/shine` |
| DONGFENG HUGE | `/models/dongfeng/huge` |
| DONGFENG FORTHING T5 EVO | `/models/dongfeng/forthing-t5-evo` |
| ZNA Z9 | `/models/dongfeng/zna-z9` |
| MHEOR H1 | `/models/mhero/h1` |
| MHERO H2 | `/models/mhero/h2` |

No pre-existing model slugs were present. New slugs use the suffix of each original stable ID.

## Naming confirmations needed

- `hongqi-sh5`: current name SH5; supplied reference reports HS5 on the white SUV plate. Image remains `/images/honqi-sh5/hs5.png`.
- `hongqi-sh6`: current name SH6; supplied reference reports H5 on the turquoise sedan plate; folder says HS6. Image remains `/images/HONGQI-HS6/H6.png`.
- `icaur-o3`: current display uses letter O in O3; folder uses V03 with zero. Image remains `/images/ICAURV03/desert-water.png`.

These discrepancies do not establish model identity. No IDs, names, or images were silently changed or merged.

## Hosting and checks

The new `vercel.json` rewrites only `/models/:path*` to `/index.html` for BrowserRouter direct visits and refreshes. Other hosting routes are untouched. See [Vercel's Vite deep-link guidance](https://vercel.com/docs/frameworks/frontend/vite). Invalid model URLs show the existing client-side not-found page; rewritten HTML itself returns status 200.

Passed: production build; both TypeScript checks; changed-file lint; 21 tests covering all 12 ID/image/headline mappings, bilingual rendering, links, titles, invalid routes, history, selection, keyboard navigation and asset fallback. An independent audit verified all 72 localized copy fields against the attachment and all 12 assets exist. All 12 production-preview routes returned the app shell for direct and repeated HTTP requests.

Full lint retains four existing errors in `SplitTextReveal.tsx`, `ui/command.tsx`, `ui/textarea.tsx`, and `tailwind.config.ts`. Existing build warnings concern Browserslist age, a navbar easing utility and bundle size. No browser is connected, so mobile/Arabic visual wrapping, browser console, and deployed Vercel refresh behavior remain unverified. Shared navbar animation is excluded from focused route tests. Nothing was deployed.
