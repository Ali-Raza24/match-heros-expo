import React from "react";
interface Props {
    isVisibleStartPicker: boolean;
    isVisibleEndPicker: boolean;
    toggleStartPicker(): void;
    toggleEndPicker(): void;
    gameType: string;
    onValueChange(value: string): void;
    items: { label: string, value: string }[];
};
const SearchArea: React.FC<Props>;
export default SearchArea;