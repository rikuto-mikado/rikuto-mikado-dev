# Japanese Review Guard (Temporary Note)

## Summary

- **Context**: Japanese copy in `src/data/translations.ts` is currently under review.
- **Current Behavior**: Language switch buttons (`JA`) remain visible in the dock and sidebar to preserve layout, but clicking them triggers a "Coming Soon" toast notification rather than switching the language.

---

## How to Enable (1 Line)

In [`src/App.tsx`](../src/App.tsx):

```ts
const isJapaneseAvailable = true; // change false -> true
```

---

## How to Remove Temporary Code (Optional Cleanup)

If removing the toast mechanism completely once translations are verified:

1. **[`src/App.tsx`](../src/App.tsx)**:
   - Remove `isJapaneseAvailable`, `toastMessage`, `toastTimeoutRef`, and `triggerToast()`.
   - Remove `{toastMessage && ( ... )}` toast JSX block.
   - Simplify `toggleLang`:
     ```ts
     const toggleLang = () => setLang((prev) => (prev === "en" ? "ja" : "en"));
     ```
   - Remove `isJapaneseAvailable` prop from `<Sidebar />`.

2. **[`src/components/Sidebar.tsx`](../src/components/Sidebar.tsx)**:
   - Remove `isJapaneseAvailable` from `SidebarProps`.
   - Revert language status and button label to default:
     ```tsx
     <span className="text-[10px] font-sans text-gray-400">
       {lang === 'en' ? 'Switch to Japanese' : '英語表示に切り替え'}
     </span>
     <button onClick={onToggleLang}>{ui.langToggle}</button>
     ```
