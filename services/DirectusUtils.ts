import { DIRECTUS_ASSET_ENDPOINT } from "@constants/CMSConstants"
import { ID } from "@directus/sdk"

export const CreateDirectusThumbnailURL = (
    thumbnail_id: ID,
    fit: "cover" | "contain",
    width: number, height: number, quality: number) => {
    return `${DIRECTUS_ASSET_ENDPOINT}${thumbnail_id}?fit=${fit}&width=${width}&height=${height}&quality=${Math.round(quality)}&format=webp`
}

export const CreateDirectusBookThumbnailURL = (thumbnail_id: ID) => {
    return `${DIRECTUS_ASSET_ENDPOINT}${thumbnail_id}?width=256&quality=30&format=webp`
}

export const CreateDirectusImageURL = (thumbnail_id: ID) => {
    return `${DIRECTUS_ASSET_ENDPOINT}${thumbnail_id}`
}
