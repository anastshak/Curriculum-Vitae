type ProficiencyLevel = 'Native' | 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1';

export function getColorProficiency(
  proficiency: ProficiencyLevel,
  isSelected: boolean = false,
): {
  color: string;
} {
  if (isSelected) {
    return { color: '#3B3B3B' };
  }

  switch (proficiency) {
    case 'Native':
      return { color: '#C63031' };

    case 'C2':
      return { color: '#EC8303FF' };

    case 'C1':
      return { color: '#fde421ff' };

    case 'B2':
      return { color: '#2E7D32' };

    case 'B1':
      return { color: '#05b30dff' };

    case 'A2':
      return { color: '#751dabff' };

    case 'A1':
      return { color: '#ff7ab4ff' };

    default:
      return { color: '#767676' };
  }
}
