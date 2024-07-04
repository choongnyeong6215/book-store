export interface ICategory {
  categoryId: number | null; // null: 전체 카테고리
  categoryName: string;
  isActive?: boolean;
}
