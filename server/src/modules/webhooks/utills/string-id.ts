export function stringId(id: any): string {
  if (!id) {
    return '';
  }

  if (typeof id === 'string') {
    return id;
  }

  return id.toString();
}
