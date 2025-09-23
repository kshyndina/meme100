import { Header } from "@/components/news/Header";
import { SEO } from "@/components/seo/SEO";
import { StructuredData } from "@/components/seo/StructuredData";
import { googleSheetsService } from "@/lib/google/sheets";
import { ArticleCard } from "@/components/news/ArticleCard";
import { ArticleList } from "@/components/news/ArticleList";
import { Article } from "@/types/article";
import { H1, H2, Body } from "@/components/ui/typography";

// ISR: Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

export default async function Home() {
  // Fetch articles with caching
  const articles = await googleSheetsService.getAllArticles();

  // Generate structured data for homepage
  const homepageStructuredData = {
    type: "webpage" as const,
    data: {
      title: "M100X - Crypto Security News & Trading Insights",
      description:
        "Latest crypto security news, trading insights, whale watching strategies, and market analysis for degens.",
      path: "/",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://degennews.com/",
          },
        ],
      },
    },
  };

  return (
    <>
      <SEO
        title="M100X - Crypto Security News & Trading Insights"
        description="Latest crypto security news, trading insights, whale watching strategies, and market analysis for degens."
        structuredData={homepageStructuredData}
      />

      <div className="min-h-screen bg-[#008080] text-black relative overflow-hidden win95-page-responsive flex flex-col">
        {/* Win95 background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 40px)',
          backgroundSize: '40px 40px'
        }}></div>

        <Header />

        <main className="win95-main-container">
          {/* Hero section with Win95 styling */}
          <section className="win95-hero-section">
            <div className="win95-hero-content">
              <div className="win95-hero-box">
                <H1 responsive={true} className="win95-hero-title">
                  Latest Crypto <span className="text-[#FF0000]">Articles</span>
                </H1>
                <Body responsive={true} className="win95-hero-description">
                  Latest security news, trading insights, and market analysis for
                  degens
                </Body>
              </div>
            </div>

            {/* Featured articles with creative grid layout - responsive adjustments */}
            <div className="win95-featured-articles">

              {/* Asymmetrical grid layout - responsive adjustments */}
              <div className="win95-featured-grid">
                {/* First featured article - larger - responsive adjustments */}
                {articles.length > 0 && (
                  <div className="win95-featured-article-large">
                    <ArticleCard
                      article={articles[0]}
                      href={`/articles/${articles[0].url.split("/").pop()}`}
                    />
                  </div>
                )}

                {/* Second featured article - normal size with offset - responsive adjustments */}
                {articles.length > 1 && (
                  <div className="win95-featured-article-offset">
                    <ArticleCard
                      article={articles[1]}
                      href={`/articles/${articles[1].url.split("/").pop()}`}
                    />
                  </div>
                )}

                {/* Third featured article - normal size - responsive adjustments */}
                {articles.length > 2 && (
                  <div className="win95-featured-article-rotate">
                    <ArticleCard
                      article={articles[2]}
                      href={`/articles/${articles[2].url.split("/").pop()}`}
                    />
                  </div>
                )}

                {/* Fourth featured article - normal size with offset - responsive adjustments */}
                {articles.length > 3 && (
                  <div className="win95-featured-article-offset-2">
                    <ArticleCard
                      article={articles[3]}
                      href={`/articles/${articles[3].url.split("/").pop()}`}
                    />
                  </div>
                )}

                {/* Fifth featured article - normal size - responsive adjustments */}
                {articles.length > 4 && (
                  <div className="win95-featured-article-rotate-2">
                    <ArticleCard
                      article={articles[4]}
                      href={`/articles/${articles[4].url.split("/").pop()}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* All articles section with Win95 styling */}
          <section className="win95-all-articles-section">
            <div className="win95-all-articles-divider"></div>

            <div className="win95-all-articles-box">
              <H2 responsive={true} className="win95-all-articles-title">
                All <span className="text-[#FF0000]">Articles</span>
              </H2>

              {/* Use ArticleList component for all remaining articles */}
              <div className="win95-all-articles-list">
                <ArticleList
                  articles={articles.slice(5)} // Skip the first 5 featured articles
                  useLinks={true}
                  layout="grid"
                  responsive={true}
                />
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}
