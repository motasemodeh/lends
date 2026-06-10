import React, { useState, useEffect, useRef, useCallback } from 'react';

// Utils
import { useIntl, FormattedMessage } from '../../../../util/reactIntl';
import { ensureListing } from '../../../../util/data';

// Shared components
import { Button, H3, H4 } from '../../../../components';

import css from './EditListingRecommendsPanel.module.css';

const MAX_RECOMMENDATIONS = 5;
const DEBOUNCE_MS = 300;

/**
 * EditListingRecommendsPanel
 *
 * Allows a provider to search for and select up to 5 listings to recommend
 * on their own listing page. Saves selected listing UUIDs to
 * publicData.recommendedListingIds.
 *
 * @component
 */
const EditListingRecommendsPanel = props => {
  const {
    listing,
    onSubmit,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    updatePageTitle,
    onSearchListings,
  } = props;

  const intl = useIntl();
  const currentListing = ensureListing(listing);
  const { title = '', publicData = {} } = currentListing.attributes || {};

  // ─── State ───────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Selected listings: array of { id, title, price, imageUrl }
  const [selectedListings, setSelectedListings] = useState(() => {
    const saved = publicData?.recommendedListingIds || [];
    return saved.map(uuid => ({ id: uuid, title: '', price: null, imageUrl: null }));
  });

  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // ─── Close dropdown on outside click ─────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ─── Search via Redux thunk ───────────────────────────────────────────────────
  const doSearch = useCallback(
    query => {
      if (!query || query.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      onSearchListings(query)
        .then(results => {
          setSearchResults(results || []);
          setShowDropdown(true);
        })
        .catch(() => {
          setSearchResults([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    },
    [onSearchListings]
  );

  // ─── Debounced search trigger ─────────────────────────────────────────────────
  const handleSearchChange = e => {
    const q = e.target.value;
    setSearchQuery(q);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(q), DEBOUNCE_MS);
  };

  // ─── Add / Remove ─────────────────────────────────────────────────────────────
  const isSelected = id => selectedListings.some(l => l.id === id);
  const isMaxReached = selectedListings.length >= MAX_RECOMMENDATIONS;

  const handleAdd = listing => {
    if (isMaxReached || isSelected(listing.id)) return;
    setSelectedListings(prev => [...prev, listing]);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleRemove = id => {
    setSelectedListings(prev => prev.filter(l => l.id !== id));
  };

  // ─── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    const updateValues = {
      publicData: {
        recommendedListingIds: selectedListings.map(l => l.id),
      },
    };
    onSubmit(updateValues);
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────────
  const formatPrice = price => {
    if (!price) return null;
    const amount = price.amount / 100;
    return `$${amount.toFixed(2)}`;
  };

  const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingRecommendsPanel.title"
      values={{ listingTitle: <strong>{title}</strong> }}
    />
  ) : (
    <FormattedMessage id="EditListingRecommendsPanel.createListingTitle" />
  );

  return (
    <div className={css.root}>
      {updatePageTitle({ panelHeading: panelTitle })}

      <H3 as="h1" className={css.title}>
        {panelTitle}
      </H3>
      <p className={css.subtitle}>
        <FormattedMessage id="EditListingRecommendsPanel.subtitle" />
      </p>

      {/* ── Search ── */}
      <div className={css.searchSection}>
        <label className={css.searchLabel}>
          <FormattedMessage id="EditListingRecommendsPanel.searchLabel" />
        </label>
        <div className={css.searchWrapper} ref={wrapperRef}>
          <input
            className={css.searchInput}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            placeholder={intl.formatMessage({ id: 'EditListingRecommendsPanel.searchPlaceholder' })}
            disabled={isMaxReached}
          />

          {showDropdown && (
            <div className={css.dropdown}>
              {isSearching ? (
                <div className={css.noResults}>Searching…</div>
              ) : searchResults.length === 0 ? (
                <div className={css.noResults}>
                  <FormattedMessage id="EditListingRecommendsPanel.noResults" />
                </div>
              ) : (
                searchResults.map(result => {
                  const alreadySelected = isSelected(result.id);
                  return (
                    <div
                      key={result.id}
                      className={`${css.dropdownItem} ${alreadySelected || isMaxReached ? css.disabled : ''}`}
                    >
                      {result.imageUrl ? (
                        <img
                          src={result.imageUrl}
                          alt={result.title}
                          className={css.dropdownThumb}
                        />
                      ) : (
                        <div className={css.dropdownThumbPlaceholder}>📷</div>
                      )}
                      <div className={css.dropdownInfo}>
                        <div className={css.dropdownTitle}>{result.title}</div>
                        {result.price && (
                          <div className={css.dropdownPrice}>{formatPrice(result.price)}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        className={css.addButton}
                        onClick={() => handleAdd(result)}
                        disabled={alreadySelected || isMaxReached}
                      >
                        <FormattedMessage id="EditListingRecommendsPanel.add" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
        {isMaxReached && (
          <p className={css.maxReachedNote}>
            <FormattedMessage id="EditListingRecommendsPanel.maxReached" />
          </p>
        )}
      </div>

      {/* ── Selected listings ── */}
      {selectedListings.length > 0 && (
        <div className={css.selectedSection}>
          <H4 className={css.selectedTitle}>
            <FormattedMessage
              id="EditListingRecommendsPanel.selectedTitle"
              values={{ count: selectedListings.length }}
            />
          </H4>
          <div className={css.selectedList}>
            {selectedListings.map(item => (
              <div key={item.id} className={css.selectedItem}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className={css.selectedThumb} />
                ) : (
                  <div className={css.selectedThumbPlaceholder}>📷</div>
                )}
                <div className={css.selectedInfo}>
                  <div className={css.selectedItemTitle}>{item.title || item.id}</div>
                  {item.price && (
                    <div className={css.selectedItemPrice}>{formatPrice(item.price)}</div>
                  )}
                </div>
                <button
                  type="button"
                  className={css.removeButton}
                  onClick={() => handleRemove(item.id)}
                >
                  <FormattedMessage id="EditListingRecommendsPanel.remove" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Save button ── */}
      <div className={css.submitButton}>
        <Button
          onClick={handleSubmit}
          inProgress={updateInProgress}
          disabled={updateInProgress}
          ready={panelUpdated}
        >
          {submitButtonText}
        </Button>
      </div>
    </div>
  );
};

export default EditListingRecommendsPanel;
