"use client";

import { useRouter } from "next/navigation";
import { userLocalStorageData } from "@/localStorage/userData";
import { authService } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toaster";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthGuardStore } from "@/store/auth-guard-store";

export default function Home() {
  const router = useRouter();
  const { authguard: storeAuthGuard } = useAuthGuardStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        // 1. If user data already exists in session, skip auth check
        const existingUser = userLocalStorageData.getUser();
        if (existingUser) {
          router.replace("/home");
          return;
        }

        // 2. Call auth guard to check token status
        const res = await authService.authguard();

        // 3. No refresh token → session fully expired, prompt login
        if (res.message === "noRefreshToken") {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            action: (
              <Link href="/auth/login">
                <Button size="sm" className="mt-2 w-full">
                  Login Now
                </Button>
              </Link>
            ),
          });
          router.replace("/home");
          return;
        }

        // 4. No access token → try refreshing tokens first
        if (res.message === "noAccessToken") {
          try {
            await authService.refresh();
          } catch {
            // Refresh failed — redirect without user data
            router.replace("/home");
            return;
          }
        }

        // 5. At this point we either have a valid access token ("ok")
        //    or just refreshed it successfully — fetch user details
        if (res.message === "ok" || res.message === "noAccessToken") {
          try {
            const userDetails = await authService.getMe();
            if (userDetails) {
              userLocalStorageData.setUser(userDetails);
              // Also sync with auth guard store
              await storeAuthGuard();
            }
          } catch (err) {
            console.error("Failed to fetch user details:", err);
          }
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
      } finally {
        setIsChecking(false);
        router.replace("/home");
      }
    };

    authenticate();
  }, [router, storeAuthGuard]);

  // Heritage-branded loading screen — mirrors actual page layout
  if (isChecking) {
    return (
      <>
        <style>{`
          @keyframes loading-shimmer {
            0% { background-position: -600px 0; }
            100% { background-position: 600px 0; }
          }
          @keyframes loading-fade-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes loading-progress {
            0% { width: 0%; }
            40% { width: 60%; }
            80% { width: 85%; }
            100% { width: 95%; }
          }
          @keyframes loading-pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }

          .sk {
            background: linear-gradient(
              90deg,
              hsl(var(--handmade-paper, 38 34% 92%)) 0%,
              hsl(var(--soft-ochre, 42 48% 63%) / 0.12) 50%,
              hsl(var(--handmade-paper, 38 34% 92%)) 100%
            );
            background-size: 1200px 100%;
            animation: loading-shimmer 2s ease-in-out infinite;
            border-radius: 4px;
          }

          .loading-page {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: hsl(var(--ivory-white, 0 0% 100%));
            overflow: hidden;
            font-family: var(--font-body, 'goldens', sans-serif);
          }

          /* Top progress bar */
          .loading-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(
              90deg,
              hsl(var(--royal-maroon, 345 54% 24%)),
              hsl(var(--antique-gold, 43 45% 55%)),
              hsl(var(--terracotta-clay, 18 55% 50%))
            );
            animation: loading-progress 3s ease-out forwards;
            z-index: 10;
          }
        `}</style>

        <div className="loading-page">
          {/* ── Navbar skeleton ── */}
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderBottom: "1px solid hsl(var(--ash-brown, 25 8% 39%) / 0.1)",
              animation: "loading-fade-in 0.4s ease-out both",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading, 'Makova', serif)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "hsl(var(--charcoal-ink, 0 0% 17%))",
                letterSpacing: "0.04em",
              }}
            >
              Shantiniketan
            </span>
            <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
              <div className="sk" style={{ width: 80, height: 32 }} />
              <div className="sk" style={{ width: 28, height: 28, borderRadius: "50%" }} />
              <div className="sk" style={{ width: 28, height: 28, borderRadius: "50%" }} />
            </div>
          </header>

          {/* ── Hero banner skeleton ── */}
          <div
            style={{
              margin: "0",
              animation: "loading-fade-in 0.5s 0.1s ease-out both",
            }}
          >
            <div
              className="sk"
              style={{
                width: "100%",
                height: "min(55vh, 480px)",
                borderRadius: 0,
              }}
            />
          </div>

          {/* ── Brand strip ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 64px)",
              padding: "28px 24px",
              borderTop: "1px solid hsl(var(--ash-brown, 25 8% 39%) / 0.08)",
              borderBottom: "1px solid hsl(var(--ash-brown, 25 8% 39%) / 0.08)",
              animation: "loading-fade-in 0.5s 0.15s ease-out both",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="sk"
                style={{
                  width: "clamp(60px, 8vw, 100px)",
                  height: 12,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>

          {/* ── Section: Trending Now ── */}
          <section
            style={{
              padding: "40px 24px 0",
              maxWidth: 1400,
              margin: "0 auto",
              animation: "loading-fade-in 0.6s 0.2s ease-out both",
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 20,
              }}
            >
              <div className="sk" style={{ width: 180, height: 28 }} />
              <div className="sk" style={{ width: 90, height: 16 }} />
            </div>

            <div
              style={{
                width: "100%",
                height: 1,
                background: "hsl(var(--ash-brown, 25 8% 39%) / 0.1)",
                marginBottom: 32,
              }}
            />

            {/* Product grid — 4 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "24px 20px",
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    animation: `loading-fade-in 0.5s ${0.25 + i * 0.08}s ease-out both`,
                  }}
                >
                  <div
                    className="sk"
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: 0,
                      marginBottom: 12,
                    }}
                  />
                  <div className="sk" style={{ width: "75%", height: 14, marginBottom: 8 }} />
                  <div className="sk" style={{ width: "35%", height: 14 }} />
                </div>
              ))}
            </div>
          </section>

          {/* ── Center status (subtle, not blocking) ── */}
          <div
            style={{
              position: "fixed",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 22px",
              background: "hsl(var(--charcoal-ink, 0 0% 17%) / 0.85)",
              borderRadius: 100,
              backdropFilter: "blur(12px)",
              animation: "loading-fade-in 0.6s 0.5s ease-out both, loading-pulse 2s 1s ease-in-out infinite",
              zIndex: 20,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                animation: "loading-shimmer 1.2s linear infinite",
              }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="hsl(var(--antique-gold, 43 45% 55%))"
                strokeWidth="2.5"
                strokeDasharray="50 20"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <span
              style={{
                fontFamily: "var(--font-body, 'goldens', sans-serif)",
                fontSize: "0.78rem",
                color: "hsl(var(--ivory-white, 0 0% 100%))",
                letterSpacing: "0.06em",
                fontWeight: 500,
              }}
            >
              Preparing your experience
            </span>
          </div>
        </div>
      </>
    );
  }

  return null;
}