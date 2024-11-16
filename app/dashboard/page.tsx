import React from "react";
import Link from "next/link";
import { CatPawLogo } from "@/components/logo/CatPawLogo";
import { UserButton } from "@clerk/nextjs"; // Import Clerk.js UserButton component

function page() {
  return (
    <div className="min-h-screen bg-[#1c1c2b] text-white flex flex-col">
      <nav className="fixed top-0 left-0 right-0 bg-[#1c1c2b] z-50 flex justify-between items-center px-6">
        <Link href="/" className="flex items-center space-x-4.5 py-6">
          <CatPawLogo />
          <span className="text-[#cba6f7] text-2xl font-bold">Catalyze</span>
        </Link>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 rounded-full",
            },
          }}
        />{" "}
        {/* Configure UserButton appearance */}
      </nav>
      <div className="flex-1 container mx-auto">
        <div>Dashboard page</div>
      </div>
    </div>
  );
}

export default page;
