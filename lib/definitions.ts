import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { error: "Password is required." }).trim(),
});

export type SignupFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const MOVIE_STATUSES = ["want_to_watch", "watching", "watched"] as const;

export type MovieStatus = (typeof MOVIE_STATUSES)[number];

export const MOVIE_STATUS_LABELS: Record<MovieStatus, string> = {
  want_to_watch: "Want to Watch",
  watching: "Watching",
  watched: "Watched",
};

export const AddMovieFormSchema = z.object({
  title: z
    .string()
    .min(1, { error: "Title is required." })
    .max(200, { error: "Title must be less than 200 characters." })
    .trim(),
  status: z.enum(MOVIE_STATUSES, { error: "Please select a valid status." }),
});

export type AddMovieFormState =
  | {
      errors?: {
        title?: string[];
        status?: string[];
      };
      message?: string;
    }
  | undefined;

export type Movie = {
  id: string;
  title: string;
  status: MovieStatus;
  rating: number | null;
  notes: string | null;
  created_at: string;
};
