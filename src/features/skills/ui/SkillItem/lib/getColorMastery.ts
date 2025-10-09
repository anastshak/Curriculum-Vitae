import { ColorValues, MasteryLevel, ThemedColorValues } from './types';

export function getColorMastery(
  mastery: MasteryLevel,
  isSelected: boolean = false,
): {
  value: number;
  color: ThemedColorValues | ColorValues;
} {
  if (isSelected) {
    return {
      value: 0,
      color: {
        light: { progress: '#CACACA', background: '#CACACA' },
        dark: { progress: '#3B3B3B', background: '#3B3B3B' },
      },
    };
  }

  switch (mastery) {
    case 'Expert':
      return { value: 100, color: { progress: '#C63031', background: '#631818' } };

    case 'Proficient':
      return {
        value: 80,
        color: {
          light: { progress: '#FFB800', background: '#FFE49E' },
          dark: { progress: '#FFB800', background: '#7F5C00' },
        },
      };

    case 'Competent':
      return {
        value: 60,
        color: {
          light: { progress: '#2E7D32', background: '#AFCDB1' },
          dark: { progress: '#66BB6A', background: '#335D35' },
        },
      };

    case 'Advanced':
      return {
        value: 40,
        color: {
          light: { progress: '#0288D1', background: '#9ED1ED' },
          dark: { progress: '#29B6F6', background: '#145B7B' },
        },
      };

    case 'Novice':
      return {
        value: 20,
        color: {
          light: { progress: '#767676', background: '#CACACA' },
          dark: { progress: '#767676', background: '#3B3B3B' },
        },
      };

    default:
      return {
        value: 0,
        color: {
          light: { progress: '#767676', background: '#CACACA' },
          dark: { progress: '#767676', background: '#3B3B3B' },
        },
      };
  }
}
