import type { Metadata } from "next"
import LegalPage from "@/components/server/legal-page"

export const metadata: Metadata = {
  title: "Impressum — Patrick Caire",
  robots: { index: false, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Patrick Caire
        <br />
        Schwedenstr. 3A
        <br />
        13357 Berlin
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:patrick.caire@gmail.com">patrick.caire@gmail.com</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Patrick Caire
        <br />
        Schwedenstr. 3A
        <br />
        13357 Berlin
        <br />
        Deutschland
      </p>

      <h2>Art des Angebots</h2>
      <p>
        Diese Website ist ein persönliches, nicht-kommerzielles Portfolio. Es
        werden keine Waren oder Dienstleistungen über diese Seite angeboten oder
        verkauft.
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte
        oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
        zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen
        nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
        diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
        konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender
        Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website verweist auf externe Plattformen (u.&nbsp;a. LinkedIn,
        SoundCloud, YouTube, GitHub). Auf deren Inhalte habe ich keinen Einfluss.
        Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
        oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
        Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft;
        rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne
        konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
        Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend
        entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch mich erstellten Inhalte und Werke auf diesen Seiten
        (Texte, Gestaltung, Bilder, Musik und Code) unterliegen dem deutschen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner
        schriftlichen Zustimmung. Downloads und Kopien dieser Seite sind nur für
        den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte
        auf dieser Seite nicht von mir erstellt wurden, werden die Urheberrechte
        Dritter beachtet und als solche gekennzeichnet. Sollten Sie dennoch auf
        eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen
        entsprechenden Hinweis.
      </p>

      <h2>Datenschutz</h2>
      <p>
        Informationen zur Verarbeitung personenbezogener Daten finden Sie in der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <p className="legal-meta">Stand: September 2026</p>
    </LegalPage>
  )
}
