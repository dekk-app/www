import { Except } from "type-fest";
import create from "zustand";

export interface StoreModel {
	animation: {
		start: boolean;
	};
	page: number;
	animating: boolean;
	particleSize: number;
	set(modal: Except<StoreModel, "set">): void;
}

export const useStore = create<StoreModel>(set => ({
	animation: {
		direction: 1,
		start: true,
	},
	page: 0,
	particleSize: 2,
	animating: false,
	set(partial) {
		set(partial);
	},
}));
