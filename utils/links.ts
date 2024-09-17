type NavLink = {
    href: string;
    label: string;
  };
  
  export const links: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/spots ', label: 'spots' },
    { href: '/explore ', label: 'explore' },
    { href: '/journal ', label: 'journal' },
    { href: '/journal/create ', label: 'create journal' },
    { href: '/admin', label: 'admin' },
    { href: '/profile ', label: 'profile' },
  ];