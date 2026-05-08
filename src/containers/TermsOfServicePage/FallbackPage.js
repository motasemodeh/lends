import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// NOTE: You could add the actual Terms of Service here as a fallback
//       instead of showing this error message.
const fallbackTerms = `
# TERMS OF SERVICE FOR LENDS MARKETPLACE
**Last Updated: 5/8/2026**

These Terms of Service (“Terms”) govern user (“you,” “your,” “user,” or similar references) access to and use of Lends’ website, mobile applications, and related services (collectively, the “Platform”). The Platform is an online marketplace that enables users to list, discover, and book (i) physical goods, (ii) spaces, and (iii) services.

### 1. Acceptance of Terms; Eligibility
By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. You must be at least eighteen (18) years old to use the Platform.

### 2. Definitions
*   **"Platform"**: Lends’ website and mobile applications.
*   **"Provider"**: A User who lists or offers any Listing.
*   **"Customer"**: A User who books or rents a Listing.
*   **"Listing"**: Goods, Spaces, or Services made available through the Platform.

### 3. Nature of the Platform
Lends operates solely as a technology platform and does not own, control, or provide the goods, spaces, or services listed. Any agreement formed in connection with a Booking is solely between the Provider and the Customer.

### 4. User Accounts
To access certain features, you must create an account and provide accurate information. You are responsible for all activity that occurs under your account.

### 5. Listings & Bookings
Providers are solely responsible for the accuracy and legality of their Listings. A Booking is confirmed only when accepted by the Provider.

### 6. Payments & Fees
Payments are processed through third-party processors. By booking, you authorize charges for fees, deposits, and taxes.

### 7. Cancellation & Refunds
Each Listing is subject to a Cancellation Policy. Refunds are determined based on the timing of cancellation and the specific policy of the Listing.

### 8. Provider Terms
Providers represent that they have all necessary rights and licenses to offer their Listings and must ensure they are safe and accurately described.

### 9. Customer Terms
Customers agree to use Listings in a lawful and responsible manner and are responsible for any damage or loss caused during their use.

### 10. Service-Specific Terms
Services are provided solely by independent Providers. Lends makes no warranties regarding the quality or outcome of any Services.

### 11. Special Provisions for Spaces
Bookings of Spaces grant a limited, temporary license to use the space and do not create a tenancy or leasehold relationship.

### 12. Prohibited Activities
Users may not use the Platform for unlawful purposes, circumvent fees, or engage in disruptive behavior.

### 13. Content & Listings
Users retain rights to their content but grant Lends a license to use it for operating and promoting the Platform.

### 14. Disclaimers
The Platform is provided "as is" without warranties of any kind. Lends is not responsible for the acts or omissions of any User.

### 15. Limitation of Liability
To the maximum extent permitted by law, Lends' liability is limited to the greater of $100 or the fees paid in the last 12 months.

### 16. Indemnification
You agree to indemnify Lends against claims arising from your use of the Platform or violation of these Terms.

### 17. Disputes Between Users
Disputes between Users are solely between those parties. Lends is not a party to such disputes.

### 18. Termination
Lends may suspend or terminate your access at any time for violations of these Terms or to mitigate risk.

### 19. Privacy and Data Use
Use of the Platform is subject to our Privacy Policy.

### 20. Governing Law & Dispute Resolution
These Terms are governed by the laws of New York. Disputes will be resolved through binding arbitration.

### 21. General Provisions
These Terms constitute the entire agreement between you and Lends.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'terms',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Terms of Service' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackTerms,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Terms of Service | Lends Marketplace',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Terms of Service for Lends Marketplace. Please read these terms carefully before using our platform.',
    },
  },
};

// This is the fallback page, in case there's no Terms of Service asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
