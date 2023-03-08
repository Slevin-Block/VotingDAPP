import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({

    colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        aqua: '#4B66C1',
        gray: {
            50: '#f7fafc',
            900: '#171923',
        },

    },
/*     textStyles: {
    h1: {
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
      letterSpacing: '-2%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
      lineHeight: '110%',
      letterSpacing: '-1%',
    },
  }, */
})