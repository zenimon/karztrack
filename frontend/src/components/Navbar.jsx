import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, UserCircle2 } from "lucide-react";

function Navbar({ variant = "landing" }) {
  const ngoName = "Helping Hands";
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isLanding = variant === "landing";
  const isDashboard = variant === "dashboard";
  const isRisk = variant === "risk-panel";

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 h-16 border-b border-white/10 bg-[#151520]/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] shadow-[0_0_24px_rgba(124,58,237,0.55)]">
            <span className="font-['Poppins'] text-lg font-semibold text-white">
              K
            </span>
          </div>
          <span className="font-['Poppins'] text-lg font-semibold tracking-tight text-white">
            KarzTrack
          </span>
        </div>

        {/* Center navigation (landing only) */}
        {isLanding && (
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                [
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#7c3aed]"
                    : "text-[#b3b3c6] hover:text-white",
                ].join(" ")
              }
            >
              Home
            </NavLink>
          </nav>
        )}

        {/* Right section */}
        <div className="ml-auto flex items-center gap-3">
          {/* Dashboard / Risk switching buttons on internal pages */}
          {isDashboard && (
            <NavLink
              to="/ngo/risk-panel"
              className={({ isActive }) =>
                [
                  "hidden rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium transition-colors md:inline-flex",
                  isActive
                    ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                    : "text-[#b3b3c6] hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              Risk Panel
            </NavLink>
          )}

          {isRisk && (
            <NavLink
              to="/ngo/dashboard"
              className={({ isActive }) =>
                [
                  "hidden rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium transition-colors md:inline-flex",
                  isActive
                    ? "bg-[#7c3aed] text-white border-[#7c3aed]"
                    : "text-[#b3b3c6] hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Landing: Login / Sign Up dropdowns */}
          {isLanding && (
            <>
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setLoginOpen(true)}
                onMouseLeave={() => setLoginOpen(false)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#151520] px-3 py-1.5 text-xs font-medium text-[#b3b3c6] shadow-md shadow-black/40 transition hover:border-[#7c3aed] hover:text-white"
                >
                  <span>Login</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {loginOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-40 rounded-lg border border-white/10 bg-[#151520] p-2 text-xs text-[#e5e5ff] shadow-xl shadow-black/40"
                    >
                      <Link
                        to="/user/login"
                        className="block rounded-md px-2 py-1.5 hover:bg-white/5"
                      >
                        User Login
                      </Link>
                      <Link
                        to="/ngo/login"
                        className="block rounded-md px-2 py-1.5 hover:bg-white/5"
                      >
                        NGO Login
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="relative hidden md:block"
                onMouseEnter={() => setSignupOpen(true)}
                onMouseLeave={() => setSignupOpen(false)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] px-3 py-1.5 text-xs font-medium text-white shadow-md shadow-violet-900/50 transition hover:from-[#8b5cf6] hover:to-[#c4b5fd]"
                >
                  <span>Sign Up</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {signupOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-40 rounded-lg border border-white/10 bg-[#151520] p-2 text-xs text-[#e5e5ff] shadow-xl shadow-black/40"
                    >
                      <Link
                        to="/user/signup"
                        className="block rounded-md px-2 py-1.5 hover:bg-white/5"
                      >
                        User Sign Up
                      </Link>
                      <Link
                        to="/ngo/signup"
                        className="block rounded-md px-2 py-1.5 hover:bg-white/5"
                      >
                        NGO Sign Up
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* User information dropdown (dashboard and risk panel) */}
          {(isDashboard || isRisk) && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#151520] px-3 py-1.5 text-xs text-[#b3b3c6] shadow-md shadow-black/40 transition-colors hover:border-[#7c3aed] hover:text-white"
              >
                <UserCircle2 className="h-5 w-5 text-[#b3b3c6]" />
                <span className="hidden font-medium sm:inline">
                  {ngoName || "NGO Account"}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-lg border border-white/10 bg-[#151520] p-4 text-sm text-[#b3b3c6] shadow-xl shadow-black/40"
                  >
                    <div className="mb-2 text-xs uppercase tracking-wide text-[#b3b3c6]/70">
                      NGO Profile
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-col">
                        <span className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/60">
                          NGO Name
                        </span>
                        <span className="font-medium text-white">
                          {ngoName || "Helping Hands"}
                        </span>
                      </div>
                      <div className="flex flex-col pt-2">
                        <span className="text-[11px] uppercase tracking-wide text-[#b3b3c6]/60">
                          NGO ID
                        </span>
                        <span className="font-mono text-xs text-[#a78bfa]">
                          NGO-2043
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;
