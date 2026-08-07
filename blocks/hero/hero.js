/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the Hero block for Largest Contentful Paint (LCP) performance.
 *
 * Authored table structure (Google Docs / da.live):
 *
 * | Hero                     |                                    |
 * |--------------------------|------------------------------------|
 * | <background image>       | Heading text                       |
 * |                          | Subheading or body text            |
 * |                          | [Primary CTA link] [Secondary CTA] |
 *
 * The image column becomes a full-bleed background picture element.
 * All text and CTAs are overlaid in a content wrapper.
 * The first `<img>` is loaded eagerly (fetchpriority="high") since it is the LCP element.
 *
 * @param {HTMLElement} block
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [imageCell, contentCell] = [...row.children];

  // ── Background image (LCP element) ──────────────────────────────
  if (imageCell) {
    const img = imageCell.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt || '', true, [
        { media: '(min-width: 900px)', width: '1440' },
        { media: '(min-width: 600px)', width: '900' },
        { width: '600' },
      ]);
      // Mark as eager — this IS the LCP image
      const optimizedImg = picture.querySelector('img');
      if (optimizedImg) {
        optimizedImg.setAttribute('fetchpriority', 'high');
        optimizedImg.setAttribute('loading', 'eager');
      }
      imageCell.replaceChildren(picture);
    }
  }

  // ── Content overlay ─────────────────────────────────────────────
  const content = document.createElement('div');
  content.className = 'hero-content';

  if (contentCell) {
    while (contentCell.firstChild) content.append(contentCell.firstChild);
  }

  block.replaceChildren(imageCell || document.createElement('div'), content);
}
