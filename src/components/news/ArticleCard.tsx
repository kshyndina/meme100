"use client";

import Link from "next/link";
import { Article } from "@/types/article";
import { Win95Card, Win95CardHeader, Win95CardTitle, Win95CardDescription, Win95CardContent, Win95CardFooter, Win95CardButton } from "@/components/ui/win95-card";
import { Win95CategoryBadge } from "@/components/ui/win95-category-badge";
import { Win95Timestamp } from "@/components/ui/win95-timestamp";
import { Button } from "@/components/ui/button";

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
  href?: string;
  key?: string;
}

export function ArticleCard({ article, onClick, href }: ArticleCardProps) {
  const CardContent = (
    <div onClick={onClick} className="cursor-pointer">
      <Win95Card
        className="w-full"
        hoverEffect={true}
        shadowColor="blue"
      >
        <Win95CardContent className="p-4">
          {/* Category badge */}
          <div className="mb-3">
            <Win95CategoryBadge color="blue">
              {article.category}
            </Win95CategoryBadge>
          </div>

          {/* Title with brutalist styling */}
          <Win95CardTitle className="text-black mb-3 font-bold text-lg">
            {article.title}
          </Win95CardTitle>

          {/* Preview text with brutalist styling */}
          <Win95CardDescription className="text-black mb-4 line-clamp-3">
            {article.preview || article.content.substring(0, 150)}...
          </Win95CardDescription>

          {/* Tags with Win95 styling */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <Win95CategoryBadge key={index} color="teal">
                {tag}
              </Win95CategoryBadge>
            ))}
          </div>

          {/* Date with Win95 styling */}
          {article.date && (
            <div className="mb-4">
              <Win95Timestamp date={article.date} format="short" />
            </div>
          )}
        </Win95CardContent>
        
        <Win95CardFooter className="px-4 pb-4">
          <div className="flex justify-end w-full">
            <Win95CardButton onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}>
              READ MORE
            </Win95CardButton>
          </div>
        </Win95CardFooter>
      </Win95Card>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
