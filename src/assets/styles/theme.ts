// ThemeDefault is kept during the styled-components → CSS Modules migration.
// It will be removed in Phase 3.7 once ThemeProvider is dropped.
export const ThemeDefault = {
  colors: {
    gameboyTxt: "#67879a",
    text: "#2c3e50",
    primary: "#2970b8",
    pLight: "#659deb",
    pDark: "#004588",
    secondary: "#f2d147",
    sLight: "#ffff79",
    mDark: "#bca004",
    red: "#f15324",
    black: "#333",
  },
  fontSize: {
    title: "18px",
    paragraph: "12px",
  },
} as const;

export type AppTheme = typeof ThemeDefault;
