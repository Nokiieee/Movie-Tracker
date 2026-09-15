"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

export function ProfileMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-2 rounded-md border py-1.5 pl-1.5 pr-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--paper-panel)] ${
          open
            ? "border-transparent bg-[var(--paper-panel)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-xs font-semibold text-[var(--paper-panel)]"
        >
          <span className="-rotate-3">{name.charAt(0).toUpperCase()}</span>
        </span>
        <span className="max-w-12 truncate min-[400px]:max-w-28 sm:max-w-48">
          {name}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 text-[var(--ink-soft)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute right-0 top-full z-20 mt-2 w-60 origin-top-right rounded-lg border border-[var(--tape-border)] bg-[var(--paper-panel)] p-1.5 shadow-[0_8px_30px_rgba(58,52,44,0.18)] transition duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        <div className="px-2.5 pb-2 pt-1.5">
          <p className="truncate text-sm font-medium text-[var(--ink)]">
            {name}
          </p>
          {email && email !== name && (
            <p className="truncate text-xs text-[var(--ink-soft)]">{email}</p>
          )}
        </div>
        <form
          action={logout}
          className="border-t border-dashed border-[var(--tape-border)] pt-1.5"
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--paper)]"
          >
            <LogOut size={16} strokeWidth={2} aria-hidden="true" />
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
