export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
            (function() {
              function getInitialTheme() {
                const persistedTheme = window.localStorage.getItem('theme');
                if (persistedTheme) {
                  return persistedTheme;
                }
                
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                return systemPrefersDark ? 'dark' : 'nord';
              }
  
              const theme = getInitialTheme();
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `,
      }}
    />
  );
}
