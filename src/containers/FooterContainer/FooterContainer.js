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
  
  // Try to find the block containing the "Privacy" or "Terms" link
  const targetBlockIndex = blocks.findIndex(block => 
    block.links && block.links.some(link => link.href && (link.href.includes('terms-of-service') || link.href.includes('privacy-policy')))
  );

  if (targetBlockIndex > -1) {
    const block = { ...blocks[targetBlockIndex] };
    const links = [...(block.links || [])];
    
    const hasContactUs = links.some(link => link.href && link.href.includes('/support'));
    if (!hasContactUs) {
      links.push({
        fieldType: 'link',
        content: 'Contact Us',
        href: '/support'
      });
      block.links = links;
      blocks[targetBlockIndex] = block;
    }
  } else if (blocks.length > 0) {
    // If we can't find it, just add it to the first column
    const block = { ...blocks[0] };
    const links = [...(block.links || [])];
    const hasContactUs = links.some(link => link.href && link.href.includes('/support'));
    if (!hasContactUs) {
      links.push({
        fieldType: 'link',
        content: 'Contact Us',
        href: '/support'
      });
      block.links = links;
      blocks[0] = block;
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
