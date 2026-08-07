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

/**
 * Decorates the Match block — a two-column requirement vs. evidence table.
 *
 * Authored table structure (Google Docs / da.live):
 *
 * | Match                        |                                             |
 * |------------------------------|---------------------------------------------|
 * | What Adobe needs             | How I deliver it                            |
 * | Java & Cloud APIs (AWS SDK)  | 10 yrs AWS; EMR Instance Fleets APIs...     |
 * | ...                          | ...                                         |
 *
 * Row 0 = block name (consumed by AEM, not passed here)
 * Row 1 = header row (bold)
 * Row 2+ = requirement rows
 *
 * Each row renders as a card pair. A strength indicator badge is added
 * based on the presence of specific signal words in the evidence column.
 *
 * @param {HTMLElement} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // First row is the column header row
  const headerRow = rows.shift();
  if (headerRow) {
    headerRow.className = 'match-header-row';
    [...headerRow.children].forEach((cell) => {
      cell.className = 'match-header-cell';
    });
  }

  // Remaining rows are requirement/evidence pairs
  rows.forEach((row) => {
    row.className = 'match-row';
    const [reqCell, evidenceCell] = [...row.children];

    if (reqCell) reqCell.className = 'match-requirement';
    if (evidenceCell) {
      evidenceCell.className = 'match-evidence';

      // Add a "Direct match" badge if evidence contains strong signal words
      const text = evidenceCell.textContent.toLowerCase();
      const badge = document.createElement('span');
      badge.className = 'match-badge';

      if (text.includes('10 yr') || text.includes('pioneered') || text.includes('designed and implemented')) {
        badge.textContent = 'Direct match';
        badge.classList.add('match-badge-strong');
      } else if (text.includes('experience') || text.includes('built') || text.includes('implemented')) {
        badge.textContent = 'Strong match';
        badge.classList.add('match-badge-good');
      } else {
        badge.textContent = 'Match';
        badge.classList.add('match-badge-default');
      }

      evidenceCell.prepend(badge);
    }
  });

  // Wrap in a semantic table-like structure for accessibility
  block.setAttribute('role', 'table');
  block.setAttribute('aria-label', 'Job requirement to experience mapping');
}
