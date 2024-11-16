import { SignIn, SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

interface AuthSectionProps {
  authMode: "login" | "signup" | null;
  clerkAppearance: any; // Type this properly based on Clerk's types
}

export const AuthSection = ({
  authMode,
  clerkAppearance,
}: AuthSectionProps) => (
  <motion.div
    className="flex justify-center items-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-full max-w-md">
      {authMode === "login" ? (
        <SignIn appearance={clerkAppearance} redirectUrl="/" routing="hash" />
      ) : (
        <SignUp appearance={clerkAppearance} redirectUrl="/" routing="hash" />
      )}
    </div>
  </motion.div>
);
