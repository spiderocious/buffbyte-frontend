import { Zap } from '@ui/icons';

export function Logo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center">
          <Zap size={24} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-4xl font-bold text-gray-900 tracking-tight">
          Buff<span className="text-primary-600">Byte</span>
        </span>
      </div>
      <p className="text-gray-500 text-base font-medium">
        AI-powered content optimization for creators
      </p>
    </div>
  );
}
