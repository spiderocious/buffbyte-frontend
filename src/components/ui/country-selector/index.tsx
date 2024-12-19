import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChevronDown, BsSearch } from 'react-icons/bs';

interface CountryOption {
  code: string;
  name: string;
  flag: string;
  popular?: boolean;
}

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Available countries with their data
  const countries: CountryOption[] = [
    { code: 'us', name: 'United States', flag: '🇺🇸', popular: true },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', popular: true },
    { code: 'nigeria', name: 'Nigeria', flag: '🇳🇬', popular: true },
    { code: 'ca', name: 'Canada', flag: '🇨🇦', popular: true },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
    { code: 'br', name: 'Brazil', flag: '🇧🇷' },
    { code: 'in', name: 'India', flag: '🇮🇳' }
  ];

  const selectedCountryData = countries.find(c => c.code === selectedCountry);
  const popularCountries = countries.filter(c => c.popular);
  
  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (countryCode: string) => {
    onCountryChange(countryCode);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center space-x-3 px-4 py-3 bg-white rounded-lg shadow-sm
          border-2 border-gray-200 hover:border-primary-300 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-2xl">{selectedCountryData?.flag}</span>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">
            {selectedCountryData?.name}
          </span>
          <span className="text-xs text-gray-500">Trending in</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <BsChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute top-full mt-2 left-0 w-80 bg-white rounded-lg shadow-lg
              border border-gray-200 z-50 overflow-hidden
            "
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white
                    transition-all duration-200
                  "
                />
              </div>
            </div>

            {/* Popular Section */}
            {!searchQuery && (
              <div className="p-3 border-b border-gray-100">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Popular
                </h4>
                <div className="space-y-1">
                  {popularCountries.map((country, index) => (
                    <motion.button
                      key={country.code}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCountrySelect(country.code)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-md
                        transition-all duration-150 text-left
                        ${selectedCountry === country.code
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100 text-gray-700'
                        }
                      `}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-sm font-medium">{country.name}</span>
                      {selectedCountry === country.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* All Countries */}
            <div className="max-h-60 overflow-y-auto p-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {searchQuery ? 'Search Results' : 'All Countries'}
              </h4>
              <div className="space-y-1">
                {filteredCountries.map((country, index) => (
                  <motion.button
                    key={country.code}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleCountrySelect(country.code)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-md
                      transition-all duration-150 text-left
                      ${selectedCountry === country.code
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100 text-gray-700'
                      }
                    `}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-sm font-medium">{country.name}</span>
                    {selectedCountry === country.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {filteredCountries.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySelector;