import { client } from "@lib/sanity/client";
import { siteSettingsQuery } from "@lib/sanity/queries/siteSettings.queries";

import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async () => {
	return await client.fetch(siteSettingsQuery);;
};
