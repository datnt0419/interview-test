const mockDataset = [
  {
    label: 'dataset-1',
    value: 'dataset-1',
  },
  {
    label: 'dataset-2',
    value: 'dataset-2',
  },
  {
    label: 'dataset-3',
    value: 'dataset-3',
  },
  {
    label: 'dataset-4',
    value: 'dataset-4',
  },
];

export async function GET() {
  return Response.json(mockDataset);
}
