import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, MapPin, GraduationCap } from "lucide-react";
import Image from "next/image";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { Document } from "@contentful/rich-text-types";

interface EducationCardProps {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: Document | string;
    gpa?: string;
    achievements: string[];
    coursework: string[];
    institutionLogo?: string;
}

export function EducationCard({
    degree,
    institution,
    location,
    startDate,
    endDate,
    current,
    description,
    gpa,
    achievements,
    coursework,
    institutionLogo,
}: EducationCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    const getDuration = () => {
        const start = new Date(startDate);
        const end = current ? new Date() : new Date(endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
        if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    };

    return (
        <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
                <div className="flex items-start gap-6">
                    {/* Institution Logo */}
                    {institutionLogo && (
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 p-2 hover:scale-105 transition-transform duration-300">
                                <Image
                                    src={institutionLogo}
                                    alt={`${institution} logo`}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-1">{degree}</h3>
                                <p className="text-blue-400 font-medium">{institution}</p>
                            </div>
                            {current && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 self-start sm:self-auto mt-2 sm:mt-0">
                                    Current
                                </Badge>
                            )}
                        </div>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                            <div className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                <span>
                                    {formatDate(startDate)} - {current ? "Present" : formatDate(endDate)} • {getDuration()}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{location}</span>
                            </div>
                            {gpa && (
                                <div className="flex items-center gap-1">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>GPA: {gpa}</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="text-white/80 text-sm mb-4">
                            {typeof description === 'string' ? (
                                <p className="leading-relaxed">{description}</p>
                            ) : (
                                <RichTextRenderer document={description} />
                            )}
                        </div>

                        {/* Achievements */}
                        {achievements.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-white font-medium text-sm mb-2">Key Achievements</h4>
                                <ul className="space-y-1">
                                    {achievements.map((achievement, index) => (
                                        <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Relevant Coursework */}
                        {coursework.length > 0 && (
                            <div>
                                <h4 className="text-white font-medium text-sm mb-2">Relevant Coursework</h4>
                                <div className="flex flex-wrap gap-2">
                                    {coursework.slice(0, 6).map((course, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="bg-white/10 text-white/70 border-white/20 text-xs"
                                        >
                                            {course}
                                        </Badge>
                                    ))}
                                    {coursework.length > 6 && (
                                        <Badge variant="secondary" className="bg-white/10 text-white/50 text-xs">
                                            +{coursework.length - 6} more
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
