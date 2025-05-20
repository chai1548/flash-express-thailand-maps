
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">Flash</span>
              <span className="text-flash-secondary">Express</span>
            </h3>
            <p className="text-gray-300 text-sm">
              Your reliable delivery partner in Thailand. Fast, secure, and efficient delivery services.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="#" 
                  className="hover:text-flash-secondary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-flash-secondary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/track");
                  }}
                >
                  Track Package
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-flash-secondary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/scan");
                  }}
                >
                  Scan QR
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-flash-secondary transition-colors">
                  Standard Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-flash-secondary transition-colors">
                  Express Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-flash-secondary transition-colors">
                  International Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-flash-secondary transition-colors">
                  Business Solutions
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Delivery Street, Bangkok</li>
              <li>Phone: +66 2 123 4567</li>
              <li>Email: support@flashexpress.th</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Flash Express Thailand Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
