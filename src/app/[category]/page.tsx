'use client';

import { use } from 'react';
import { posts } from '@/lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = resolvedParams.category as 'cooking' | 'cars' | 'coding';
  
  if (!['cooking', 'cars', 'coding'].includes(category)) {
    notFound();
  }

  const categoryPosts = posts.filter(post => post.category === category);
  
  const categoryTitles = {
    cooking: '요리의 예술',
    cars: '스피드 & 엔진',
    coding: '코드의 세계'
  };

  return (
    <div className="container">
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`${styles.title} gradient-text`}>{categoryTitles[category]}</h1>
        <p className={styles.desc}>최신 이야기들을 만나보세요.</p>
      </motion.div>

      <div className={styles.grid}>
        {categoryPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link href={`/${category}/${post.id}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} className={styles.image} />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <span className={styles.readMore}>자세히 보기 →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
