import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInUp = ({ children, className = "", delay = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2, margin: "0px 0px -8% 0px" }}
    transition={{ duration: 0.42, delay, ease: [0.22, 0.1, 0.22, 1] }}
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
          <span className="text-sm font-medium tracking-widest uppercase text-primary mb-2 block">
            {tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed max-w-2xl">{subtitle}</p>
        </div>
      </div>
    </FadeInUp>
  </div>
);

export const SubLabel = ({ children }: { children: ReactNode }) => (
  <FadeInUp>
    <span className="inline-block text-base font-medium text-primary/80 mb-6 tracking-wide">
      {children}
    </span>
  </FadeInUp>
);
