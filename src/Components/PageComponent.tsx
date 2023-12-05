import React from 'react';
import TitleComponent from './TitleComponent';
import { PageComponentProps } from './Types';
import DescriptionComponent from './DescriptionComponent';

const PageComponent: React.FC<PageComponentProps> = ({ component }) => {
  switch (component.type) {
    case 'TitleComponent':
      return(
        <div className={component.type} style={{maxWidth:'30rem', maxHeight:'8rem'}}>
          <TitleComponent text={component.text} type={'TitleComponent'} />
        </div>
      )

    case 'DescriptionComponent':
      return (
        <div className={component.type} style={{maxWidth:'30rem', maxHeight:'8rem'}}>
          <DescriptionComponent text={component.text} type={'DescriptionComponent'} />
        </div>
      )
    default:
      return null;
  }
};

export default PageComponent;
