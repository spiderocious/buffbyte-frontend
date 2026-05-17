import { Table, TableHead, TableBody, TableRow, TableTh, TableTd, TableToolbar } from '@shared/ui/table';
import { Pill } from '@shared/ui/pill';
import { Input } from '@shared/ui/input';
import { KitScene } from './kit-scene';

const ANALYSES = [
  { id: 1, title: 'BuffByte AI launch thread', platform: '𝕏', score: 80, eng: '74%', date: '12 May 2026', status: 'accent' as const },
  { id: 2, title: 'Why I quit my job to build SaaS', platform: 'In', score: 72, eng: '68%', date: '10 May 2026', status: 'accent' as const },
  { id: 3, title: 'Jollof rice world record take', platform: '𝕏', score: 54, eng: '44%', date: '8 May 2026', status: 'warn' as const },
  { id: 4, title: 'Unpaid invoice rant (draft)', platform: 'Li', score: 22, eng: '18%', date: '7 May 2026', status: 'crit' as const },
];

export function TableSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Analysis library table"
        description="Hairline above header and above each row. Numbers sit right, tabular. Hover = paper-deep only."
      >
        <Table>
          <TableToolbar title="Your analyses">
            <Input placeholder="Search…" className="w-[220px] py-[6px] text-[12.5px]" />
          </TableToolbar>
          <TableHead>
            <TableRow>
              <TableTh>Content</TableTh>
              <TableTh>Platform</TableTh>
              <TableTh numeric>Score</TableTh>
              <TableTh numeric>Engagement</TableTh>
              <TableTh>Date</TableTh>
              <TableTh>Status</TableTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {ANALYSES.map((row) => (
              <TableRow key={row.id}>
                <TableTd>
                  <div className="font-medium">{row.title}</div>
                </TableTd>
                <TableTd>
                  <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[5px] bg-ink text-paper text-[10px] font-semibold">
                    {row.platform}
                  </span>
                </TableTd>
                <TableTd numeric>
                  <Pill variant={row.status}>{row.score}</Pill>
                </TableTd>
                <TableTd numeric>{row.eng}</TableTd>
                <TableTd className="text-ink-3">{row.date}</TableTd>
                <TableTd>
                  <Pill variant={row.status}>
                    {row.status === 'accent' ? 'Published' : row.status === 'warn' ? 'Draft' : 'Needs work'}
                  </Pill>
                </TableTd>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </KitScene>
    </div>
  );
}
