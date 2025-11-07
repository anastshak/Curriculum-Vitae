export const getMasteryOptions = (t: (key: string) => string) => [
  { id: 'Expert', label: t('skills.masteryLevels.expert') },
  { id: 'Proficient', label: t('skills.masteryLevels.proficient') },
  { id: 'Competent', label: t('skills.masteryLevels.competent') },
  { id: 'Advanced', label: t('skills.masteryLevels.advanced') },
  { id: 'Novice', label: t('skills.masteryLevels.novice') },
];
