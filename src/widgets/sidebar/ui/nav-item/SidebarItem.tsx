import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import * as Styled from './SidebarItem.styles';

type SidebarItemProps = {
  IconComponent?: FC;
  name: string;
  to: string;
};

export const SidebarItem = ({ IconComponent, name, to }: SidebarItemProps) => {
  const { t } = useTranslation();

  return (
    <Styled.NavItem to={to}>
      {IconComponent && <IconComponent />}
      <span>{t(name)}</span>
    </Styled.NavItem>
  );
};
