import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// NOTE: You could add the actual Privacy Policy here as a fallback
//       instead of showing this error message.
const fallbackPrivacyPolicy = `
# LENDS MARKETPLACE PRIVACY POLICY
**Last Updated: 5/8/2026**

This Privacy Policy describes how Lends LLC (“Lends,” “we,” “us,” or “our”) collects, uses, discloses, and protects information about you when you access or use our website, mobile applications, and related services (collectively, the “Platform”). This Privacy Policy applies to all users of the Platform, including individuals who create accounts, list or offer goods, spaces, or services, or book or otherwise use such offerings through the Platform. By accessing or using the Platform, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this Privacy Policy, you should not access or use the Platform. Capitalized terms not otherwise defined herein have the meanings set forth in the Terms of Service.

### 1. Information We Collect
We collect information about you from a variety of sources, including information you provide directly, information collected automatically when you use the Platform, and information from third parties.

#### 1.1. Information You Provide to Us
We collect information that you provide directly when you create an account, use the Platform, or communicate with us or other Users. This may include:
*   **1.1.1. Account Information:** such as your name, email address, phone number, username, and password
*   **1.1.2. Profile Information:** such as profile photos, business information, descriptions, and preferences
*   **1.1.3. Listing Information:** details about Goods, Spaces, or Services you offer, including descriptions, pricing, availability, images, and specifications
*   **1.1.4. Booking Information:** details you provide when making or managing a Booking.
*   **1.1.5. Communications:** messages you send through the Platform (including communications between Providers and Customers)
*   **1.1.6. Support Requests:** information you provide when contacting customer support

#### 1.2. Transaction and Payment Information
When you make or receive payments through the Platform, we collect information related to those transactions, including:
*   **1.2.1. Booking details and transaction history**
*   **1.2.2. Billing information** (such as name and billing address)
*   **1.2.3. Payment status and related records**

Payment processing is handled by third-party Payment Processors, and we do not store full payment card details. Such information is collected and processed in accordance with the Payment Processor’s privacy policy.

#### 1.3. Identity Verification Information
We may collect information to verify your identity or prevent fraud, including:
*   **1.3.1. Government-issued identification**
*   **1.3.2. Date of birth**
*   **1.3.3. Photographs or images submitted for identity verification purposes**

#### 1.4. Information Collected Automatically
When you access or use the Platform, we automatically collect certain information, including:
*   **1.4.1. Device Information:** such as IP address, browser type, operating system, and device identifiers
*   **1.4.2. Usage Information:** such as pages viewed, features used, search queries, and interactions with the Platform
*   **1.4.3. Log Data:** timestamps, referring/exit pages, and clickstream data

#### 1.5. Cookies and Tracking Technologies
We use cookies, pixels, and similar tracking technologies to collect information about your interactions with the Platform and to improve your experience.

#### 1.6. Location Information
Location information may be used to facilitate Listings, Bookings, logistics, fraud prevention, and to improve the Platform.

#### 1.7. Information from Third Parties
We may receive information about you from third parties, such as payment processors, identity verification providers, and analytics providers.

### 2. How We Use Information
We use the information we collect for a variety of business and operational purposes, including to provide, maintain, improve, and protect the Platform and our Users.

*   **2.1. To Ensure Safety or Prevent Fraud.**
*   **2.2. To Provide and Operate the Platform.**
*   **2.3. To Personalize and Improve the Platform.**
*   **2.4. To Communicate with You.**
*   **2.5. To Promote Safety and Security.**
*   **2.6. To Comply with Legal Obligations.**
*   **2.7. For Analytics and Advertising.**
*   **2.8. Aggregated and De-Identified Information.**

### 3. How We Share Information
We may share information about you as described in this Privacy Policy:
*   **3.1. Sharing Between Users:** To facilitate Listings and Bookings.
*   **3.2. Service Providers and Vendors:** Third parties that perform services on our behalf.
*   **3.3. Payment Processors:** Transaction and account information to facilitate payments.
*   **3.4. Legal Compliance and Protection:** If required by law or to protect rights.
*   **3.5. Business Transfers:** In connection with a merger or sale.
*   **3.6. With Your Consent or Direction.**

### 4. Cookies and Tracking Technologies
We and our third-party service providers use tracking technologies to improve your experience and analyze Platform traffic.

### 5. Data Retention and Security
We retain information for as long as reasonably necessary to provide the Platform and comply with legal obligations. We implement safeguards to protect your data, though no electronic transmission is 100% secure.

### 6. User Rights and Choices
Depending on your location, you may have rights regarding your personal information, including access, correction, and deletion.

### 7. Children’s Privacy
The Platform is not intended for individuals under the age of eighteen (18).

### 8. Changes to This Privacy Policy
We may update this policy from time to time. Your continued use of the Platform constitutes acknowledgment of any revisions.

### 9. Contact Information
If you have any questions, you may contact us through the Platform.

### 10. Applicability
This Privacy Policy applies to Lends LLC and not to the practices of individual Users.

### 11. Third-Party Links and Services
We are not responsible for the privacy practices of third-party websites linked through the Platform.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'privacy',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Privacy Policy' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackPrivacyPolicy,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Privacy Policy | Lends Marketplace',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Privacy Policy for Lends Marketplace. Learn how we collect, use, and protect your information.',
    },
  },
};

// This is the fallback page, in case there's no Privacy Policy asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
