export type Defined = string | number | boolean | object;
export function isDefined(node: Defined | null): node is Defined {
  return node !== null;
}
