import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/floating-nav";
import { ProjectCard } from "@/components/project-card";
import { ExperienceCard } from "@/components/experience-card";
import { EducationCard } from "@/components/education-card";
import { DynamicText } from "@/components/dynamic-text";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { Mail, MapPin, ExternalLink, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getSkills, getProjects, getExperiences, getEducation, getAboutContent, getContactInfo } from "@/lib/contentful";

// Fallback data for when Contentful is not configured
const fallbackSkills = [
  { fields: { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/react.svg" } },
  { fields: { name: "Next.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/nextdotjs.svg" } },
  { fields: { name: "TypeScript", category: "Language", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/typescript.svg" } },
  { fields: { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/nodedotjs.svg" } },
  { fields: { name: "Python", category: "Language", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/python.svg" } },
  { fields: { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/postgresql.svg" } },
  { fields: { name: "MongoDB", category: "Database", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/mongodb.svg" } },
  { fields: { name: "React Native", category: "Mobile", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/react.svg" } },
];

const fallbackProjects = [
  {
    fields: {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      image: { fields: { file: { url: "https://placehold.co/160x300" } } },
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
  },
  {
    fields: {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team communication.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: { fields: { file: { url: "https://placehold.co/160x300" } } },
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
    },
  },
  {
    fields: {
      title: "AI Analytics Dashboard",
      description: "Data visualization platform with machine learning insights for business intelligence.",
      technologies: ["Python", "React", "TensorFlow", "D3.js"],
      image: { fields: { file: { url: "https://placehold.co/160x300" } } },
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
    },
  },
];

const fallbackExperiences = [
  {
    fields: {
      jobTitle: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01-01",
      endDate: "2024-12-01",
      current: true,
      description:
        "Lead development of scalable web applications serving 100K+ users. Architect and implement microservices infrastructure using modern technologies.",
      achievements: [
        "Reduced application load time by 40% through performance optimization",
        "Led a team of 5 developers in delivering 3 major product releases",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored junior developers and conducted technical interviews",
      ],
      technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
      companyLogo: {
        fields: {
          file: {
            url: "https://placehold.co/40x40"
          }
        }
      },
    },
  },
  {
    fields: {
      jobTitle: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "2020-06-01",
      endDate: "2021-12-01",
      current: false,
      description:
        "Developed and maintained multiple client-facing applications. Collaborated with design and product teams to deliver user-centric solutions.",
      achievements: [
        "Built responsive web applications from scratch using React and Node.js",
        "Integrated third-party APIs and payment systems",
        "Improved code quality by implementing automated testing",
        "Contributed to 50% increase in user engagement",
      ],
      technologies: ["React", "Express.js", "MongoDB", "Stripe", "Jest", "Git"],
      companyLogo: {
        fields: {
          file: {
            url: "https://placehold.co/40x40"
          }
        }
      },
    },
  },
  {
    fields: {
      jobTitle: "Frontend Developer",
      company: "Digital Agency",
      location: "New York, NY",
      startDate: "2019-03-01",
      endDate: "2020-05-01",
      current: false,
      description:
        "Created responsive websites and web applications for various clients. Focused on user experience and modern web standards.",
      achievements: [
        "Delivered 15+ client projects on time and within budget",
        "Improved website performance scores by average of 30%",
        "Collaborated with UX/UI designers to implement pixel-perfect designs",
        "Established coding standards and best practices for the team",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Sass", "Webpack"],
      companyLogo: {
        fields: {
          file: {
            url: "https://placehold.co/40x40"
          }
        }
      },
    },
  },
];

const fallbackEducation = [
  {
    fields: {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "San Francisco, CA",
      startDate: "2016-09-01",
      endDate: "2020-05-01",
      current: false,
      description: "Focused on software engineering, algorithms, and data structures. Completed senior capstone project in machine learning.",
      gpa: "3.8",
      achievements: [
        "Graduated Magna Cum Laude",
        "Dean's List for 6 semesters",
        "President of Computer Science Club",
        "Winner of Annual Hackathon 2019"
      ],
      coursework: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems", "Machine Learning", "Web Development"],
      institutionLogo: {
        fields: {
          file: {
            url: "https://placehold.co/40x40"
          }
        }
      },
    },
  },
];

const fallbackAbout = {
  fields: {
    name: "Johnny Appleseed",
    title: "Full-Stack Software Engineer",
    bio: {
      nodeType: "document",
      data: {},
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "text",
              value: "Passionate software engineer with 5+ years of experience building scalable applications. I love turning complex problems into elegant solutions.",
              marks: [],
              data: {},
            },
          ],
          data: {},
        },
      ],
    },
    yearsExperience: 5,
    projectsCompleted: 50,
    profileImage: { fields: { file: { url: "https://placehold.co/200x200" } } },
    resumeUrl: "#",
    switcher: [
      "building scalable applications",
      "creating beautiful user interfaces",
      "solving complex problems",
      "learning new technologies",
      "collaborating with teams"
    ],
  } as {
    name: string;
    title: string;
    bio: any;
    yearsExperience: number;
    projectsCompleted: number;
    profileImage: { fields: { file: { url: string; }; }; };
    resumeUrl: string;
    switcher: string[];
  },
};

const fallbackContact = {
  fields: {
    email: "example@email.com",
    linkedin: "linkedin.com/in/",
    github: "github.com/",
    location: "San Francisco, CA",
  },
};

export default async function Portfolio() {
  // Initialize with fallback data
  let skills = fallbackSkills;
  let projects = fallbackProjects;
  let experiences = fallbackExperiences;
  let education = fallbackEducation;
  let aboutContent = fallbackAbout;
  let contactInfo = fallbackContact;

  // Try to fetch from Contentful with proper error handling
  try {
    const [skillsData, projectsData, experiencesData, educationData, aboutData, contactData] = await Promise.allSettled([
      getSkills(),
      getProjects(),
      getExperiences(),
      getEducation(),
      getAboutContent(),
      getContactInfo(),
    ]);

    // Only use Contentful data if successful and not empty
    if (skillsData.status === "fulfilled" && skillsData.value?.length > 0) {
      skills = skillsData.value;
    } else if (skillsData.status === "fulfilled" && skillsData.value?.length === 0) {
      skills = []; // Use empty array if Contentful returns no skills
    }

    if (projectsData.status === "fulfilled" && projectsData.value?.length > 0) {
      projects = projectsData.value.map((proj: any) => ({
        ...proj,
        fields: {
          ...proj.fields,
          description:
            typeof proj.fields.description === "string"
              ? proj.fields.description
              : "[Rich text content]",
        },
      }));
    } else if (projectsData.status === "fulfilled" && projectsData.value?.length === 0) {
      projects = []; // Use empty array if Contentful returns no projects
    }

    if (experiencesData.status === "fulfilled" && experiencesData.value?.length > 0) {
      experiences = experiencesData.value.map((exp: any) => ({
        ...exp,
        fields: {
          ...exp.fields,
          companyLogo: exp.fields.companyLogo ?? undefined,
        },
      }));
    } else if (experiencesData.status === "fulfilled" && experiencesData.value?.length === 0) {
      experiences = []; // Use empty array if Contentful returns no experiences
    }

    if (educationData.status === "fulfilled" && educationData.value?.length > 0) {
      education = educationData.value.map((edu: any) => ({
        ...edu,
        fields: {
          ...edu.fields,
          institutionLogo: edu.fields.institutionLogo ?? undefined,
        },
      }));
    } else if (educationData.status === "fulfilled" && educationData.value?.length === 0) {
      education = []; // Use empty array if Contentful returns no education
    }

    if (aboutData.status === "fulfilled" && aboutData.value?.fields) {
      aboutContent = {
        ...aboutData.value,
        fields: {
          ...aboutData.value.fields,
          resumeUrl:
            aboutData.value.fields.resumeUrl?.fields?.file?.url ||
            "#",
          // Ensure bio remains as Document type from Contentful
          bio: aboutData.value.fields.bio,
        },
      };
    }
    if (contactData.status === "fulfilled" && contactData.value?.fields) {
      contactInfo = contactData.value;
    }
  } catch (error) {
    console.log("Using fallback data - Contentful error:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <FloatingNav
        hasExperience={experiences && experiences.length > 0}
        hasSkills={false}
        hasProjects={projects && projects.length > 0}
        hasEducation={education && education.length > 0}
      />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 sm:pt-0 relative">
        <div className="text-center max-w-4xl relative z-10">
          {/* Profile Image - Larger and More Creative */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto mb-8 sm:mb-12">
            {/* Animated background rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-600 via-blue-600 to-purple-600 animate-spin-slow"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-slate-600 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-slate-900"></div>

            {/* Main profile image */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
              <Image
                src={aboutContent?.fields?.profileImage?.fields?.file?.url || "https://placehold.co/200x200"}
                alt={aboutContent?.fields?.name || "Profile"}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
              />
            </div>

            {/* Floating dots decoration */}
            <div className="absolute -top-4 -right-4 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-6 -left-6 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-8 -left-8 w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-500"></div>
          </div>

          {/* Greeting */}
          <div className="mb-6 sm:mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light mb-2">
              Hello, I'm
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-light mb-4 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {aboutContent?.fields?.name || "Alex Johnson"}
            </h1>
          </div>

          {/* Title with enhanced styling - Inlined */}
          <div className="mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-4 font-light">
              and I'm a {aboutContent?.fields?.title || "Full-Stack Software Engineer"}
            </p>
            <div className="text-base sm:text-lg md:text-xl flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="text-white/70">who's interested in</span>
              <DynamicText items={aboutContent?.fields?.switcher} />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
            <Link
              href={aboutContent?.fields?.resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white rounded-full px-8 sm:px-12 py-4 font-medium w-full sm:w-auto min-w-[220px] shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 mr-3" />
                Download Resume
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-16">
            <Link
              href={`https://${contactInfo?.fields?.github || "github.com/"}`}
              className="group w-14 h-14 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <Image
                height={24}
                width={24}
                src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg"
                alt="GitHub Icon"
                className="filter invert group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <Link
              href={`https://${contactInfo?.fields?.linkedin || "linkedin.com/in/"}`}
              className="group w-14 h-14 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <Image
                height={24}
                width={24}
                src="https://img.icons8.com/ios/50/linkedin-2--v1.png"
                alt="LinkedIn Icon"
                className="filter invert group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
            <Link
              href={`mailto:${contactInfo?.fields?.email || "example@email.com"}`}
              className="group w-14 h-14 rounded-full backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>

          {/* Skill Icons */}
          {skills && skills.length > 0 && (
            <div className="mb-12 sm:mb-16">
              {/* Group skills by category */}
              {(() => {
                const skillsByCategory = skills.reduce((acc: Record<string, typeof skills>, skill) => {
                  const category = skill?.fields?.category || 'Other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {});

                const categories = Object.keys(skillsByCategory);

                return categories.map((category, categoryIndex) => (
                  <div key={category} className={`flex justify-center items-center gap-2 sm:gap-4 ${categoryIndex < categories.length - 1 ? 'mb-4 sm:mb-6' : ''} overflow-x-auto`}>
                    <div className="flex gap-2 sm:gap-3 px-4">
                      {skillsByCategory[category].slice(0, 8).map((skill, index) => (
                        <div
                          key={`${category}-${index}`}
                          className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 opacity-60 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 group"
                        >
                          <Image
                            src={skill?.fields?.icon || "https://img.icons8.com/ios/50/FFFFFF/source-code.png"}
                            alt={`${skill?.fields?.name || 'Skill'} icon`}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                          />

                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="w-6 h-6 text-white/50" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-12 border border-white/10">
            <h2 className="text-3xl font-light text-white mb-8 text-center">About</h2>
            <div className="text-white/80 text-center mb-10 leading-relaxed text-lg">
              {aboutContent?.fields?.bio && typeof aboutContent.fields.bio === 'object' ? (
                <RichTextRenderer document={aboutContent.fields.bio} />
              ) : (
                <p>
                  {typeof aboutContent?.fields?.bio === 'string'
                    ? aboutContent.fields.bio
                    : "No bio set."
                  }
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto">
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">
                  {aboutContent?.fields?.projectsCompleted || 50}+
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">{aboutContent?.fields?.yearsExperience || 5}+</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Years</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Only show if there are experiences */}
      {experiences && experiences.length > 0 && (
        <section id="experience" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-white mb-12 text-center">Professional Experience</h2>
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  jobTitle={experience?.fields?.jobTitle || "Unknown Position"}
                  company={experience?.fields?.company || "Unknown Company"}
                  location={experience?.fields?.location || "Unknown Location"}
                  startDate={experience?.fields?.startDate || "2020-01-01"}
                  endDate={experience?.fields?.endDate || "2024-01-01"}
                  current={experience?.fields?.current || false}
                  description={experience?.fields?.description || "No description available"}
                  achievements={experience?.fields?.achievements || []}
                  technologies={experience?.fields?.technologies || []}
                  companyLogo={experience?.fields?.companyLogo?.fields?.file?.url}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section - Only show if there are projects */}
      {projects && projects.length > 0 && (
        <section id="projects" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-light text-white mb-12 text-center">Selected Work</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.slice(0, 4).map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project?.fields?.title || "Untitled Project"}
                  description={project?.fields?.description || "No description available"}
                  technologies={project?.fields?.technologies || []}
                  image={project?.fields?.image?.fields?.file?.url || "https://placehold.co/160x300"}
                  githubUrl={project?.fields?.githubUrl || "#"}
                  liveUrl={project?.fields?.liveUrl || "#"}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section - Only show if there is education data */}
      {education && education.length > 0 && (
        <section id="education" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light text-white mb-12 text-center">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <EducationCard
                  key={index}
                  degree={edu?.fields?.degree || "Unknown Degree"}
                  institution={edu?.fields?.institution || "Unknown Institution"}
                  location={edu?.fields?.location || "Unknown Location"}
                  startDate={edu?.fields?.startDate || "2020-01-01"}
                  endDate={edu?.fields?.endDate || "2024-01-01"}
                  current={edu?.fields?.current || false}
                  description={edu?.fields?.description || "No description available"}
                  gpa={edu?.fields?.gpa}
                  achievements={edu?.fields?.achievements || []}
                  coursework={edu?.fields?.coursework || []}
                  institutionLogo={edu?.fields?.institutionLogo?.fields?.file?.url}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Get In Touch</h2>
          <div className="backdrop-blur-md bg-white/5 rounded-3xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <p className="text-white/80 text-lg mb-6">
                Let's discuss your next project or collaboration opportunity.
              </p>
              <Link
                href={`mailto:${contactInfo?.fields?.email || "alex.johnson@email.com"}`}
                className="inline-flex items-center gap-2 text-xl text-white hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {contactInfo?.fields?.email || "alex.johnson@email.com"}
              </Link>
            </div>

            <div className="flex justify-center gap-6">
              <Link
                href={`https://${contactInfo?.fields?.linkedin || "linkedin.com/in/alexjohnson"}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Image
                  height={16}
                  width={16}
                  src="https://img.icons8.com/ios/50/linkedin-2--v1.png"
                  alt="LinkedIn Icon"
                  className="filter invert"
                />
                LinkedIn
              </Link>
              <Link
                href={`https://${contactInfo?.fields?.github || "github.com/alexjohnson"}`}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Image
                  height={16}
                  width={16}
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/github.svg"
                  alt="GitHub Icon"
                  className="filter invert"
                />
                GitHub
              </Link>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-5 h-5" />
                {contactInfo?.fields?.location || "San Francisco, CA"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/50 text-sm">© 2025 {aboutContent?.fields?.name || ""}</p>
        </div>
      </footer>
    </div>
  );
}
