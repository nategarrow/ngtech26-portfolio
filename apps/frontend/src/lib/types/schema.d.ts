import type { InputValue } from '@portabletext/svelte';
export type JobType = {
	id?: string;
	position: string;
	company?: string;
	startDate: string;
	endDate?: string;
	description?: InputValue;
	note?: string;
};

export type ProjectsProps = {
	id: string;
	title: string;
	client: string;
	description: string;
	techStack?: string;
	stats: {
		id: string;
		label: string;
		value: string;
	}[];
	featuredImageUrl: string;
	projectLink?: {
		current?: string;
	};
	agencyLink?: {
		current?: string;
	};
	customColor?: 'default' | 'red' | 'green' | 'blue' | 'purple';
};

export type TestimonialType = {
	id?: string;
	name: string;
	role: string;
	company: string;
	imageUrl: string;
	quote: InputValue;
};

export type SkillsType = {
	name: string;
	skills?: string[];
};
