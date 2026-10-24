// Replace null values when the corresponding profile details and assets are ready.
export const profile = {
  role: null as string | null,
  university: null as string | null,
  resumeUrl: null as string | null,
  artworkUrl: null as string | null,
  alternateArtworkUrl: null as string | null,
  historyArtworkUrl: null as string | null,
  socials: [
    { name: 'linkedin', icon: 'linkedin', url: 'https://www.linkedin.com/in/actiumsolar/' },
    { name: 'roblox', icon: 'roblox', url: null },
    { name: 'github', icon: 'github', url: null },
  ],
}

export const projects = [
  {
    title: 'EToH Tower Completion Stats (RollrCoast)',
    date: '2022-11-30',
    dateLabel: 'Nov 30, 2022',
    description: 'Gathered data from 300+ towers on “Eternal Towers of Hell”',
    art: 'tower-art',
    imageUrl: null as string | null,
    wip: false,
    url: null as string | null,
  },
  {
    title: 'Pangram-a-Mania',
    date: '2026-08-19',
    dateLabel: 'Aug 19, 2026',
    description: 'Make a pangram. BUT THERE’S GAMEMODES!',
    art: 'pangram-art',
    imageUrl: null as string | null,
    wip: true,
    url: null as string | null,
  },
]
