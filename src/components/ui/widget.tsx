import * as React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface WidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  icon?: LucideIcon;
  defaultCollapsed?: boolean;
  actions?: React.ReactNode;
  contentClassName?: string;
}

export function Widget({
  title,
  icon: Icon,
  defaultCollapsed = false,
  actions,
  className,
  contentClassName,
  children,
  ...props
}: WidgetProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className={cn('widget transition-all duration-300', className)} {...props}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-9 h-9 rounded-xl brand-gradient flex items-center justify-center shadow-md">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="text-sm font-semibold text-gray-900">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button
            type="button"
            aria-label={collapsed ? 'Expand widget' : 'Collapse widget'}
            onClick={() => setCollapsed((v) => !v)}
            className={cn(
              'inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/70 hover:bg-white shadow-sm border border-white/60 transition-all',
              collapsed && 'rotate-[-90deg]'
            )}
          >
            <ChevronDown className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
      <div
        className={cn(
          'overflow-hidden transition-[grid-template-rows,opacity] duration-300 grid',
          collapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
        )}
      >
        <div className={cn('min-h-0', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Widget;
