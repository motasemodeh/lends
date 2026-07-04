import React from 'react';

// Utils
import {
  getDetailCustomFieldValue,
  isFieldForCategory,
  isFieldForListingType,
  pickCategoryFields,
  pickCustomFieldProps,
} from '../../util/fieldHelpers.js';

import CustomExtendedDataSection from '../../components/CustomExtendedDataSection/CustomExtendedDataSection.js';

/**
 * Renders custom listing fields.
 * - SectionDetails is used if schemaType is 'enum', 'long', or 'boolean'
 * - SectionMultiEnum is used if schemaType is 'multi-enum'
 * - SectionText is used if schemaType is 'text'
 *
 * @param {*} props include publicData, metadata, listingFieldConfigs, categoryConfiguration
 * @returns React.Fragment containing aforementioned components
 */
const CustomListingFields = props => {
  const { publicData, metadata, listingFieldConfigs, categoryConfiguration, intl } = props;

  if (!categoryConfiguration) {
    return null;
  }
  const { key: categoryPrefix, categories: listingCategoriesConfig } = categoryConfiguration;
  const categoriesObj = pickCategoryFields(publicData, categoryPrefix, 1, listingCategoriesConfig);
  const currentCategories = Object.values(categoriesObj);

  // Fields are shown by default. Set showConfig.displayOnListingPage to false to explicitly hide a field.
  const displayableFieldConfigs = listingFieldConfigs.filter(
    fieldConfig => fieldConfig.showConfig?.displayOnListingPage !== false
  );

  const displayableFieldConfigsWithMinDuration = [
    ...displayableFieldConfigs,
    {
      key: 'minimumRentalDuration',
      schemaType: 'enum',
      showConfig: {
        isDetail: true,
        label: 'Minimum rental',
      },
    },
  ];

  const isFieldForSelectedCategories = fieldConfig => {
    const isTargetCategory = isFieldForCategory(currentCategories, fieldConfig);
    return isTargetCategory;
  };
  const propsForCustomFields =
    pickCustomFieldProps(
      { publicData, metadata },
      displayableFieldConfigs,
      'listingType',
      isFieldForSelectedCategories
    ) || [];

  const sectionDetailsProps = {
    ...props,
    isFieldForCategory: isFieldForSelectedCategories,
    fieldConfigs: displayableFieldConfigsWithMinDuration,
    heading: 'ListingPage.detailsTitle',
  };

  const pickExtendedDataFields = (filteredConfigs, config) => {
    const { key, schemaType, enumOptions, showConfig = {} } = config;
    const { isDetail, label } = showConfig;
    const publicDataValue = publicData[key];
    const metadataValue = metadata[key];
    const value = publicDataValue != null ? publicDataValue : metadataValue;

    if (key === 'minimumRentalDuration') {
      if (typeof value !== 'undefined') {
        const getMinimumRentalDurationLabel = (duration) => {
          const days = parseInt(duration, 10);
          return isNaN(days) ? '1 day' : days === 1 ? '1 day' : `${days} days`;
        };

        return filteredConfigs.concat({
          key,
          label,
          value: getMinimumRentalDurationLabel(value),
        });
      }
      return filteredConfigs;
    }

    const listingType = publicData.listingType;
    const isTargetListingType = isFieldForListingType(listingType, config);
    const isTargetCategory = isFieldForCategory(currentCategories, config);

    if (isDetail && isTargetListingType && isTargetCategory && typeof value !== 'undefined') {
      const detailValue = getDetailCustomFieldValue(
        enumOptions,
        value,
        schemaType,
        key,
        label,
        intl,
        'ListingPage',
        props.currency
      );

      return detailValue ? filteredConfigs.concat(detailValue) : filteredConfigs;
    }
    return filteredConfigs;
  };

  return (
    <CustomExtendedDataSection
      sectionDetailsProps={sectionDetailsProps}
      propsForCustomFields={propsForCustomFields}
      idPrefix="listingPage"
      pickExtendedDataFields={pickExtendedDataFields}
    />
  );
};

export default CustomListingFields;
