export const PATH_MAPPING: Record<string, { label: string; queryKey?: string }> = {
  '/users': { label: 'Employees' },
  '/users/:id': { label: 'User Details', queryKey: 'user' },
  '/users/:id/skills': { label: 'Skills' },
  '/users/:id/languages': { label: 'Languages' },
  '/skills': { label: 'Skills' },
  '/languages': { label: 'Languages' },
  '/cvs': { label: 'CVs' },
};
