"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { Header } from "../components/Header";
import { getBlogPosts, BlogPost } from "@/lib/blog";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-12 flex items-center justify-center">
          <div className="text-lg font-mono text-gray-600">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-gray-900 mb-6">
              Insights & Resources
            </h1>
            <p className="text-xl font-mono text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our latest thoughts on AI automation, industry trends, and practical guides 
              to help transform your business with intelligent solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-sans font-semibold text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600 font-mono">Check back soon for new content!</p>
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.3 }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={fadeInUp}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col">
                      <CardHeader className="flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs font-mono">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-4 text-sm font-mono text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl font-sans group-hover:text-amber-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="font-mono text-gray-600 mt-2 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono text-gray-500">{post.author}</span>
                          <div className="flex items-center font-mono text-amber-600 group-hover:translate-x-1 transition-transform">
                            <span className="text-sm">Read more</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection variant="blog" />

      {/* Footer */}
      <Footer />
    </div>
  );
}