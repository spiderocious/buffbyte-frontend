/**
 * BUFLITE Icon Library
 * Centralized icon exports from react-icons for consistent usage across the app
 */

// Authentication & User Icons
export { 
  HiUser,
  HiUserCircle,
  HiUserGroup,
  HiLockClosed,
  HiEye,
  HiEyeSlash,
  HiShieldCheck
} from 'react-icons/hi2';

// Navigation & Interface Icons
export {
  HiHome,
  HiCog6Tooth as HiSettings,
  HiBars3 as HiMenu,
  HiXMark as HiClose,
  HiChevronDown,
  HiChevronUp,
  HiChevronLeft,
  HiChevronRight,
  HiArrowLeft,
  HiArrowRight,
  HiArrowRightOnRectangle,
  HiArrowTopRightOnSquare as HiExternalLink,
  HiMagnifyingGlass as HiSearch,
  HiAdjustmentsHorizontal as HiFilter
} from 'react-icons/hi2';

// Content & Analysis Icons
export {
  HiDocumentText,
  HiPencilSquare as HiEdit,
  HiTrash,
  HiClipboardDocument as HiCopy,
  HiDocumentDuplicate,
  HiDocument,
  HiFolder,
  HiFolderOpen,
  HiPlusCircle as HiAdd,
  HiMinusCircle as HiRemove
} from 'react-icons/hi2';

// Media & Platform Icons
export {
  HiDevicePhoneMobile,
  HiComputerDesktop,
  HiVideoCamera,
  HiMicrophone,
  HiPhoto,
  HiMusicalNote,
  HiPlay,
  HiPause,
  HiStop,
  HiForward,
  HiBackward
} from 'react-icons/hi2';

// Social Media Platform Icons
export {
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn as FaLinkedin,
  FaYoutube,
  FaFacebookF as FaFacebook
} from 'react-icons/fa6';

// Analytics & Data Icons
export {
  HiChartBarSquare as HiChart,
  HiPresentationChartLine as HiTrendingUp,
  HiChartPie,
  HiEye as HiViews,
  HiHeart,
  HiChatBubbleLeft as HiComment,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiBolt as HiEngagement
} from 'react-icons/hi2';

// Status & Feedback Icons
export {
  HiCheckCircle,
  HiXCircle,
  HiExclamationTriangle as HiWarning,
  HiInformationCircle as HiInfo,
  HiClock,
  HiSparkles,
  HiLightBulb,
  HiRocketLaunch as HiRocket
} from 'react-icons/hi2';

// Action Icons
export {
  HiCloudArrowUp as HiUpload,
  HiCloudArrowDown as HiDownload,
  HiShare,
  HiBookmark,
  HiFlag,
  HiGift,
  HiStar,
  HiHeart as HiLike,
  HiHandThumbUp as HiThumbsUp,
  HiHandThumbDown as HiThumbsDown
} from 'react-icons/hi2';

// Loading & Progress Icons
export {
  HiArrowPath as HiRefresh,
  HiEllipsisHorizontal as HiMore,
  HiEllipsisVertical as HiMoreVertical
} from 'react-icons/hi2';

// Communication Icons
export {
  HiEnvelope as HiEmail,
  HiChatBubbleBottomCenter as HiChat,
  HiBell as HiNotification,
  HiBellAlert as HiNotificationAlert,
  HiSpeakerWave as HiSound,
  HiSpeakerXMark as HiMute
} from 'react-icons/hi2';

// File & Export Icons
export {
  HiDocumentArrowDown as HiExport,
  HiPrinter,
  HiQrCode,
  HiLink,
  HiClipboard
} from 'react-icons/hi2';

/**
 * Icon size presets based on BUFLITE design system
 */
export const IconSizes = {
  xs: 'w-3 h-3',     // 12px
  sm: 'w-4 h-4',     // 16px
  md: 'w-5 h-5',     // 20px
  lg: 'w-6 h-6',     // 24px
  xl: 'w-8 h-8',     // 32px
  '2xl': 'w-10 h-10', // 40px
  '3xl': 'w-12 h-12', // 48px
} as const;

/**
 * Common icon color classes for BUFLITE theme
 */
export const IconColors = {
  primary: 'text-primary-600',
  secondary: 'text-gray-600',
  success: 'text-success-600',
  error: 'text-error-600',
  warning: 'text-warning-600',
  muted: 'text-gray-400',
  white: 'text-white',
  current: 'text-current',
} as const;

/**
 * Platform-specific icon mapping for social media
 */
export const PlatformIcons = {
  twitter: FaTwitter,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  facebook: FaFacebook,
} as const;

/**
 * Analysis status icons
 */
export const AnalysisIcons = {
  pending: HiClock,
  processing: HiArrowPath,
  completed: HiCheckCircle,
  failed: HiXCircle,
  high: HiArrowTrendingUp,
  medium: HiArrowRight,
  low: HiArrowTrendingDown,
} as const;

export type PlatformKey = keyof typeof PlatformIcons;
export type AnalysisStatus = keyof typeof AnalysisIcons;
export type IconSize = keyof typeof IconSizes;
export type IconColor = keyof typeof IconColors;
