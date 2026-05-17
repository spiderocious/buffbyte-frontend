/**
 * Skeleton — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/25-empty.html
 * Tokens: _foundation.css paper-deep
 *
 * Pulsing paper-deep block. Width / height / borderRadius as props.
 */
import { cn } from '@shared/ui/utils/cn';

export interface SkeletonProps {
  readonly width?: string | number;
  readonly height?: string | number;
  readonly radius?: string;
  readonly className?: string;
}

export function Skeleton({ width, height, radius = '4px', className }: SkeletonProps) {
  return (
    <div
      className={cn('bg-paper-deep animate-pulse', className)}
      style={{
        width: width !== undefined ? width : undefined,
        height: height !== undefined ? height : undefined,
        borderRadius: radius,
      }}
    />
  );
}
