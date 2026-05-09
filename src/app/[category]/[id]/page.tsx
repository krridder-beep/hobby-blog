'use client';

import { use, useState, useEffect } from 'react';
import { posts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import styles from './page.module.css';

export default function PostPage({ params }: { params: Promise<{ category: string, id: string }> }) {
  const resolvedParams = use(params);
  const post = posts.find(p => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mock Comments State
  const [comments, setComments] = useState([
    { id: 1, author: 'HobbyMaster', text: '정말 유익한 글이네요! 잘 읽었습니다.', date: '2026-05-09' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  // Check mock login state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('mockUser');
      if (user) setIsLoggedIn(true);
    }
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: '로그인유저',
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <>
      <div className={styles.hero}>
        <motion.img 
          src={post.image} 
          alt={post.title} 
          className={styles.heroImage}
          style={{ y }}
        />
        <motion.div className={styles.heroContent} style={{ opacity }}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.date}</span>
            <span>By {post.author}</span>
          </div>
        </motion.div>
      </div>

      <div className="container">
        <motion.article 
          className={styles.article}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.article>

        {/* Comments Section */}
        <div className={styles.commentsSection}>
          <h3 className={styles.commentsTitle}>댓글 ({comments.length})</h3>
          
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <textarea 
              className={styles.commentInput} 
              placeholder={isLoggedIn ? "자유롭게 의견을 남겨주세요." : "로그인 후 댓글을 작성할 수 있습니다."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!isLoggedIn}
            />
            <button type="submit" className={styles.submitBtn} disabled={!isLoggedIn}>
              댓글 작성
            </button>
          </form>

          <div className={styles.commentList}>
            {comments.map((comment) => (
              <motion.div 
                key={comment.id} 
                className={styles.comment}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <span>{comment.date}</span>
                </div>
                <p>{comment.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
