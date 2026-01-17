"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Intercept all link clicks to start progress
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const currentUrl = window.location.href;
      const targetUrl = target.href;

      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation = () => {
      const anchors = document.querySelectorAll("a[href]");
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", handleAnchorClick as EventListener);
      });
    };

    // Initial setup
    handleMutation();

    // Watch for new links being added to the DOM
    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      const anchors = document.querySelectorAll("a[href]");
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick as EventListener);
      });
    };
  }, []);

  return null;
}
