"use client";

import { CheckIcon, LinkIcon, PauseIcon, Volume2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { LinkedInIcon, XIcon } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useClientValue } from "@/hooks/use-client-value";

/** Reads the article aloud with the Web Speech API (carried over from the old site). */
const ListenButton = () => {
  const supported = useClientValue(() => "speechSynthesis" in window, false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  if (!supported) return null;

  const toggle = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const article = document.getElementById("article");
    if (!article) return;
    const utterance = new SpeechSynthesisUtterance(article.innerText);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <Button onClick={toggle} size="sm" variant="outline">
      {speaking ? <PauseIcon /> : <Volume2Icon />}
      {speaking ? "Stop" : "Listen"}
    </Button>
  );
};

export const PostActions = ({ url, title }: { url: string; title: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareLinks = [
    {
      label: "Share on X",
      Icon: XIcon,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "Share on LinkedIn",
      Icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      <ListenButton />
      <div className="ml-1 flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="Copy link" onClick={copy} size="icon-sm" variant="ghost">
              {copied ? <CheckIcon /> : <LinkIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? "Copied!" : "Copy link"}</TooltipContent>
        </Tooltip>
        {shareLinks.map(({ label, Icon, href }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <a
                aria-label={label}
                className={buttonVariants({ size: "icon-sm", variant: "ghost" })}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon className="size-3.5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
