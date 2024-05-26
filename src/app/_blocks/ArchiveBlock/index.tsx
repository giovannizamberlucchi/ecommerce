import { Gutter } from '../../_components/Gutter';
import RichText from '../../_components/RichText';
import { ArchiveBlockProps } from './types';

import classes from './index.module.scss';

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = (props) => {
  const { introContent, id } = props;

  return (
    <div id={`block-${id}`} className={classes.archiveBlock}>
      {introContent && (
        // <Gutter className={classes.introContent}>
        <RichText content={introContent} />
        // </Gutter>
      )}
    </div>
  );
};
