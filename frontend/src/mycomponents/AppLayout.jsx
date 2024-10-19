import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Menu,
  X,
  Home,
  ThumbsUp,
  Clock,
  PlaySquare,
  Users,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { logo } from './data';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  const handleSignup = async (e, signupDetails) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful:', data);

      // Redirect or update UI after signup
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  const handleLogin = async (e, loginDetails) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        credentials: 'include', // To include cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      console.log('Login successful:', user);

      // Redirect or update UI after login
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logout successful');
        setIsLoggedIn(false); // Set login state to false
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className='h-screen overflow-hidden bg-[#121212] text-white'>
      <header className='fixed inset-x-0 top-0 z-50 h-16 border-b border-white bg-[#121212] px-4'>
        <nav className='mx-auto flex h-full max-w-7xl items-center'>
          <Button
            variant='ghost'
            size='icon'
            className='mr-2 lg:hidden hover:bg-[#2a2a2a]'
            onClick={toggleSidebar}
          >
            <Menu className='h-6 w-6' />
          </Button>
          <div className='mr-4 w-12 shrink-0 sm:w-16'>{logo}</div>
          <form
            onSubmit={handleSearch}
            className='relative mx-auto hidden w-full max-w-md overflow-hidden sm:block'
          >
            <Input
              type='search'
              placeholder='Search'
              className='w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2' />
          </form>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto sm:hidden'
            onClick={handleSearch}
          >
            <Search className='h-6 w-6' />
          </Button>
          {/* <div className='ml-4 flex items-center gap-2'>
            <Button
              variant='outline'
              className='hidden border-white text-white hover:bg-[#2a2a2a] sm:inline-flex'
              onClick={handleLogin}
            >
              Log in
            </Button>
            <Button
              className='hidden bg-[#ae7aff] text-black hover:bg-[#9d63ff] sm:inline-flex'
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </div> */}
          <div className='ml-4 flex items-center gap-2'>
            {isLoggedIn ? (
              <Button
                variant='outline'
                className='hidden border-white text-white hover:bg-[#2a2a2a] sm:inline-flex'
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <>
                <Button
                  variant='outline'
                  className='hidden border-white text-white hover:bg-[#2a2a2a] sm:inline-flex'
                  onClick={handleLogin}
                >
                  Log in
                </Button>
                <Button
                  className='hidden bg-[#ae7aff] text-black hover:bg-[#9d63ff] sm:inline-flex'
                  onClick={handleSignup}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className='flex h-[calc(100vh-4rem)] pt-16'>
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-[#121212] transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0`}
        >
          <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between p-4 lg:hidden'>
              <div className='w-12'>
                <svg
                  viewBox='0 0 63 64'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  {/* SVG path data */}
                </svg>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={toggleSidebar}
                className='hover:bg-[#2a2a2a]'
              >
                <X className='h-6 w-6' />
              </Button>
            </div>
            <ul className='flex flex-col gap-2 p-4'>
              <SidebarItem
                to='/'
                icon={<Home className='h-5 w-5' />}
                label='Home'
              />
              <SidebarItem
                to='/liked'
                icon={<ThumbsUp className='h-5 w-5' />}
                label='Liked Videos'
              />
              <SidebarItem
                to='/history'
                icon={<Clock className='h-5 w-5' />}
                label='History'
              />
              <SidebarItem
                to='/my-content'
                icon={<PlaySquare className='h-5 w-5' />}
                label='My Content'
              />
              <SidebarItem
                to='/subscribers'
                icon={<Users className='h-5 w-5' />}
                label='Subscribers'
              />
            </ul>
            <div className='mt-auto p-4'>
              <SidebarItem
                to='/support'
                icon={<HelpCircle className='h-5 w-5' />}
                label='Support'
              />
              <SidebarItem
                to='/settings'
                icon={<Settings className='h-5 w-5' />}
                label='Settings'
              />
            </div>
          </div>
        </aside>
        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link to={to}>
        <Button
          variant='ghost'
          className={`w-full justify-start px-2 py-2 text-left ${
            isActive ? 'bg-white/10' : 'hover:bg-white/10'
          }`}
        >
          <span className='mr-3 inline-block'>{icon}</span>
          <span>{label}</span>
        </Button>
      </Link>
    </li>
  );
};

export default AppLayout;
