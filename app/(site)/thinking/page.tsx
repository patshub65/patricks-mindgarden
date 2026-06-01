import ClusterHeader from "@/components/server/cluster-header"

interface ThinkTile {
  variant: '' | 'variant-quote' | 'variant-coral' | 'variant-pencil' | 'variant-butter'
  date: string
  title: React.ReactNode
  body: string
  tag: string
}

const TILES: ThinkTile[] = [
  {
    variant: '',
    date: 'Feb 2026',
    title: <>On making things that <em>don&apos;t explain themselves</em>.</>,
    body: "There’s a kind of object that resists interpretation. A building with no plaque. A record with no liner notes. I keep returning to the idea that the most honest work withholds the key.",
    tag: 'essay · 8 min',
  },
  {
    variant: 'variant-quote',
    date: 'Jan 2026',
    title: <>&ldquo;The map is not the territory, but sometimes the map <em>is the thing.</em>&rdquo;</>,
    body: 'A note from a long walk around Neukölln, and the argument that followed.',
    tag: 'notebook · 2 min',
  },
  {
    variant: '',
    date: 'Dec 2025',
    title: <>Why I still prefer <em>physical process</em> for digital work.</>,
    body: "Pen, tracing paper, a scanner. The friction isn't inefficiency — it's where the decisions actually happen. I've tried to cut this step out three times and always regret it.",
    tag: 'process · 5 min',
  },
  {
    variant: 'variant-coral',
    date: 'Nov 2025',
    title: <><em>Attention</em> as a design material.</>,
    body: 'What if we budgeted attention the same way we budget time in a project brief? A short provocation from a workshop in Porto.',
    tag: 'provocation · 3 min',
  },
  {
    variant: 'variant-pencil',
    date: 'Oct 2025',
    title: <>Notes toward a theory of the <em>useful archive</em>.</>,
    body: 'Half-finished. I keep adding to this. The central question: does storing a thing preserve it, or just postpone the loss?',
    tag: 'draft · unfinished',
  },
  {
    variant: 'variant-butter',
    date: 'Sep 2025',
    title: <>On Berlin light in <em>October</em>.</>,
    body: 'Not a metaphor. A description. The specific quality of flat northern afternoon light and why it keeps ending up in my work.',
    tag: 'short · 2 min',
  },
]

export default function Thinking() {
  return (
    <main className="subpage-bg">
      <ClusterHeader
        eyebrow="Cluster · 03 of 03"
        title={<>Things I&apos;ve <em>written</em>.</>}
        sub="Long essays, short notes, overheard lines. Placeholders for now — I write slowly on purpose."
      />
      <div className="thinking-grid">
        {TILES.map((tile, i) => (
          <article key={i} className={`think-tile ${tile.variant}`}>
            <div className="date">{tile.date}</div>
            <h3>{tile.title}</h3>
            <p>{tile.body}</p>
            <div className="tag">{tile.tag}</div>
          </article>
        ))}
      </div>
    </main>
  )
}
