export function getCssVar(name: string): string {
  let value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  const lightDarkMatch = value.match(
    /light-dark\((#[\da-f]{6}),\s*(#[\da-f]{6})\)/i,
  );

  if (lightDarkMatch) {
    const isDark = document.body.classList.contains('dark-theme');
    return isDark ? lightDarkMatch[2] : lightDarkMatch[1];
  }
  return value;
}
