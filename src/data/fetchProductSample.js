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

  while (true) {
    let response;
    try {
      response = await globalThis.PIM.api.product_uuid_v1.list({
        search: searchFilter,
        page,
        limit: 100,
        ...(useCompletenesses && { withCompletenesses: true }),
      });
    } catch (err) {
      if (useCompletenesses && /422/.test(err?.message ?? '')) {
        useCompletenesses = false;
        continue;
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
