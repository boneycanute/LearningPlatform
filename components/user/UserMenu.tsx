"use client";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs"; // Import Clerk.js hooks

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); // Fetch user information
  const { signOut } = useClerk(); // Clerk.js signOut function

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="relative">
      <button onClick={handleToggle} className="flex items-center space-x-2">
        <span className="text-white">{user?.fullName || "User"}</span>
        <img
          src={user?.imageUrl || "/path/to/default-avatar.jpg"}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#24273a] border border-slate-700 rounded-md shadow-lg">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-white hover:bg-[#1c1c2b]"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
