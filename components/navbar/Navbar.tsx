import NavSearch from './NavSearch';
import LinksDropdown from './LinksDropdown';
import DarkMode from './DarkMode';
import Logo from './Logo';

function Navbar() {
  return (
    <nav className='border-b mb-4'>
      <div className='container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-1 py-8'>
        <Logo />
        <NavSearch className='flex-grow-0' />
        <div className='flex gap-4 items-center'>
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
