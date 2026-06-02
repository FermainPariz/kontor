# Kontor Business Club

Webseite des **Kontor Business Club** (Münsterland) — exklusiver Unternehmerkreis, ein Vertreter je Branche. Zweisprachig (DE/EN), mit Mitgliedsantrag, Event-Anmeldung und Kontaktformular.

> Slogan: **Empfehlen. Wachsen. Verbinden.**

## Tech-Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** (Design-Tokens in `src/app/globals.css`)
- **next-intl** für DE/EN (`/de`, `/en`, Umschalter im Header)
- **Supabase** (Postgres, EU-Region) für Formular-Daten
- **Resend** für transaktionale E-Mails
- Hosting auf **Vercel**

Die Marke (Farben, Schriften Lora + Source Sans 3, Regeln) ist in der Markenfibel definiert und in den Tokens umgesetzt.

## Lokale Entwicklung

```bash
git clone https://github.com/FermainPariz/kontor.git
cd kontor
npm install
cp .env.example .env.local   # danach Werte eintragen (siehe unten)
npm run dev                  # http://localhost:3000/de
```

Die Seite läuft **auch ohne Keys** (Formulare loggen dann nur und versenden nicht — kein Absturz).

## Konfiguration (`.env.local`)

| Variable | Wofür | Woher |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase-Projekt-URL | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | öffentlicher Anon-Key | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Key (nur serverseitig, geheim) | Supabase → Project Settings → API |
| `RESEND_API_KEY` | Mailversand | Resend → API Keys |
| `KONTOR_INBOX` | Empfänger der Formular-Mails | z.B. `info@kontor-businessclub.de` |

**Niemals** echte Keys committen — `.env.local` ist in `.gitignore`.

## Supabase einrichten

1. Projekt anlegen, **Region: EU (Frankfurt)**.
2. Schema einspielen: `supabase/migrations/0001_init.sql` im Supabase SQL-Editor ausführen (legt `event_registrations`, `applications`, `contact_submissions` mit Row-Level-Security an).
3. Keys (URL, anon, service_role) in `.env.local` und in die Vercel-Env eintragen.

## Resend einrichten

1. Account anlegen, Domain `kontor-businessclub.de` hinzufügen.
2. Die von Resend angezeigten DNS-Einträge (DKIM/SPF/Return-Path) im Domain-DNS setzen, verifizieren. (Hinweis: nur **ein** SPF-Eintrag erlaubt — ggf. mit bestehendem zusammenführen.)
3. `RESEND_API_KEY` in `.env.local` und Vercel-Env eintragen. Versand erfolgt aus `noreply@kontor-businessclub.de`, Empfang im `KONTOR_INBOX`-Postfach.

## Deployment auf Vercel

1. Bei Vercel **„Import Git Repository"** → dieses Repo wählen.
2. Die fünf Env-Variablen (siehe oben) unter Project Settings → Environment Variables eintragen.
3. Deploy. Danach Domain verbinden: `kontor-businessclub.de` als Production-Domain, `kontor-businessclub.com` per Redirect auf `.de`.

Jeder Push auf `main` deployt automatisch neu.

## Wichtige Hinweise

- **Login/Mitgliederbereich** (`/members`) ist aktuell ein **UI-Platzhalter** ohne echte Auth. Der Club ist invite-only: Mitglieder werden über den Vorstand aufgenommen. Echtes Login (Supabase Magic-Link) ist als nächster Schritt vorgesehen.
- **Platzhalter**, die noch ersetzt werden: Logo (aktuell Text-Wortmarke), Münster-Bilder in `public/images` (KI-generiert), Mitglieder-Firmen im Banner, Testimonials, sowie die Texte für **Impressum** und **Datenschutz** (`messages/*.json` → `legal.*`).
- **Telefonnummer** ist in allen Anmelde-/Kontaktformularen Pflichtfeld.
- Texte liegen zentral in `messages/de.json` und `messages/en.json`.

## Struktur (Kurzüberblick)

```
src/app/[locale]/      Seiten (Startseite + Kapitel club/events/mitgliedschaft/kontakt/members + legal)
src/components/        Header, Footer, Nav, Home-Sektionen, Formulare, UI-Baukasten
src/lib/               Supabase-Client, Resend, Formular-Schemas (zod) + Server-Actions
messages/              DE/EN-Texte
supabase/migrations/   DB-Schema
public/images/         Münster-Platzhalterbilder
```
