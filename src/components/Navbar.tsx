'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Utensils, Car, Code, LogIn, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('mockUser');
      if (user) setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem('mockUser');
      setIsLoggedIn(false);
      window.location.reload();
    } else {
      localStorage.setItem('mockUser', 'true');
      setIsLoggedIn(true);
      window.location.reload();
    }
  };

  const navItems = [
    { name: '요리', path: '/cooking', icon: <Utensils size={18} /> },
    { name: '자동차', path: '/cars', icon: <Car size={18} /> },
    { name: '코딩', path: '/coding', icon: <Code size={18} /> },
  ];

  return (
    <motion.nav 
      className={`glass-panel ${styles.navbar}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className="gradient-text">HobbyVerse</span>
        </Link>
        
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className={`${styles.navItem} ${pathname.startsWith(item.path) ? styles.active : ''}`}>
                {item.icon}
                <span>{item.name}</span>
                {pathname.startsWith(item.path) && (
                  <motion.div className={styles.activeIndicator} layoutId="navIndicator" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.authActions}>
          <button className={styles.loginBtn} onClick={handleAuth}>
            {isLoggedIn ? <><LogOut size={18} /><span>로그아웃</span></> : <><LogIn size={18} /><span>로그인</span></>}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
