import { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { sidebarLinks } from '@widgets/sidebar/consts/nav-links';

import { SidebarItem } from './nav-item/SidebarItem';
import { SidebarProfileItem } from './profile-button/SidebarProfileItem';
import * as Styled from './Sidebar.styles';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const renderItemsLinks = () => {
    return sidebarLinks.map(({ IconComponent, name, to }) => {
      return <SidebarItem key={name} IconComponent={IconComponent} name={name} to={to} />;
    });
  };

  return (
    <Styled.Drawer isCollapsed={collapsed} variant="permanent" anchor="left">
      {/* Nav menu */}
      <Styled.List>{renderItemsLinks()}</Styled.List>

      {/* Spacer */}
      <Styled.SpacerBox sx={{ flexGrow: 1 }} />

      {/* User profile */}
      <SidebarProfileItem isCollapsed={collapsed} />

      {/* Collapsed button */}
      <Styled.Box isCollapsed={collapsed}>
        <IconButton onClick={toggleCollapse}>{collapsed ? <ChevronRight /> : <ChevronLeft />}</IconButton>
      </Styled.Box>
    </Styled.Drawer>
  );
};
