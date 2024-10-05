import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const variantClasses = {
  small: 'col-span-1',
  medium: 'col-span-4 md:col-span-3',
  large: 'col-span-4'
};

type DashboardCardProps = {
  variant?: 'small' | 'medium' | 'large';
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
};

export function DashboardCard({
  variant = 'small',
  title,
  icon,
  children,
  className,
  description,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn(variantClasses[variant], className)} {...props}>
      <CardHeader
        className={cn(
          variant === 'small' &&
            'flex flex-row items-center justify-between space-y-0 pb-2'
        )}
      >
        <CardTitle
          className={cn(
            variant === 'small'
              ? 'text-sm font-medium'
              : 'text-lg font-semibold'
          )}
        >
          {title}
        </CardTitle>
        {icon && variant === 'small' && (
          <div className="h-4 w-4 text-muted-foreground">{icon}</div>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
