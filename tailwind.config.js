/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textColor: {
        base: withOpacity('--color-text-base'),
        muted: withOpacity('--color-text-muted'),
        inverted: withOpacity('--color-text-inverted'),
      },
      backgroundColor: {
        base: withOpacity('--color-bg-base'),
        muted: withOpacity('--color-bg-muted'),
        subtle: withOpacity('--color-bg-subtle'),
        primary: withOpacity('--color-primary'),
        'primary-focus': withOpacity('--color-primary-focus'),
        accent: withOpacity('--color-accent'),
        'accent-focus': withOpacity('--color-accent-focus'),
      },
      borderColor: {
        DEFAULT: withOpacity('--color-border'),
      },
    },
  },
  plugins: [],
};