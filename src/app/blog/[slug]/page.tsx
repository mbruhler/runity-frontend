"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { Header } from "../../components/Header";
import { getBlogPost, BlogPost } from "@/lib/blog";
import { Footer } from "@/app/components/Footer";
import { CTASection } from "@/app/components/CTASection";
import { useTranslation } from "@/contexts/LanguageContext";
import { useUmami } from "@/contexts/UmamiContext";

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const slug = params.slug as string;
  const { t, language } = useTranslation();
  const { track } = useUmami();

  useEffect(() => {
    async function fetchPost() {
      try {
        const blogPost = await getBlogPost(slug, language);
        if (blogPost) {
          setPost(blogPost);
          // Track blog post view
          track('Blog Post View', {
            post_title: blogPost.title,
            post_slug: blogPost.slug,
            post_category: blogPost.category,
            author: blogPost.author,
            language: language,
            read_time: blogPost.readTime
          });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug, language, track]);

  const handleShare = () => {
    if (post) {
      const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;
      track('Blog Post Share', {
        post_title: post.title,
        post_slug: post.slug,
        share_method: hasNativeShare ? 'native_share' : 'clipboard'
      });
      
      if (hasNativeShare) {
        navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-12 flex items-center justify-center">
          <div className="text-lg font-mono text-gray-600">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-12 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-sans font-bold text-gray-900 mb-4">
              {t("blogPage.notFound.title")}
            </h1>
            <p className="text-lg font-mono text-gray-600 mb-8">
              {t("blogPage.notFound.subtitle")}
            </p>
            <Link href="/blog">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-mono">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("blogPage.notFound.button")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Blog Post Header */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Back Button */}
            <div className="mb-8">
              <Link 
                href="/blog"
                onClick={() => track('Blog Back Button Click', { 
                  from_post: post?.slug,
                  from_title: post?.title 
                })}
              >
                <Button 
                  variant="ghost" 
                  className="font-mono text-gray-600 hover:text-amber-600 p-0"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blogPage.backButton")}
                </Button>
              </Link>
            </div>

            {/* Post Meta */}
            <div className="mb-6">
              <Badge variant="secondary" className="font-mono mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-xl font-mono text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Post Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-amber-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  {t("blogPage.shareButton")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article 
            className="max-w-4xl mx-auto prose prose-lg prose-gray max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-sans font-bold text-gray-900 mb-6 mt-12 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-sans font-bold text-gray-900 mb-4 mt-10">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-sans font-semibold text-gray-900 mb-3 mt-8">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="font-mono text-gray-700 leading-relaxed mb-6">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="font-mono text-gray-700 mb-6 pl-6 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="font-mono text-gray-700 mb-6 pl-6 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">
                    {children}
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-6 bg-amber-50 rounded-r-lg">
                    <div className="font-mono text-gray-700 italic">
                      {children}
                    </div>
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-gray-100 text-amber-600 px-2 py-1 rounded font-mono text-sm">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-6">
                      {children}
                    </code>
                  );
                },
                a: ({ children, href }) => (
                  <a 
                    href={href}
                    className="text-amber-600 hover:text-amber-700 underline font-medium transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-800">
                    {children}
                  </em>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </motion.article>
        </div>
      </section>

      <CTASection variant="blog" />
      {/* Footer */}
      <Footer />
    </div>
  );
}