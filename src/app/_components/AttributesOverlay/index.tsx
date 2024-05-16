'use client';
import { useFilterOverlay } from '../../_providers/FilterOverlay';
import { AttributesFilter } from '../AttributesFilter';
import { Cross } from '../icons/Cross';
import { Filter } from '../icons/Filter';
import classes from './index.module.scss';

export const AttributesOverlay: React.FC<{ attributes: [string, string[]][]; className?: string }> = ({
  attributes,
  className,
}) => {
  console.log(classes.icon);
  const { overlayShow, setOverlayShow } = useFilterOverlay();
  return (
    <div className={className}>
      <button onClick={() => setOverlayShow(!overlayShow)}>
        <Filter className={classes['icon--filter']} fill="#000" />
      </button>

      <div className={!overlayShow ? classes.overlay : classes['overlay--active']}>
        <div className={classes['overlay--close']}>
          <div onClick={() => setOverlayShow(!overlayShow)}>
            <Cross fill="#000" className={classes['icon--close']} />
          </div>
        </div>
        <div className={classes['overlay--content']}>
          <AttributesFilter attributes={attributes} />
        </div>
      </div>
    </div>
  );
};
