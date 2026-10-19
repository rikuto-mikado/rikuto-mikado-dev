# Japanese Review Guard (Temporary Note)

## Summary

- **Context**: Japanese copy in `src/data/translations.ts` is currently under review.
- **Current Behavior**: Language switch buttons (`JA`) remain visible in the dock and sidebar to preserve layout, but clicking them triggers a "Coming Soon" toast notification rather than switching the language.

---

## How to Enable (1 Line)

In [`src/config.ts`](../src/config.ts):

```ts
export const IS_JAPANESE_AVAILABLE: boolean = true // change false -> true
```

---

## How to Remove Temporary Code (Optional Cleanup)

If removing the toast mechanism completely once translations are verified:

1. **[`src/config.ts`](../src/config.ts)**:
   - Remove `IS_JAPANESE_AVAILABLE` (and its use in [`src/hooks/useLanguage.ts`](../src/hooks/useLanguage.ts)).

2. **[`src/App.tsx`](../src/App.tsx)**:
   - Remove `useToast()`, the `<Toast />` element, and the guard inside `toggleLang`:
     ```ts
     const { lang, toggleLang } = useLanguage()
     ```
   - Remove the `isJapaneseAvailable` prop from `<Sidebar />` and `<BlogSection />`.

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
