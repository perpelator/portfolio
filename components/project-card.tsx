import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { Document } from "@contentful/rich-text-types";

interface ProjectCardProps {
  title: string;
  description: Document | string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
}

export function ProjectCard({
  title,
  description,
  technologies,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <Card className="backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

        <div className="text-white/70 text-sm mb-4">
          {typeof description === "string" ? (
            <p className="leading-relaxed">{description}</p>
          ) : (
            <RichTextRenderer document={description} />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-white/10 text-white/70 border-white/20 text-xs"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          </Link>
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
