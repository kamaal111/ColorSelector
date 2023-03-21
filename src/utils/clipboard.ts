export async function copyValueToClipboard(value: string | null) {
  if (value == null) {
    return;
  }

  await navigator.clipboard.writeText(value);
}
