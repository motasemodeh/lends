import React from 'react';
import loadable from '@loadable/component';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

const fallbackTerms = `
### TERMS OF SERVICE

### FOR

### LENDS MARKETPLACE

Last Updated:
[5/8/2026]

These Terms of Service (“Terms”) govern user (“you,” “your,” “user,” or similar references) access to and use of Lends’ website, mobile applications, and related services (collectively, the “Platform”). The Platform is an online marketplace that enables users to list, discover, and book (i) physical goods (such as equipment, tools, and furnishings), (ii) spaces (such as studios, event venues, and commercial premises), and (iii) services related to or independent of such goods and spaces (collectively, “Listings”).

The Platform connects users who offer Listings (“Providers”) with users who seek to rent or book such Listings (“Customers”). Lends operates solely as a technology platform and does not own, control, or provide the goods, spaces, or services listed, and is not a party to any agreement between users except as expressly stated in these Terms.

By accessing or using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not access or use the Platform.

### 1. ACCEPTANCE OF TERMS; ELIGIBILITY.

1.1. Acceptance of Terms. By accessing or using the Platform, you agree to be bound by these Terms and all policies referenced herein, including the Privacy Policy and any additional policies, guidelines, or rules posted on the Platform from time to time (collectively, the “Agreement”). If you do not agree to the Agreement, you may not access or use the Platform.

1.2. Eligibility. You must be at least eighteen (18) years old and capable of forming a legally binding contract to use the Platform. By using the Platform, you represent and warrant that you meet these requirements. If you are using the Platform on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind such entity to this Agreement, and in such case, “you,” “your,” and “user” will refer to that entity.

1.3. Compliance with Laws. You agree to access and use the Platform in compliance with all applicable laws, rules, and regulations. You may not use the Platform if you are prohibited from doing so under applicable law.

1.4. Account Requirement. Certain features of the Platform may require you to register for an account. You agree to provide accurate, current, and complete information and to keep such information updated.

1.5. Account Security. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Lends immediately of any unauthorized access to or use of your account.

1.6. Right to Refuse or Terminate Access. Lends reserves the right, in its sole discretion, to suspend, restrict, or terminate your access to the Platform at any time, with or without notice, for any reason, including if you violate this Agreement or if your use of the Platform may create risk or legal exposure for Lends or others.

### 2. DEFINITIONS.

For purposes of these Terms, the following definitions apply:

2.1. “Platform” means Lends’ website, mobile applications, and all other related services.

2.2. “User” means any individual or entity that accesses or uses the Platform.

2.3. “Provider” means a User who lists or offers any Listing on the Platform, including owners, hosts, or service providers.

2.4. “Customer” means a User who books, rents, or otherwise obtains a Listing through the Platform.

2.5. “Listing” means any offering made available through the Platform, including (i) Goods, (ii) Spaces, and/or (iii) Services.

2.6. “Goods” means tangible personal property made available for temporary use or rental through the Platform.

2.7. “Spaces” means real property, premises, or portions thereof made available for temporary use, occupancy, or rental through the Platform.

2.8. “Services” means services offered by Providers through the Platform, whether related to Goods or Spaces or offered independently.

2.9. “Booking” means a confirmed reservation or transaction between a Provider and a Customer for a Listing.

2.10. “Rental Period” means the period of time during which a Customer is authorized to use a Listing, as agreed between the Provider and Customer.

2.11. “Fees” means any amounts charged through the Platform, including rental fees, service fees, deposits, cancellation fees, and any applicable taxes.

### 3. NATURE OF THE PLATFORM.

3.1. Marketplace Function. The Platform provides an online marketplace that enables Providers to list and offer Listings and enables Customers to discover and book such Listings. Listings may include Goods, Spaces, and Services. Lends facilitates these connections but does not provide, own, lease, manage, control, or deliver any Listings.

3.2. No Ownership or Control. All Listings are owned, controlled, and provided solely by Providers. Lends does not take possession of or have control over any Goods or Spaces and does not supervise, direct, or control any Services. As a result, Lends does not guarantee the existence, quality, safety, suitability, legality, or condition of any Listing.

3.3. No Agency or Employment Relationship. Lends is not a party to any agreement between Providers and Customers and does not act as an agent, broker, partner, joint venturer, employer, or representative of any User. Providers act solely on their own behalf and are not employees or agents of Lends.

3.4. User Responsibility for Transactions. Providers and Customers are solely responsible for:
* Negotiating and agreeing to the terms of any Booking;
* Performing their respective obligations; and
* Complying with all applicable laws, rules, and regulations in connection with any Listing or Booking.

Any agreement formed in connection with a Booking is solely between the Provider and the Customer.

3.5. No Endorsement or Verification. Lends does not endorse any User or Listing. While the Platform may offer features such as profiles, ratings, reviews, or verification tools, Lends does not guarantee the accuracy, completeness, or reliability of any information provided by Users.

3.6. Services Disclaimer. With respect to Services, Lends does not provide, perform, supervise, or control any Services and makes no representations or warranties regarding the quality, timing, legality, or outcome of any Services. Any Services are provided solely by the applicable Provider, who is solely responsible for the performance and results of such Services.

3.7. Spaces Disclaimer. With respect to Spaces, Lends does not own, lease, or control any real property listed on the Platform. Any use or occupancy of a Space is based solely on the agreement between the Provider and the Customer, and Lends is not a landlord or property manager. Use of Spaces does not create a leasehold or tenancy relationship unless expressly agreed between the Provider and the Customer.

### 4. USER ACCOUNTS.

4.1. Account Registration. To access certain features of the Platform, you will be required to create an account. When registering for an account, you agree to provide accurate, current, and complete information and to keep such information updated at all times.

4.2. Account Responsibility. You are responsible for all activity that occurs under your account, whether or not authorized by you. You agree to use the Platform only for lawful purposes and in accordance with these Terms.

4.3. Account Security. You are responsible for maintaining the confidentiality of your login credentials and for restricting access to your account. You agree to notify Lends immediately of any unauthorized access to or use of your account or any other breach of security.

4.4. Verification and Background Checks. Lends may, but is not obligated to, verify the identity of Users or conduct background checks. Any verification processes conducted by Lends are for informational purposes only, and Lends does not guarantee the accuracy, completeness, or reliability of any such verification.

4.5. User Information and Profiles. Users may create profiles, listings, and other content on the Platform. You are solely responsible for the accuracy and completeness of any information you provide, including descriptions of Listings, qualifications, availability, and pricing.

4.6. Multiple Accounts; Account Transfers. You may not create multiple accounts or transfer your account to another person or entity without Lends’ prior written consent.

4.7. Suspension and Termination. Lends reserves the right, in its sole discretion, to suspend, restrict, or terminate your account or access to the Platform at any time, with or without notice, for any reason, including if you violate these Terms or if your use of the Platform may create risk or legal exposure for Lends or other Users.

4.8. No Guarantee of Access. Lends does not guarantee that the Platform or any portion thereof will be available at all times, and may modify, suspend, or discontinue any aspect of the Platform at any time without liability.

4.9. Communications Monitoring. Lends may monitor, review, retain, or disclose communications made through the Platform for purposes including fraud prevention, safety, enforcement of these Terms, customer support, and legal compliance.

### 5. LISTINGS & BOOKINGS (GENERAL).

5.1. Creation of Listings. Providers may create Listings for Goods, Spaces, and/or Services by submitting information through the Platform. Providers are solely responsible for the accuracy, completeness, and legality of all Listings, including descriptions, pricing, availability, specifications, qualifications, and any applicable terms or conditions. Lends reserves the right, but is not obligated, to review, approve, modify, or remove any Listing at any time, for any reason.

5.2. Listing Content and Requirements. Providers must ensure that all Listings:
* Accurately describe the Goods, Spaces, or Services offered;
* Comply with all applicable laws, regulations, and industry standards; and
* Do not include false, misleading, or deceptive information.

Providers are solely responsible for ensuring that they have all necessary rights, licenses, permits, and authority to offer their Listings.

5.3. Booking Process. Customers may request or initiate a Booking through the Platform. A Booking is confirmed only when accepted by the Provider or otherwise confirmed through the Platform, as applicable. Once confirmed, a Booking constitutes a binding agreement between the Provider and the Customer, subject to these Terms and any additional terms specified in the Listing.

5.4. Pricing and Availability. Providers are responsible for setting the pricing, fees, and availability of their Listings, unless otherwise specified by the Platform. Providers must honor the pricing and availability set forth in a confirmed Booking. Lends is not responsible for errors in pricing or availability provided by Providers.

5.5. Changes and Cancellations by Providers. Providers may not cancel or materially alter a confirmed Booking except in accordance with these Terms or any applicable cancellation policy. Repeated cancellations or failures to honor Bookings may result in penalties, suspension, or removal from the Platform.

5.6. Customer Obligations. Customers agree to review Listings carefully before booking and are responsible for understanding the terms, requirements, and restrictions associated with any Listing, including use limitations, safety requirements, and any qualifications needed to use Goods, Spaces, or Services.

5.7. Platform Rights. Lends reserves the right, in its sole discretion, to cancel or refuse any Booking, remove any Listing, or restrict access to the Platform where necessary to prevent fraud, ensure safety, comply with legal obligations, or mitigate risk.

5.8. No Guarantee of Listings or Bookings. Lends does not guarantee the availability, quality, safety, or suitability of any Listing or that any Booking request will be accepted or fulfilled.

### 6. PAYMENTS & FEES.

6.1. Payment Processing. The Platform may facilitate payments between Customers and Providers through one or more third-party payment processors (“Payment Processors”). By using the Platform, you agree to comply with the terms and conditions of any applicable Payment Processor. Lends is not a bank, money transmitter, or payment processor and does not hold funds for Users, except as may be required to facilitate transactions through Payment Processors.

6.2. Authorization to Charge. By providing a payment method, you authorize Lends and its Payment Processors to charge your payment method for all Fees incurred in connection with your use of the Platform, including Booking fees, service fees, deposits, cancellation fees, and any applicable taxes.

6.3. Fees and Commissions. Lends may charge service fees, commissions, or other Fees in connection with the use of the Platform. Applicable Fees will be disclosed prior to completion of a Booking. Unless otherwise stated, Fees paid to Lends are non-refundable.

6.4. Pricing. Providers are responsible for setting the pricing of their Listings, including any applicable rates, fees, and deposits, unless otherwise specified by the Platform. Customers agree to pay all amounts associated with a confirmed Booking.

6.5. Security Deposits. Certain Listings may require a security deposit. Deposits may be used to cover damage, loss, late returns, or other amounts owed in connection with a Booking, in accordance with these Terms and any applicable Listing terms. Lends reserves the right to charge or authorize charges against a Customer’s payment method for such amounts, subject to applicable law.

6.6. Payouts to Providers. Payments to Providers will be processed through the Payment Processor in accordance with its terms and any applicable payout schedule established by Lends. Lends may withhold or delay payouts where necessary to investigate potential fraud, disputes, chargebacks, or violations of these Terms.

6.7. Taxes. Users are responsible for determining and fulfilling their obligations with respect to applicable taxes, including sales, use, rental, income, or similar taxes arising from their use of the Platform. Where required by law, Lends or its Payment Processors may collect and remit certain taxes on behalf of Users.

6.8. Refunds and Chargebacks. Refunds are subject to the applicable cancellation policy and these Terms. If a Customer initiates a chargeback or payment dispute, Lends reserves the right to recover the disputed amount and any associated fees from the responsible User, including by offsetting against future payouts or charging the User’s payment method.

6.9. Currency and Payment Terms. All payments will be processed in the currency displayed on the Platform unless otherwise specified. Additional fees may apply for currency conversion or international transactions.

### 7. CANCELLATION & REFUNDS.

7.1. Cancellation Policies. Each Listing may be subject to a cancellation policy established by the Provider and/or the Platform (“Cancellation Policy”). The applicable Cancellation Policy will be disclosed to Customers prior to completing a Booking. By confirming a Booking, Customers agree to the applicable Cancellation Policy.

7.2. Customer Cancellations. Customers may cancel a Booking in accordance with the applicable Cancellation Policy. Any refunds will be determined based on such policy, the timing of the cancellation, and any applicable Fees.

7.3. Provider Cancellations. Providers are expected to honor all confirmed Bookings. If a Provider cancels a confirmed Booking, the Customer may be entitled to a refund in accordance with these Terms and the applicable Cancellation Policy. Repeated cancellations or failure to fulfill Bookings may result in penalties, reduced visibility, suspension, or removal from the Platform.

7.4. No-Shows and Failure to Use. If a Customer fails to appear for or utilize a Booking (“No-Show”), refunds, if any, will be determined in accordance with the applicable Cancellation Policy. Providers may be entitled to retain some or all Fees in the event of a No-Show, as specified in the applicable policy.

7.5. Late Returns and Extensions. Customers are responsible for returning Goods or vacating Spaces at the end of the Rental Period, unless an extension is agreed upon. Late returns or unauthorized extensions may result in additional Fees, as determined by the Provider and/or the Platform.

7.6. Platform-Initiated Cancellations. Lends reserves the right, in its sole discretion, to cancel any Booking where necessary to prevent fraud, ensure safety, comply with legal obligations, or mitigate risk. In such cases, Lends may, but is not obligated to, provide a refund or credit to the affected User.

7.7. Service-Specific Considerations. For Listings involving Services, cancellation terms may also take into account preparation time, scheduling commitments, or other factors specific to the nature of the Services, as set forth in the applicable Listing or Cancellation Policy.

7.8. Non-Refundable Fees. Certain Fees, including Platform service fees, may be non-refundable unless otherwise required by law or expressly stated otherwise.

7.9. Disputes Regarding Cancellations. Any disputes between Providers and Customers regarding cancellations or refunds are primarily between those parties. Lends may, but is not obligated to, assist in resolving such disputes.

### 8. PROVIDER TERMS.

8.1. General Responsibilities. As a Provider, you are solely responsible for your Listings and for complying with all obligations associated with any Booking. You represent and warrant that you have all rights, authority, and capacity necessary to offer your Listings and to enter into agreements with Customers.

8.2. Accuracy of Listings. You must ensure that all Listings are accurate, complete, and not misleading, including descriptions, specifications, pricing, availability, and any requirements or restrictions. You are solely responsible for ensuring that Listings accurately reflect the condition, characteristics, and suitability of any Goods, Spaces, or Services offered.

8.3. Legal Compliance. You agree to comply with all applicable laws, rules, and regulations in connection with your Listings and any Bookings, including those relating to:
* Rental or use of Goods;
* Use and occupancy of Spaces (including zoning, permitting, fire codes, and occupancy limits); and
* Provision of Services (including licensing, certification, and professional requirements, where applicable).

8.4. Safety and Condition. You are responsible for ensuring that all Goods and Spaces are safe, clean, properly maintained, and suitable for their intended use. You must disclose any known defects, hazards, or limitations associated with your Listings and provide any necessary instructions, warnings, or safety information to Customers.

8.5. Performance of Services. If you offer Services, you are solely responsible for performing such Services in a professional, competent, and lawful manner. You represent and warrant that you possess all required qualifications, licenses, and expertise necessary to provide the Services and that such Services will be performed in accordance with applicable standards.

8.6. Availability and Fulfillment. You agree to honor all confirmed Bookings and to make Listings available as described. You must provide Customers with any necessary access, instructions, or coordination required to complete the Booking.

8.7. Risk of Loss and Damage. Except as otherwise provided in these Terms or in any applicable protection program, you are responsible for the condition of your Listings and for determining how risk of loss, damage, or theft is addressed in your Listings. You acknowledge that use of the Platform involves inherent risks, and you assume such risks in offering Listings to Customers.

8.8. Insurance. You are solely responsible for maintaining any insurance coverage you deem appropriate for your Listings, including coverage for property damage, personal injury, or liability arising from the use of Goods, Spaces, or Services. Lends does not provide insurance coverage for Providers unless expressly stated otherwise.

8.9. Prohibited Listings. You may not list any Goods, Spaces, or Services that are illegal, unsafe, infringing, or otherwise prohibited under these Terms or applicable law. Lends reserves the right to remove any Listing that violates these Terms or presents risk to Users or the Platform.

8.10. Taxes. You are solely responsible for determining and fulfilling your obligations with respect to any applicable taxes arising from your Listings or Bookings, including income, sales, use, or similar taxes.

8.11. Relationship with Platform. You acknowledge that you are an independent user of the Platform and not an employee, agent, partner, or representative of Lends. Nothing in these Terms creates any joint venture, partnership, or employment relationship between you and Lends.

### 9. CUSTOMER TERMS.

9.1. General Responsibilities. As a Customer, you are responsible for your use of any Listings and for complying with all obligations associated with any Booking. You agree to use all Listings in a lawful, safe, and responsible manner and in accordance with these Terms and any applicable Listing terms.

9.2. Review of Listings. You are responsible for reviewing all Listing details, including descriptions, requirements, restrictions, and any applicable Cancellation Policy, prior to confirming a Booking. You acknowledge that Listings are provided by Providers and that Lends does not guarantee their accuracy, quality, or suitability.

9.3. Use of Goods. You agree to use any Goods only for their intended purpose and in accordance with any instructions, safety guidelines, or restrictions provided by the Provider. You are responsible for ensuring that you have the necessary knowledge, skill, and qualifications to safely use any Goods.

9.4. Use of Spaces. You agree to use any Spaces in compliance with all applicable laws and any rules or restrictions specified by the Provider, including occupancy limits, noise restrictions, and permitted uses. You are responsible for the conduct of any individuals you invite or allow into a Space and for ensuring that such individuals comply with these Terms.

9.5. Services. You acknowledge that any Services are provided solely by the applicable Provider and not by Lends. You are responsible for evaluating the suitability, qualifications, and performance of any Provider offering Services and for communicating any requirements or expectations directly with the Provider.

9.6. Condition, Return, and Access. You agree to return any Goods and vacate any Spaces at the end of the applicable Rental Period in the same condition as received, reasonable wear and tear excepted. You are responsible for any delays, unauthorized extensions, or failure to return or vacate as required.

9.7. Responsibility for Damage & Loss. You are responsible for any damage to, loss of, or theft of Goods or Spaces arising from your use of a Listing, except to the extent caused by the Provider or as otherwise provided in these Terms. You authorize Lends to charge your payment method for any such amounts, including repair, replacement, cleaning, or related costs, in accordance with these Terms.

9.8. Assumption of Risk. You acknowledge that the use of Goods, occupancy of Spaces, and receipt of Services may involve inherent risks, including risk of personal injury, property damage, or other harm. To the maximum extent permitted by law, you voluntarily assume all such risks arising from or related to your use of any Listing, including risks associated with entering private property, interacting with third parties, attending events, or using equipment.

9.9. Prohibited Conduct. You agree not to:
* Use any Listing for unlawful or hazardous purposes;
* Misuse, damage, or improperly handle any Goods or Spaces;
* Engage in disruptive, unsafe, or abusive behavior; or
* Violate any rules or requirements specified by the Provider or applicable law.

9.10. Compliance with Laws. You are solely responsible for complying with all applicable laws, rules, and regulations in connection with your use of any Listing, including any permits, licenses, or approvals required for your intended use.

### 10. SERVICE-SPECIFIC TERMS.

10.1. Independent Services. All Services offered through the Platform are provided solely by Providers. Lends does not provide, perform, supervise, or control any Services and is not responsible for the acts or omissions of any Provider.

10.2. No Guarantee of Quality or Outcomes. Lends makes no representations or warranties regarding the quality, safety, legality, suitability, or outcome of any Services. Any descriptions, qualifications, or representations regarding Services are provided by the applicable Provider and have not been independently verified by Lends.

10.3. Provider Responsibility. Providers are solely responsible for the performance of Services, including the quality, timing, legality, and results of such Services. Providers represent and warrant that they possess all required skills, qualifications, licenses, and permits required to perform their Services.

10.4. Customer Responsibility. Customers are solely responsible for evaluating the suitability of any Provider and for communicating their requirements, expectations, and any relevant information necessary for the performance of Services.

10.5. No Employment or Agency Relationship. Nothing in these Terms creates any employment, agency, partnership, or joint venture relationship between Lends and any Provider. Providers operate as independent contractors and are solely responsible for determining how to perform their Services.

10.6. Compliance with Laws. Providers and Customers are each responsible for complying with all applicable laws, rules, and regulations relating to the provision and receipt of Services, including any licensing, labor, or regulatory requirements.

10.7. No Professional Advice. To the extent any Services involve professional or specialized activities, such Services are provided solely by the applicable Provider. Lends does not provide professional advice and disclaims any responsibility for reliance on any Services obtained through the Platform.

### 11. SPECIAL PROVISIONS FOR SPACES.

11.1. License to Use; No Tenancy. Any Booking of a Space grants the Customer a limited, temporary, revocable license to use the Space for the agreed-upon purpose and Rental Period. Nothing in these Terms or any Booking creates a lease, tenancy, or other real property interest in favor of the Customer unless expressly agreed in a separate written agreement between the Provider and the Customer.

11.2. No Landlord or Property Management Role. Lends does not own, lease, manage, or control any Spaces listed on the Platform and is not a landlord, property manager, or real estate broker. All Spaces are provided solely by Providers, who are responsible for the condition, legality, and operation of such Spaces.

11.3. Compliance with Laws and Requirements. Providers and Customers are each responsible for complying with all applicable laws, rules, and regulations relating to the use of Spaces, including zoning laws, occupancy limits, fire and safety regulations, accessibility requirements, and any permits or licenses required for the intended use.

11.4. Use Restrictions. Customers must use Spaces only for lawful purposes and in accordance with any rules, restrictions, or conditions specified by the Provider, including those relating to capacity, noise, hours of use, and permitted activities.

11.5. Responsibility for Conduct. Customers are responsible for their own conduct and the conduct of any guests, invitees, or third parties present in a Space during a Booking. Customers agree to ensure that all such individuals comply with these Terms and any applicable rules or restrictions.

11.6. Condition and Damage. Customers are responsible for maintaining the condition of the Space during the Rental Period and for any damage, excessive cleaning, or loss caused by the Customer or their guests, reasonable wear and tear excepted.

11.7. No Guarantee of Suitability. Lends makes no representations or warranties regarding the suitability, safety, or condition of any Space for any particular purpose. Customers are responsible for determining whether a Space meets their needs prior to Booking.

11.8. Events and Activities. If a Space is used for events, gatherings, or commercial activities, the Customer is solely responsible for obtaining any required permits, licenses, insurance, or approvals and for ensuring compliance with all applicable laws and regulations.

11.9. Access and Availability. Providers are responsible for providing access to Spaces as described in the Listing. Lends is not responsible for any failure by a Provider to provide access or for interruptions to the availability of a Space.

11.10. Surveillance and Recording Devices. Providers are solely responsible for complying with all applicable laws relating to surveillance, monitoring, or recording devices in Spaces and for disclosing the existence and location of any such devices to Customers as required by law. Hidden or undisclosed recording devices are strictly prohibited.

### 12. PROHIBITED ACTIVITIES.

12.1. General Prohibition. You agree not to use the Platform or any Listing in any manner that violates these Terms or applicable law, or that could harm Lends, its Users, or any third party.

12.2. Prohibited Uses of the Platform. You agree not to:
* Use the Platform for any unlawful, fraudulent, deceptive, or abusive purpose;
* Misrepresent your identity, qualifications, Listings, or intentions;
* Provide false, misleading, or inaccurate information;
* Circumvent or attempt to circumvent the Platform, including by arranging transactions outside of the Platform to avoid Fees;
* Interfere with or disrupt the operation of the Platform or any systems or networks connected to it;
* Access or use the Platform through automated means (including bots, scrapers, or similar tools) without authorization;
* Attempt to gain unauthorized access to any accounts, systems, or data; or
* Engage in any activity that imposes an unreasonable or disproportionately large load on the Platform.

12.3. Prohibited Conduct in Connection with Listings. You agree not to:
* List or offer any Goods, Spaces, or Services that are illegal, unsafe, hazardous, or otherwise prohibited, including, without limitation, any firearms, animals, motorized vehicles that require a license to operate, pharmaceuticals, or any other items that require a license or certification to provide;
* Use any Listing for unlawful, dangerous, or inappropriate purposes;
* Misuse, damage, or improperly handle any Goods or Spaces;
* Engage in disruptive, unsafe, or abusive behavior; or
* Violate any rules or requirements specified by the Provider or applicable law.

12.4. Reporting Violations. If you become aware of any Listing or conduct that violates these Terms, you agree to notify Lends immediately. Lends reserves the right to take any action it deems appropriate in response to such violations.

### 13. CONTENT & LISTINGS.

13.1. User Content. Users may submit, post, or display content on the Platform, including Listings, profile information, reviews, and communications (“User Content”). You represent and warrant that you have all rights and authority necessary to provide your User Content and that it does not infringe upon the rights of any third party.

13.2. License to Lends. By providing User Content, you grant Lends a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content for purposes of operating, promoting, and improving the Platform.

13.3. Responsibility for User Content. You are solely responsible for your User Content and for any consequences of providing it. Lends does not endorse or guarantee the accuracy of any User Content and disclaims all liability in connection with it.

13.4. Monitoring and Removal. Lends reserves the right, but is not obligated, to monitor, review, or remove User Content at any time, for any reason, including if it violates these Terms or is otherwise objectionable.

### 14. DISCLAIMERS.

14.1. As-Is Basis. The Platform and all Listings are provided on an “as-is” and “as-available” basis, without warranties of any kind, either express or implied. To the maximum extent permitted by law, Lends disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.

14.2. No Guarantee of Accuracy. Lends does not guarantee the accuracy, completeness, or reliability of any information on the Platform, including Listings, User profiles, or verification tools.

14.3. User Responsibility. You are solely responsible for your interactions with other Users and for your use of any Listings. Lends is not responsible for the conduct of any User or for any damage or loss arising from your interactions or transactions.

### 15. LIMITATION OF LIABILITY.

15.1. No Indirect Damages. To the maximum extent permitted by law, Lends will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.

15.2. Liability Cap. In no event will Lends’ total liability for all claims arising out of or related to these Terms or the Platform exceed the greater of one hundred dollars ($100) or the total fees paid to Lends in the twelve (12) months preceding the event giving rise to the claim.

### 16. INDEMNIFICATION.

You agree to indemnify, defend, and hold harmless Lends and its affiliates, officers, directors, employees, and agents from and against all claims, liabilities, damages, losses, and expenses, including reasonable attorney’s fees, arising out of or related to:
* Your access to or use of the Platform;
* Your User Content or Listings;
* Your breach of these Terms; or
* Your interactions or transactions with any other User.

### 17. DISPUTES BETWEEN USERS.

Any disputes between Users are solely between those parties. Lends may, but is not obligated to, assist in resolving such disputes. Lends disclaims all liability in connection with disputes between Users.

### 18. TERMINATION.

Lends may suspend or terminate your access to the Platform at any time, with or without notice, for any reason, including if you violate these Terms or if your use of the Platform may create risk or legal exposure for Lends or others.

### 19. PRIVACY AND DATA USE.

Your use of the Platform is subject to our Privacy Policy, which describes how we collect, use, and protect your information.

### 20. GOVERNING LAW & DISPUTE RESOLUTION.

20.1. Governing Law. These Terms are governed by the laws of the State of New York, without regard to its conflict of law principles.

20.2. Dispute Resolution. Any dispute arising out of or related to these Terms or the Platform will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.

### 21. GENERAL PROVISIONS.

21.1. Entire Agreement. These Terms constitute the entire agreement between you and Lends regarding the Platform and supersede all prior agreements.

21.2. Severability. If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.

21.3. Waiver. No waiver of any provision of these Terms will be deemed a further or continuing waiver of such provision or any other provision.
`;

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

const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
