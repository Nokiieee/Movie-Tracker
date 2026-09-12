"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { flattenError } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  AddMovieFormSchema,
  AddMovieFormState,
  EditMovieFormSchema,
  EditMovieFormState,
} from "@/lib/definitions";

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { title, status } = validatedFields.data;

  const { error } = await supabase
    .schema("movie_tracker")
    .from("movies")
    .insert({
      user_id: user.id,
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase
    .schema("movie_tracker")
    .from("movies")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { status } = validatedFields.data;

  const { error } = await supabase
    .schema("movie_tracker")
    .from("movies")
    .update({ status, rating, notes })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard");
}
