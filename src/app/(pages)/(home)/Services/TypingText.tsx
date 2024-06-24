'use client';
import { TypeAnimation } from 'react-type-animation';

type TypingTextProps = {
  texts: string[];
  className?: string;
};

export const TypingText: React.FC<TypingTextProps> = ({ texts, className }) => {
  const sequence = texts.map((text) => [text, 1000]).flat();

  return <TypeAnimation sequence={sequence} wrapper="span" repeat={Infinity} className={className} />;
};
