import { notFound } from 'next/navigation';
import { ArticleDetail } from '@/components/news/ArticleDetail';
import { Header } from '@/components/news/Header';
import { SEO } from '@/components/seo/SEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { googleSheetsService } from '@/lib/google/sheets';
import { H1, Body, Small, Tiny } from '@/components/ui/typography';

// ISR: Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  // Add logging for debugging
  console.log('ArticlePage: Attempting to fetch article with slug:', slug);
  
  // Fetch article with caching
  const article = await googleSheetsService.getArticleByUrl(slug);

  console.log('ArticlePage: Article fetched:', article ? 'Found' : 'Not found');
  
  if (!article) {
    console.log('ArticlePage: Article not found, triggering 404');
    notFound();
  }

  // Generate structured data for article
  const articleStructuredData = {
    type: 'article' as const,
    data: {
      title: article.title,
      description: article.preview,
      url: `https://degennews.com/articles/${slug}`,
      datePublished: article.date,
      author: 'degenNews',
      category: article.category,
      image: 'https://degennews.com/og-default.jpg',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://degennews.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: article.category,
            item: `https://degennews.com/categories/${encodeURIComponent(article.category.toLowerCase().replace(/\s+/g, '-'))}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `https://degennews.com/articles/${slug}`
          }
        ]
      }
    }
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.preview}
        structuredData={articleStructuredData}
      />
      
      <div className="min-h-screen bg-white text-purple-600">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ArticleDetail article={article} />
        </main>
      </div>
    </>
  );
}