// Replace null values when the corresponding profile details and assets are ready.
export const profile = {
  role: null as string | null,
  university: null as string | null,
  resumeUrl: '/A.%20Sun.pdf' as string | null,
  artworkUrl: null as string | null,
  alternateArtworkUrl: null as string | null,
  historyArtworkUrl: null as string | null,
  socials: [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/actiumsolar/",
    },
    {
      name: "Roblox",
      icon: "roblox",
      url: "https://www.roblox.com/users/358760590/profile",
    },
    { name: "GitHub", icon: "github", url: "https://github.com/Nixelationz" },
  ],
};

export const projects = [
  {
    title: 'EToH Tower Completion Stats (RollrCoast)',
    date: '2022-11-30',
    dateLabel: 'Nov 30, 2022',
    description: 'Gathered data from 300+ towers on “Eternal Towers of Hell”',
    art: 'tower-art',
    imageUrl: '/toas.png',
    imageAlt: 'Tower of Angled Scenery in Eternal Towers of Hell',
    imageCaption: 'TOWER OF ANGLED SCENERY',
    imageCaptionLink: 'TOAS',
    imageCaptionUrl: 'https://jtoh.fandom.com/wiki/Tower_of_Angled_Scenery',
    wip: false,
    url: 'https://www.kaggle.com/datasets/nicholasnull/etoh-tower-completion-stats-rollrcoast',
  },
  {
    title: 'Pangram-a-Mania',
    date: '2026-08-19',
    dateLabel: 'Aug 19, 2026',
    description: 'Make a pangram. BUT THERE’S GAMEMODES!',
    art: 'pangram-art',
    imageUrl: null as string | null,
    imageAlt: null as string | null,
    imageCaption: null as string | null,
    imageCaptionLink: null as string | null,
    imageCaptionUrl: null as string | null,
    wip: true,
    url: 'https://pangram.alexsun.xyz/',
  },
]
