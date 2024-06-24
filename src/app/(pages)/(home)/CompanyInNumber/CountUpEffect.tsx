'use client';

import CountUp from 'react-countup';

type CountUpEffectProps = {
  end: number;
  start?: number;
  suffix?: string;
};

export const CountUpEffect: React.FC<CountUpEffectProps> = ({ end, start = 0, suffix = '' }) => {
  return <CountUp start={start} end={end} duration={5} suffix={suffix} />;
};
