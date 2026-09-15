"use client";

import { useRef } from "react";
import { Plus, X } from "lucide-react";
import { AddMovieForm } from "@/components/movies/add-movie-form";

export function AddMovieLauncher() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="flex items-center gap-2 self-start rounded-md bg-[var(--ink)] px-4 py-2.5 text-sm font-medium text-[var(--paper-panel)] transition-transform duration-150 hover:-rotate-1"
      >
        <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
        New entry
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="add-movie-flag"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="movie-modal m-auto max-h-[85vh] w-[min(92vw,32rem)] overflow-y-auto border-0 bg-transparent p-0"
      >
        <div className="relative pt-3">
          <span
            id="add-movie-flag"
            className="absolute left-4 top-0 -rotate-2 rounded-sm bg-[var(--lilac)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--lilac-ink)] shadow-[0_2px_4px_rgba(58,52,44,0.15)]"
          >
            New entry
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-4 z-10 rounded-md p-1.5 text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper)] hover:text-[var(--ink)]"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <div className="rounded-lg border border-[var(--tape-border)] bg-[var(--paper-panel)] p-5 pt-7 shadow-[0_8px_30px_rgba(58,52,44,0.18)]">
            <AddMovieForm onSuccess={close} />
          </div>
        </div>
      </dialog>
    </>
  );
}
