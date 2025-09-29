import { ContactPageOutlined, Group, Translate, TrendingUp } from '@mui/icons-material';

import { ROUTES } from '@shared/consts/routes';

export const sidebarLinks = [
  {
    IconComponent: Group,
    name: 'employees',
    to: ROUTES.USER.ROOT,
  },
  {
    IconComponent: TrendingUp,
    name: 'skills',
    to: ROUTES.SKILLS,
  },
  {
    IconComponent: Translate,
    name: 'languages',
    to: ROUTES.LANGUAGES,
  },
  {
    IconComponent: ContactPageOutlined,
    name: 'cvs',
    to: ROUTES.CVS,
  },
];
