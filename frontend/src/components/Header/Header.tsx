import React, { useState } from 'react';
import { FiMenu, FiX, FiPackage, FiHome, FiSettings, FiBarChart2, FiLogOut, FiUser } from 'react-icons/fi';
import './Header.css';

interface HeaderProps {
  onViewChange: (view: 'grid' | 'tile') => void;
  currentView: 'grid' | 'tile';
  onLogout: () => void;
  userName?: string;
  userRole?: string;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, currentView, onLogout, userName, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard', submenu: ['Overview', 'Analytics'] },
    { icon: <FiPackage />, label: 'Shipments', submenu: ['All Shipments', 'Pending', 'In Transit', 'Delivered'] },
    { icon: <FiBarChart2 />, label: 'Reports', submenu: ['Monthly', 'Quarterly', 'Annual'] },
    { icon: <FiSettings />, label: 'Settings', submenu: ['Profile', 'Preferences', 'Notifications'] },
  ];

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="menu-toggle" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <div className="logo">
              <FiPackage size={28} />
              <span className="logo-text">TMS Pro</span>
            </div>
          </div>

          <nav className="header-nav">
            <div className="user-info">
              <FiUser />
              <span>{userName}</span>
              {userRole && <span className="user-role">{userRole}</span>}
            </div>
            <button 
              className={`nav-item ${currentView === 'grid' ? 'active' : ''}`}
              onClick={() => onViewChange('grid')}
            >
              Grid View
            </button>
            <button 
              className={`nav-item ${currentView === 'tile' ? 'active' : ''}`}
              onClick={() => onViewChange('tile')}
            >
              Tile View
            </button>
            <button className="logout-btn" onClick={onLogout}>
              <FiLogOut />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}>
          <div className="menu-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h2>Menu</h2>
              <button className="close-menu" onClick={toggleMenu}>
                <FiX size={24} />
              </button>
            </div>
            <nav className="menu-nav">
              {menuItems.map((item, index) => (
                <div key={index} className="menu-item-group">
                  <div className="menu-item">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.submenu && (
                    <div className="submenu">
                      {item.submenu.map((subitem, subindex) => (
                        <div key={subindex} className="submenu-item">
                          {subitem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
