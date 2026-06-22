/**
 * fetchProductsByFamily.js
 *
 * Fetches all products for a given family code, paginating until complete.
 * Pass '__none__' to fetch products with no family assigned.
 */

export async function fetchProductsByFamily(familyCode) {
  const searchFilter = familyCode === '__none__'
    ? { family: [{ operator: 'EMPTY' }] }
    : { family: [{ operator: 'IN', value: [familyCode] }] };

  const all = [];
  let page = 1;
  let useCompletenesses = true;
  let stringifySearch = false;

  while (true) {
    let response;
    try {
      response = await globalThis.PIM.api.product_uuid_v1.list({
        search: stringifySearch ? JSON.stringify(searchFilter) : searchFilter,
        page,
        limit: 100,
        ...(useCompletenesses && { withCompletenesses: true }),
      });
    } catch (err) {
      if (/422/.test(err?.message ?? '')) {
        if (useCompletenesses) { useCompletenesses = false; continue; }
        if (!stringifySearch)  { stringifySearch = true;   continue; }
      }
      throw err;
    }
    const items = response.items ?? [];
    all.push(...items);
    if (items.length === 0 || !response.links?.next) break;
    page++;
  }

  return all;
}
