// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface LanguageData {
			[key: string]: {
				lang: string;
				projectName: string;
				explanations: string;
				characters: string;
				charactersWithoutSpaces: string;
				words: string;
				uniqueWords: string;
				paragraphs: string;
				sentences: string;
				readingTime: string;
				speechTime: string;
				minutes: string;
				avgWordLength: string;
				upperCase: string;
				lowerCase: string;
				capitalizedCase: string;
				sentenceCase: string;
				invertCase: string;
				randomCase: string;
				reverseText: string;
				textAreaPlaceholder: string;
				searchReplaceOpen: string;
				searchReplaceClose: string;
				searchPlaceholder: string;
				replacePlaceholder: string;
				replaceButton: string;
				searchResult: string;
				frequency: string
				frequencyError: string
				frequencyWord: string
				frequencyOccurrence: string
				copyRight: string;
			};
		}
		type LocaleKey = 'en' | 'da' | 'tr';
	}
}

export {};
