type TruncateFilenameParams = {
  /**
   * Filename
   */
  name: string;
  /**
   * Number of characters before ellipsis
   */
  frontChars?: number;
  /**
   * Number of characters after ellipsis
   */
  backChars?: number;
  /**
   * Maximum possible total length
   */
  maxTotalLength?: number;
};

export function truncateFilename({
  name,
  frontChars = 5,
  backChars = 5,
  maxTotalLength = 20,
}: TruncateFilenameParams) {
  const extension = name.split(".").pop()!;
  const baseName = name.substring(0, name.length - extension.length - 1); // Remove extension and dot

  if (name.length <= maxTotalLength) return name;

  // Calculate the maximum number of characters that can be shown (excluding the extension and ellipsis)
  const availableLength = maxTotalLength - extension.length - 3; // Account for the ellipsis

  if (availableLength > 0) {
    const adjustedFrontChars = Math.min(frontChars, availableLength); // Ensure front chars don't exceed available space
    const adjustedBackChars = Math.min(
      backChars,
      Math.max(0, availableLength - adjustedFrontChars)
    ); // Ensure back chars fit into the remaining space

    if (baseName.length > availableLength) {
      return `${baseName.substring(
        0,
        adjustedFrontChars
      )}...${baseName.substring(
        baseName.length - adjustedBackChars
      )}.${extension}`;
    } else {
      // If entire basename fits within the available length, no need to truncate
      return `${baseName}.${extension}`;
    }
  } else {
    // If there's no room even for the basename due to a very short max length, return just the ellipsis and extension
    return `...${extension}`;
  }
}
