"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { getBlogPosts, BlogPost } from "@/lib/blog";

// Animation Variants
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60 
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts.slice(0, 3)); // Get only the first 3 posts for home page
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setBlogLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-sans font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Insights & Resources
        </motion.h2>
        {blogLoading ? (
          <div className="text-center py-12">
            <div className="text-lg font-mono text-gray-600">Loading latest posts...</div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-sans font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 font-mono">Check back soon for new content!</p>
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={fadeInUp}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-full"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs font-mono">
                          {post.category}
                        </Badge>
                        <span className="text-sm font-mono text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-sans group-hover:text-amber-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 font-mono mt-2">
                        <BookOpen className="w-4 h-4" />
                        {post.readTime}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96]
            }
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link href="/blog">
            <Button variant="outline" size="lg" className="font-mono">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}