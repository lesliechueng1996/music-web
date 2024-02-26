import { LayoutDashboard, UserCog, Disc3, Mic2, Music } from 'lucide-react';
import MenuItem from './MenuItem';

const menus = [
  {
    label: '首页',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: '用户管理',
    icon: UserCog,
    href: '/user',
  },
  {
    label: '专辑管理',
    icon: Disc3,
    href: '/album',
  },
  {
    label: '歌手管理',
    icon: Mic2,
    href: '/singer',
  },
  {
    label: '歌曲管理',
    icon: Music,
    href: '/users?target=music',
  },
];

const Sidebar = () => {
  return (
    <div className="w-52 h-full border-r-[1px] shadow pt-2 px-3 space-y-1">
      {menus.map((menu) => (
        <MenuItem key={menu.href} {...menu} icon={<menu.icon className="w-6 h-6" />} />
      ))}
    </div>
  );
};

export default Sidebar;
