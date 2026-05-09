'use client';

import { motion } from 'framer-motion';
import { Utensils, Car, Code } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  const categories = [
    {
      title: '요리의 예술',
      desc: '입맛을 사로잡는 레시피와 플레이팅의 마법',
      icon: <Utensils size={40} color="var(--accent-blue)" />,
      path: '/cooking',
      color: 'rgba(59, 130, 246, 0.1)',
    },
    {
      title: '스피드 & 엔진',
      desc: '도로 위의 열정, 최신 자동차 리뷰와 정비 팁',
      icon: <Car size={40} color="var(--accent-purple)" />,
      path: '/cars',
      color: 'rgba(139, 92, 246, 0.1)',
    },
    {
      title: '코드의 세계',
      desc: '무에서 유를 창조하는 프로그래밍의 매력',
      icon: <Code size={40} color="var(--accent-pink)" />,
      path: '/coding',
      color: 'rgba(236, 72, 153, 0.1)',
    },
  ];

  return (
    <div className="container">
      <section className={styles.heroSection}>
        {/* Animated background blobs */}
        <motion.div 
          className={`${styles.blob} ${styles.blob1}`}
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -50, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={`${styles.blob} ${styles.blob2}`}
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
        />

        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          당신의 열정을 <br />
          <span className="gradient-text">깨우는 시간</span>
        </motion.h1>

        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          요리, 자동차, 코딩. 우리가 사랑하는 취미의 모든 것을 담았습니다.
          지금 바로 탐험을 시작하세요.
        </motion.p>

        <motion.div 
          className={styles.categories}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat, idx) => (
            <Link href={cat.path} key={idx} passHref legacyBehavior>
              <motion.a 
                className={`glass-panel ${styles.categoryCard}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ borderTop: `4px solid ${cat.color.replace('0.1', '1')}` }}
              >
                <div className={styles.iconWrapper} style={{ background: cat.color }}>
                  {cat.icon}
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </motion.a>
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
