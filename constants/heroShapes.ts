import { HeroShape } from '../types/hero';

export const heroShapes: HeroShape[] = [
  // Large circle behind photo — background anchor
  {
    type: 'circle',
    size: 260,
    position: { top: '5%', right: '-5%' },
    color: 'yellow',
    opacity: 0.15,
    borderWidth: 3,
    zIndex: 0,
    responsive: {
      hideOnMobile: true,
    },
  },
  // Rotated rectangle — editorial feel
  {
    type: 'rectangle',
    width: 200,
    height: 140,
    position: { top: '15%', right: '18%' },
    rotation: -6,
    color: 'cyan',
    opacity: 0.2,
    borderWidth: 3,
    zIndex: 0,
    responsive: {
      hideOnMobile: true,
    },
  },
  // Small filled square — accent near photo
  {
    type: 'square',
    size: 28,
    position: { top: '8%', right: '42%' },
    rotation: 12,
    color: 'pink',
    filled: true,
    zIndex: 2,
    responsive: {
      size: 18,
      position: { top: '5%', right: '35%' },
    },
  },
  // Horizontal line below photo
  {
    type: 'line',
    width: 180,
    position: { bottom: '18%', right: '5%' },
    color: 'text',
    opacity: 0.3,
    zIndex: 0,
    responsive: {
      width: 120,
      position: { bottom: '20%', right: '8%' },
    },
  },
  // Triangle peeking bottom-right
  {
    type: 'triangle',
    size: 50,
    position: { bottom: '10%', right: '-2%' },
    rotation: 15,
    color: 'green',
    opacity: 0.5,
    zIndex: 0,
    responsive: {
      hideOnMobile: true,
    },
  },
  // Small circle top-left of photo area
  {
    type: 'circle',
    size: 18,
    position: { top: '3%', left: '55%' },
    color: 'pink',
    filled: true,
    zIndex: 2,
    responsive: {
      size: 12,
      position: { top: '2%', left: '50%' },
    },
  },
  // Vertical line left of photo
  {
    type: 'line',
    width: 2,
    height: 100,
    position: { top: '25%', left: '48%' },
    color: 'text',
    opacity: 0.15,
    zIndex: 0,
    responsive: {
      hideOnMobile: true,
    },
  },
  // Large square outline — behind and offset
  {
    type: 'square',
    size: 120,
    position: { bottom: '5%', right: '22%' },
    rotation: -4,
    color: 'yellow',
    opacity: 0.12,
    borderWidth: 2,
    zIndex: 0,
    responsive: {
      hideOnMobile: true,
    },
  },
  // Tiny filled circle — top right, partially outside
  {
    type: 'circle',
    size: 14,
    position: { top: '0%', right: '2%' },
    color: 'cyan',
    filled: true,
    zIndex: 2,
    responsive: {
      hideOnMobile: true,
    },
  },
  // Medium rectangle — left side, editorial
  {
    type: 'rectangle',
    width: 100,
    height: 60,
    position: { top: '60%', left: '46%' },
    rotation: 3,
    color: 'pink',
    opacity: 0.1,
    borderWidth: 2,
    zIndex: 0,
    responsive: {
      hideOnMobile: true,
    },
  },
];
