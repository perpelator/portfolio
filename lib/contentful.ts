import { createClient } from "contentful"
import { Document } from "@contentful/rich-text-types"

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
})

// Helper function to fix protocol-relative URLs
const fixImageUrl = (url: string): string => {
  if (url && url.startsWith('//')) {
    return `https:${url}`
  }
  return url
}

export interface Skill {
  fields: {
    name: string
    category: string
    icon: string
  }
}

export interface Project {
  fields: {
    title: string
    description: Document
    technologies: string[]
    image: {
      fields: {
        file: {
          url: string
        }
      }
    }
    githubUrl: string
    liveUrl: string
    featured: boolean
  }
}

export interface Experience {
  fields: {
    jobTitle: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: Document
    achievements: string[]
    technologies: string[]
    companyLogo?: {
      fields: {
        file: {
          url: string
        }
      }
    }
  }
}

export interface Education {
  fields: {
    degree: string
    institution: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: Document
    gpa?: string
    achievements: string[]
    coursework: string[]
    institutionLogo?: {
      fields: {
        file: {
          url: string
        }
      }
    }
  }
}

export interface AboutContent {
  fields: {
    name: string
    title: string
    bio: Document
    yearsExperience: number
    projectsCompleted: number
    profileImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    resumeUrl?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    switcher: string[]
  }
}

export interface ContactInfo {
  fields: {
    email: string
    linkedin: string
    github: string
    location: string
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials not configured")
    }

    const entries = await client.getEntries({
      content_type: "skill",
      order: ["fields.name"],
    })
    return entries.items.map((entry: any) => ({
      fields: {
        name: entry.fields.name,
        category: entry.fields.category,
        icon: entry.fields.icon,
      },
    })) as Skill[]
  } catch (error) {
    console.error("Error fetching skills:", error)
    return []
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials not configured")
    }

    const entries = await client.getEntries({
      content_type: "project",
      order: ["-fields.featured", "-sys.createdAt"],
    })
    return entries.items.map((entry: any) => ({
      fields: {
        title: entry.fields.title,
        description: entry.fields.description,
        technologies: entry.fields.technologies,
        image: {
          fields: {
            file: {
              url: fixImageUrl(entry.fields.image?.fields?.file?.url || '')
            }
          }
        },
        githubUrl: entry.fields.githubUrl,
        liveUrl: entry.fields.liveUrl,
        featured: entry.fields.featured,
      },
    })) as Project[]
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials not configured")
    }

    const entries = await client.getEntries({
      content_type: "experience",
      order: ["-fields.startDate"],
    })
    return entries.items.map((entry: any) => ({
      fields: {
        jobTitle: entry.fields.jobTitle,
        company: entry.fields.company,
        location: entry.fields.location,
        startDate: entry.fields.startDate,
        endDate: entry.fields.endDate,
        current: entry.fields.current,
        description: entry.fields.description,
        achievements: entry.fields.achievements,
        technologies: entry.fields.technologies,
        companyLogo: entry.fields.companyLogo ? {
          fields: {
            file: {
              url: fixImageUrl(entry.fields.companyLogo.fields.file.url)
            }
          }
        } : undefined,
      },
    })) as Experience[]
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return []
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials not configured")
    }

    const entries = await client.getEntries({
      content_type: "education",
      order: ["-fields.startDate"],
    })
    return entries.items.map((entry: any) => ({
      fields: {
        degree: entry.fields.degree,
        institution: entry.fields.institution,
        location: entry.fields.location,
        startDate: entry.fields.startDate,
        endDate: entry.fields.endDate,
        current: entry.fields.current,
        description: entry.fields.description,
        gpa: entry.fields.gpa,
        achievements: entry.fields.achievements || [],
        coursework: entry.fields.coursework || [],
        institutionLogo: entry.fields.institutionLogo ? {
          fields: {
            file: {
              url: fixImageUrl(entry.fields.institutionLogo.fields.file.url)
            }
          }
        } : undefined,
      },
    })) as Education[]
  } catch (error) {
    console.error("Error fetching education:", error)
    return []
  }
}

export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials not configured")
    }

    const entries = await client.getEntries({
      content_type: "about",
      limit: 1,
    })
    const entry = entries.items[0];
    if (!entry) return null;
    
    return {
      fields: {
        ...entry.fields,
        profileImage: {
          fields: {
            file: {
              url: fixImageUrl((entry.fields.profileImage as { fields?: { file?: { url?: string } } })?.fields?.file?.url || '')
            }
          }
        },
        resumeUrl: (entry.fields.resumeUrl && typeof entry.fields.resumeUrl === "object" && "fields" in entry.fields.resumeUrl) ? {
          fields: {
            file: {
              url: fixImageUrl((entry.fields.resumeUrl as { fields: { file: { url: string } } }).fields.file.url)
            }
          }
        } : undefined
       }
    } as AboutContent;
  } catch (error) {
    console.error("Error fetching about content:", error)
    return null
  }
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Contentful credentials not configured")
    }

    const entries = await client.getEntries({
      content_type: "contact",
      limit: 1,
    })
    const entry = entries.items[0];
    if (!entry) return null;
    const { email, linkedin, github, location } = entry.fields as {
      email: string;
      linkedin: string;
      github: string;
      location: string;
    };
    return { fields: { email, linkedin, github, location } };
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return null
  }
}
