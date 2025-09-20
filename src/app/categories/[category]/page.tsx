import { notFound } from 'next/navigation';
import { Header } from '@/components/news/Header';
import { SEO } from '@/components/seo/SEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { googleSheetsService } from '@/lib/google/sheets';
import { ArticleCard } from '@/components/news/ArticleCard';
import { toTitleCase } from '@/lib/utils';
import { H1, Body } from '@/components/ui/typography';

// ISR: Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  // Decode the category slug and convert to title case
  const categoryName = toTitleCase(decodeURIComponent(category).replace(/-/g, ' '));
  
  // Get all articles and filter by category
  const allArticles = await googleSheetsService.getAllArticles();
  const categoryArticles = allArticles.filter(article => 
    article.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (categoryArticles.length === 0) {
    notFound();
  }

  // Generate structured data for category page
  const categoryStructuredData = {
    type: 'collectionpage' as const,
    data: {
      title: `${categoryName} - degenNews`,
      description: `Latest ${categoryName} articles and news from degenNews`,
      path: `/categories/${category}`,
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
            name: categoryName,
            item: `https://degennews.com/categories/${category}`
          }
        ]
      }
    }
  };

  return (
    <>
      <SEO
        title={`${categoryName} - degenNews`}
        description={`Latest ${categoryName} articles and news from degenNews`}
        structuredData={categoryStructuredData}
      />
      
      <div className="min-h-screen bg-white text-purple-600">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <section className="mb-16">
            <H1 className="mb-8">{categoryName}</H1>
            <Body className="text-sage-600 mb-8">
              Browse the latest articles in {categoryName}
            </Body>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} href={`/articles/${article.url.split('/').pop()}`} />
              ))}
            </div>
          </section>
        </main>
        
      </div>
    </>
  );
}