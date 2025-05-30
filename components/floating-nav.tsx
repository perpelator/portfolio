"use client";

import { useState, useEffect } from "react";
import { Home, User, Code, Briefcase, FolderOpen, Mail, GraduationCap } from "lucide-react";

interface FloatingNavProps {
  hasExperience?: boolean;
  hasSkills?: boolean;
  hasProjects?: boolean;
  hasEducation?: boolean;
}

export function FloatingNav({
  hasExperience = true,
  hasSkills = true,
  hasProjects = true,
  hasEducation = true
}: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState("hero");

  // Build navigation items based on available content
  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    ...(hasExperience ? [{ id: "experience", icon: Briefcase, label: "Experience" }] : []),
    ...(hasSkills ? [{ id: "skills", icon: Code, label: "Skills" }] : []),
    ...(hasProjects ? [{ id: "projects", icon: FolderOpen, label: "Projects" }] : []),
    ...(hasEducation ? [{ id: "education", icon: GraduationCap, label: "Education" }] : []),
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative p-3 rounded-full transition-all duration-300 group ${activeSection === item.id
                ? "bg-slate-600/40 text-white"
                : "text-white/60 hover:text-white hover:bg-slate-700/30"
                }`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
