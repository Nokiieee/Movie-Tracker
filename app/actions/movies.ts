"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { flattenError } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  AddMovieFormSchema,
  AddMovieFormState,
  EditMovieFormSchema,
  EditMovieFormState,
} from "@/lib/definitions";

// The middleware already verified the session for this request and handed
// the result down via headers, so actions don't need to call
// supabase.auth.getUser() a second time just to get the user id.
async function requireUserId() {
  const userId = (await headers()).get("x-user-id");
  if (!userId) {
    redirect("/login");
  }
  return userId;
}

export async function addMovie(state: AddMovieFormState, formData: FormData) {
  const validatedFields = AddMovieFormSchema.safeParse({
    title: formData.get("title"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
    };
  }

  const ratingRaw = formData.get("rating");
  const rating = ratingRaw && ratingRaw !== "" ? Number(ratingRaw) : null;

  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
    return { message: "Rating must be between 1 and 5." };
  }

  const notesRaw = formData.get("notes");
  const notes =
    typeof notesRaw === "string" && notesRaw.trim() !== ""
      ? notesRaw.trim()
      : null;

  const userId = await requireUserId();
  const supabase = await createClient();

  const { title, status } = validatedFields.data;

  const { error } = await supabase
    .schema("movie_tracker")
    .from("movies")
    .insert({
      user_id: userId,
      title,
      status,
      rating,
      notes,
    });

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
}

export async function deleteMovie(formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    return;
  }

  const userId = await requireUserId();
  const supabase = await createClient();

  await supabase
    .schema("movie_tracker")
    .from("movies")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  revalidatePath("/dashboard");
}

export async function updateMovie(state: EditMovieFormState, formData: FormData) {
  const id = formData.get("id");

  if (typeof id !== "string" || !id) {
    return { message: "Missing movie id." };
  }

  const validatedFields = EditMovieFormSchema.safeParse({
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
    };
  }

  const ratingRaw = formData.get("rating");
  const rating = ratingRaw && ratingRaw !== "" ? Number(ratingRaw) : null;

  if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
    return { message: "Rating must be between 1 and 5." };
  }

  const notesRaw = formData.get("notes");
  const notes =
    typeof notesRaw === "string" && notesRaw.trim() !== ""
      ? notesRaw.trim()
      : null;

  const userId = await requireUserId();
  const supabase = await createClient();

  const { status } = validatedFields.data;

  const { error } = await supabase
    .schema("movie_tracker")
    .from("movies")
    .update({ status, rating, notes })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
}
