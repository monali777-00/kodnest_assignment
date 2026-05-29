'use client';

import React, { useState }
from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export default function Navbar({ activeTab, onChangeTab }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    onChangeTab(tab);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer} onClick={() => handleTabClick('internships')}>
          <svg
            className={styles.logoIcon}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <div className={styles.logoText}>
            intern<span className={styles.logoHighlight}>shala</span>
          </div>
        </div>

        <nav className={menuOpen ? styles.showMenu : ''}>
          <ul className={styles.navLinks}>
            <li
              className={`${styles.navItem} ${activeTab === 'internships' ? styles.activeNavItem : ''}`}
              onClick={() => handleTabClick('internships')}
            >
              Internships
            </li>
            <li
              className={`${styles.navItem} ${activeTab === 'jobs' ? styles.activeNavItem : ''}`}
              onClick={() => handleTabClick('jobs')}
            >
              Jobs
            </li>
            <li
              className={`${styles.navItem} ${activeTab === 'post-resume' ? styles.activeNavItem : ''}`}
              onClick={() => handleTabClick('post-resume')}
            >
              Post Resume
            </li>
            <li
              className={`${styles.navItem} ${activeTab === 'courses' ? styles.activeNavItem : ''}`}
              onClick={() => handleTabClick('courses')}
            >
              Courses
            </li>
          </ul>
          <div className={styles.mobileCta}>
            <button className={styles.loginBtn}>Login</button>
            <button className={styles.registerBtn}>Register</button>
          </div>
        </nav>

        <div className={styles.ctaContainer}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.registerBtn}>Register</button>
        </div>

        <button className={styles.hamburger} 
        aria-label="Toggle Menu"
        onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
