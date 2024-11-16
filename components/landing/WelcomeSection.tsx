import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import WordRotate from "@/components/ui/word-rotate";

interface WelcomeSectionProps {
  onAuthClick: (mode: "login" | "signup") => void;
}

export const WelcomeSection = ({ onAuthClick }: WelcomeSectionProps) => (
  <motion.div
    className="space-y-10"
    initial={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <WordRotate
      words={[
        "Curious About Blockchain?",
        "Join the Paw-some Coding Revolution!",
      ]}
      className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-[#fab387] to-[#f5c2e7] bg-clip-text text-transparent py-1"
      interval={2000}
    />
    <div className="text-2xl text-slate-300 font-semibold">
      Paws and learn – start your journey with decentralized skills!
    </div>
    <div className="flex flex-wrap gap-6">
      <Button
        className="bg-transparent hover:bg-[#fab387]/10 text-[#fab387] border-2 border-[#fab387] text-lg px-8 py-6"
        onClick={() => onAuthClick("login")}
      >
        Login
      </Button>
      <Button
        className="bg-transparent hover:bg-[#a6e3a1]/10 text-[#a6e3a1] border-2 border-[#a6e3a1] text-lg px-8 py-6"
        onClick={() => onAuthClick("signup")}
      >
        Sign Up
      </Button>
      <Button className="bg-transparent hover:bg-[#f5c2e7]/10 text-[#f5c2e7] border-2 border-[#f5c2e7] text-lg px-8 py-6">
        Connect Wallet
      </Button>
    </div>
  </motion.div>
);
