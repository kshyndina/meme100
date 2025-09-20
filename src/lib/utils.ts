import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(str: string): string {
  // Handle special cases like "&" that should remain lowercase
  return str.replace(/\w+(&\w+)?/g, (txt) => {
    // If the word contains "&", split and capitalize each part
    if (txt.includes('&')) {
      return txt.split('&')
        .map(part => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase())
        .join(' & ');
    }
    // Otherwise just capitalize the first letter
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Decodes HTML entities in a string
 * Examples: ' -> ', & -> &, < -> <, > -> >
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  
  // Create a textarea element to use the browser's built-in HTML decoding
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Parses Markdown content to HTML
 * Handles bold, italic, headers, lists, and other Markdown syntax
 */
export async function parseMarkdownToHtml(markdown: string): Promise<string> {
  if (!markdown) return '';
  
  // First decode any HTML entities that might be in the markdown
  const decodedContent = decodeHtmlEntities(markdown);
  
  // Configure marked options for better output
  marked.setOptions({
    breaks: true, // Convert line breaks to <br>
    gfm: true,   // GitHub Flavored Markdown
  });
  
  // Parse markdown to HTML
  const html = await marked(decodedContent);
  return html;
}

/**
 * Processes article content by:
 * 1. Removing preview text if present
 * 2. Decoding HTML entities
 * 3. Parsing Markdown to HTML
 */
export async function processArticleContent(content: string, preview?: string): Promise<string> {
  if (!content) return '';
  
  // First, remove preview if present
  let processedContent = content;
  
  if (preview) {
    const trimmedPreview = preview.trim();
    const trimmedContent = content.trim();
    
    // Check if content starts with the preview
    if (trimmedContent.startsWith(trimmedPreview)) {
      processedContent = trimmedContent.substring(trimmedPreview.length).trim();
    } else {
      // Try to match with decoded entities
      const previewPlainText = trimmedPreview
        .replace(/&nbsp;/g, ' ')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/&/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
      
      const contentPlainText = trimmedContent
        .replace(/&nbsp;/g, ' ')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/&/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (contentPlainText.startsWith(previewPlainText)) {
        const previewLength = trimmedPreview.length;
        processedContent = trimmedContent.substring(previewLength).trim();
      }
    }
  }
  
  // Parse the remaining content as Markdown
  return parseMarkdownToHtml(processedContent);
}
