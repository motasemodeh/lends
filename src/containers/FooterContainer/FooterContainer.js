import React from 'react';
import { useConfiguration } from '../../context/configurationContext';
import loadable from '@loadable/component';

const SectionBuilder = loadable(
  () => import(/* webpackChunkName: "SectionBuilder" */ '../PageBuilder/PageBuilder'),
  {
    resolveComponent: components => components.SectionBuilder,
  }
);

const FooterComponent = () => {
  const { footer = {}, topbar } = useConfiguration();

  // If footer asset is not set, let's not render Footer at all.
  if (Object.keys(footer).length === 0) {
    return null;
  }

  const blocks = footer.blocks ? [...footer.blocks] : [];
  
  // Find the block containing the terms/privacy links
  const targetBlockIndex = blocks.findIndex(block => 
    block.text && block.text.content && (block.text.content.includes('terms-of-service') || block.text.content.includes('privacy-policy'))
  );

  if (targetBlockIndex > -1) {
    const block = { ...blocks[targetBlockIndex] };
    const text = { ...block.text };
    
    // Append Contact Us as a markdown link if it's not already there
    if (!text.content.includes('/support')) {
      // Remove any plain text "Contact Us" they might have typed
      text.content = text.content.replace(/Contact Us/g, '').trim();
      text.content = `${text.content}\n[Contact Us](/support)`;
      block.text = text;
      blocks[targetBlockIndex] = block;
    }
  } else if (blocks.length > 0) {
    // If we can't find it explicitly, just add to the first block
    const block = { ...blocks[0] };
    if (block.text && block.text.content) {
      const text = { ...block.text };
      if (!text.content.includes('/support')) {
        text.content = text.content.replace(/Contact Us/g, '').trim();
        text.content = `${text.content}\n[Contact Us](/support)`;
        block.text = text;
        blocks[0] = block;
      }
    }
  }

  // The footer asset does not specify sectionId or sectionType. However, the SectionBuilder
  // expects sectionId and sectionType in order to identify the section. We add those
  // attributes here before passing the asset to SectionBuilder.
  const footerSection = {
    ...footer,
    blocks,
    sectionId: 'footer',
    sectionType: 'footer',
    linkLogoToExternalSite: topbar?.logoLink,
  };

  return <SectionBuilder sections={[footerSection]} />;
};

// NOTE: if you want to add dynamic data to FooterComponent,
//       you could just connect this FooterContainer to Redux Store
//
// const mapStateToProps = state => {
//   const { currentUser } = state.user;
//   return { currentUser };
// };
// const FooterContainer = compose(connect(mapStateToProps))(FooterComponent);
// export default FooterContainer;

export default FooterComponent;
