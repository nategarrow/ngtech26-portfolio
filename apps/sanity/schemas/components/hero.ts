import { defineType, defineField } from "sanity";

export const hero = defineType({
	name: 'hero',
	type: 'object',
	fields: [
		defineField({
			name: 'avatar',
			type: 'image',
			title: 'Avatar',
		}),
		defineField({
			name: 'title',
			type: 'string',
			title: 'Title',
		}),
		defineField({
			name: 'subheading',
			type: 'string',
			title: 'Subheading',
		}),
		defineField({
			name: 'content',
			type: 'richText',
			title: 'Content',
		}),
	],
})