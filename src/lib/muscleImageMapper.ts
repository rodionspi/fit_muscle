/**
 * Maps muscle ID to local image path from /public/images/for_muscles_chart/
 * @param muscleId - The ID or name of the muscle
 * @returns Path to the local image or null if not found
 */
export function getLocalMuscleImage(muscleId: string | number | undefined): string | null {
  if (muscleId === undefined || muscleId === null) {
    return null;
  }
  const id = muscleId.toString().toLowerCase();
  
  // Mapping of muscle IDs/names to image filenames
  const muscleImageMap: Record<string, string> = {
    // By ID (if numeric IDs are used)
    '8': 'chest.png',
    '3': 'back_muscles.png',
    '9': 'biceps.png',
    '4': 'triceps.png',
    '2': 'sholders.png',
    '10': 'abs.png',
    '12': 'quads.png',
    '6': 'hamstrings.png',
    '7': 'calf_muscles.png',
    '5': 'glutes.png',
    '1': 'traps.png',
    '11': 'grip.png',
    
    // By name (lowercase)
    'chest': 'chest.png',
    'back': 'back_muscles.png',
    'back_muscles': 'back_muscles.png',
    'biceps': 'biceps.png',
    'triceps': 'triceps.png',
    'shoulders': 'sholders.png',
    'sholders': 'sholders.png',
    'abs': 'abs.png',
    'abdominals': 'abs.png',
    'quads': 'quads.png',
    'quadriceps': 'quads.png',
    'hamstrings': 'hamstrings.png',
    'calves': 'calf_muscles.png',
    'calf': 'calf_muscles.png',
    'calf_muscles': 'calf_muscles.png',
    'glutes': 'glutes.png',
    'gluteus': 'glutes.png',
    'traps': 'traps.png',
    'trapezius': 'traps.png',
    'grip': 'grip.png',
    'forearms': 'grip.png',
  };
  
  const filename = muscleImageMap[id];
  
  if (filename) {
    return `/images/for_muscles_chart/${filename}`;
  }
  
  return null;
}

/**
 * Get muscle image with fallback priority:
 * 1. From database (muscleInfo.img)
 * 2. Local image by ID/name
 * 3. null (no image)
 */
export function getMuscleImageWithFallback(
  muscleId: string | number | undefined,
  localImage?: string | null
): string | null {
  // Priority 1: Use database image if available
  if (localImage) {
    return localImage;
  }
  
  // Priority 2: Try local image
  return getLocalMuscleImage(muscleId);
}
