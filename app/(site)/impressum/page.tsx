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
        [Schwedenstr. 3A]
        <br />
        [13357 Berlin]
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
        Anschrift wie oben
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte
        oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Dieses Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
        ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
        solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und
        jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
        der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>
    </LegalPage>
  )
}
