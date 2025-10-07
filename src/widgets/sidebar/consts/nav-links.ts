import { ContactPageOutlined, Group, Translate, TrendingUp } from '@mui/icons-material';

import { ROUTES } from '@shared/consts/routes';

export const sidebarLinks = [
  {
    IconComponent: Group,
    name: 'navigation.employees',
    to: ROUTES.USER.ROOT,
  },
  {
    IconComponent: TrendingUp,
    name: 'navigation.skills',
    to: ROUTES.SKILLS,
  },
  {
    IconComponent: Translate,
    name: 'navigation.languages',
    to: ROUTES.LANGUAGES,
  },
  {
    IconComponent: ContactPageOutlined,
    name: 'navigation.cvs',
    to: ROUTES.CVS,
  },
];
