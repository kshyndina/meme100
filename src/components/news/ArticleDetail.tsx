"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import { SEO } from "@/components/seo/SEO";
import { StructuredData } from "@/components/seo/StructuredData";
import { Win95Window } from "@/components/ui/win95-window";
import { Win95CategoryBadge } from "@/components/ui/win95-category-badge";
import { Win95Timestamp } from "@/components/ui/win95-timestamp";
import { Button } from "@/components/ui/button";
import {
  Win95Card,
  Win95CardHeader,
  Win95CardTitle,
  Win95CardContent,
} from "@/components/ui/win95-card";
import { GlitchText } from "@/components/ui/win95-glitch-text";
import { processArticleContent } from "@/lib/utils";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://degennews.com";
  const articleUrl = `/articles/${article.url.split("/").pop()}`;
  const [processedContent, setProcessedContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(800);
  const [windowHeight, setWindowHeight] = useState<number>(600);

  useEffect(() => {
    const processContent = async () => {
      try {
        setIsLoading(true);
        const content = await processArticleContent(
          article.content,
          article.preview
        );
        setProcessedContent(content);
      } catch (error) {
        console.error("Error processing article content:", error);
        // Fallback to original content if processing fails
        setProcessedContent(article.content);
      } finally {
        setIsLoading(false);
      }
    };

    processContent();
  }, [article.content, article.preview]);

  // Set window size on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth * 0.6);
      setWindowHeight(window.innerHeight * 0.6);
    }
  }, []);

  // Handler functions for window controls
  const handleClose = () => {
    router.push("/");
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Generate FAQ structured data from article content
  const generateFAQData = () => {
    // Extract potential Q&A from the article content
    const faqs = [
      {
        question: `What is ${article.title.split(":")[0]}?`,
        answer: article.preview || article.content.substring(0, 200) + "...",
      },
      {
        question: `Why is ${
          article.category.split(" & ")[0]
        } important in crypto?`,
        answer:
          "Understanding crypto security and market dynamics is crucial for protecting your investments and making informed trading decisions.",
      },
    ];

    return {
      type: "faqpage" as const,
      data: { faqs },
    };
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.preview}
        image={`${baseUrl}/api/og?title=${encodeURIComponent(article.title)}`}
        url={articleUrl}
        type="article"
        publishedTime={article.date}
        section={article.category}
        tags={article.tags}
        structuredData={{
          type: "article",
          data: {
            title: article.title,
            description: article.preview,
            path: articleUrl,
            datePublished: article.date,
            category: article.category,
            tags: article.tags,
          },
        }}
      />
      <StructuredData {...generateFAQData()} />

      <div className="max-w-5xl mx-auto">
        <Win95Window
          title="Article Viewer"
          className="w-full"
          defaultWidth={windowWidth}
          defaultHeight={windowHeight}
          onClose={handleClose}
          onMinimize={handleMinimize}
          minimizable={true}
          maximizable={true}
          closable={true}
          resizable={true}
        >
          <div className="p-4">
            {/* Article header with Win95 styling */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <Win95CategoryBadge color="blue">
                  {article.category}
                </Win95CategoryBadge>

                {article.date && (
                  <Win95Timestamp date={article.date} format="long" />
                )}
              </div>

              <Win95CardTitle className="text-black text-2xl font-bold mb-4">
                <GlitchText intensity="medium" frequency={8} hoverEffect={true}>
                  {article.title}
                </GlitchText>
              </Win95CardTitle>

              <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-black border-r-black p-3 mb-4">
                <p className="font-win95-ms-sans text-black text-sm">
                  {article.preview || ""}
                </p>
              </div>

              {/* Tags with Win95 styling */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag, index) => (
                  <Win95CategoryBadge key={index} color="teal">
                    {tag}
                  </Win95CategoryBadge>
                ))}
              </div>
            </div>

            {/* Article content with Win95 styling */}
            <div className="mb-8">
              <div className="bg-white border-2 border-t-white border-l-white border-b-black border-r-black p-4">
                <div className="font-win95-ms-sans text-black text-base leading-relaxed">
                  {isLoading ? (
                    <div className="text-center py-4">
                      <p>Loading article content...</p>
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: processedContent
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* FAQ Section with Win95 styling */}
            <div className="mb-6">
              <Win95CardTitle className="text-black text-xl font-bold mb-4">
                Frequently Asked Questions
              </Win95CardTitle>

              <div className="space-y-4">
                <Win95Card>
                  <Win95CardContent>
                    <Win95CardTitle className="text-black text-base font-bold mb-2">
                      What is Degen News?
                    </Win95CardTitle>
                    <p className="font-win95-ms-sans text-black text-sm">
                      Degen News is a leading independent news publication
                      covering the non-custodial cryptocurrency ecosystem, DeFi
                      protocols, decentralized exchanges, and the broader
                      self-custody movement. We provide in-depth analysis,
                      breaking news, and educational content for crypto
                      enthusiasts, traders, and industry professionals.
                    </p>
                  </Win95CardContent>
                </Win95Card>

                <Win95Card>
                  <Win95CardContent>
                    <Win95CardTitle className="text-black text-base font-bold mb-2">
                      Who writes for Degen News?
                    </Win95CardTitle>
                    <p className="font-win95-ms-sans text-black text-sm">
                      Our team consists of experienced cryptocurrency
                      journalists, DeFi researchers, blockchain developers, and
                      cybersecurity experts. All our writers have extensive
                      backgrounds in decentralized finance and non-custodial
                      trading.
                    </p>
                  </Win95CardContent>
                </Win95Card>

                <Win95Card>
                  <Win95CardContent>
                    <Win95CardTitle className="text-black text-base font-bold mb-2">
                      Do you accept sponsored content?
                    </Win95CardTitle>
                    <p className="font-win95-ms-sans text-black text-sm">
                      We clearly label all sponsored content and maintain a
                      strict separation between editorial and advertising.
                      Sponsored articles do not influence our news coverage or
                      editorial opinions. All partnerships and potential
                      conflicts of interest are disclosed.
                    </p>
                  </Win95CardContent>
                </Win95Card>

                <Win95Card>
                  <Win95CardContent>
                    <Win95CardTitle className="text-black text-base font-bold mb-2">
                      Do you cover all blockchains and protocols?
                    </Win95CardTitle>
                    <p className="font-win95-ms-sans text-black text-sm">
                      Our primary focus is on major non-custodial platforms
                      across Ethereum, Solana, Base, Arbitrum, Polygon, and
                      other significant DeFi ecosystems. We also cover emerging
                      chains when they introduce notable non-custodial
                      innovations.
                    </p>
                  </Win95CardContent>
                </Win95Card>
              </div>
            </div>

            {/* Action buttons with Win95 styling */}
            <div className="flex justify-end gap-2">
              <Button variant="default" onClick={() => router.push("/")}>BACK</Button>
              <Button variant="default">SHARE</Button>
            </div>
          </div>
        </Win95Window>
      </div>
    </>
  );
}
