"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CatPawLogo } from "@/components/logo/CatPawLogo";
import { AuthSection } from "@/components/auth/AuthSection";
import { WelcomeSection } from "@/components/landing/WelcomeSection";
import { AnimatedCat } from "@/components/cat/AnimatedCat";

const clerkAppearance = {
  layout: {
    helpPageUrl: "",
    logoImageUrl: "",
    logoPlacement: "inside",
    privacyPageUrl: "",
    showOptionalFields: false,
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
    termsPageUrl: "",
    redirectUrl: "/", // Keeps users on the landing page
    afterSignInUrl: "/", // After sign in, stay on page
    afterSignUpUrl: "/", // After sign up, stay on page
  },
  elements: {
    card: "bg-[#1c1c2b] border-0 shadow-none",
    headerTitle: "text-white text-4.5xl", // Increased from text-3xl
    headerSubtitle: "text-slate-300 text-2.25xl", // Increased from text-xl
    socialButtonsBlockButton: "border-[#cba6f7] text-white text-2.25xl h-21", // Increased from text-lg and h-14
    socialButtonsBlockButtonText: "text-white text-2.25xl", // Increased from text-lg
    formButtonPrimary: "bg-[#cba6f7] hover:bg-[#cba6f7]/80 text-2.25xl h-21", // Increased from text-lg and h-14
    footerActionLink: "text-[#cba6f7] hover:text-[#cba6f7]/80 text-2.25xl", // Increased from text-lg
    formField: "border-slate-700",
    formFieldInput: "bg-[#24273a] text-white border-slate-700 text-2.25xl h-21", // Increased from text-lg and h-14
    dividerLine: "bg-slate-700",
    dividerText: "text-slate-300 text-2.25xl", // Increased from text-lg
    formFieldLabel: "text-slate-300 text-2.25xl", // Increased from text-lg
    identityPreviewText: "text-white text-2.25xl", // Increased from text-lg
    identityPreviewEditButton:
      "text-[#cba6f7] hover:text-[#cba6f7]/80 text-2.25xl", // Increased from text-lg
    organizationSwitcherTrigger: "bg-[#24273a] border-slate-700",
    organizationSwitcherTriggerIcon: "text-white",
    organizationPreviewTextContainer: "text-white",
    avatarBox: "text-white",
    footer: "hidden",
    footerText: "hidden",
    formFieldError: "text-red-500 text-2.25xl", // Increased from text-lg
    formFieldErrorText: "text-red-500 text-2.25xl", // Increased from text-lg
    alertText: "text-red-500 text-2.25xl", // Increased from text-lg
    formFieldSuccess: "text-green-500 text-2.25xl", // Increased from text-lg
    formFieldSuccessText: "text-green-500 text-2.25xl", // Increased from text-lg
  },
};

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-[#1c1c2b] text-white flex flex-col">
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-[#1c1c2b] z-50">
          <div className="pl-6">
            {" "}
            {/* Increased padding */}
            <Link href="/" className="flex items-center space-x-4.5 py-6">
              {" "}
              {/* Increased spacing and padding */}
              <CatPawLogo />
              <span className="text-[#cba6f7] text-2xl font-bold">
                {" "}
                {/* Increased from text-3xl */}
                Catalyze
              </span>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 container mx-auto">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left Section */}
            <AnimatePresence mode="wait">
              {!showAuth ? (
                <WelcomeSection onAuthClick={handleAuthClick} />
              ) : (
                <AuthSection
                  authMode={authMode}
                  clerkAppearance={clerkAppearance}
                />
              )}
            </AnimatePresence>

            {/* Right Section - Animated Cat */}
            <AnimatedCat />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-[#15151f]">
        {" "}
        {/* Increased padding */}
        <div className="container mx-auto px-12">
          {" "}
          {/* Increased padding */}
          <p className="text-center text-gray-400 text-2.25xl">
            {" "}
            {/* Increased from text-lg */}
            Le Footer
          </p>
        </div>
      </footer>
    </div>
  );
}
