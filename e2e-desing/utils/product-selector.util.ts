// e2e-design/utils/product-selector.util.ts

export class ProductSelector {
  private selectedIndices: Set<number> = new Set();
  private totalProducts: number;

  constructor(totalProducts: number) {
    this.totalProducts = totalProducts;
  }

  /**
   * Obtiene un índice aleatorio sin repetición
   * @returns índice o null si todos fueron seleccionados
   */
  getRandomUnusedIndex(): number | null {
    if (this.allSelected()) {
      return null;
    }

    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * this.totalProducts);
    } while (this.selectedIndices.has(randomIndex));

    this.selectedIndices.add(randomIndex);
    return randomIndex;
  }

  /**
   * Obtiene todos los índices sin usar en orden aleatorio
   */
  getAllIndicesShuffled(): number[] {
    const indices = Array.from({ length: this.totalProducts }, (_, i) => i);
    return this.shuffle(indices);
  }

  /**
   * Algoritmo de Fisher-Yates para mezclar array
   */
  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Verifica si todos los índices fueron seleccionados
   */
  allSelected(): boolean {
    return this.selectedIndices.size >= this.totalProducts;
  }

  /**
   * Obtiene el progreso actual
   */
  getProgress(): { selected: number; total: number; percentage: number } {
    const selected = this.selectedIndices.size;
    return {
      selected,
      total: this.totalProducts,
      percentage: Math.round((selected / this.totalProducts) * 100),
    };
  }

  /**
   * Resetea la selección
   */
  reset(): void {
    this.selectedIndices.clear();
  }
}