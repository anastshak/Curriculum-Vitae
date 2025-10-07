import { FC } from 'react';

export type SidebarItemProps = {
  IconComponent?: FC;
  name: string;
  to: string;
};
