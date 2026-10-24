# Japanese Review Guard

## Summary

- **Context**: The Japanese copy in `src/data/translations.ts` has been reviewed, and the Japanese version is live.
- **Current Behavior**: `IS_JAPANESE_AVAILABLE` is `true`, so the language switch buttons (`JA`) in the dock, sidebar, and blog reader switch languages normally.
- **Guard Mechanism**: The guard code is still in place. Setting the flag back to `false` keeps the `JA` buttons visible to preserve layout, but clicking them shows a "Coming Soon" toast notification instead of switching languages, and the site always starts in English.

---

## How to Temporarily Disable Japanese (1 Line)

Use this if the Japanese copy needs another review pass.

In [`src/config.ts`](../src/config.ts):

```ts
export const IS_JAPANESE_AVAILABLE: boolean = false; // change true -> false
```

Set it back to `true` to re-enable Japanese.

---

## How to Remove the Guard Code (Optional Cleanup)

If the guard is no longer needed, the toast mechanism can be removed completely:

1. **[`src/config.ts`](../src/config.ts)**:
   - Remove `IS_JAPANESE_AVAILABLE` (and its use in [`src/hooks/useLanguage.ts`](../src/hooks/useLanguage.ts)).

2. **[`src/App.tsx`](../src/App.tsx)**:
   - Remove `useToast()`, the `<Toast />` element, and the guard inside `toggleLang`:
     ```ts
     const { lang, toggleLang } = useLanguage();
     ```
   - Remove the `isJapaneseAvailable` prop from `<Sidebar />` and `<BlogSection />` (and from `BlogSectionProps` in [`src/components/sections/blog/BlogSection.tsx`](../src/components/sections/blog/BlogSection.tsx), which passes it on to `BlogReaderModal`).

3. **[`src/components/layout/Sidebar.tsx`](../src/components/layout/Sidebar.tsx)**:
   - Remove `isJapaneseAvailable` from `SidebarProps`.
   - Use the default language row copy:
     ```tsx
     subtitle={ui.langSwitchHint}
     buttonLabel={ui.langToggle}
     ```

4. **[`src/components/sections/blog/BlogReaderModal.tsx`](../src/components/sections/blog/BlogReaderModal.tsx)**:
   - Remove `isJapaneseAvailable` and use `ui.langSwitchLabel` for the language button's `aria-label` / `title`; drop the `(Soon)` suffix.

5. Optionally delete [`src/hooks/useToast.ts`](../src/hooks/useToast.ts) and [`src/components/common/Toast.tsx`](../src/components/common/Toast.tsx) if nothing else uses them.
