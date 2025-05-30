import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Building2 } from "lucide-react";
import Image from "next/image";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { Document } from "@contentful/rich-text-types";

interface ExperienceCardProps {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: Document | string;
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
}

export function ExperienceCard({
  jobTitle,
  company,
  location,
  startDate,
  endDate,
  current,
  description,
  achievements,
  technologies,
  companyLogo,
}: ExperienceCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const getDuration = (start: string, end: string, isCurrent: boolean) => {
    const startDate = new Date(start);
    const endDate = isCurrent ? new Date() : new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return `${years} year${years > 1 ? "s" : ""}${months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""}`;
    }
  };

  return (
    <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {companyLogo ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 p-2 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={companyLogo}
                  alt={`${company} logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-white mb-1">{jobTitle}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="font-medium text-blue-400">{company}</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(startDate)} - {current ? "Present" : formatDate(endDate)}
                </div>
                <span className="text-white/50">({getDuration(startDate, endDate, current)})</span>
              </div>
            </div>

            {/* Description */}
            <div className="text-white/80 mb-4">
              {typeof description === 'string' ? (
                <p className="leading-relaxed">{description}</p>
              ) : (
                <RichTextRenderer document={description} />
              )}
            </div>

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/90 mb-2">Key Achievements:</h4>
                <ul className="space-y-1">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="text-blue-400 mt-1.5 flex-shrink-0">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/10 text-white/70 border-white/20 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
