import { Client, PreviewClient } from "../contentful/setup";
import { EntryCollection, Entry } from "contentful";
import {
  IBookFields,
  ISeriesFields,
  ILandingPageConfigFields,
  IAboutPageConfigFields,
} from "../@types/generated/contentful";

function getClient(preview: boolean = false) {
  return preview ? PreviewClient : Client;
}

export async function getAllBookEntries(preview: boolean = false) {
  const response: EntryCollection<IBookFields> = await getClient(
    preview
  ).getEntries({
    include: 3,
    content_type: "book",
  });
  return response.items;
}

export async function getAllSeriesEntries(preview: boolean = false) {
  const response: EntryCollection<ISeriesFields> = await getClient(
    preview
  ).getEntries({
    include: 3,
    content_type: "series",
  });
  return response.items;
}

export async function getLandingPageConfig(preview: boolean = false) {
  const response: Entry<ILandingPageConfigFields> = await getClient(
    preview
  ).getEntry("7GHPCQ6CQoD7kzHqlKwElL", {
    include: 3,
  });
  return response;
}

export async function getAboutPageConfig(preview: boolean = false) {
  const response: Entry<IAboutPageConfigFields> = await getClient(
    preview
  ).getEntry("374R0qmiImcJXDkwwmYdqn", {
    include: 3,
  });
  return response;
}

export async function getBookEntry(id: string, preview: boolean = false) {
  const response: Entry<IBookFields> = await getClient(preview).getEntry(id, {
    include: 3,
  });
  return response;
}

export async function getSeriesEntry(id: string, preview: boolean = false) {
  const response: Entry<ISeriesFields> = await getClient(preview).getEntry(id, {
    include: 3,
  });
  return response;
}
