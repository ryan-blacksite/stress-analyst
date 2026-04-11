import type { ToolDefinition } from './types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'full_analysis',
    label: 'Run Full Analysis',
    description: 'Execute the complete stress analysis pipeline across all checks.',
    endpoint: '/api/tools/full_analysis',
  },
  {
    id: 'buckling_check',
    label: 'Run Buckling Check',
    description: 'Evaluate column and plate buckling margins.',
    endpoint: '/api/tools/buckling_check',
  },
  {
    id: 'bearing_analysis',
    label: 'Run Bearing Analysis',
    description: 'Assess bearing stress at joints and lug interfaces.',
    endpoint: '/api/tools/bearing_analysis',
  },
  {
    id: 'shear_analysis',
    label: 'Run Shear Analysis',
    description: 'Compute shear flow and fastener shear margins.',
    endpoint: '/api/tools/shear_analysis',
  },
];
