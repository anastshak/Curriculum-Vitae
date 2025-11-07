export const PATH_MAPPING: Record<string, { label: string; queryKey?: string }> = {
  '/users': { label: 'navigation.employees' },

  '/users/:id': { label: 'User Details', queryKey: 'user' },
  '/users/:id/skills': { label: 'navigation.skills' },
  '/users/:id/languages': { label: 'navigation.languages' },
  '/users/:id/cvs': { label: 'navigation.cvs' },

  '/skills': { label: 'navigation.skills' },
  '/languages': { label: 'navigation.languages' },

  '/cvs': { label: 'navigation.cvs' },
  '/cvs/:id': { label: 'CV Details', queryKey: 'cv' },
  '/cvs/:id/details': { label: 'navigation.cvDetails' },
  '/cvs/:id/preview': { label: 'navigation.cvPreview' },

  '/settings': { label: 'navigation.settings' },
};
