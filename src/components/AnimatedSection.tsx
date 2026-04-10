import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUp = ({ children, className = "", delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({
  num,
  tag,
  title,
  subtitle,
}: {
  num: string;
  tag: string;
  title: string;
  subtitle: string;
}) => (
  <div className="mb-16">
    <FadeInUp>
      <div className="flex items-start gap-6 mb-6">
        <span className="text-6xl font-bold text-gradient opacity-40">{num}</span>
        <div>
          <span className="text-xs font-medium tracking-widest uppercase text-primary mb-2 block">
            {tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-3 text-base max-w-2xl">{subtitle}</p>
        </div>
      </div>
    </FadeInUp>
  </div>
);

export const SubLabel = ({ children }: { children: ReactNode }) => (
  <FadeInUp>
    <span className="inline-block text-sm font-medium text-primary/80 mb-6 tracking-wide">
      {children}
    </span>
  </FadeInUp>
);
