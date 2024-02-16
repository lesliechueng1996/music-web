import { LayoutDashboard, UserCog } from 'lucide-react';
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
