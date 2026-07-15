# TinCap OS Design System

Документ фиксирует единый визуальный стандарт TinCap OS. Все новые frontend-модули должны использовать общий Application Shell, design tokens и существующие UI-компоненты.

## Application Shell

- **Sidebar:** единый левый сайдбар `286px`, темный фон `#020617`, логотип TinCap OS, основные разделы и блок AI-помощника.
- **Topbar:** единая верхняя панель с заголовком, подзаголовком, глобальным поиском, уведомлениями и действиями модуля.
- **Рабочая область:** светлый фон `#f8fafc`, внутренние отступы `24px` на desktop и `16px` на небольших экранах.
- **Маршруты:** `/` — Dashboard, `/funnel` — Воронка, `/products` — Каталог, `/products/settings` — Настройки каталога.
- **Запрет:** не создавать второй Sidebar или Topbar внутри отдельных модулей.

## Design Tokens

Источник frontend-токенов: `frontend/lib/design-tokens.ts`.

- **Sidebar:** `#020617`
- **Workspace:** `#f8fafc`
- **Surface:** `#ffffff`
- **Border:** `#e2e8f0`
- **Primary:** `#2563eb`
- **Text:** `#0f172a`
- **Muted text:** `#64748b`

## Typography

- **Font family:** `Inter`, `ui-sans-serif`, `system-ui`, `sans-serif`.
- **Page title:** `24px`, `font-semibold`, tight tracking.
- **Card title:** `16px`, `font-semibold`.
- **Body:** `14px`, normal line height.
- **Meta text:** `12px–14px`, muted color.

## Spacing

- **Page padding:** `24px` desktop, `16px` mobile.
- **Card padding:** `20px`.
- **Control height:** `40–44px`.
- **Grid gap:** `16–24px`.

## Radius And Shadows

- **Small controls:** `8px`.
- **Buttons/inputs:** `12px`.
- **Cards:** `16px`.
- **Large panels:** `20px`.
- **Card shadow:** `0 16px 40px rgba(15,23,42,0.06)`.
- **Panel shadow:** `0 10px 30px rgba(15,23,42,0.08)`.

## Components

- **Buttons:** use `components/ui/button.tsx`; primary buttons are blue, compact, with `rounded-xl`.
- **Cards:** use `components/ui/card.tsx`; white background, slate border, soft shadow.
- **Forms:** inputs/selects are white, `44px` height, slate border, blue focus ring.
- **Badges:** use `components/ui/badge.tsx`; semantic variants only.
- **Modals:** use `components/ui/dialog.tsx`; centered, white surface, consistent borders.
- **Tables:** prefer cards and compact lists; tables are allowed only for dense operational data.

## Icons

- **Sizes:** `16px`, `20px`, `24px`.
- **Default:** all custom SVG icons have `h-5 w-5 shrink-0`.
- **Rule:** icons must never stretch to fill containers.

## Responsiveness

- Desktop uses fixed sidebar and flexible content.
- Below large desktop width, sidebar hides and the topbar shows a compact TinCap mark.
- Content columns collapse into a single flow on smaller screens.
- Avoid horizontal overflow except inside intentional kanban lanes.

## Visual References

These screenshots are the baseline visual checkpoints for future frontend work:

- `docs/screenshots/dashboard.png`
- `docs/screenshots/funnel.png`
- `docs/screenshots/products.png`
- `docs/screenshots/products-settings.png`

Future changes must not degrade or arbitrarily replace this visual standard. Any global visual change requires a separate design-system task.

## Adding New Modules

1. Use `AppShell` from `frontend/components/layout/app-shell.tsx`.
2. Reuse the existing `SalesSidebar`; do not create a module-specific sidebar.
3. Put module actions into the shared topbar.
4. Use shared UI components before introducing local styles.
5. Add new colors or large visual changes only through a design-system update.
