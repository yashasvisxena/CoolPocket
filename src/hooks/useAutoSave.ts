import { useEffect, useRef } from "react";
import type { UseFormWatch, FieldValues } from "react-hook-form";

/**
 * Auto-saves form values to the Zustand store on every change,
 * debounced so we're not thrashing localStorage on every keystroke.
 */
export function useAutoSave<T extends FieldValues>(
  watch: UseFormWatch<T>,
  onSave: (data: T) => void,
  debounceMs = 400,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = watch((values) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onSave(values as T);
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, onSave, debounceMs]);
}
