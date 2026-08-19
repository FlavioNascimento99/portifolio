import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../types';
import { GITHUB_LINKS } from '../../constants';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [project]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextMedia = () => {
    if (project.media && project.media.length > 0) {
      setCurrentMediaIndex((prev) => (prev + 1) % project.media!.length);
    }
  };

  const prevMedia = () => {
    if (project.media && project.media.length > 0) {
      setCurrentMediaIndex((prev) => (prev - 1 + project.media!.length) % project.media!.length);
    }
  };

  const currentMedia = project.media?.[currentMediaIndex];

  return (
    <>
      {/* Backdrop com animação */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />

      {/* Modal com animação */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-3 md:px-4 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      >
        <div
          className={`
            bg-[var(--surface)] border-4 border-black shadow-neo-lg text-[var(--on-surface)]
            w-full max-w-4xl max-h-[95vh] overflow-hidden
            grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 lg:gap-6 p-3 md:p-4 lg:p-6
            transform transition-all duration-300
            ${isOpen ? 'scale-100' : 'scale-95'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 bg-neo-pink text-black border-2 border-black p-1 md:p-2 hover:shadow-none shadow-neo transition-all z-10"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Left Column - Media */}
          <div className="flex flex-col items-center justify-center gap-1 md:gap-2 lg:gap-3 order-2 lg:order-1">
            {currentMedia ? (
              <>
                <div className="relative w-full aspect-square bg-[var(--input)] border-4 border-black overflow-hidden max-h-56 md:max-h-72 lg:max-h-full">
                  {currentMedia.type === 'image' ? (
                    <img
                      src={currentMedia.url}
                      alt={currentMedia.alt || project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={currentMedia.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Media Navigation */}
                {project.media && project.media.length > 1 && (
                  <div className="flex gap-1 w-full">
                    <button
                      onClick={prevMedia}
                      className="flex-1 bg-neo-blue text-black border-2 border-black p-0.5 md:p-1 hover:shadow-none shadow-neo transition-all active:shadow-none flex items-center justify-center gap-0.5 font-mono font-bold text-[0.6rem] md:text-xs"
                    >
                      <ChevronLeft size={14} className="md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Ant</span>
                    </button>
                    <button
                      onClick={nextMedia}
                      className="flex-1 bg-neo-blue text-black border-2 border-black p-0.5 md:p-1 hover:shadow-none shadow-neo transition-all active:shadow-none flex items-center justify-center gap-0.5 font-mono font-bold text-[0.6rem] md:text-xs"
                    >
                      <span className="hidden sm:inline">Prox</span>
                      <ChevronRight size={14} className="md:w-4 md:h-4" />
                    </button>
                  </div>
                )}

                {/* Media Indicators */}
                {project.media && project.media.length > 1 && (
                  <div className="flex gap-2">
                    {project.media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 border-2 border-black transition-all ${
                          index === currentMediaIndex ? 'bg-[var(--on-surface)]' : 'bg-[var(--surface-2)]'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full aspect-square bg-[var(--input)] border-4 border-black flex items-center justify-center">
                <span className="font-mono font-bold text-[var(--muted)] text-xs md:text-sm">Sem mídia</span>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col gap-1 md:gap-2 lg:gap-4 overflow-y-auto max-h-56 md:max-h-72 lg:max-h-full pr-1 order-1 lg:order-2">
            <div>
              <h2 className="text-sm md:text-base lg:text-xl font-black uppercase mb-1">{project.title}</h2>
              {project.subtitle && (
                <p className="font-mono text-[0.6rem] md:text-xs lg:text-xs text-[var(--muted)] line-clamp-2">{project.subtitle}</p>
              )}
            </div>

            <div className="border-l-4 border-black pl-2 md:pl-3 lg:pl-4">
              <p className="font-mono text-[0.55rem] md:text-xs lg:text-sm leading-relaxed line-clamp-3 lg:line-clamp-none">
                {project.fullDescription || project.description}
              </p>
            </div>

            <div>
              <h3 className="font-black text-[0.6rem] md:text-xs lg:text-sm uppercase mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--on-surface)] flex-shrink-0"></span>
                Tech
              </h3>
              <div className="flex flex-wrap gap-0.5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="inline-block bg-neo-yellow text-black border-2 border-black px-1 md:px-1.5 lg:px-2 py-0 md:py-0.5 font-mono text-[0.5rem] md:text-xs lg:text-xs font-bold shadow-neo-sm"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="text-[0.5rem] md:text-xs text-[var(--muted)] pt-0">+{project.techStack.length - 5}</span>
                )}
              </div>
            </div>

            {project.access && (
              <div
                className="
                  bg-[var(--surface-2)] border-4 border-black px-2 md:px-3 lg:px-4 py-0.5 md:py-1 lg:py-2
                  font-mono uppercase text-[0.6rem] md:text-xs lg:text-xs text-center
                "
              >
                <span className="font-bold">Sistema proprietario</span>
                <span className="text-[var(--muted)]"> — {project.access.note}</span>
              </div>
            )}

            {(project.link || GITHUB_LINKS[project.id]) && (
              <a
                href={project.link || GITHUB_LINKS[project.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  bg-neo-green text-black border-4 border-black px-2 md:px-3 lg:px-4 py-0.5 md:py-1 lg:py-2
                  font-mono font-bold uppercase text-[0.6rem] md:text-xs lg:text-xs
                  shadow-neo hover:shadow-none transition-all active:shadow-none
                  text-center block
                "
              >
                {project.link ? 'Ver site →' : 'GitHub →'}
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Smooth scrollbar for modal content */
        @supports (scrollbar-width: thin) {
          div:has(> div.overflow-y-auto) > div {
            scrollbar-width: thin;
            scrollbar-color: #000 #f0f0f0;
          }
        }
      `}</style>
    </>
  );
};
