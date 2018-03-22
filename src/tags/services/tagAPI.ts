/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

import { TagRelationContentTypes } from '../types/TagRelationContentTypes';
import { TagDetail, Tag } from '../types/Tag';
import { del, get, post, getAll } from '../../cyphon/services/cyphonAPI';
import { TagRelation } from '../types/TagRelation';
import { APIList } from '../../cyphon/types/Response';

/**
 * Adds a tag relation to a given object.
 * @param {TagRelationContentTypes} type Type of object to relate the tag to.
 * @param {number} objectID ID of the object to relate the tag to.
 * @param {number} tagID ID of that tag to relate the object to.
 * @param {number} userID ID of the user who made the relation.
 * @returns {Promise<TagDetail>}
 */
export function addTagRelation(
  type: TagRelationContentTypes,
  objectID: number,
  tagID: number,
  userID?: number,
): Promise<TagDetail> {
  return post('/tagrelations/', {
    content_type: type,
    object_id: objectID,
    tag: tagID,
    tagged_by: userID,
  });
}

/**
 * Finds a tag relation based on select parameters.
 * @param {TagRelationContentTypes} contentType
 * @param {number} objectID
 * @param {number} tagID
 * @returns {Promise<any>}
 */
export async function findTagRelation(
  contentType: TagRelationContentTypes,
  objectID: number,
  tagID: number,
): Promise<TagRelation> {
  const relations = await get<APIList<TagRelation>>('/tagrelations/', {
    params: {
      content_type: contentType,
      object_id: objectID,
      tag: tagID,
    },
  });

  if (relations.results.length > 1) {
    throw new Error(`API call expected one result but received ${relations.results.length}`);
  }

  return relations.results[0];
}

/**
 * Deletes a tag relation based on it's ID.
 * @param {number} tagRelationID
 * @returns {Promise<TagRelation>}
 */
export function deleteTagRelation(tagRelationID: number): Promise<TagRelation> {
  return del(`/tagrelations/${tagRelationID}/`);
}

/**
 * Gets all the current tags in the system.
 * @returns {Promise<Tag[]>}
 */
export function fetchAllTags(): Promise<Tag[]> {
  return getAll('/tags/');
}

/**
 * Returns a detailed description of a specific tag.
 * @param {number} tagId Id of the tag to fetch.
 * @returns {Promise<TagDetail>}
 */
export function fetchTag(tagId: number): Promise<TagDetail> {
  return get(`/tags/${tagId}/`);
}