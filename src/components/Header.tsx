
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Zap, LogOut, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isAuthenticatedRoute = location.pathname !== '/' && location.pathname !== '/auth';

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg group-hover:shadow-lg transition-all duration-200">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              TaxGenie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && isAuthenticatedRoute ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    location.pathname === '/dashboard' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/calculator" 
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    location.pathname === '/calculator' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
                  }`}
                >
                  Calculator
                </Link>
                <Link 
                  to="/documents" 
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    location.pathname === '/documents' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
                  }`}
                >
                  Documents
                </Link>
                <Link 
                  to="/investments" 
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    location.pathname === '/investments' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
                  }`}
                >
                  Investments
                </Link>
                <Link 
                  to="/support" 
                  className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                    location.pathname === '/support' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
                  }`}
                >
                  Support
                </Link>
                
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end" forceMount>
                      <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center space-x-2 cursor-pointer text-red-600">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Home
                </Link>
                <Link to="/calculator" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Calculator
                </Link>
                <Link to="/support" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Support
                </Link>
                
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard">
                      <Button variant="outline" className="hover:bg-blue-50">Dashboard</Button>
                    </Link>
                    <Button onClick={handleSignOut} variant="ghost">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/auth">
                      <Button variant="outline" className="hover:bg-blue-50">Login</Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 mt-4 pt-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              {user && isAuthenticatedRoute ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <Link to="/calculator" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Calculator
                  </Link>
                  <Link to="/documents" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Documents
                  </Link>
                  <Link to="/investments" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Investments
                  </Link>
                  <Link to="/support" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Support
                  </Link>
                  <Button onClick={handleSignOut} variant="ghost" className="w-full justify-start text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Home
                  </Link>
                  <Link to="/calculator" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Calculator
                  </Link>
                  <Link to="/support" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Support
                  </Link>
                  
                  {user ? (
                    <>
                      <Link to="/dashboard">
                        <Button variant="outline" className="w-full">Dashboard</Button>
                      </Link>
                      <Button onClick={handleSignOut} variant="ghost" className="w-full">
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link to="/auth">
                        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 w-full">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
