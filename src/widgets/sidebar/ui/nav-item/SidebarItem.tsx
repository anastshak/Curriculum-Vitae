import { useTranslation } from 'react-i18next';

import * as Styled from './SidebarItem.styles';
import { SidebarItemProps } from './SidebarItem.types';

export const SidebarItem = ({ IconComponent, name, to }: SidebarItemProps) => {
  const { t } = useTranslation();

  return (
    <Styled.NavItem to={to}>
      {IconComponent && <IconComponent />}
      <span>{t(name)}</span>
    </Styled.NavItem>
  );
};
