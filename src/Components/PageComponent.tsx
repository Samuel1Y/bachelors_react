import React from 'react';
import TitleComponent from './TitleComponent';
import { PageComponentProps } from './Types';
import DescriptionComponent from './DescriptionComponent';

const PageComponent: React.FC<PageComponentProps> = ({ component }) => {
  switch (component.type) {
    case 'TitleComponent':
      return(
        <div className={component.type} style={{maxWidth:'30rem', maxHeight:'8rem'}}>
          <TitleComponent text={component.text} type={'TitleComponent'} slot={component.slot} pageNumber={component.pageNumber} />
        </div>
      )

    case 'DescriptionComponent':
      return (
        <div className={component.type} style={{maxWidth:'30rem', maxHeight:'8rem'}}>
          <DescriptionComponent text={component.text} type={'DescriptionComponent'} slot={component.slot} pageNumber={component.pageNumber} />
        </div>
      )
    default:
      return null;
  }
};

export default PageComponent;
