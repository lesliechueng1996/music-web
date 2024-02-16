import { getCurrentManagerAvatar } from '@/services/manager-service';
import Link from 'next/link';
import UserAction from './UserAction';

const Navbar = async () => {
  const avatar = await getCurrentManagerAvatar();

  return (
    <div className="bg-background border-b-[1px] shadow h-14 flex items-center justify-between px-5">
      <Link href="/" className="font-bold text-xl">
        Leslie Music
      </Link>
      <div className="flex items-center">
        {avatar ? <UserAction imageUrl={avatar.image} fallback={avatar.fallback} /> : null}
      </div>
    </div>
  );
};

export default Navbar;
