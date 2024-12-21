import BuffByteLogo from "@buffbyte/components/ui/logo";
import { AuthService } from "@buffbyte/services";
import { motion } from "framer-motion";
import React from "react";
import { BiAnalyse } from "react-icons/bi";
import { BsBoxArrowRight, BsFileText, BsHouse, BsTv } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

interface AppHeaderProps {
  className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ className = "" }) => {
  const location = useLocation();

  // Navigation menu items
  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BsHouse,
      path: "/app/dashboard",
    },
    {
      id: "content",
      label: "Content Analysis",
      icon: BiAnalyse,
      path: "/app/content-analysis",
    },
    {
      id: "script",
      label: "Script Analysis",
      icon: BsFileText,
      path: "/app/script-analysis",
    },
    {
      id: "teleprompter",
      label: "Teleprompter",
      icon: BsTv,
      path: "/app/teleprompter",
    },
  ];

  const handleLogout = () => {
    AuthService.clearAuth();
    window.location.href = "/auth/login";
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const activeIndicatorVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`
          hidden lg:block top-4 transform -translate-x-1/2 z-50 fixed
          w-full max-w-4xl mx-auto px-4 left-[20%] ${className}
        `}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <BuffByteLogo size="md" />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              variants={itemVariants}
              className="flex items-center space-x-1"
            >
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link to={item.path} key={item.id}>
                    <motion.div
                      key={item.id}
                      className={`
                      relative flex items-center space-x-2 px-4 py-2 rounded-lg
                      transition-all duration-200 group
                      ${
                        active
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                      }
                    `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          active ? "text-primary-600" : ""
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          active ? "text-primary-600" : ""
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          variants={activeIndicatorVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className="absolute inset-0 bg-primary-100 rounded-lg -z-10"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </motion.nav>

            {/* Logout Button */}
            <motion.button
              variants={itemVariants}
              onClick={handleLogout}
              className="
                flex items-center space-x-2 px-4 py-2 rounded-lg
                text-gray-600 hover:text-error-600 hover:bg-error-50
                transition-all duration-200
              "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BsBoxArrowRight className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className="
          lg:hidden fixed bottom-0 left-0 right-0 z-[100]
          bg-white/95 backdrop-blur-md border-t border-gray-200/50
          px-4 py-2 safe-area-pb
        "
      >
        <div className="flex items-center justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.a
                key={item.id}
                href={item.path}
                variants={itemVariants}
                className={`
                  relative flex flex-col items-center justify-center py-2 px-3
                  rounded-xl transition-all duration-200 min-w-[60px]
                  ${active ? "text-primary-600" : "text-gray-600"}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background for active state */}
                {active && (
                  <motion.div
                    variants={activeIndicatorVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 bg-primary-100 rounded-xl"
                  />
                )}

                <Icon
                  className={`w-6 h-6 mb-1 relative z-10 ${
                    active ? "text-primary-600" : ""
                  }`}
                />
                <span
                  className={`text-xs font-medium relative z-10 ${
                    active ? "text-primary-600" : ""
                  }`}
                >
                  {item.label.split(" ")[0]}{" "}
                  {/* Show only first word on mobile */}
                </span>

                {/* Active dot indicator */}
                {active && (
                  <motion.div
                    variants={activeIndicatorVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-1 w-1 h-1 bg-primary-600 rounded-full"
                  />
                )}
              </motion.a>
            );
          })}

          {/* Mobile Logout */}
          <motion.button
            variants={itemVariants}
            onClick={handleLogout}
            className="
              flex flex-col items-center justify-center py-2 px-3
              rounded-xl transition-all duration-200 min-w-[60px]
              text-gray-600 hover:text-error-600
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BsBoxArrowRight className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
};

export default AppHeader;
