import type { Metadata } from "next"
import LegalPage from "@/components/server/legal-page"

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Patrick Caire",
  robots: { index: false, follow: true },
}

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz­erklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        Patrick Caire
        <br />
      [Schwedenstr. 3A]
        <br />
        [13357 Berlin]
        <br />
        Deutschland
        <br />
        E-Mail:{" "}
        <a href="mailto:patrick.caire@gmail.com">patrick.caire@gmail.com</a>
      </p>

      <h2>2. Überblick</h2>
      <p>
        Diese Website ist ein persönliches Portfolio. Sie verzichtet bewusst auf
        Tracking, Analyse-Dienste und Werbe-Cookies. Es werden nur die Daten
        verarbeitet, die technisch notwendig sind, um die Seite bereitzustellen,
        sowie Daten, die Sie aktiv übermitteln, wenn Sie mich kontaktieren.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel als
        Auftragsverarbeiter technisch notwendige Verbindungsdaten (Server-Logs).
        Die Datenübermittlung in die USA erfolgt auf Grundlage der
        Standardvertragsklauseln der EU-Kommission bzw. des EU-U.S. Data Privacy
        Framework. Rechtsgrundlage ist mein berechtigtes Interesse an einer
        sicheren und effizienten Bereitstellung der Website (Art. 6 Abs. 1 lit. f
        DSGVO).
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Beim Besuch der Website werden automatisch Informationen erfasst, die Ihr
        Browser übermittelt. Dazu gehören:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Geräts</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite / Datei</li>
        <li>verwendeter Browser und Betriebssystem</li>
      </ul>
      <p>
        Diese Daten werden ausschließlich zur Sicherstellung eines störungsfreien
        Betriebs und zur Sicherheit der Website verarbeitet (Art. 6 Abs. 1 lit. f
        DSGVO) und nicht mit anderen Datenquellen zusammengeführt.
      </p>

      <h2>5. Cookies &amp; lokale Speicherung</h2>
      <p>
        Diese Website setzt <strong>keine Tracking- oder Marketing-Cookies</strong>{" "}
        ein. Lediglich ein technisch notwendiger Eintrag im Session-Speicher Ihres
        Browsers wird verwendet, um die einleitende Animation pro Sitzung nur einmal
        abzuspielen. Dieser Eintrag enthält keine personenbezogenen Daten, wird
        nicht an Dritte übermittelt und beim Schließen des Browser-Tabs gelöscht.
        Eine Einwilligung (Cookie-Banner) ist hierfür nicht erforderlich.
      </p>

      <h2>6. Schriftarten</h2>
      <p>
        Die verwendeten Schriftarten (Fraunces, Manrope) werden lokal vom Server
        dieser Website ausgeliefert. Es besteht dabei keine Verbindung zu Servern
        Dritter (z. B. Google Fonts).
      </p>

      <h2>7. Kontaktaufnahme</h2>
      <p>
        Wenn Sie mich per E-Mail kontaktieren, werden Ihre Angaben (Name,
        E-Mail-Adresse, Inhalt der Nachricht) zur Bearbeitung Ihrer Anfrage
        gespeichert. Rechtsgrundlage ist mein berechtigtes Interesse bzw. die
        Anbahnung eines Vertrags-/Beschäftigungsverhältnisses (Art. 6 Abs. 1 lit. f
        bzw. lit. b DSGVO). Die Daten werden gelöscht, sobald sie für die
        Bearbeitung nicht mehr erforderlich sind.
      </p>

      <h2>8. Externe Links</h2>
      <p>
        Diese Website verweist auf externe Plattformen (u. a. LinkedIn, SoundCloud,
        YouTube, GitHub). Beim Anklicken dieser Links gelten die
        Datenschutzbestimmungen der jeweiligen Anbieter. Inhalte dieser Plattformen
        werden erst nach einem Klick und nicht automatisch beim Seitenaufruf
        geladen.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben gegenüber mir folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
        die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
      </p>

      <p className="legal-meta">Stand: Juni 2026</p>
    </LegalPage>
  )
}
