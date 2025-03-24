type ValuePiece = Date | null;
type Range<T> = [T, T];

export type DataPickerValue = ValuePiece | Range<ValuePiece>;
