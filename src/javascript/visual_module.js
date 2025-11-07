```javascript
// ViberanteVisuals.js
// A versatile visual building block module for React, Next.js, and Node.js environments.
// © 2023 Viberante Systems

'use strict';

const React = require('react');

// --- Helper Functions ---

/**
 * Generates a dynamic class name string from an object of class-boolean pairs.
 * @param {object} classes - An object where keys are class names and values are booleans.
 * @returns {string} - A space-separated string of active class names.
 */
const classNames = (classes) => {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key]) => key)
    .join(' ');
};

/**
 * Validates a color string (hex, rgb, rgba, hsl, hsla).
 * @param {string} colorStr - The color string to validate.
 * @returns {boolean} - True if the color is valid, false otherwise.
 */
const isValidColor = (colorStr) => {
  if (!colorStr || typeof colorStr !== 'string') return false;
  const s = new Option().style;
  s.color = colorStr;
  return s.color !== '';
};


// --- Core Component: VisualBlock ---

/**
 * VisualBlock is the fundamental building block of the Viberante Visuals module.
 * It's a highly customizable container component.
 */
const VisualBlock = React.forwardRef(({
  as: Component = 'div',
  children,
  className = '',
  style = {},
  padding = 'medium',
  margin = 'none',
  backgroundColor,
  borderColor,
  borderWidth = 'none',
  borderRadius = 'medium',
  shadow = 'none',
  display = 'block',
  flexDirection,
  justifyContent,
  alignItems,
  gap,
  width,
  height,
  ...restProps
}, ref) => {

  // --- Style Computation ---

  const computedStyles = { ...style };

  // Spacing (Padding & Margin)
  const spacingMap = {
    none: '0',
    small: '8px',
    medium: '16px',
    large: '32px',
    xlarge: '64px'
  };

  computedStyles.padding = spacingMap[padding] || padding;
  computedStyles.margin = spacingMap[margin] || margin;

  // Colors
  if (isValidColor(backgroundColor)) {
    computedStyles.backgroundColor = backgroundColor;
  }
  if (isValidColor(borderColor)) {
    computedStyles.borderColor = borderColor;
  }

  // Border
  const borderMap = {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '4px'
  };
  const computedBorderWidth = borderMap[borderWidth] || borderWidth;
  if (computedBorderWidth !== '0') {
    computedStyles.borderStyle = 'solid';
    computedStyles.borderWidth = computedBorderWidth;
  }

  // Border Radius
  const radiusMap = {
    none: '0',
    small: '4px',
    medium: '8px',
    large: '16px',
    pill: '9999px',
    circle: '50%'
  };
  computedStyles.borderRadius = radiusMap[borderRadius] || borderRadius;

  // Shadow
  const shadowMap = {
    none: 'none',
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xlarge: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
  };
  computedStyles.boxShadow = shadowMap[shadow] || shadow;

  // Layout
  computedStyles.display = display;
  if (display === 'flex' || display === 'inline-flex') {
    computedStyles.flexDirection = flexDirection || 'row';
    computedStyles.justifyContent = justifyContent;
    computedStyles.alignItems = alignItems;
    computedStyles.gap = spacingMap[gap] || gap;
  }
  
  // Dimensions
  computedStyles.width = width;
  computedStyles.height = height;
  
  // Clean up undefined properties to avoid React warnings
  for (const key in computedStyles) {
    if (computedStyles[key] === undefined) {
      delete computedStyles[key];
    }
  }

  // --- Class Name Computation ---

  const baseClassName = 'viberante-visual-block';
  const dynamicClassNames = classNames({
    [`padding-${padding}`]: padding,
    [`margin-${margin}`]: margin,
    [`shadow-${shadow}`]: shadow,
    'has-background': !!backgroundColor,
  });

  const finalClassName = `${baseClassName} ${dynamicClassNames} ${className}`.trim();

  // --- Render ---

  return React.createElement(
    Component,
    {
      ref,
      className: finalClassName,
      style: computedStyles,
      ...restProps
    },
    children
  );
});

VisualBlock.displayName = 'VisualBlock';


// --- Specialized Components ---

/**
 * A specialized VisualBlock configured for flexbox layouts.
 * Simplifies creating flex containers.
 */
const Flex = React.forwardRef(({ direction = 'row', ...props }, ref) => {
  return (
    <VisualBlock
      ref={ref}
      display="flex"
      flexDirection={direction}
      {...props}
    />
  );
});
Flex.displayName = 'Flex';

/**
 * A specialized VisualBlock for creating grid layouts.
 */
const Grid = React.forwardRef(({
  columns = '1fr 1fr',
  rows,
  gap = 'medium',
  ...props
}, ref) => {
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap: {
      none: '0',
      small: '8px',
      medium: '16px',
      large: '32px'
    }[gap] || gap
  };

  return (
    <VisualBlock
      ref={ref}
      style={{ ...gridStyles, ...props.style }}
      {...props}
    />
  );
});
Grid.displayName = 'Grid';


/**
 * A simple spacer component for adding empty space in layouts.
 */
const Spacer = ({ size = 'medium', axis = 'vertical' }) => {
  const sizeMap = {
    small: '8px',
    medium: '16px',
    large: '32px',
    xlarge: '64px'
  };
  const computedSize = sizeMap[size] || size;
  const style = {
    display: 'block',
    width: axis === 'horizontal' ? computedSize : '1px',
    minWidth: axis === 'horizontal' ? computedSize : '1px',
    height: axis === 'vertical' ? computedSize : '1px',
    minHeight: axis === 'vertical' ? computedSize : '1px',
  };
  return <span style={style} />;
};
Spacer.displayName = 'Spacer';


// --- Main Module Export ---

const ViberanteVisuals = {
  VisualBlock,
  Flex,
  Grid,
  Spacer
};

// This structure ensures compatibility with different module systems.
// CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ViberanteVisuals;
}
// Also attaching to default for ES6 module interoperability
Object.assign(module.exports, ViberanteVisuals);
```