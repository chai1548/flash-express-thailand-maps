
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LogIn, 
  UserPlus, 
  Search, 
  Menu, 
  X, 
  User,
  LogOut 
} from "lucide-react";
import { isLoggedIn, logout, getCurrentUser } from "@/lib/auth";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedIn = isLoggedIn();
  const currentUser = getCurrentUser();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/track?number=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-flash-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-xl font-bold flex items-center cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <span className="text-white mr-1">Flash</span>
            <span className="text-flash-secondary">Express</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Enter tracking number..."
                className="w-full pr-10 bg-white/90 text-flash-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full text-flash-primary"
              >
                <Search size={18} />
              </Button>
            </form>

            {loggedIn ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-flash-light"
                  onClick={() => navigate("/dashboard")}
                >
                  <User size={18} className="mr-1" />
                  {currentUser?.name}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-flash-light"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-flash-light"
                  onClick={() => navigate("/login")}
                >
                  <LogIn size={18} className="mr-1" />
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-flash-secondary hover:bg-flash-secondary/90 text-white border-flash-secondary"
                  onClick={() => navigate("/register")}
                >
                  <UserPlus size={18} className="mr-1" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col space-y-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Enter tracking number..."
                className="w-full pr-10 bg-white/90 text-flash-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full text-flash-primary"
              >
                <Search size={18} />
              </Button>
            </form>

            {loggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-flash-light"
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-flash-light"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-flash-light"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-white hover:text-flash-light"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  <UserPlus size={18} className="mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
