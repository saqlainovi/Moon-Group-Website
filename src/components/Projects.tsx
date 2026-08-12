"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, type ProjectStatus } from "@/data/company";

gsap.registerPlugin(ScrollTrigger);

const statusColors: Record<ProjectStatus, string> = {
  Ongoing: "bg-emerald-500/90",
  Completed: "bg-blue-500/90",
  "Coming Soon": "bg-moon-gold/90 text-moon-navy",
};

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-sm overflow-hidden bg-moon-slate"
    >
      <a href={`#project-${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="image-overlay opacity-60 group-hover:opacity-80 transition-opacity" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm text-white ${statusColors[project.status]}`}
            >
              {project.status}
            </span>
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm bg-white/10 backdrop-blur-sm text-white">
              {project.type}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-moon-gold text-xs uppercase tracking-wider mb-1">
              {project.location}
            </p>
            <h3 className="font-display text-2xl font-bold mb-3">
              {project.name}
            </h3>

            <div className="grid grid-cols-4 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {[
                { label: "Size", value: project.size },
                { label: "Bed", value: project.beds },
                { label: "Bath", value: project.baths },
                { label: "Land", value: project.land },
              ].map((spec) => (
                <div key={spec.label} className="text-center">
                  <p className="text-[10px] text-white/50 uppercase">{spec.label}</p>
                  <p className="text-xs font-semibold text-white/90">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<ProjectStatus | "All">("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.status === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filters: (ProjectStatus | "All")[] = [
    "All",
    "Ongoing",
    "Completed",
    "Coming Soon",
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 bg-moon-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-moon-gold text-sm tracking-[0.3em] uppercase mb-4">
              Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Featured <span className="text-gradient-gold">Properties</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-lg">
              Discover our finest residential and commercial developments across
              Dhaka and beyond.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-sm transition-all ${
                  filter === f
                    ? "bg-moon-gold text-moon-navy font-semibold"
                    : "border border-white/20 text-white/60 hover:border-moon-gold hover:text-moon-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
