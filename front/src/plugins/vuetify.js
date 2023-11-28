// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

var statusDark = localStorage.getItem("theme-dark");

if (!statusDark) {
  if (window.matchMedia) {
    var statusDarkModeBrowser = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (statusDarkModeBrowser) {
      statusDark = true
    } else {
      statusDark = false
    }
  } else {
    // Default (when Media-Queries are not supported)
  }
}

const myCustomTheme = {
  dark: statusDark ? true : false,
  colors: {
    background: '#FFFFFF',
    surface: '#52F6AF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme,
    },
  },
})