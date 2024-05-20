import create from 'zustand';

type FormulaState = {
  formula: string[];
  addTag: (tag: string) => void;
  removeTag: (index: number) => void;
  editTag: (index: number, newTag: string) => void;
  setFormula: (newFormula: string[]) => void;
}

export const useFormulaStore = create<FormulaState>((set) => ({
  formula: [],
  addTag: (tag) => set((state) => ({ formula: [...state.formula, tag] })),
  removeTag: (index) => set((state) => ({
    formula: state.formula.filter((_, i) => i !== index)
  })),
  editTag: (index, newTag) => set((state) => ({
    formula: state.formula.map((tag, i) => (i === index ? newTag : tag))
  })),
  setFormula: (newFormula: string[]) => set(() => ({ formula: newFormula }))
}));
