import i18n from '@shared/config/i18next';

export const PATH_MAPPING: Record<string, { label: string; queryKey?: string }> = {
  '/users': { label: i18n.t('navigation.employees') },
  '/users/:id': { label: 'User Details', queryKey: 'user' },
  '/users/:id/skills': { label: i18n.t('navigation.skills') },
  '/users/:id/languages': { label: i18n.t('navigation.languages') },
  '/users/:id/cvs': { label: i18n.t('navigation.cvs') },
  '/skills': { label: i18n.t('navigation.skills') },
  '/languages': { label: i18n.t('navigation.languages') },
  '/cvs': { label: i18n.t('navigation.cvs') },
};
