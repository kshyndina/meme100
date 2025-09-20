"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Win95Window } from "@/components/ui/win95-window";
import {
  Win95Dialog,
  Win95DialogTrigger,
  Win95DialogHeader,
  Win95DialogTitle,
  Win95DialogDescription,
  Win95DialogFooter
} from "@/components/ui/win95-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";
import { Small } from "@/components/ui/typography";

export function Footer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      // Verify the code before making the API call
      if (code !== "c2xpLSbW0dHgPc6v65Q4") {
        toast({
          title: "Error",
          description: "Invalid refresh code",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/refresh", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message || "Articles refreshed successfully",
        });
        setIsDialogOpen(false);
        setCode("");

        // Force a page refresh to show the updated content
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to refresh articles",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="border-t-2 border-gray-500 bg-[#c0c0c0] shadow-[1px_1px_0_#ffffff,-1px_-1px_0_#000000]">
      <div className="container mx-auto px-4 py-4">
        <Win95Window
          title="Degen News Footer"
          className="w-full"
          initialX={0}
          initialY={0}
          minimizable={true}
          maximizable={true}
          closable={true}
          resizable={true}
        >
          <div className="p-4">
            <div className="text-center">
              <Small className="text-black font-win95-ms-sans">
                © 2025 Degen News. All rights reserved.
              </Small>
              <Small className="text-black font-win95-ms-sans mt-2 block">
                Degen News is not responsible for the content of external sites.
              </Small>

              <div className="mt-4 flex justify-center">
                <Win95Dialog
                  title="Refresh Articles"
                  open={isDialogOpen}
                  onOpenChange={setIsDialogOpen}
                  defaultWidth={400}
                  defaultHeight={250}
                >
                  <Win95DialogTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh Articles
                    </Button>
                  </Win95DialogTrigger>
                  <Win95DialogHeader>
                    <Win95DialogTitle className="text-black font-win95-ms-sans">
                      Refresh Articles
                    </Win95DialogTitle>
                    <Win95DialogDescription className="text-black font-win95-ms-sans">
                      Enter the refresh code to fetch the latest articles from
                      Google Sheets.
                    </Win95DialogDescription>
                  </Win95DialogHeader>
                  <div className="flex items-center space-x-2 py-4">
                    <div className="grid flex-1 gap-2">
                      <Input
                        id="code"
                        type="password"
                        placeholder="Enter refresh code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="bg-white border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500 text-black"
                      />
                    </div>
                  </div>
                  <Win95DialogFooter>
                    <Button
                      onClick={handleRefresh}
                      disabled={isLoading || !code}
                      className="bg-[#c0c0c0] text-black border-2 border-t-white border-l-white border-b-gray-500 border-r-gray-500"
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Refresh
                    </Button>
                  </Win95DialogFooter>
                </Win95Dialog>
              </div>
            </div>
          </div>
        </Win95Window>
      </div>
    </footer>
  );
}
