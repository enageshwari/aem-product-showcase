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
 * Fetches product data from a published AEM Edge Delivery spreadsheet JSON endpoint.
 * The sheet must be published via AEM Sidekick to expose the JSON endpoint.
 *
 * @param {string} sheetPath - Path to the sheet, e.g. '/products.json'
 * @returns {Promise<Array>} Array of product row objects, or empty array on failure.
 */
async function fetchSheetData(sheetPath) {
  try {
    const resp = await fetch(sheetPath);
    if (!resp.ok) return [];
    const json = await resp.json();
    // AEM sheet JSON format: { data: [...rows], total: N, offset: 0, limit: N }
    return json.data || [];
  } catch {
    return [];
  }
}

/**
 * Collects all unique tag values from a list of product objects.
 *
 * @param {Array} products - Product row objects from the sheet.
 * @param {string} tagKey - The column name that holds comma-separated tags.
 * @returns {string[]} Sorted, deduplicated tag list.
 */
function collectTags(products, tagKey) {
  const tagSet = new Set();
  products.forEach((p) => {
    const raw = (p[tagKey] || '').toString().trim();
    if (raw) raw.split(',').forEach((t) => tagSet.add(t.trim()));
  });
  return [...tagSet].sort();
}

/**
 * Builds a single product card element from a product data object.
 *
 * @param {Object} product - Row object from the AEM sheet JSON.
 * @returns {HTMLLIElement}
 */
function buildCard(product) {
  const li = document.createElement('li');
  li.className = 'feature-grid-card';

  // tags as data attribute for filtering
  const tags = (product.Tags || product.tags || '').toString().trim();
  if (tags) li.dataset.tags = tags;

  // image
  if (product.Image || product.image) {
    const imgSrc = product.Image || product.image;
    const imgAlt = product.Name || product.name || '';
    const picture = createOptimizedPicture(imgSrc, imgAlt, false, [
      { media: '(min-width: 600px)', width: '400' },
      { width: '250' },
    ]);
    const imageDiv = document.createElement('div');
    imageDiv.className = 'feature-grid-card-image';
    imageDiv.append(picture);
    li.append(imageDiv);
  }

  // body content
  const body = document.createElement('div');
  body.className = 'feature-grid-card-body';

  if (product.Name || product.name) {
    const h3 = document.createElement('h3');
    h3.textContent = product.Name || product.name;
    body.append(h3);
  }

  if (product.Description || product.description) {
    const p = document.createElement('p');
    p.className = 'feature-grid-card-desc';
    p.textContent = product.Description || product.description;
    body.append(p);
  }

  if (product.Price || product.price) {
    const priceEl = document.createElement('p');
    priceEl.className = 'feature-grid-card-price';
    priceEl.textContent = product.Price || product.price;
    body.append(priceEl);
  }

  if (product.Tags || product.tags) {
    const tagWrap = document.createElement('div');
    tagWrap.className = 'feature-grid-card-tags';
    (product.Tags || product.tags).toString().split(',').forEach((t) => {
      const span = document.createElement('span');
      span.className = 'feature-grid-tag';
      span.textContent = t.trim();
      tagWrap.append(span);
    });
    body.append(tagWrap);
  }

  if (product.Link || product.link) {
    const cta = document.createElement('a');
    cta.href = product.Link || product.link;
    cta.className = 'button primary feature-grid-cta';
    cta.textContent = product['CTA Text'] || product['cta text'] || 'Learn More';
    cta.setAttribute('aria-label', `${cta.textContent}: ${product.Name || product.name || ''}`);
    const btnWrap = document.createElement('p');
    btnWrap.className = 'button-wrapper';
    btnWrap.append(cta);
    body.append(btnWrap);
  }

  li.append(body);
  return li;
}

/**
 * Renders filter pill buttons above the grid.
 * Clicking a pill toggles visibility of cards by tag.
 *
 * @param {string[]} tags - All available tags.
 * @param {HTMLUListElement} grid - The product card list element.
 * @returns {HTMLDivElement} The filter bar element.
 */
function buildFilterBar(tags, grid) {
  const bar = document.createElement('div');
  bar.className = 'feature-grid-filters';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter products by category');

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = 'feature-grid-filter-btn active';
  allBtn.textContent = 'All';
  allBtn.setAttribute('aria-pressed', 'true');

  const applyFilter = (activeTag) => {
    [...grid.children].forEach((card) => {
      const cardTags = (card.dataset.tags || '').split(',').map((t) => t.trim());
      const visible = activeTag === 'All' || cardTags.includes(activeTag);
      card.hidden = !visible;
    });
  };

  allBtn.addEventListener('click', () => {
    [...bar.querySelectorAll('.feature-grid-filter-btn')].forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    allBtn.classList.add('active');
    allBtn.setAttribute('aria-pressed', 'true');
    applyFilter('All');
  });

  bar.append(allBtn);

  tags.forEach((tag) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'feature-grid-filter-btn';
    btn.textContent = tag;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      [...bar.querySelectorAll('.feature-grid-filter-btn')].forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(tag);
    });
    bar.append(btn);
  });

  return bar;
}

/**
 * Parses authored block rows into product objects.
 * Expected authored table structure (from Google Docs / da.live):
 *
 * | Feature Grid         |             |              |       |      |             |          |
 * |----------------------|-------------|--------------|-------|------|-------------|----------|
 * | Name                 | Description | Price        | Tags  | Link | CTA Text    | Image    |
 * | Wireless Headphones  | Noise-free  | $299         | Audio | /... | Shop Now    | <image>  |
 *
 * @param {HTMLElement} block
 * @returns {{ products: Array, sheetPath: string|null }}
 */
function parseAuthoredRows(block) {
  const rows = [...block.children];
  const products = [];
  let sheetPath = null;

  // First row may be a sheet path override: single cell containing a path like /products.json
  const firstCellText = rows[0]?.children[0]?.textContent?.trim() || '';
  if (firstCellText.endsWith('.json')) {
    sheetPath = firstCellText;
    rows.shift();
  }

  // Second row is the header row — use it as keys
  if (rows.length < 2) return { products, sheetPath };
  const headerRow = rows.shift();
  const keys = [...headerRow.children].map((cell) => cell.textContent.trim());

  rows.forEach((row) => {
    const product = {};
    [...row.children].forEach((cell, i) => {
      const key = keys[i] || `col${i}`;
      // If cell has a picture, grab the img src for the Image key
      const img = cell.querySelector('img');
      if (img) {
        product[key] = img.src;
      } else {
        product[key] = cell.textContent.trim();
      }
    });
    products.push(product);
  });

  return { products, sheetPath };
}

/**
 * Decorates the Feature Grid block.
 *
 * Supports two modes:
 *   1. Sheet mode  — first cell of block is a `/path/to/sheet.json` URL;
 *                    products are fetched live from the AEM spreadsheet JSON endpoint.
 *   2. Authored mode — rows are parsed directly from the table authored in Google Docs / da.live.
 *
 * @param {HTMLElement} block
 */
export default async function decorate(block) {
  const { products: authoredProducts, sheetPath } = parseAuthoredRows(block);

  // Prefer sheet data if a path was provided; fall back to authored rows
  let products = authoredProducts;
  if (sheetPath) {
    const sheetProducts = await fetchSheetData(sheetPath);
    if (sheetProducts.length > 0) products = sheetProducts;
  }

  if (products.length === 0) {
    block.textContent = 'No products to display.';
    return;
  }

  const grid = document.createElement('ul');
  grid.className = 'feature-grid-list';
  grid.setAttribute('role', 'list');

  products.forEach((product) => {
    grid.append(buildCard(product));
  });

  const tags = collectTags(products, 'Tags') || collectTags(products, 'tags');

  block.replaceChildren();

  if (tags.length > 1) {
    const filterBar = buildFilterBar(tags, grid);
    block.append(filterBar);
  }

  block.append(grid);
}
