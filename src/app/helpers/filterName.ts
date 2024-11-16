export function parseFilter(input: string): { type: string; field: string } {
 const [type, field] = input.split('.');
 return { type, field };
}