const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\ASUS\\Desktop\\lends-market\\web-template';

const termsFile = path.join(rootDir, 'Lends Marketplace Terms of Service 05-08-26V1.docx.md');
const privacyFile = path.join(rootDir, 'Lends Marketplace Privacy Policy 05-08-26V1.docx.md');

const termsDest = path.join(rootDir, 'src', 'containers', 'TermsOfServicePage', 'FallbackPage.js');
const privacyDest = path.join(rootDir, 'src', 'containers', 'PrivacyPolicyPage', 'FallbackPage.js');

function generateJS(content, title, isTerms) {
  const constName = isTerms ? 'fallbackTerms' : 'fallbackPrivacyPolicy';
  const escapedContent = content.replace(/`/g, '\\`').replace(/\${/g, '\\${');
  const sectionId = isTerms ? 'terms' : 'privacy';

  return `import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

export const ${constName} = \`${escapedContent}\`;

export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: '${sectionId}',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: '${title}' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: ${constName},
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: '${title} | Lends Marketplace',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: '${title} for Lends Marketplace.',
    },
  },
};

const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
`;
}

try {
  const termsContent = fs.readFileSync(termsFile, 'utf8');
  fs.writeFileSync(termsDest, generateJS(termsContent, 'Terms of Service', true));
  console.log('Successfully updated Terms of Service!');

  const privacyContent = fs.readFileSync(privacyFile, 'utf8');
  fs.writeFileSync(privacyDest, generateJS(privacyContent, 'Privacy Policy', false));
  console.log('Successfully updated Privacy Policy!');
} catch (error) {
  console.error('Error generating files:', error);
}
