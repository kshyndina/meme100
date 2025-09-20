import { Article } from '@/types/article';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  onArticleClick?: (article: Article) => void;
  useLinks?: boolean;
  layout?: "grid" | "list";
  responsive?: boolean;
}

export function ArticleList({
  articles,
  onArticleClick,
  useLinks = false,
  layout = "grid",
  responsive = true
}: ArticleListProps) {
  return (
    <div className={cn(
      "bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-black border-r-black",
      responsive ? "p-3 sm:p-4" : "p-4"
    )}>
      <div className={cn(
        "mb-4",
        responsive ? "mb-3 sm:mb-4" : "mb-4"
      )}>
        <h2 className={cn(
          "font-win95-ms-sans text-black font-bold",
          responsive ? "text-lg sm:text-xl md:text-lg mb-2 sm:mb-3" : "text-lg mb-2"
        )}>
          ARTICLES
        </h2>
        <div className={cn(
          "bg-black",
          responsive ? "h-px mb-3 sm:mb-4" : "h-px mb-4"
        )}></div>
      </div>
      
      {/* Responsive Grid Layout */}
      {layout === "grid" && (
        <div className={cn(
          responsive
            ? "win95-article-list-responsive"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        )}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => onArticleClick?.(article)}
              href={useLinks ? `/articles/${article.url.split('/').pop()}` : undefined}
            />
          ))}
        </div>
      )}
      
      {/* Responsive List Layout */}
      {layout === "list" && (
        <div className={cn(
          "space-y-4",
          responsive ? "space-y-3 sm:space-y-4" : "space-y-4"
        )}>
          {articles.map((article) => (
            <div
              key={article.id}
              className={cn(
                "bg-white border border-t-white border-l-white border-b-black border-r-black p-3 cursor-pointer hover:bg-[#f0f0f0]",
                responsive ? "p-3 sm:p-4" : "p-3"
              )}
              onClick={() => onArticleClick?.(article)}
            >
              <h3 className={cn(
                "font-win95-ms-sans text-black font-bold mb-1",
                responsive ? "text-base sm:text-lg mb-1 sm:mb-2" : "text-base mb-1"
              )}>
                {article.title}
              </h3>
              <p className={cn(
                "font-win95-ms-sans text-black text-sm mb-2 line-clamp-2",
                responsive ? "text-sm sm:text-base mb-2 sm:mb-3" : "text-sm mb-2"
              )}>
                {article.preview || article.content.substring(0, 150)}...
              </p>
              <div className={cn(
                "flex justify-between items-center",
                responsive ? "text-xs sm:text-sm" : "text-xs"
              )}>
                <span className="font-win95-ms-sans text-black">
                  {article.date ? new Date(article.date).toLocaleDateString() : 'No date'}
                </span>
                {article.category && (
                  <span className="font-win95-ms-sans bg-[#c0c0c0] border border-t-white border-l-white border-b-black border-r-black px-2 py-1">
                    {article.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {articles.length === 0 && (
        <div className={cn(
          "bg-white border border-t-white border-l-white border-b-black border-r-black text-center",
          responsive ? "p-3 sm:p-4" : "p-4"
        )}>
          <p className={cn(
            "font-win95-ms-sans text-black",
            responsive ? "text-sm sm:text-base" : "text-sm"
          )}>
            No articles found.
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function for className conditional styling
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}