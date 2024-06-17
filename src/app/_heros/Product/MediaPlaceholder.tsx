import classes from './index.module.scss';

export const MediaPlaceholder: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={classes.placeholder}>Pas d'image</div>;
};
